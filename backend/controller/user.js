// const {User} = require('../model')
// const jwt = require('../util/jwt');
const {verify} = require('../util/jwt')
const {jwtAccessSecret,jwtRefreshSecret} = require('../config/config.default')
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
const {generateReToken, generateAcToken, existsReToken} = require('../util/generateRoken')

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
        let status = 0; // 0失败 1成功 2服务器未知错误
        let access_token;
        let refresh_token;
        // 在数据验证时已判断核对信息，这里直接继续往下
        let SourceInfoJson = {
            Uuid: req.user.user_id, 
            UserType: 'General',
            UserAgent:req.headers["user-agent"],
            Ip: req.ip
        }

        // 生成token
        await generateReToken(SourceInfoJson, 60 * 60 * 24 * 7).then(res=>{
            refresh_token = res;
            status = 1;
        }).catch(err=>{
            status = 2;
        });
        await generateAcToken(SourceInfoJson, 60 * 30).then(res=>{
            access_token = res;
            status = 1;
        }).catch(err=>{
            status = 2;
        });
        // console.log("access_token1 "+access_token)
        // console.log("refresh_token1 "+refresh_token)

        // 确保只发放一条有效 refresh_token
        redisDb.keys(1,`${req.user.user_id}#*`).then(answerKeys=>{
            // 判断是否存在有效 refresh_token
            answerKeys.length !== 0 ? redisDb.del(1, answerKeys) : ''
        })
        // redis缓存用户信息(refresh_token)JSON.stringify()
        await redisDb.hMset(1,`${req.user.user_id}#${refresh_token}`,{...SourceInfoJson,access_token},60*60*24*30).then(res=>{
            if(res == 'OK' && status !== 2){
                status = 1;
            }else{
                status = 0;
            }
            
        });
        // 发送响应(包含token的用户信息)UsersToken
        if(status == 1){
            res.status(200).json({
                code: 20000,
                success: true,
                message: '用户登录成功',
                refresh_token,
                access_token
            })
        }else{
            res.status(200).json({
                code:40000,
                success: false,
                message:'用户登录失败'
            })
        }
    }catch (err){
        logger.reprocess_error("Account login failed ("+err.message+")",res,req)
        next(new Error(`账号登录失败 - `+err))
        // next(err)
    }
}

// 刷新token
exports.token = async (req, res, next) => {
    try{
        //处理请求
        let refreshStatus = 0; // refresh_token状态: 0失效  1有效
        let status = 0; // 0失败 1成功 2服务器未知错误
        let access_token;
        let refresh_token;
        let Uuid;

        await verify(req.body.refresh_token,jwtRefreshSecret).then((xx)=>{
              // token未过期
                Uuid = xx.Uuid
                refreshStatus = 1;
            }).catch(err=>{ // token 过期
                // console.log(err)
                refreshStatus = 0;
            })
        refreshStatus == 1 ? await existsReToken(`${Uuid}#${req.body.refresh_token}`).then(res => {
                res ? refreshStatus = 1 : refreshStatus = 0;
        }) : ''

        if(refreshStatus == 1){
            let SourceInfoJson = {
                Uuid: Uuid, 
                UserType: 'General',
                UserAgent:req.headers["user-agent"],
                Ip: req.ip
            }
            // 删除旧refresh_token  （有效）
            await redisDb.del(1,req.body.refresh_token);
            
            // 生成token
            await generateReToken(SourceInfoJson,200000000).then(res=>{
                refresh_token = res;
                status = 1;
            }).catch(err=>{
                status = 2;
            });
            await generateAcToken(SourceInfoJson).then(res=>{
                access_token = res;
                status = 1;
            }).catch(err=>{
                status = 2;
            });
            // redis缓存用户信息(refresh_token)JSON.stringify()
            await redisDb.hMset(1,refresh_token,{...SourceInfoJson,access_token},60*60*24*30).then(res=>{
                if(res == 'OK' && status !== 2){
                    status = 1;
                }else{
                    status = 0;
                }
                
            });
        }
        if(status == 1){
            res.status(200).json({
                code:20000,
                success: true,
                message:'token刷新成功',
                access_token: access_token,
                refresh_token: refresh_token
            })
        }else{
            res.status(200).json({
                code:40000,
                success: false,
                message:'token刷新失败，请重新登录!!!'
            })
        }

        
    }catch (err){
        logger.reprocess_error("Refresh failed ("+err.message+")",res,req)
        next(new Error(`token刷新失败 - `+err))
        // next(err)
    }
}

//获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
    try{
        //处理请求
        let userInfo = {};
        // console.log(req.user)
        redisDb.hGet(0,'UsersInfo',req.user.user_id).then(userInfos=>{
            // console.log(userInfos)
        }).catch(err => {
            // console.log(err)
        })

        await User.select({fileld:"*",options:{"user_id":req.user.user_id}},{name:'user_regtime',order:'desc'}).then(res=>{
            res.length !== 0 ? userInfo = res[0] : '';
        })
        delete userInfo.user_pwd;
        JSON.stringify(userInfo) !== "{}" ? redisDb.hSet(0,'UsersInfo',userInfo.user_id,JSON.stringify(userInfo)) : '';

        res.status(200).json({
            ...userInfo
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