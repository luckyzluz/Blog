// const {User} = require('../model')
// const jwt = require('../util/jwt');
const {verify} = require('../util/jwt');
const {jwtAccessSecret,jwtRefreshSecret} = require('../config/config.default');
// const MysqlMethods = require('../util/mysql');
const md5 = require('../util/md5');
// const moment = require('moment');
// const {createSixNum} = require('../util/utils');
// const nodemail =require('../util/nodemailer');

const {redisDb} = require('../util/redis');
const logger =require("../util/logger");
const User = require('../model/user.js');
// ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}"
const {EmailVerifyConfig} = require('../config/config.email');
const {generateReToken, generateAcToken, existsReToken} = require('../util/token');
const { REDIS_CONFIG, mysqlUserKey } = require("../config/config.db");

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
        let Status = 0; // 注册状态 0：注册失败 1：注册成功  2：验证码验证失败 3:未发送验证码 4：验证成功
        let CodeStatus = 0; // 验证码验证状态 0:验证失败  1：验证成功  2：未发送验证码
        let results = []; //数据库操作返回值
        // delete user.code
        // 前端数据处理
        user[mysqlUserKey.name] = req.body.user.username;
        user[mysqlUserKey.email] = req.body.user.email;
        user[mysqlUserKey.password] = md5(req.body.user.password);
        user[mysqlUserKey.regtime] = new Date().getTime(); // 当前时间
        user[mysqlUserKey.ip] = req.ip;

        if(EmailVerifyConfig.isEmailVerify){ // 是否启用邮箱验证
            await redisDb.get(REDIS_CONFIG.database._user, req.body.user.email).then(res => {
                // res == null ? Status = 3 : res == req.body.user.code ? CodeStatus = 1 : Status = 2;
                res == null ? Status = 3 : res == req.body.user.code ? Status = 4 : Status = 2;
            })
            // console.log(CodeStatus)
            // CodeStatus == 1
            if(Status == 4){ // 验证成功
                results = await User.insert(user);
                results.length > 0 ? Status = 1 : Status = 0;
            }
        }else{
            results = await User.insert(user);
            results.length > 0 ? Status = 1 : Status = 0;
            // 这里虽然没有开启邮箱验证，但为了下面判断是否进行缓存，判定验证码验证成功
            // CodeStatus = 1;
        }
        // redis缓存(这里只要mysql写入成功即可，redis失败无所谓(读时redis不存在则取mysql，进行缓存))
        // results.length > 0 && CodeStatus == 1
        if(Status == 1){ // mysql插入成功，且验证码验证成功（没开启不要紧）
            // 查询新增用户id
            let knexSelectParams = {
                field: "*",
                options: {}
            }
            knexSelectParams.options[mysqlUserKey.id] = results[0];
            
            user = await User.select(knexSelectParams);
            delete user[0].user_pwd;

            // 开始redis写入

            await redisDb.hSet(REDIS_CONFIG.database._user, 'UsersInfo', results[0], JSON.stringify(user[0]));

            await redisDb.hSet(REDIS_CONFIG.database._user, 'Username.to.id', user[0].user_name, user[0].user_id);

            await redisDb.hSet(REDIS_CONFIG.database._user, 'Email.to.id', user[0].user_email, user[0].user_id);

            // 如果开启了验证码，注册成功后删除验证码
            await redisDb.del(REDIS_CONFIG.database._user, user[0].user_email);
        }
        // affectedRows
        // console.log(Status,CodeStatus)
        // && CodeStatus == 1
        if(Status == 1){
            res.status(200).json({
                code: 20000,
                success: true,
                message: "用户注册成功"
            })
        }else if(Status == 3){ // CodeStatus == 2 || Status == 3
            res.send({
                code: 40000,
                success: false,
                message: "请先发送验证码"
            })
        }else if(Status == 2){ // CodeStatus == 0
            res.send({
                code: 40000,
                success: false,
                message: "验证码错误"
            })
        }else{
            res.send({
                code: 40000,
                success: false,
                message: "用户注册失败"
            })
        }
        
        
    }catch (err){
        logger.reprocess_error("Account registration failed ("+err.message+")", res, req);
        next(new Error(`账号注册失败`+err));
        // next(err)
    }
}

//用户登录
exports.login = async (req, res, next) => {
    try{
        let status = 0; // 0失败 1成功 2服务器未知错误
        let access_token;
        let refresh_token;
        // 在数据验证模块(validator)已核对信息，这里直接继续往下
        let SourceInfoJson = {
            Uuid: req.user.user_id, 
            UserType: 'General',
            UserAgent:req.headers["user-agent"],
            Ip: req.ip
        }

        // 生成token
        await generateReToken(SourceInfoJson).then(res=>{
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
        // console.log("access_token1 "+access_token)
        // console.log("refresh_token1 "+refresh_token)

        // 确保只发放一条有效 refresh_token
        redisDb.keys(REDIS_CONFIG.database._user,`Token-${req.user.user_id}#*`).then(answerKeys=>{
            // 判断是否存在有效 refresh_token
            answerKeys.length !== 0 ? redisDb.del(REDIS_CONFIG.database._user, answerKeys) : '';
        })
        // redis缓存用户信息(refresh_token)JSON.stringify()
        await redisDb.hMset(REDIS_CONFIG.database._user,`Token-${req.user.user_id}#${refresh_token}`,{...SourceInfoJson,access_token},60*60*24*30).then(res=>{
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
        let refreshStatus = 0; // 已发放refresh_token状态: 0失效  1有效
        let status = 0; // 0失败 1成功 2服务器未知错误
        let access_token;
        let refresh_token;
        let Uuid; // 用户标识id

        await verify(req.body.refresh_token,jwtRefreshSecret).then((xx)=>{
              // token未过期
                Uuid = xx.Uuid
                refreshStatus = 1;
            }).catch(err=>{ // token 过期
                // console.log(err)
                refreshStatus = 0;
            })
        refreshStatus == 1 ? await existsReToken(`Token-${Uuid}#${req.body.refresh_token}`).then(res => { // 判断是否已作废（是否存在）
                res ? refreshStatus = 1 : refreshStatus = 0;
        }) : ''

        if(refreshStatus == 1){ // 存在redis
            let SourceInfoJson = {
                Uuid: Uuid, 
                UserType: 'General',
                UserAgent:req.headers["user-agent"],
                Ip: req.ip
            }
            // 删除旧refresh_token  （有效）
            // await redisDb.del(1,`${Uuid}#${req.body.refresh_token}`);
            // 确保只发放一条有效 refresh_token
            await redisDb.del(REDIS_CONFIG.database._user, `Token-${Uuid}#${req.body.refresh_token}`);
            // redisDb.keys(REDIS_CONFIG.database._user, `Token-${Uuid}#*`).then(answerKeys => {
            //     // 判断是否存在有效 refresh_token
            //     answerKeys.length !== 0 ? redisDb.del(REDIS_CONFIG.database._user, answerKeys) : ''
            // })
            // 生成token
            await generateReToken(SourceInfoJson).then(res=>{
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
            await redisDb.hMset(REDIS_CONFIG.database._user, `Token-${Uuid}#${refresh_token}`, {...SourceInfoJson,access_token}, 60*60*24*30).then(res => {
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

        // 查询redis
        await redisDb.hGet(REDIS_CONFIG.database._user, 'UsersInfo', req.user.user_id).then(userInfos => {
            userInfos !== null ? userInfo = JSON.parse(userInfos) : '';
        })

        // redis数据不存在
        JSON.stringify(userInfo) == "{}" ? await User.select({field:"*", options: {"user_id": req.user.user_id}}).then(res => {
            res.length !== 0 ? userInfo = res[0] : '';
        }) : '';
        delete userInfo.user_pwd;

        // 判断用户信息是否获取成功
        if(JSON.stringify(userInfo) !== "{}"){ // 用户信息获取成功(mysql查询数据成功)
            await redisDb.hSet(REDIS_CONFIG.database._user, 'UsersInfo', userInfo.user_id, JSON.stringify(userInfo));
            await redisDb.hSet(REDIS_CONFIG.database._user, 'Username.to.id', userInfo.user_name, userInfo.user_id);
            await redisDb.hSet(REDIS_CONFIG.database._user, 'Email.to.id', userInfo.user_email, userInfo.user_id);

            res.status(200).json({
                code: 20000,
                success: true,
                message: '查询成功',
                data: { ...userInfo }
            })
        }else{
            res.status(200).json({
                code: 41000,
                success: false,
                message: '查询失败'
            })
        } 
    }catch (err){
        logger.reprocess_error("Failed to get the current user information ("+err.message+")",res,req);
        next(new Error(`获取当前用户信息失败 - `+err));
        // next(err)
    }
}

//更新当前登录用户
exports.updateCurrentUser = async (req, res, next) => {
    try{
        // 有哪些参数要被修改，如何确保username  email  id  删除
        
        //处理请求
        // console.log(req.user)
        let message="更新失败";
        let user;
        let updateUserInfo = {}; // 需要更新的用户信息
        let results = 0; //mysql数据库更新状态 0 不成功 1成功
        delete req.body.user.id; // 禁止修改用户唯一标识
        req.body.user.username !== undefined ? updateUserInfo[mysqlUserKey.name] = req.body.user.username : '';
        req.body.user.email !== undefined ? updateUserInfo[mysqlUserKey.email] = req.body.user.email : '';
        
        JSON.stringify(updateUserInfo) !== "{}" ? await User.update(req.user.user_id, updateUserInfo).then(updateResult => {
            results = updateResult;
        }) : '';
// console.log(results)
        if(results == 1){ // 数据库更新数据成功
            await redisDb.hdel(REDIS_CONFIG.database._user, 'UsersInfo', req.user[mysqlUserKey.id]);
            await redisDb.hdel(REDIS_CONFIG.database._user, 'Username.to.id', req.user[mysqlUserKey.name]);
            await redisDb.hdel(REDIS_CONFIG.database._user, 'Email.to.id', req.user[mysqlUserKey.email]);

            let mysqlSelectParams = {
                field: "*", 
                options: {}
            }
            mysqlSelectParams.options[mysqlUserKey.id] = req.user.user_id;
            await User.select(mysqlSelectParams).then(userInfos => {                
                user = userInfos[0];
            })
            delete user.user_pwd;
            req.user = user;
            // console.log(req.user)
            // 写入redis
            await redisDb.hSet(REDIS_CONFIG.database._user,'UsersInfo', req.user.user_id, JSON.stringify(user)).then(writeResult => {
                writeResult==1? message='更新成功' : '';
            })
            await redisDb.hSet(REDIS_CONFIG.database._user, 'Username.to.id', user.user_name, user.user_id);
            await redisDb.hSet(REDIS_CONFIG.database._user, 'Email.to.id', user.user_email, user.user_id);
        }
        // res.send('updateCurrentUser')
        if(results == 1 && message == '更新成功'){
            res.status(200).json({
                code: 20000,
                success: true,
                message,
                data: user
            })
        }else{
            res.status(200).json({
                code: 50000,
                success: false,
                message
            })
        }
    }catch (err){
        logger.reprocess_error("Current user information update failed ("+err.message+")",res,req);
        next(new Error(`当前用户信息更新失败 - `+err));
        // next(err)
    }
}

// 修改密码
exports.updatepasswordUser =async (req, res, next) => {
    try{
        // console.log(req.body.password)
        let updateStatus = 0; // 更新状态 0失败  1成功

        await User.update(req.user.user_id,{user_pwd:md5(req.body.password)}).then(updateResult => {
            updateResult == 1 ? updateStatus = 1 : '';
        })

        if(updateStatus == 1){
            // 确保只发放一条有效 refresh_token
            redisDb.keys(REDIS_CONFIG.database._user, `${req.user.user_id}#*`).then(answerKeys=>{
                // 判断是否存在有效 refresh_token
                answerKeys.length !== 0 ? redisDb.del(REDIS_CONFIG.database._user, answerKeys) : ''
            })
            res.status(200).json({
                code: 20000,
                success: true,
                message: '用户密码更新成功'
            })
        }else{
            res.status(200).json({
                code: 50000,
                success: false,
                message: '用户密码更新失败'
            })
        }
    }catch(err){
        logger.reprocess_error("Current user password update failed ("+err.message+")",res,req);
        next(new Error(`当前用户密码更新失败 - `+err));
        // next(err)
    }
}

// 注销账号
exports.delCurrentUser = async (req, res, next) =>{
    try{
        // console.log(req.user.user_id);
        let delStatus = 0; // 删除状态  0： 不成功  1： 成功
        // 先删除redis
        await redisDb.hdel(REDIS_CONFIG.database._user, 'UsersInfo', req.user[mysqlUserKey.id]);
        await redisDb.hdel(REDIS_CONFIG.database._user, 'Username.to.id', req.user[mysqlUserKey.name]);
        await redisDb.hdel(REDIS_CONFIG.database._user, 'Email.to.id', req.user[mysqlUserKey.email]);

        // 删除发放的token
        await redisDb.keys(REDIS_CONFIG.database._user, `Token-${req.user.user_id}#*`).then(answerKeys => {
            answerKeys.length !== 0 ? redisDb.del(REDIS_CONFIG.database._user, answerKeys) : '';
        })
        
        // 删除mysql数据
        // console.log(req.user);
        await User.delete(req.user[mysqlUserKey.id]).then(res => {
            res > 0 ? delStatus = 1 : delStatus = 0;
        })
        switch(delStatus){
            case 1:
                res.status(200).json({
                    code:20000,
                    success: true,
                    message: "账号注销成功"
                })
                break;
            case 0:
                res.status(200).json({
                    code:40000,
                    success: false,
                    message: "账号注销失败"
                })
                break;
            default:
                res.status(200).json({
                    code:40000,
                    success: false,
                    message: "账号注销失败"
                })
        }
        
    }catch(err){
        logger.reprocess_error("Current user logout failed ("+err.message+")",res,req);
        next(new Error(`当前用户注销失败 - `+err));
        // next(err)
    }
}