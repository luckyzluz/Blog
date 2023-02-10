const { redisDb,redlock,client } = require('../util/redis');
const {REDIS_CONFIG,mysqlArtKey} = require('../config/config.db')
const Knex = require('../model/knex');
const {sleep} = require('./utils')
const { pinyin } = require('pinyin-pro');
const { allLimit, reject } = require('async');
let isShowTopArt = true;
let numShowTopArt = 3;


let ArtLogicFunc = {
    /**
     * 查询文章id列表(当超出最大页数，缓存返回空，会进行数据库查询)禁止数据库查询，需优化
     * 查询成功，进行缓存
     * @param {*} params {limit, offset, orderby, sort}
     * @returns []
     */
    QueryArtsInfosList: async(params) => { // 得到了置顶id，除去原有列表内的id。将置顶id拼接到第一页
        let ArtsIdData = {};
        let ArtsIdList = []; // 要返回的id
        let ArtsAllIds = []; // mysql查询的全部id
        let TopArtsId = []; //置顶id
        // 文章下标计算
        let start = (Number(params.offset) - 1) * Number(params.limit);
        let stop = start + Number(params.limit) -1;
        // 这里处理是否有置顶文章，插入列表开头
        if(isShowTopArt){
            // 获取置顶id
            TopArtsId = await ArtLogicFunc.QueryTopArtsId(numShowTopArt);
            // console.log(TopArtsId)
            if(TopArtsId.length > 0){ // 存在置顶文章
                // if(TopArtsId.length < Number(params.limit)){
                    start - TopArtsId.length > 0 ? start = start - TopArtsId.length : start = 0 ;
                    stop = stop - TopArtsId.length;
                // }
                // else if(TopArtsId.length = Number(params.limit)){
                //     if(params.offset== 1){
                //         start = 99999999;
                //         stop = 100000000000;
                //     }else{
                //         start = (Number(params.offset) - 2) * Number(params.limit);
                //         stop = start + Number(params.limit) -1;
                //     }
                //     // 禁止此类情况出现,暂时不处理
                // }else if(TopArtsId.length > Number(params.limit)){
                //     if(params.offset== 1){

                //     }
                //     // start = start - TopArtsId.length;
                //     // stop = stop - TopArtsId.length;
                // }
                if(TopArtsId.length >= Number(params.limit)){
                    // throw 'not allow limit <= Number of top articles'
                    return 'paramWarning'
                }
                
            }
        }
        // console.log(start,stop) // 起始下标   无问题
        // 查看id列表缓存是否存在
        let isExistsArtIdInfosList = await redisDb.exists(REDIS_CONFIG.database._article, `${params.orderby}ArtIdInfosList`);
        // console.log(ff)
        

        // 这里处理置顶重复显示的问题
        // 剔除返回id列表中的置顶id
        // （中途废弃，直接在缓存时或取缓存时剔除（这里指的是id列表））
        // 如果启用后又关闭，缓存id列表将缺失置顶id数据
        if(isShowTopArt && TopArtsId.length > 0){
            // 在返回id中，获取重复的置顶的id
            let newA = new Set(ArtsIdList);
            let newB = new Set(TopArtsId); 
            let intersectionSet = new Set([...newA].filter(x => newB.has(x)));
            // console.log(intersectionSet);
            intersectionSet = Array.from(intersectionSet);
            // console.log(intersectionSet);
            if(intersectionSet.length > 0){
                stop = stop + intersectionSet.length;
                // 重新 获取缓存文章列表id
                params.sort == 'desc' ? ArtsIdList = await redisDb.zrevrange(REDIS_CONFIG.database._article,`${params.orderby}ArtIdInfosList`, start, stop) : ArtsIdList = await redisDb.zrange(REDIS_CONFIG.database._article,`${params.orderby}ArtIdInfosList`, start, stop);
                // 剔除id
                ArtsIdList = ArtsIdList.filter(x => intersectionSet.every((val) => val != x));
            }

        }

        if(isExistsArtIdInfosList !== 1){ //ArtsIdList.length == 0 id缓存是否存在进行查询mysql
            // 上锁
            let LockStatus = false; // 锁状态
            const lock = await redlock.lock(`QueryMysqlArtAllIdInfosListLock:${params.orderby}`, 10000,(err,result)=>{
                err == null ? LockStatus = true : '';
            });
            if(LockStatus){ // 上锁成功
                // 查询mysql所有id信息(符合条件，按顺序)
                ArtsAllIds = await ArtLogicFunc.QueryMysqlArtIdInfosList(params.orderby);  // [{name:,score:}]

                if(ArtsAllIds.cacheId.length !== 0){
                    // 存在数据，进行缓存
                    // if(isShowTopArt){ // (废弃)如果启用置顶，则剔除置顶id缓存进列表
                    //     ArtsAllIds = ArtsAllIds.filter(x => TopArtsId.every((val) => val != x));
                    // }
                    console.log(ArtsAllIds.cacheId)
                    await ArtLogicFunc.CachingRedisArtsIdInfos(ArtsAllIds.cacheId, params.orderby);
                }
                await lock.unlock(); // 释放锁
            }else{ // 上锁失败，延时后重新执行函数，尝试上锁
                await sleep(200);
                return ArtLogicFunc.QueryArtsInfosList(params);
            }
            ArtsIdData.total = ArtsAllIds.ArrayId.length;

            ArtsIdData.PageCount = Math.ceil(ArtsIdData.total/Number(params.limit));
            
            ArtsIdList = ArtsAllIds.ArrayId.slice(start,stop + 1);
            // console.log(ArtsAllIds.ArrayId)
            // 这里 不做处理，直接重新执行函数
            // return ArtLogicFunc.QueryArtsInfosList(params); 
        }else{ // 存在id列表缓存则进行  取缓存
            // 获取缓存文章列表id
            params.sort == 'desc' ? ArtsIdList = await redisDb.zrevrange(REDIS_CONFIG.database._article,`${params.orderby}ArtIdInfosList`, start, stop) : ArtsIdList = await redisDb.zrange(REDIS_CONFIG.database._article,`${params.orderby}ArtIdInfosList`, start, stop);

            ArtsIdData.total = await redisDb.zard(REDIS_CONFIG.database._article, `${params.orderby}ArtIdInfosList`)
            // console.log(ArtsIdList)
            ArtsIdData.PageCount = Math.ceil(ArtsIdData.total/Number(params.limit));
        }
        if(params.offset == 1 && isShowTopArt){ // TopArtsId
            ArtsIdList = TopArtsId.concat(ArtsIdList);
        }
        ArtsIdData.ArtsIdList = ArtsIdList;

        // console.log(ArtsIdList)
        return ArtsIdData;
    },
    /**
     * 根据id数组，查询文章信息,并进行缓存
     * @param {*} params [id]
     * @param {*} offset (页数)
     * @returns [{},{}]
     */
    QueryArtInfos: async(params, offset) => { // 这里不考虑上锁，调用时上
        let ArtsInfos = []; // 要返回的文章信息
        let notExistIdArds = []; // 不存在缓存的文章id
        let notExistIdArdsx = []; // 不存在缓存的文章id，具体信息
        let needCacheArtsInfos = []; // 需要缓存的文章信息
        
        // 根据id获取缓存文章信息，记录未缓存数据
        for (let i = 0; i < params.length; i++) {
            ArtsInfos[i] = await redisDb.hGetAll(REDIS_CONFIG.database._article, `ArtsInfos:${params[i]}`);

            // 未缓存文章id处理
            if(JSON.stringify(ArtsInfos[i]) == "{}"){
                notExistIdArdsx[i]={order: i, id: params[i]};
                notExistIdArds.push(params[i]);
            }
          }
        
        if(notExistIdArds.length !== 0){ // 需要进行mysql查询
            // 上锁
            let LockStatus = false; // 锁状态
            const lock = await redlock.lock(`QueryMysqlArtsInfosListLock:${params.orderby}-${offset}`, 10000,(err,result)=>{
                err == null ? LockStatus = true : '';
            });
            if(LockStatus){
                // 根据id查询mysql，不存在缓存的文章
                needCacheArtsInfos = await ArtLogicFunc.QueryMysqlArtInfos(notExistIdArds);
                // 将mysql查询数据插入对应位置
                needCacheArtsInfos.forEach((v, i) => {
                    notExistIdArdsx.forEach((x, y) => {
                        if(v[mysqlArtKey.id] == x.id){
                            ArtsInfos[x.order] = v
                        }
                    })
                })
                // 缓存未缓存的文章
                needCacheArtsInfos.length !== 0 ? ArtLogicFunc.CachingRedisArtInfos(needCacheArtsInfos) : '';
                await lock.unlock(); // 释放锁
            }else{
                await sleep(200);
                return QueryArtInfos(params, offset);
            }
        }
        // console.log(notExistIdArds)
        return ArtsInfos;
    },
    /**
     * 查询置顶的文章id列表
     * @param {*} num 显示几个
     * @returns [id]
     */
    QueryTopArtsId: async(num = 3) => {
        let TopArtsId = await redisDb.lRange(REDIS_CONFIG.database._article, 'TopArtsId', 0, num-1);
        // console.log(TopArtsId.length)
        if(TopArtsId.length == 0){
            let LockStatus = false;
            const lock = await redlock.lock(`QueryTopArtsIdLock`, 10000,(err,result)=>{
                err == null ? LockStatus = true : '';
            });
            if(LockStatus){
                let mysqlTopArtsId = await Knex(mysqlArtKey.table).where(mysqlArtKey.istop, 1).select(mysqlArtKey.id).orderBy(mysqlArtKey.addtime, 'desc');
            // console.log(TopArtsId)
                // 这里处理查到的id数据，返回数据外，进行缓存
                mysqlTopArtsId.length !==0 ?mysqlTopArtsId.forEach((v,i) => {
                    TopArtsId.push(Object.values(v)[0]);
                }) : '';
                // 缓存topartid
                await redisDb.rPush(REDIS_CONFIG.database._article, 'TopArtsId',TopArtsId);
                // 处理
                mysqlTopArtsId.length > num ? TopArtsId = TopArtsId.slice(0,num-1) : '';
                await lock.unlock();
            }else{
                await sleep(200);
                return QueryTopArtsId(num);
            }
        }
        return TopArtsId;
    },
    /**
     * 新增文章，成功后进行缓存
     * @param {*} params 
     * @returns [{}](有bug，多条数据只返回一个)
     */
    InsertArtsInfos: async(params) => {
        // return new Promise((resolve, reject) => {
            // 先处理数据
            let NewArtData = ArtLogicFunc.FrontEndDataProcess(params);
            // 先插数据库
            let InsertArts = await Knex(mysqlArtKey.table).insert(NewArtData);
            // 查询成功信息
            let InsertArtsInfos = await Knex(mysqlArtKey.table).where((builder) =>
            builder.whereIn(mysqlArtKey.id, InsertArts)
          ).select();
            // console.log(xx)
            // 缓存文章信息
            await ArtLogicFunc.CachingRedisArtInfos(InsertArtsInfos);
            // 缓存进id列表
            let lastIdList = [];
            let viewsIdList = [];
            let likeIdList = [];
            let comment_countIdList = [];
            InsertArtsInfos.forEach((v, i) => {
                lastIdList[i] = {name: v[mysqlArtKey.id], score: v[mysqlArtKey.addtime]};
                viewsIdList[i] = {name: v[mysqlArtKey.id], score: v[mysqlArtKey.hits]};
                likeIdList[i] = {name: v[mysqlArtKey.id], score: v[mysqlArtKey.up]};
                comment_countIdList[i] = {name: v[mysqlArtKey.id], score: v[mysqlArtKey.comment_count]};

                // 判断是否置顶，进行缓存
                if(InsertArtsInfos[0][mysqlArtKey.istop] == 1){
                    redisDb.lPush(REDIS_CONFIG.database._article, 'TopArtsId', v[mysqlArtKey.id]);
                }
            })
            
            ArtLogicFunc.CachingRedisArtsIdInfos(lastIdList, 'last');
            ArtLogicFunc.CachingRedisArtsIdInfos(likeIdList, 'like');
            ArtLogicFunc.CachingRedisArtsIdInfos(viewsIdList, 'views');
            ArtLogicFunc.CachingRedisArtsIdInfos(comment_countIdList, 'comment_count');
            return InsertArtsInfos;
            // resolve(InsertArts)
        // })
    },
    /**
     * 
     * @param {*} targetId [id]
     * @param {*} params [{}]
     * @returns 
     */
    UpdateArtsInfos: async(targetId, params) => {
        let results = 0; //mysql数据库更新状态 0 不成功 1成功
        // 转换数据
        let updateData = ArtLogicFunc.FrontEndDataProcess(params, 'update');
        let returnResult = [];
        // 删除缓存
        await ArtLogicFunc.ClearCacheRedisArtInfos(targetId);
        
        // 更改数据库(只能修改一个字段updateData[0])
        JSON.stringify(updateData[0]) !== "{}" ? await Knex(mysqlArtKey.table).where((builder) =>
            builder.whereIn(mysqlArtKey.id, targetId)
        ).update(updateData[0]).then(updateResult => {
            results = updateResult;
        }) : '';
        // console.log(results)
        if(results > 0){ // 数据库更新成功
            sleep(3000); // 延时3秒
            // 删除缓存
            ArtLogicFunc.ClearCacheRedisArtInfos(targetId);

            // 缓存最新数据
            returnResult = await ArtLogicFunc.QueryArtInfos(targetId);
            // 处理id
        }
        return returnResult;
        
    },
    /**
     * 删除文章相关信息
     * @param {*} params [id]
     * @returns true
     */
    delArts:(params) => {
        return new Promise(async(resolve, reject) => {
            // 先删数据库
            // let result =222;
            let delMysqlResult = await Knex(mysqlArtKey.table).where((builder) =>
            builder.whereIn(mysqlArtKey.id, params)).del();
            // console.log(result)
            if(delMysqlResult >= 0){ // 数据库删除成功,开始删除缓存
                // result = 
                await ArtLogicFunc.ClearCacheRedisArtInfos(params);
            }
            if(delMysqlResult == 0){ // 数据库不存在
                resolve(0);
            }else{
                resolve(delMysqlResult);
            }
        })
    },
    // ----------------------mysql-------------------------
    /**
     * 数据库查询全部文章id列表信息
     * @param {*} orderby comment_count,like,last,views
     * @param {*} sort desc  asc
     * @returns [id]
     */
    QueryMysqlArtIdInfosList: (orderby,sort = 'desc') => {
        return new Promise(async(resolve,reject) => {
            let field = mysqlArtKey.addtime;
            if(orderby == 'like'){
                field = mysqlArtKey.up;
            }else if(orderby == 'views'){
                field = mysqlArtKey.hits;
            }else if(orderby == 'comment_count'){
                field = mysqlArtKey.comment_count;
            }
            let resx =await Knex(mysqlArtKey.table).select({name: mysqlArtKey.id, score: field}).orderBy(field,sort);
            let res = {ArrayId:[],cacheId:[]}
            res.cacheId = resx;
            // 返回俩个结果，数组纯id和缓存数组id
            for(let i=0;i<resx.length;i++){
                res.ArrayId.push(resx[i].name)
            }
            // console.log(res)
            resolve(res)
        })
    },
    /**
     * 数据库根据id查询文章信息
     * @param {*} params [id]
     * @returns [{},{}]
     */
    QueryMysqlArtInfos: async(params) => {
        return new Promise((resolve, reject) => {
            resolve(Knex(mysqlArtKey.table).where((builder) =>
            builder.whereIn(mysqlArtKey.id, params)));
        })
    },
    // -----------------redis----------------------------
    /**
     * 缓存文章id列表排序信息
     * @param {*} params [{name(id):,score(??):}]
     * @param {*} type comment_count,like,last,views。不存在时进行全部缓存
     * @returns 
     */
    CachingRedisArtsIdInfos: async(params, type) => {
        // if(type){
            await redisDb.zAdd(REDIS_CONFIG.database._article, `${type}ArtIdInfosList`, params);
        // }else{
        //     console.log(222)
        // }
        // 
    },
    /**
     * 缓存文章信息(id列表【3】，文章信息，置顶文章)
     * @param {*} params [{},{}]!!!!(判断是否存在)
     * @param {*} params
     * @returns 1  缓存成功  0 缓存失败  -1 部分缓存失败
     */
    CachingRedisArtInfos: async(params, isCacheIdList = true) => {
        // let num = 1;
        for(let i = 0; i < params.length; i++){
            // 缓存文章全部信息
            await redisDb.hMset(REDIS_CONFIG.database._article, `ArtsInfos:${params[i][mysqlArtKey.id]}`, params[i]).then(res => {
                // res == 'OK' ? num = num - 1 : '';
            });
        }
    },
    /**
     * 清除n个文章所有缓存
     * @param {*} params [id]  无参数  默认为all
     * @returns 
     */
    ClearCacheRedisArtInfos: (params) => {
        return new Promise(async(resolve, reject) => {
            let result = 0;
            if(params && params.length >0){ //删除n个
                let ArtsInfosKeys = [];
                // 删除置顶id
                params.forEach((v, i) => {
                    redisDb.lrem(REDIS_CONFIG.database._article, 'TopArtsId', 0, v);
                    // 转换keys
                    ArtsInfosKeys[i] = `ArtsInfos:${v}`;
                })
                // 删除文章信息hash
                redisDb.del(REDIS_CONFIG.database._article, ArtsInfosKeys);
                // 删除id缓存列表中的值
                redisDb.zrem(REDIS_CONFIG.database._article, 'lastArtIdInfosList',params);
                redisDb.zrem(REDIS_CONFIG.database._article, 'likeArtIdInfosList',params);
                redisDb.zrem(REDIS_CONFIG.database._article, 'viewsArtIdInfosList',params);
                redisDb.zrem(REDIS_CONFIG.database._article, 'comment_countArtIdInfosList',params);
            }else{ // 删除全部缓存
                let ArtsInfosKeys = await redisDb.keys(REDIS_CONFIG.database._article, 'ArtsInfos:*')
                redisDb.del(REDIS_CONFIG.database._article, ArtsInfosKeys);
                redisDb.del(REDIS_CONFIG.database._article, 'TopArtsId');
                redisDb.del(REDIS_CONFIG.database._article, 'lastArtIdInfosList');
                redisDb.del(REDIS_CONFIG.database._article, 'likeArtIdInfosList');
                redisDb.del(REDIS_CONFIG.database._article, 'viewsArtIdInfosList');
                redisDb.del(REDIS_CONFIG.database._article, 'comment_countArtIdInfosList');
            }
            // console.log(result)
            resolve(result)
        })
    },
    // 前端数据转换
    /**
     * 
     * @param {*} data [{}]
     * @param {*} mode insert  or   update
     * @returns [{}]
     */
    FrontEndDataProcess: (data, mode = 'insert') => {
        let NewData = [];
        // NewData=data
        data.forEach((v, i) => {
            let transferData = {}
            v.title ? transferData[mysqlArtKey.title] = v.title : v.title;
            v.pic ? transferData[mysqlArtKey.pic] = v.pic : ''; 
            v.blurb ? transferData[mysqlArtKey.blurb] = v.blurb : '';
            v.content ? transferData[mysqlArtKey.content] = v.content : '';
            v.type ? transferData[mysqlArtKey.type] = v.type : '';
            v.type_1 ? transferData[mysqlArtKey.type_1] = v.type_1 : '';
            v.tags ? transferData[mysqlArtKey.tags] = v.tags : '';
            v.from ? transferData[mysqlArtKey.from] = v.from : '';
            v.author ? transferData[mysqlArtKey.author] = v.author : '';
            v.jumpurl ? transferData[mysqlArtKey.jumpurl] = v.jumpurl : '';
            v.level ? transferData[mysqlArtKey.level] = v.level : '';
            v.lock ? transferData[mysqlArtKey.lock] = v.lock : '';
            v.up ? transferData[mysqlArtKey.up] = v.up : '';
            v.down ? transferData[mysqlArtKey.down] = v.down : '';
            v.hits ? transferData[mysqlArtKey.hits] = v.hits : '';
            v.hits_day ? transferData[mysqlArtKey.hits_day] = v.hits_day : '';
            v.hits_week ? transferData[mysqlArtKey.hits_week] = v.hits_week : '';
            v.hits_month ? transferData[mysqlArtKey.hits_month] = v.hits_month : '';
            v.password ? transferData[mysqlArtKey.password] = v.password : '';
            v.istop ? transferData[mysqlArtKey.istop] = v.istop : '';
            v.ishot ? transferData[mysqlArtKey.ishot] = v.ishot : '';
            
            if(mode == 'insert'){
                v.en ? transferData[mysqlArtKey.en] = v.en : transferData[mysqlArtKey.en] = pinyin(v.title, { toneType: 'none', nonZh: 'consecutive' }).replace(/\s*/g,"");
                v.letter ? transferData[mysqlArtKey.letter] = v.letter : transferData[mysqlArtKey.letter] = pinyin(v.title, { pattern: 'first', toneType: 'none', nonZh: 'consecutive' }).slice(0, 1).toUpperCase();
                v.addtime ? transferData[mysqlArtKey.addtime] = v.addtime : transferData[mysqlArtKey.addtime] = Math.round(new Date() / 1000);
                v.time ? transferData[mysqlArtKey.time] = v.time : '';
            }else if(mode == 'update'){
                v.en ? transferData[mysqlArtKey.en] = v.en : '';
                v.letter ? transferData[mysqlArtKey.letter] = v.letter : '';
                v.time ? transferData[mysqlArtKey.time] = v.time : transferData[mysqlArtKey.time] = Math.round(new Date() / 1000);
            }
            
            
            NewData[i] = transferData;
        })
        return NewData;
    }
}
module.exports = ArtLogicFunc;