const { redisDb,redlock } = require('../util/redis');
const {REDIS_CONFIG,mysqlArtKey} = require('../config/config.db')
const Knex = require('../model/knex');
const {sleep} = require('./utils')
const { allLimit, reject } = require('async');
let isShowTopArt = true;
let numShowTopArt = 3;


let ArtLogicFunc = {
    /**
     * 查询文章id列表
     * @param {*} params {limit, offset, orderby, sort}
     * @returns []
     */
    QueryArtsInfosList: async(params) => { // 得到了置顶id，除去原有列表内的id。将置顶id拼接到第一页
        let ArtsIdList = []; // 要返回的id
        let ArtsAllIds = []; // mysql查询的全部id
        let TopArtsId = []; //置顶id
        // 文章下标计算
        let start = (params.offset - 1) * params.limit;
        let stop = start + params.limit -1;
        // 这里处理是否有置顶文章，插入列表开头
        if(isShowTopArt){
            TopArtsId = await ArtLogicFunc.QueryTopArtsId(numShowTopArt);
            console.log(TopArtsId)
            if(TopArtsId.length > 0){ // 存在置顶文章
                // if(params.offset == 1){
                //     start = 0;
                //     stop = 
                // }
                start - TopArtsId.length > 0 ? start = start - TopArtsId.length : start = 0 ;
                stop = stop - TopArtsId.length;
                // ArtsIdList = TopArtsId;
            }
        }
        // console.log(start,stop)起始下标   无问题

        
        // 获取缓存文章列表id
        params.sort == 'desc' ? ArtsIdList = await redisDb.zrevrange(REDIS_CONFIG.database._article,`${params.orderby}ArtIdInfosList`, start, stop) : ArtsIdList = await redisDb.zrange(REDIS_CONFIG.database._article,`${params.orderby}ArtIdInfosList`, start, stop);
        if(ArtsIdList.length == 0){ // id缓存是否存在进行查询mysql
            // 上锁
            let LockStatus = false; // 锁状态
            const lock = await redlock.lock(`QueryMysqlArtAllIdInfosListLock:${params.orderby}`, 10000,(err,result)=>{
                err == null ? LockStatus = true : '';
            });
            if(LockStatus){ // 上锁成功
                // 查询mysql所有id信息(符合条件，按顺序)
                ArtsAllIds = await ArtLogicFunc.QueryMysqlArtIdInfosList(params.orderby);  // [{name:,score:}]
                if(ArtsAllIds.length !== 0){
                    // 存在数据，进行缓存
                    await ArtLogicFunc.CachingRedisArtsIdInfos(ArtsAllIds, params.orderby);
                }
                await lock.unlock(); // 释放锁
            }else{ // 上锁失败，延时后重新执行函数，尝试上锁
                await sleep(200);
                return QueryArtsInfosList(params);
            }
            // console.log(ArtsAllIds);
            // 数据不对口
            // params.sort == 'desc' ? ArtsIdList = ArtsAllIds.slice[start,stop] : ArtsIdList = ArtsAllIds.slice[-stop,-start];
            return QueryArtsInfosList(params); // 重新执行函数
        }
        if(params.offset == 1 && isShowTopArt){ // TopArtsId
            TopArtsId.concat(ArtsIdList);
        }
        
        console.log(ArtsIdList)
        return ArtsIdList;
    },
    /**
     * 根据id数组，查询文章信息
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
        if(TopArtsId.length == 0){
            let LockStatus = false;
            const lock = await redlock.lock(`QueryTopArtsIdLock`, 10000,(err,result)=>{
                err == null ? LockStatus = true : '';
            });
            if(LockStatus){
                let mysqlTopArtsId = await Knex(mysqlArtKey.table).where((builder) =>
            builder.whereIn(mysqlArtKey.istop, [1])).select(mysqlArtKey.id).orderBy(mysqlArtKey.createtime, 'desc');
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
     * 数据库查询全部文章id列表信息
     * @param {*} orderby comment_count,like,last,views
     * @param {*} sort desc  asc
     * @returns [id]
     */
    QueryMysqlArtIdInfosList: (orderby,sort = 'desc') => {
        return new Promise((resolve,reject) => {
            let field = mysqlArtKey.createtime;
            if(orderby == 'like'){
                field = mysqlArtKey.digg;
            }else if(orderby == 'views'){
                field = mysqlArtKey.view;
            }else if(orderby == 'comment_count'){
                field = mysqlArtKey.comment_count;
            }
            let res = Knex(mysqlArtKey.table).select({name: mysqlArtKey.id, score: field}).orderBy(field,sort);
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
    /**
     * 缓存文章id列表排序信息
     * @param {*} params [id]
     * @param {*} type comment_count,like,last,views
     */
    CachingRedisArtsIdInfos: async(params, type) => {
        await redisDb.zAdd(REDIS_CONFIG.database._article, `${type}ArtIdInfosList`, params);
    },
    /**
     * 缓存文章信息
     * @param {*} params [{},{}]
     */
    CachingRedisArtInfos: async(params) => {
        params.forEach((v,i) => {
            redisDb.hMset(REDIS_CONFIG.database._article, `ArtsInfos:${v[mysqlArtKey.id]}`, v);
        })
    },
    // 清除文章缓存
    ClearCacheRedisArtInfos: async() => {

    }
}
module.exports = ArtLogicFunc;