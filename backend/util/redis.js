const { reject } = require('async');
var { redis,defineScript, createClient } = require('redis');
var { REDIS_CONFIG } = require('../config/config.db')
let _user = REDIS_CONFIG.database._user
let _article = REDIS_CONFIG.database._article
var redisDb = {};
var fs = require('fs');
const {sleep} = require('../util/utils');
const { resolve } = require('path');
const Redlock = require("redlock");
// const Redis = require("ioredis");
const options = {
    host: REDIS_CONFIG.host,
    port: REDIS_CONFIG.port,
    password: REDIS_CONFIG.password,
    detect_buffers: REDIS_CONFIG.detect_buffers, // 传入buffer 返回也是buffer 否则会转换成String
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
    },
    scripts: {
        unLock: defineScript({
          NUMBER_OF_KEYS: 1,
          SCRIPT:
            'if redis.call("get",KEYS[1]) == ARGV[1] then return redis.call("del",KEYS[1]) else return 0  end',
          transformArguments(key,value) {
            return [key,value];       
          },
          transformReply(reply) {
            return reply;
          }
        })
      }
}
const Redis = require("ioredis");
// 生成redis的client
// const client = createClient(options);

  const client = new Redis({
    port: REDIS_CONFIG.port, // Redis port
    host: REDIS_CONFIG.host, // Redis host
    // username: "default", // needs Redis >= 6
    password: REDIS_CONFIG.password,
    db: 0, // Defaults to 0
  });;
const redlock = new Redlock(
    // 每个独立的redis节点应该有一个客户端或集群。
    [client], {
    // 预期时钟漂移；有关详细信息，请参阅：
    // http://redis.io/topics/distlock
    driftFactor: 0.01, // 乘以锁定ttl以确定漂移时间
    retryCount: 5, // Redlock尝试锁定资源的最大次数在出错之前。

    // 两次尝试之间的时间（毫秒）
    retryDelay: 200, // 时间（毫秒）

    // 随机添加到重试的最大时间（毫秒）提高高争用情况下的性能
    // see https://www.awsarchitectureblog.com/2015/03/backoff.html
    retryJitter: 200, // 时间（毫秒）

    // 自动延长前锁上的最短剩余时间尝试使用“using”API。
    automaticExtensionThreshold: 500, // 时间（毫秒）
});
redlock.on("error", (error) => {
    // Ignore cases where a resource is explicitly marked as locked on a client.
    if (error) {
      return;
    }
  
    // Log all other errors.
    // console.error(error);
  });
// client.on('error', (err) => console.log('Redis Client Error', err));
// client.on('ready', () => console.log('Redis Client Ready(连接成功)'));
// client.connect();

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
                res=typeof value[item]==='object'?client.hset(key, item, Buffer.from(JSON.stringify(value[item]))):client.hset(key, item, Buffer.from(value[item]));
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
        res=client.hset(hash_key,sub_key,value);
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
        let result=await client.hgetall(key);
        // console.log(result)
        for(let item in result){
            try {
                // console.log(result[item])
                let obj=JSON.parse(result[item]);
                if(typeof obj == 'object' && obj ){
                    result[item]=obj
                }
            } catch(err) {
            } 
        }
        resolve(result);
     })
}
/**
 * 
 * @param {*} dbNum 库号
 * @param {*} hash_key 
 * @param {*} sub_key 
 * @returns null 不存在 
 */
 redisDb.hGet = async (dbNum,hash_key,sub_key) => {
    return new Promise((resolve,reject)=>{
       client.select(dbNum);
       let res=client.hget(hash_key,sub_key);
       resolve(res);
    })
}
redisDb.hMset=async(dbNum,hash_key,obj,expire)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let emmm=[];
        // for (var key in obj) {
        //     emmm.push(key)
        //     emmm.push(JSON.stringify(obj[key]))
        // }
        // let cmd=['HMSET',hash_key];
        // emmm.unshift.apply(emmm,cmd);
        // emmm.push.apply(emmm,cmd);
        // console.log(emmm)
        // let res=client.sendCommand(emmm);
        let res=client.hmset(hash_key,obj)

        if(expire){
            client.expire(hash_key,expire);
        }
        resolve(res);
     })
}
redisDb.hMget=async(dbNum,hash_key,sub_arr)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);

        // let cmd=['HMGET',hash_key];
        
        // let ke=sub_arr;
        // ke.unshift.apply(ke,cmd)
        // cmd.concat(sub_arr);
        // console.log(ke)
        // let res=client.sendCommand(ke);
        // let res=client.hmget(hash_key,'xx')
        resolve(res);
     })
}
redisDb.hdel=async(dbNum,hash_key,sub_arr)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let res=client.hdel(hash_key,sub_arr);
        resolve(res);
     })
}
// redis------list
// 从列表List的右边插入一个元素
redisDb.rPush = async (dbNum,key,value) => {
    return new Promise((resolve,reject)=>{
       client.select(dbNum);
       let result=client.rpush(key,value);
       resolve(result);
    })
}
// 从列表List的最左边插入一个元素
redisDb.lPush = async (dbNum,key,value) => {
    return new Promise((resolve,reject)=>{
       client.select(dbNum);
       let result=client.lpush(key,value);
       resolve(result);
    })
}
redisDb.lrem=async(dbNum,key,range,value)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        
        let result=client.lrem(key,range,value);
        resolve(result);
    })
}
// 打印当前列表List的元素个数
redisDb.llen=async(dbNum,key)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let result=client.llen(key);
        resolve(result);
    })
}
redisDb.lRange=async(dbNum,key,start,end)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let result=client.lrange(key,start,end);
        resolve(result);
    })
}
redisDb.ltrim=async(dbNum,key,start,end)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let result=client.ltrim(key,start,end);
        resolve(result);
    })
}
// client.sendCommand(['HINCRBY',hash_key,sub_key,value])

// ---------zset--------start--------
/**
 * zset有序集合新增
 * @param {*} dbNum 
 * @param {*} zset_key 
 * @param {*} score 
 * @param {*} value 
 * @param {*} expire 
 * @returns 
 */
redisDb.zAdd =async (dbNum,zset_key, params,expire) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        let res;

        // res = client.sendCommand(['ZADD', zset_key,score ,value])
        res = client.zadd(zset_key,...params.map(({ name, score }) => [score, name]));
        if(expire){
            client.expire(zset_key,expire);
        }
        resolve(res);
    })
}
/**
 * 计算zset集合中元素的数量
 * @param {*} dbNum 
 * @param {*} zset_key 
 * @returns 当 key 存在且是有序集类型时，返回有序集的基数。 当 key 不存在时，返回 0 。
 */
redisDb.zard =async (dbNum,zset_key) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        resolve(client.zcard(zset_key));
    })
}

/**
 * 返回有序集中，指定区间内的成员
 * @param {*} dbNum 
 * @param {*} zset_key 
 * @param {*} start 以 0 表示有序集第一个成员，以 1 表示有序集第二个成员，以此类推
 * @param {*} stop 以 -1 表示最后一个成员， -2 表示倒数第二个成员
 * @returns 
 */
redisDb.zrange =async (dbNum,zset_key,start,stop) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        resolve(client.zrange(zset_key,start,stop));
    })
}

/**
 * 通过字典区间返回有序集合的成员。
 * @param {*} dbNum 
 * @param {*} zset_key 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
redisDb.zrangebylex =async (dbNum,zset_key,min,max) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        resolve(client.zrangebylex(zset_key,min,max));
    })
}

/**
 * 返回有序集合中指定分数区间的成员列表。有序集成员按分数值递增(从小到大)次序排列。
 * @param {*} dbNum 
 * @param {*} zset_key 
 * @param {*} min ([
 * @param {*} max 
 * @returns 
 */
redisDb.zrangebyscore =async (dbNum,zset_key,min,max) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        resolve(client.zrangebyscore(zset_key,min,max));
    })
}

/**
 * 移除有序集中的一个或多个成员，不存在的成员将被忽略。
 * @param {*} dbNum 
 * @param {*} zset_key 
 * @param {*} member []多个
 * @returns 被成功移除的成员的数量，不包括被忽略的成员
 */
redisDb.zrem =async (dbNum,zset_key,member) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        resolve(client.zrem(zset_key,member));
    })
}

/**
 * zrevrange
 * @param {*} dbNum 
 * @param {*} zset_key 
 * @param {*} start 
 * @param {*} stop 
 * @returns 
 */
redisDb.zrevrange =async (dbNum,zset_key,start, stop) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        resolve(client.zrevrange(zset_key,start, stop));
    })
}

/**
 * 计算给定的一个或多个有序集的并集，其中给定 key 的数量必须以 numkeys 参数指定，并将该并集(结果集)储存到 destination 
 * @param {*} dbNum 
 * @param {*} zset_key 
 * @param {*} start 
 * @param {*} stop 
 * @returns 保存到 destination 的结果集的成员数量
 */
redisDb.zunionstore =async (dbNum,destination,start, stop) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum);
        resolve(client.zunionstore(destination,start, stop));
    })
}


// ---------zset--------end--------

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

/**
 * 
 * @param {*} dbNum 
 * @param {*} key 
 * @param {*} expire 
 * @param {*} model
 * @returns 操作成功数据的数量
 */
// NX--仅当密钥没有到期时设置到期
// XX--仅当密钥已有到期时间时才设置到期时间
// GT--仅当新到期时间大于当前到期时间时才设置到期时间
// LT--仅当新到期时间小于当前到期时间时才设置到期时间
redisDb.expire = async (dbNum,key,expire,model) => {
    return new Promise((resolve,reject)=>{
        client.select(dbNum)
        let res;
        res =client.expire(key,expire)
        //  model?:client.expire(key,expire);
        resolve(res);
    })
}

// 是否存在1   0
redisDb.exists = async (dbNum,key)=>{
    return new Promise((resolve,reject)=>{
        client.select(dbNum)
        let res;
        res=client.exists(key);
        resolve(res);
    })
}
// HEXISTS 1   0
redisDb.hexists = async (dbNum, hash_key, sub_key) => {
    return new Promise((resolve, reject) => {
        client.select(dbNum)
        let res;
        res=client.hexists(hash_key,sub_key);
        resolve(res);
    })
}
/**
 * 
 * @param {*} dbNum 数据库db
 * @param {*} key 字符串或者数组（多个key）
 * @returns 操作数量
 */
redisDb.del = async (dbNum, key) => {
    return new Promise((resolve, reject) => {
        client.select(dbNum)
        resolve(client.del(key));
    })
}

/**
 * 
 * @param {*} dbNum 
 * @param {*} key 
 * @returns 数组(key)
 */
redisDb.keys = async (dbNum, key) => {
    return new Promise((resolve, reject) => {
        client.select(dbNum)
        resolve(client.keys(key));
    })
}

// 导出
module.exports = {
    redisDb,
    client,
    redlock
}

// redlock  使用
// async function test(key, ttl, client) {
//     try {
//         const lock = await redlock.lock(key, ttl);

//         console.log(client, lock.value);
//         // do something ...
//         await sleep(1113);
//         return lock.unlock();
//     } catch(err) {
//         console.error(client, err.name);
//     }
// }
// test('name1', 10000, 'client1')
// test('name1', 10000, 'client2')