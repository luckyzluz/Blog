const { reject } = require('async');
var { redis, createClient } = require('redis');
var { redisConfig } = require('../config/config.default')
let _user = redisConfig.database._user
let _article = redisConfig.database._article
var redisDb = {};
const options = {
    host: redisConfig.host,
    port: redisConfig.port,
    password: redisConfig.password,
    detect_buffers: redisConfig.detect_buffers, // 传入buffer 返回也是buffer 否则会转换成String
    retry_strategy: function (options) {
    // 重连机制
    console.log(options.error.code)
    if (options.error && options.error.code === "ECONNREFUSED") {
        // 在出现特定错误时结束重新连接，并使用
        // 单个错误
        return new Error("The server refused the connection(服务器拒绝连接)");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
        // 在特定超时后结束重新连接并刷新所有命令
        // 有一个单独的错误
        return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
        // 结束重新连接并出现内置错误
        return undefined;
    }
    // 之后重新连接
    // return Math.min(options.attempt * 100, 3000);
    }
}

// 生成redis的client
const client = createClient(options);
client.on('error', (err) => console.log('Redis Client Error', err));
client.on('ready', () => console.log('Redis Client Ready(连接成功)'));
client.connect();
/**
 *
 * @param dbNum 库号
 * @param key 键
 * @param value 值
 * @param expire 过期时间（单位：秒，可为空，为空则不过期）
 */
 redisDb.set =async (dbNum,key,value,expire) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let res;
        if (typeof value === 'string') {
            res=client.set(key, Buffer.from(value));
        }else if(typeof value === 'object'){
            for (let item in value) {
                res=typeof value[item]==='object'?client.hSet(key, item, Buffer.from(JSON.stringify(value[item]))):client.hSet(key, item, Buffer.from(value[item]));
            }
        }
        if(expire){
            client.expire(key,expire);
        }
        resolve(res);
    })
}
redisDb.hSet =async (dbNum,hash_key,sub_key,value,expire) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let res;
        res=client.hSet(hash_key,sub_key,value);
        if(expire){
            client.expire(hash_key,expire);
        }
        resolve(res);
    })
}
/**
 *
 * @param dbNum 库号
 * @param key 键
 */
redisDb.get = async (dbNum,key) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        resolve(client.get(key));
    })
}
// ----redis----hash
/**
 *
 * @param dbNum 库号
 * @param key 键
 */
redisDb.hGetAll = async (dbNum,key) => {
     return new Promise(async(resolve,reject)=>{
        client.select(dbNum);
        let result=await client.hGetAll(key);
        for(let item in result){
            try {
                let obj=JSON.parse(result[item]);
                if(typeof obj == 'object' && obj ){
                    result[item]=JSON.parse(result[item])
                }
            } catch(err) {
            } 
        }
        resolve(result);
     })
}
/**
 *
 * @param dbNum 库号
 * @param key 键
 */
 redisDb.hGet = async (dbNum,hash_key,sub_key) => {
    return new Promise((resolve,reject)=>{
       client.select(dbNum);
       let res=client.hGet(hash_key,sub_key);
       resolve(res);
    })
}
redisDb.hMset=async(dbNum,hash_key,obj,expire)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let emmm=[];
        for (var key in obj) {
            emmm.push(key)
            emmm.push(JSON.stringify(obj[key]))
        }
        let cmd=['HMSET',hash_key];
        emmm.unshift.apply(emmm,cmd)
        // emmm.push.apply(emmm,cmd);
        // console.log(cmd)
        let res=client.sendCommand(emmm);
        if(expire){
            client.expire(hash_key,expire);
        }
        resolve(res);
     })
}
redisDb.hMget=async(dbNum,hash_key,sub_arr)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);

        let cmd=['HMGET',hash_key];
        
        let ke=sub_arr;
        ke.unshift.apply(ke,cmd)
        // cmd.concat(sub_arr);
        
        let res=client.sendCommand(ke);
        resolve(res);
     })
}
redisDb.hdel=async(dbNum,hash_key,sub_arr)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let res=client.HDEL(hash_key,sub_arr);
        resolve(res);
     })
}
// redis------list
redisDb.rPush = async (dbNum,key,value) => {
    return new Promise((resolve,reject)=>{
       client.select(dbNum);
       let result=client.rPush(key,value);
       resolve(result);
    })
}
redisDb.lPush = async (dbNum,key,value) => {
    return new Promise((resolve,reject)=>{
       client.select(dbNum);
       let result=client.lPush(key,value);
       resolve(result);
    })
}
redisDb.lrem=async(dbNum,key,range,value)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        
        let result=client.lRem(key,range,value);
        resolve(result);
    })
}
redisDb.llen=async(dbNum,key)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let result=client.lLen(key);
        resolve(result);
    })
}
redisDb.lRange=async(dbNum,key,start,end)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let result=client.lRange(key,start,end);
        resolve(result);
    })
}
redisDb.ltrim=async(dbNum,key,start,end)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let result=client.lTrim(key,start,end);
        resolve(result);
    })
}
// client.sendCommand(['HINCRBY',hash_key,sub_key,value])
redisDb.zAdd =async (dbNum,zset_key, score, value,expire) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let res;
        res = client.sendCommand(['ZADD', zset_key,score ,value])
        // client.ZADD("myzset", 2 ,"two" ,3,"three");
        if(expire){
            client.expire(key,expire);
        }
        resolve(res);
    })
}
redisDb.test =async (dbNum,key, start, end,expire) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let res;
        res = 
        client.lRem(key,'LIMIT',0,10)
        // client.sendCommand(['SORT',key])
        if(expire){
            client.expire(key,expire);
        }
        resolve(res);
    })
}
redisDb.expire = async (dbNum,key,value,expire) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum)
        let res;
        res=client.expire(key,expire);
        resolve(res);
    })
}

// 是否存在
redisDb.exists = async (dbNum,key)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum)
        let res;
        res=client.exists(key);
        resolve(res);
    })
}
// HEXISTS 
redisDb.hexists = async (dbNum, hash_key, sub_key) => {
    return new Promise((resolve, reject) => {
        client.select(dbNum)
        let res;
        res=client.HEXISTS(hash_key,sub_key);
        resolve(res);
    })
}
redisDb.del = async (dbNum, key) => {
    return new Promise((resolve, reject) => {
        client.select(dbNum)
        let res;
        res=client.DEL(key,);
        resolve(res);
    })
}
// 导出
module.exports = {
    redisDb
}