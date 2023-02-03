const { redisDb,redlock } = require('../util/redis');
const {REDIS_CONFIG,mysqlArtKey} = require('../config/config.db')
const Knex = require('../model/knex');
const { allLimit, reject } = require('async');

let ArtLogicFunc = {
    // 查询文章列表信息
    QueryArtsInfosList: async(params) => {
        let start = (params.offset - 1) * params.limit;
        let stop = start + params.limit -1;
        let ArtsIdList = await redisDb.zrevrange(REDIS_CONFIG.database._article,`${params.orderby}ArtIdInfosList`, start, stop);
        if(ArtsIdList.length == 0){ // 是否进行查询mysql
            // 上锁
            let LockStatus = false;
            const lock = await redlock.lock(`QueryMysqlArtIdInfosListLock:${params.orderby}`, 10000,(err,result)=>{
                err == null ? LockStatus = true : '';
            });
            if(LockStatus){
                let ArtsIdInfos = await ArtLogicFunc.QueryMysqlArtIdInfosList(params.orderby);
                if(ArtsIdInfos.length !== 0){
                    await ArtLogicFunc.CachingRedisArtsIdInfos(ArtsIdInfos, params.orderby);
                }
                await lock.unlock();
            }else{
                await sleep(200);
                // return QueryArtsInfosList(params);
            }
            return QueryArtsInfosList(params);
        }
        return ArtsIdList
    },
    // 查询文章信息
    QueryArtInfos: async(params) => { // 这里不考虑上锁，调用时上
        let ArtsInfos = [];
        let notExistIdArds = [];
        let notExistIdArdsx = []
        let needCacheArtsInfos = []; 
        
        // 判断是否都已缓存
        for (let i = 0; i < params.length; i++) {
            ArtsInfos[i] = await redisDb.hGetAll(REDIS_CONFIG.database._article, `ArtsInfos:${params[i]}`);
            if(JSON.stringify(ArtsInfos[i]) == "{}"){
                notExistIdArdsx[i]={order: i, id: params[i]};
                notExistIdArds.push(params[i]);
            }
          }
        // 根据id查询mysql，不存在缓存的文章
        if(notExistIdArds.length !== 0){

            needCacheArtsInfos = await ArtLogicFunc.QueryMysqlArtInfos(notExistIdArds);
            needCacheArtsInfos.forEach((v, i) => {
                notExistIdArdsx.forEach((x, y) => {
                    if(v[mysqlArtKey.id] == x.id){
                        ArtsInfos[x.order] = v
                    }
                })
            })
        }

        // 缓存未缓存的文章
        needCacheArtsInfos.length !== 0 ? ArtLogicFunc.CachingRedisArtInfos(needCacheArtsInfos) : '';
        // console.log(notExistIdArds)
        return ArtsInfos;
        // return await redisDb.hGetAll(0,'UsersInfo:144');
    },
    // 数据库查询文章列表信息
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
    // 数据库查询文章信息
    QueryMysqlArtInfos: async(params) => {
        return new Promise((resolve, reject) => {
            resolve(Knex(mysqlArtKey.table).where((builder) =>
            builder.whereIn(mysqlArtKey.id, params)));
        })
    },
    // 缓存文章id列表排序信息
    CachingRedisArtsIdInfos: async(params, type) => {
        await redisDb.zAdd(REDIS_CONFIG.database._article, `${type}ArtIdInfosList`, params);
    },
    // 缓存文章信息
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