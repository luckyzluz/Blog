const {redisDb,redlock} = require('./redis');
const Knex = require('../model/knex');
const { REDIS_CONFIG, mysqlUserKey} = require('../config/config.db');
const { sleep } = require('./utils');
const { reject } = require('async');
let UserLogicFunc={
    // mysql
    // 查询单个用户信息（先redis，后mysql+缓存）
    QueryUserInfos: async(params,isRetainPwd=false) => {
            let user = []; // 用户信息
            await redisDb.hGet(REDIS_CONFIG.database._user, `${Object.keys(params)[0]}.to.id`,  Object.values(params)[0]).then(res=>{ // 返回字符串
                res == null ? '' : user[0] = res;
            })

            if(user.length == 0){ // 是否进行查询mysql
                // 上锁
                let LockStatus = false;
                const lock = await redlock.lock(`QueryMysqlUserInfosLock:${Object.values(params)[0]}`, 10000,(err,result)=>{
                    err == null ? LockStatus = true : '';
                });
                if(LockStatus){ // 上锁成功继续db查询（只有一个请求操作）
                    user = await UserLogicFunc.QueryMysqlUserInfos(params);
                    if(user.length !== 0){ // mysql存在数据
                        !isRetainPwd ? delete user[0].user_pwd : '';
                        // 开始redis写入
                        await UserLogicFunc.CachingRedisUserInfos(user);
                     
                    }
                    await lock.unlock();
                }else{
                    await sleep(200);
                    return QueryUserInfos(params);
                }
            }else{
                await redisDb.hGetAll(REDIS_CONFIG.database._user, `UsersInfo:${user[0]}`,  user[0]).then(res=>{ // 返回字符串
                    res == null ? '' : user[0] = res;
                    // console.log(res)
                })
            }
            // console.log(user)
            return user;
    },
    // 数据库查询单个用户信息
    QueryMysqlUserInfos: async(params) => {
        return new Promise((resolve, reject) => {
            let user = []; // 用户信息
            user = Knex.select('*').from(mysqlUserKey.table).where(params).orderBy(mysqlUserKey.regtime, 'desc');
            resolve(user);
        })
    },
    // 修改单个用户若干信息
    updateMysqlUserInfos: async(params) => {
        
    },
    // redis
    // 缓存用户信息
    CachingRedisUserInfos:async(user) => {
        return new Promise((resolve, reject) => {
            redisDb.hMset(REDIS_CONFIG.database._user, `UsersInfo:${user[0][mysqlUserKey.id]}`, user[0]);

            redisDb.hSet(REDIS_CONFIG.database._user, `${mysqlUserKey.name}.to.id`, user[0][mysqlUserKey.name], user[0][mysqlUserKey.id]);

            redisDb.hSet(REDIS_CONFIG.database._user, `${mysqlUserKey.email}.to.id`, user[0][mysqlUserKey.email], user[0][mysqlUserKey.id]);

            resolve(true);
        })
    },
    /**
     * 清除用户信息缓存
     * @param {*} params [{},{}]
     * @returns 
     */
    ClearCacheRedisUserInfos: async(params) => {
        return new Promise((resolve, reject) => {
            let delParams = {};
            delParams[mysqlUserKey.id] = [];
            delParams[mysqlUserKey.name] = [];
            delParams[mysqlUserKey.email] = [];

            params.forEach((v, i) => {
                delParams[mysqlUserKey.id].push(`UsersInfo:${v[mysqlUserKey.id]}`);
                delParams[mysqlUserKey.name].push(v[mysqlUserKey.name]);
                delParams[mysqlUserKey.email].push(v[mysqlUserKey.email]);
            });

            // console.log(delParams)
            redisDb.del(REDIS_CONFIG.database._user,delParams[mysqlUserKey.id]);
            redisDb.hdel(REDIS_CONFIG.database._user, `${mysqlUserKey.name}.to.id`, delParams[mysqlUserKey.name]);
            redisDb.hdel(REDIS_CONFIG.database._user, `${mysqlUserKey.email}.to.id`, delParams[mysqlUserKey.email]);
            resolve(true);
        })
    }


}
module.exports= UserLogicFunc;