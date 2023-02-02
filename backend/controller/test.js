// 文章相关路由逻辑
// const {Article, User} = require('../model')
const MysqlMethods = require('../util/mysql')
const moment = require('moment')
const { DateSort, DateSortx, getTimeInfo } = require('../util/utils')
let {redisDb,setValue,
    getValue,
    getHValue} = require('../util/redis');
    // const ArtRedis =require("../util/getArticle")
const fs =require('fs')
const { createClient } = require('redis');
const db = require('../model/index')
// const client = createClient();
const User = require('../model/user.js');
const logger = require('../util/logger');
//获取用户关注的作者文章列表
exports.test = async (req, res, next) => {
    try {
        //处理请求
        //     const client = createClient({
        //         port:6379,
        //         host:'127.0.0.1',
        //         password:'570818'
        //     });
        //     client.on('error', (err) => console.log('Redis Client Error', err));
        //     await client.connect();
        //     await client.set('name', '王浩33');
        //     const value = await client.get('name');
        //   console.log(value)
        //   })();
        let result =[11]
        // ---------------key----value存------------
        // await redisDb.set('1', "student", {name:"小花",age:'36',study:{shuxue:'1122',yuwen:'666'}}).then((res)=>{
        //     console.log(res)
        //     result=res
                
        // });
        // await redisDb.set('0', "student","嘿嘿").then(res=>{
        //      result=res
        // })
        // ---------------------取
        // await redisDb.get('0', "name").then((res)=>{
        //     result = res;
        // });
        // let xx={
        //     "id": 41,
        //     "member_id": 3,
        //     "title": "P789-5月火凤凰打赏系统/视频打赏/影视知识付费/全新升级版2.0版本/超级防封/服务器打包运营版",
        //     "litpic": "/static/upload/2021/05/16/202105167324.png",
        //     "description": "界面整洁，ui全新设计 一改以往底层概念，让运营者更安全、更稳定、更方便，带包天包月包年，代理，以及多种支付系统",
        //     "keywords": "P789-5月火凤凰打赏系统/视频打赏/影视知识付费/全新升级版2.0版本/超级防封/服务器打包运营版",
        //     "seo_title": "P789-5月火凤凰打赏系统/视频打赏/影视知识付费/全新升级版2.0版本/超级防封/服务器打包运营版",
        //     "hits": 81,
        //     "tid": 1,
        //     "addtime": "2021-05-16"
        //   }
        // await redisDb.hSet('0', "allarts",41,JSON.stringify(xx)).then((res)=>{
        //     result = res;
        // });
        // await redisDb.test('0', "artLists").then((res)=>{
        //     console.log(res)
        //     // for(let i in res){
        //     //     result[i]=res[i]
        //     // }
        //     result=res
                
        // });
        // await redisDb.rPush('0','k1','v1')
        // await ArtRedis.isAllIdArts('0','allArtsList',0,1).then((res)=>{
        //     result=res;
        // })
        // await ArtRedis.getArtsList('0','allarts',['53','5']).then((res)=>{
        //     result=res;
        // })
        // ---------------------------
        // let xx=[ '44', '42', '41' ]
        // await redisDb.hMget('0','artLists',xx).then((res)=>{
        //     result=res;
        //     for(let i=0;i<result.length;i++){
        //         console.log(result[i])
        //         if(result[i]==null){
        //             console.log(xx[i+2])
        //         }
        //     }
        // })
        // ------------------------
        // await redisDb.hMset('0','members',{77:{"id":77},66:{"id":66}}).then((res)=>{
        //     result=res;
            
        // })
        // -----------------------
        // await redisDb.exists('0','artLists').then((res)=>{
        //         result=res;
        //     })
// -----------------------
// await redisDb.llen('0', 'allIdArtsList').then(res => {//取出指定范围文章id列表
//     result = res;
// })
// await redisDb.lRange('0', 'allIdArtsList', 0, 2).then(res => {//取出指定范围文章id列表
//     result = res;
// })
// -------------------------
// let xx=[ '233', '234' ]
// await redisDb.hdel('0','artLists',xx).then((res)=>{
//     result=res;
// })
// ---------------------
let xx=[ '3','3'  ]
// await redisDb.hexists('0','members',xx[0]).then((res)=>{
//     result=res
// })
//  let resultv=await MysqlMethods.xx('INSERT INTO lz_member  (id,username) values (?,?)',['223','wang']).then(res=>{
//     console.log(res);
//     result =res
// })
// knex 查询
let params={
    fileld:"*",
    options:{
        "user_id":40
    }
}
// {
//     field:['id','username','sex','litpic','email','password'],
//     options:{
//         // id:'22',
//         username:'wang'
//     }
// }
// result=await User.select(params,{name:'user_regtime',order:'desc'})

// const knex = require('../model/knex');
// knex  新增
// result= knex.select().from('lz_users')
// knex.select().from("lz_users").where({user_id:"40"})
// const ppp=await User.insert({user_name:'ccc',user_pwd:'00000000'})
// console.log(ppp==null)
// await MysqlMethods.select('*', 'lz_member', `where id ="22"`)
// console.log(result)
// result=req.headers["user-agent"]
// fs.readFile('./logs/2023/01/2023-01-09.log.1.gz','utf8',function(err,dataStr){
// 	// console.log(err);//打印失败的结果
// 	console.log('-------222----');
// 	console.log(dataStr);//打印成功的结果
// })
// const {aaaa} = require("../util/utiltest")
// aaaa()
// result=formatNowDate("yyyy")
// const logger=require("../util/logger")
// logger.clear();
// console.log(process.env.NODE_ENV)
// 删除文件夹、文件
// fs.rmdirSync("./logs/2023/01", { recursive: true })
// const logger = require("../util/logger")
// logger.errorxx("xxxxxxxxx",res,req)
// const jwt =require('jsonwebtoken')
// const {jwtConfig} =require('../config/config.jwt')
// const {verify} = require('../util/jwt');

// await verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVdWlkIjoiMTQwIiwiVXNlclR5cGUiOiJHZW5lcmFsIiwiVXNlckFnZW50IjoiUG9zdG1hblJ1bnRpbWUvNy4yOS4wIiwiSXAiOiIxMjcuMC4wLjEiLCJpYXQiOjE2NzQ2MjY2ODksImV4cCI6MTY3NDYyODQ4OX0.g5ANTF06cR4FZ-kvb3kZ70GuDwAKByRZKpeFHNFoG4s',jwtConfig.jwtAccessSecret).then((xx)=>{
//     // token未过期
//     console.log(xx)
//   }).catch(err=>{ // token 过期
//       console.log(err)
//   })
const  Article  = require('../model/article.js')
// const User = require('../model/user.js');
// await User.all().then(res=>{
//         console.log(res)
//         result =res
//     })
// let rr = {
//     fileld:'*',
//     options:{
//         art_id:'98'
//     }
// }
// await Article.all('desc').then(res=>{
//     console.log(res)
//     result =res
// })

// const uniqid = require('uniqid');
const {client,redisDb,redlock} = require("../util/redis")
const uuidv1 = require('uuid/v1');
// 
// const RedisLock = require('../util/RedisLock')
const {sleep} = require('../util/utils')


//  console.log('client:'+client)

// console.log('client1:'+client1)
// const {QueryMysqlUserInfos} = require('../util/User')
// async function test(key, ttl, client) {
//     // try {
//         const lock = await redlock.lock(key, ttl,(err,result)=>{
//             //  lock = 
//             // console.log(result)
//             err == null ? console.log(111):console.log(333)
//         });

//         // console.log(client, lock.value);
//         // lock.value==null ? console.log(111) : console.log(22222)
//         // do something ...
//         await sleep(3000);
//         return lock.unlock();
//     // } catch(err) {
//     //     err ? console.log(33) : console.log(44)
//     //     // console.error(client, err.name);
//     // }
// }
// result= await QueryMysqlUserInfos('wang')

// test('name1', 10000, 'client1')
// test('name1', 10000, 'client2')
// result = await redisDb.lock();

// result = await redisDb.redlock(0,'categorys')
// result = await redisDb.hGetAll(0,'categorys')
// test('name1', 10000, 'client1');'UsersInfo','90'
// await sleep(200)
// test('name1', 10000, 'client2');
// await redisDb.hGet(0,)



        res.status(200).json({
            code:200,
            status:result
        })
    } catch (err) {
        console.log(err)
        next()
    }
}