// const {User} = require('../model')
const jwt = require('../util/jwt');
const { jwtAccessSecret, jwtRefreshSecret } = require('../config/config.default');
const MysqlMethods = require('../util/mysql');
const md5 = require('../util/md5');
const moment = require('moment');
const {createSixNum} = require('../util/utils');
const nodemail =require('../util/nodemailer');

const {redisDb} = require('../util/redis');
const { redisConfig } = require('../config/config.default');
const logger =require("../util/logger")
const User = require('../model/user.js');
let isEmailcode=1;
// ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}"
const {EmailVerifyConfig} = require('../config/config.default');
// let isEmailVerify=false;// 是否启用邮箱验证码


/**
 * 用户注册
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 */
exports.register = async (req, res, next) => {
    try{
        let user = {};  // 前端数据
        let Status=0; // 注册状态 0：注册失败 1：注册成功  2：验证码失败 3:未发送验证码
        let CodeStatus=0; // 验证码验证状态 0:验证失败  1：验证成功  2：未发送验证码
        let results=[]; //数据库操作返回值
            // let results = await MysqlMethods.insert('lz_users',['username','password','email','regtime'],[`"${user.username}"`,`"${md5(user.password)}"`,`"${user.email}"`,`"${new Date()}"`])
            // delete user.code
            // 前端数据处理
            user.user_name = req.body.user.username;
            user.user_email = req.body.user.email;
            user.user_pwd = md5(req.body.user.password);
            user.user_regtime=new Date().getTime(); // 当前时间
            user.user_ip=req.ip;

        if(EmailVerifyConfig.isEmailVerify){ // 是否启用邮箱验证
            await redisDb.get("0",req.body.user.email).then(res => {
                res==null?Status=3:res==req.body.user.code?CodeStatus=1:Status=2;
            })
            // console.log(CodeStatus)
            if(CodeStatus==1){ // 验证成功
                results = await User.insert(user);
                results.length>0?Status=1:Status=0;
            }
        }else{
            results = await User.insert(user);
            results.length>0?Status=1:Status=0;

            // 这里虽然没有开启邮箱验证，但为了下面判断是否进行缓存
            CodeStatus=1;
        }
        // console.log(results)
            // redis缓存(这里只要mysql写入成功即可，redis失败无所谓(读时redis不存在则取mysql，进行缓存))
            if(redisConfig.isRedis && results.length>0&&CodeStatus==1){ // mysql插入成功,且缓存开启
                // 查询新增用户id
                user =await User.select({fileld:"*",options:{"user_id":results[0]}},{name:'user_regtime',order:'desc'})
                delete user[0].user_pwd;

                // 开始redis写入
                let redisResult = 0;
                await redisDb.hSet(0,'Users',results[0],JSON.stringify(user))
                // .then(res=>{
                //     redisResult=res+redisResult
                // })
                await redisDb.hSet(0,'Username.to.id',user[0].user_name,user[0].user_id)
                // .then(res=>{
                //     redisResult=res+redisResult
                // })
                await redisDb.hSet(0,'Email.to.id',user[0].user_email,user[0].user_id)
                // .then(res=>{
                //     redisResult=res+redisResult
                // })
            }
            // affectedRows
            // console.log(Status,CodeStatus)
            if(Status==1&&CodeStatus==1){
                res.status(200).json({
                    code:20000,
                    message:"用户注册成功"
                })
            }else if(CodeStatus==2 || Status==3){
                res.send({
                    code:40000,
                    message:"请先发送验证码"
                })
            }else if(CodeStatus==0){
                res.send({
                    code:40000,
                    message:"验证码错误"
                })
            }else{
                res.send({
                    code:40000,
                    message:"用户注册失败"
                })
            }
        
        
    }catch (err){
        logger.reprocess_error("Account registration failed ("+err.message+")",res,req)
        next(new Error(`账号注册失败`))
        // next(err)
    }
}

//用户登录
exports.login = async (req, res, next) => {
    try{
        const user = req.user
        //1.数据验证,在数据检验中已经顺带判断
        // console.log(user)
        // //2.生成token
        const refresh_token= await jwt.sign({
            Id:user.user_id, // userId
            UserAgent:req.headers["user-agent"],
            Ip:req.ip
        },jwtRefreshSecret,{
            expiresIn: 60 * 60 * 24*30//设置jwt过期时间(一天 :60 * 60 * 24)
        })
        const access_token = await jwt.sign({
            Id:user.user_id, // userId
            UserAgent:req.headers["user-agent"],
            Ip:req.ip
        },jwtAccessSecret,{
            expiresIn: 6//设置jwt过期时间(一天 :60 * 60 * 24)
        })
        // console.log("access_token1 "+access_token)
    // console.log("refresh_token1 "+refresh_token)

        // // delete user[0].user_pwd

        // redis缓存用户信息JSON.stringify(user)
        await redisDb.hSet(1,'UsersRefreshToken',refresh_token,user.user_id);

        // //3.发送成功响应(包含token的用户信息)UsersToken
        res.status(200).json({
            code:200,
            message:'用户登录成功',
            refresh_token,
            access_token
        })
    }catch (err){
        logger.reprocess_error("Account login failed ("+err.message+")",res,req)
        next(new Error(`账号登录失败 - `+err))
        // next(err)
    }
}

exports.refresh = async (req, res, next) => {
    try{
        //处理请求
        console.log(req.headers.refresh_token)
        const access_token = await jwt.sign({
            Id:req.user.user_id, // userId
            UserAgent:req.headers["user-agent"],
            Ip:req.ip
        },jwtAccessSecret,{
            expiresIn: 6//设置jwt过期时间(一天 :60 * 60 * 24)
        })
        res.status(200).json({
            access_token:access_token,
            refresh_token:''
        })
    }catch (err){
        next(err)
    }
}

////获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
    try{
        //处理请求
        res.status(200).json({
            user:req.user
        })
    }catch (err){
        next(err)
    }
}

//更新当前登录用户
exports.updateCurrentUser = async (req, res, next) => {
    try{
        //处理请求
        // console.log(req.user[0].id)
        let msg="更新失败";
        let results=await User.update(req.user[0].id,req.body.user)
        if(results==1){
            await redisDb.hdel(0,'members',req.user[0].id);
            const user = await User.select({options:{id:req.user[0].id}})
            await redisDb.hSet(0,'members',req.user[0].id,JSON.stringify(user))
            msg='更新成功'
        }
        // res.send('updateCurrentUser')
        res.status(200).json({
            code:200,
            msg
        })
    }catch (err){
        next(err)
    }
}

// 修改密码
exports.updatepasswordUser =async (req, res, next) =>{
    try{
        let password ={
            password:md5(req.body.user.password)
        }
        let results=await User.update(req.user[0].id,password)
res.status(200).json({
    res:req.user
})
    }catch(err){
        next(err)
    }
}