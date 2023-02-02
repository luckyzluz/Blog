// const {User} = require('../model')
// const jwt = require('../util/jwt');
const {verify} = require('../util/jwt');
const { jwtConfig } = require('../config/config.jwt');
// const MysqlMethods = require('../util/mysql');
const md5 = require('../util/md5');
// const moment = require('moment');
// const {createSixNum} = require('../util/utils');
// const nodemail =require('../util/nodemailer');
const { ReTokenExpiresIn } = require('../config/config.jwt');
const {redisDb} = require('../util/redis');
const logger =require("../util/logger");
const User = require('../model/user.js');
// ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}"
const {EmailVerifyConfig} = require('../config/config.email');
const {generateReToken, generateAcToken, existsReToken} = require('../util/token');
const { REDIS_CONFIG, mysqlUserKey } = require("../config/config.db");
const{ QueryMysqlUserInfos, CachingRedisUserInfos, QueryUserInfos,ClearCacheRedisUserInfos } = require('../util/User');
const Knex = require('../model/knex');
const { sleep } = require('../util/utils');
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

        if(EmailVerifyConfig.isEmailVerify.register){ // 是否启用邮箱验证
            await redisDb.get(REDIS_CONFIG.database._user, `RegisterVerifyCode:${req.body.user.email}`).then(res => {
                res == null ? Status = 3 : res == req.body.user.code ? Status = 4 : Status = 2;
            })
            if(Status == 4){ // 验证成功
                // 如果开启了验证码，注册成功后删除验证码
                await redisDb.del(REDIS_CONFIG.database._user, `RegisterVerifyCode:${user[0].user_email}`);
                results = await Knex(mysqlUserKey.table).insert(user);
                results.length > 0 ? Status = 1 : Status = 0;
            }
        }else{
            results = await Knex(mysqlUserKey.table).insert(user);
            results.length > 0 ? Status = 1 : Status = 0;
        }
        // redis缓存(这里只要mysql写入成功即可，redis失败无所谓(读时redis不存在则取mysql，进行缓存))
        if(Status == 1){ // mysql插入成功，且验证码验证成功（没开启不要紧）
            // 查询新增用户id
            let knexSelectParams = {}
            knexSelectParams[mysqlUserKey.id] = results[0];
            
            user = await QueryMysqlUserInfos(knexSelectParams)
            delete user[0].user_pwd;

            // 开始redis写入
            await CachingRedisUserInfos(user);
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
            Uuid: req.user[mysqlUserKey.id], 
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
        redisDb.keys(REDIS_CONFIG.database._user,`Token:${req.user[mysqlUserKey.id]}#*`).then(answerKeys=>{
            // 判断是否存在有效 refresh_token
            answerKeys.length !== 0 ? redisDb.del(REDIS_CONFIG.database._user, answerKeys) : '';
        })
        // redis缓存用户信息(refresh_token)JSON.stringify()
        await redisDb.hMset(REDIS_CONFIG.database._user,`Token:${req.user[mysqlUserKey.id]}#${refresh_token}`,{...SourceInfoJson,access_token}, ReTokenExpiresIn).then(res => {
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

        await verify(req.body.refresh_token,jwtConfig.jwtRefreshSecret).then((xx)=>{
              // token未过期
                Uuid = xx.Uuid
                refreshStatus = 1;
            }).catch(err=>{ // token 过期
                // console.log(err)
                refreshStatus = 0;
            })
        refreshStatus == 1 ? await existsReToken(`Token:${Uuid}#${req.body.refresh_token}`).then(res => { // 判断是否已作废（是否存在）
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
            // 确保只发放一条有效 refresh_token
            await redisDb.del(REDIS_CONFIG.database._user, `Token:${Uuid}#${req.body.refresh_token}`);

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
            await redisDb.hMset(REDIS_CONFIG.database._user, `Token:${Uuid}#${refresh_token}`, {...SourceInfoJson,access_token}, ReTokenExpiresIn).then(res => {
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
        let userInfo = [];
        // console.log(req.user)
        if(req.user[mysqlUserKey.id]){
            let mysqlSelectParams = {};
            mysqlSelectParams[mysqlUserKey.id] = req.user[mysqlUserKey.id];
            userInfo = await QueryUserInfos(mysqlSelectParams);
        }
        // console.log(userInfo)

        // 判断用户信息是否获取成功
        if(userInfo.length !== 0){ // 用户信息获取成功(mysql查询数据成功)
            res.status(200).json({
                code: 20000,
                success: true,
                message: '查询成功',
                data: { ...userInfo[0] }
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
        let user = {};
        let updateUserInfo = {}; // 需要更新的用户信息
        let results = 0; //mysql数据库更新状态 0 不成功 1成功

        delete req.body.user[mysqlUserKey.id]; // 禁止修改用户唯一标识
        delete req.body.user[mysqlUserKey.password]; // 禁止修改用户密码

        // 用户名
        req.body.user.username !== undefined ? updateUserInfo[mysqlUserKey.name] = req.body.user.username : '';
        // 邮箱
        // req.body.user.email !== undefined ? updateUserInfo[mysqlUserKey.email] = req.body.user.email : '';
        // 头像
        req.body.user.avatar !== undefined ? updateUserInfo[mysqlUserKey.avatar] = req.body.user.avatar : '';

        // 先删除缓存（查找相关信息）
        // console.log(req.user)
        await ClearCacheRedisUserInfos([req.user]);
    
        // 更改数据库
        JSON.stringify(updateUserInfo) !== "{}" ? await Knex(mysqlUserKey.table).where(mysqlUserKey.id, '=', req.user[mysqlUserKey.id]).update(updateUserInfo).then(updateResult => {
            results = updateResult;
        }) : '';
// console.log(results)
        if(results == 1){ // 数据库更新数据成功
            await sleep(3000); // 延时3秒
            // 再次清除缓存
            await ClearCacheRedisUserInfos([req.user]);
            user[mysqlUserKey.id] = req.user[mysqlUserKey.id];
            delete req.user; // 清除挂载的旧数据
            // 这里不急着将用唯一标识id挂回去

            // 查询数据库最新信息
            await QueryUserInfos(user).then(userInfos => {
                user = userInfos[0];
            });
            delete user.user_pwd;
            req.user = user;
            // console.log(req.user)
        }
        if(results == 1){ // 更新成功
            res.status(200).json({
                code: 20000,
                success: true,
                message: '更新成功',
                data: user
            })
        }else{ // 更新失败
            res.status(200).json({
                code: 50000,
                success: false,
                message: '更新失败'
            })
        }
    }catch (err){
        logger.reprocess_error("Current user information update failed ("+err.message+")",res,req);
        next(new Error(`当前用户信息更新失败 - `+err));
        // next(err)
    }
}

// 修改密码
exports.updatepasswordUser = async (req, res, next) => {
    try{
        // console.log(req.body.password)
        let updateStatus = 0; // 更新状态 0失败  1成功 2 验证码错误 3 验证码不存在 4验证码正确
        let mysqlUpdateParams = {};
        mysqlUpdateParams[mysqlUserKey.password] = md5(req.body.password);
        // console.log(`VerifyCode:${req.user.user_email}`)
        if(EmailVerifyConfig.isEmailVerify.UpdatePassword){ // 是否开启邮箱验证
            await redisDb.get(REDIS_CONFIG.database._user, `UpdatePwdVerifyCode:${req.user[mysqlUserKey.email]}`).then(res => {
                res == null ? updateStatus = 3 : res == req.body.code ? updateStatus = 4 : updateStatus = 2;
            })
            if(updateStatus == 4){ // 验证成功
                // 如果开启了验证码，注册成功后删除验证码
                await redisDb.del(REDIS_CONFIG.database._user, `UpdatePwdVerifyCode:${req.user.user_email}`);

                await Knex(mysqlUserKey.table).where(mysqlUserKey.id, '=', req.user[mysqlUserKey.id]).update(mysqlUpdateParams).then(updateResult => {
                    updateResult == 1 ? updateStatus = 1 : '';
                });
            }
        }else{
            await Knex(mysqlUserKey.table).where(mysqlUserKey.id, '=', req.user[mysqlUserKey.id]).update(mysqlUpdateParams).then(updateResult => {
                updateResult == 1 ? updateStatus = 1 : '';
            });
        }

        if(updateStatus == 1){
            // 确保只发放一条有效 refresh_token
            redisDb.keys(REDIS_CONFIG.database._user, `Token:${req.user[mysqlUserKey.id]}#*`).then(answerKeys=>{
                // 判断是否存在有效 refresh_token
                answerKeys.length !== 0 ? redisDb.del(REDIS_CONFIG.database._user, answerKeys) : ''
            })
            res.status(200).json({
                code: 20000,
                success: true,
                message: '用户密码更新成功'
            })
        }else if(updateStatus == 2){
            res.status(200).json({
                code: 40000,
                success: false,
                message: '验证码验证失败'
            })
        }else if(updateStatus == 3){
            res.status(200).json({
                code: 40000,
                success: false,
                message: '请先发送验证码'
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

// 退出登录
exports.logout = async (req, res, next) =>{
    try{
         // 确保只发放一条有效 refresh_token
        let Status = false;
        await redisDb.keys(REDIS_CONFIG.database._user, `Token:${req.user[mysqlUserKey.id]}#*`).then(async answerKeys => {
             // 判断是否存在有效 refresh_token
             answerKeys.length !== 0 ? await redisDb.del(REDIS_CONFIG.database._user, answerKeys).then(res=>{
                res !== 0 ? Status = true : '';
                // console.log(res)
             }) : '';
        })
        if(Status){
            res.status(200).json({
                code: 20000,
                success: true,
                message: '账号退出成功'
            })
        }else{
            res.status(200).json({
                code: 40000,
                success: false,
                message: '账号退出失败'
            })
        }
        
    }catch(err){
        logger.reprocess_error("Current user logout failed ("+err.message+")",res,req);
        next(new Error(`当前用户退出失败 - `+err));
    }
}

// 删除账号
exports.delCurrentUser = async (req, res, next) =>{
    try{
        // console.log(req.user.user_id);
        let delStatus = 0; // 删除状态  0： 不成功  1： 成功
        // 先删除redis缓存
        await ClearCacheRedisUserInfos([req.user])
        // await redisDb.hdel(REDIS_CONFIG.database._user, `UsersInfo:${req.user[mysqlUserKey.id]}`, req.user[mysqlUserKey.id]);
        // await redisDb.hdel(REDIS_CONFIG.database._user, 'user_name.to.id', req.user[mysqlUserKey.name]);
        // await redisDb.hdel(REDIS_CONFIG.database._user, 'user_email.to.id', req.user[mysqlUserKey.email]);

        // 删除发放的token
        await redisDb.keys(REDIS_CONFIG.database._user, `Token:${req.user.user_id}#*`).then(answerKeys => {
            answerKeys.length !== 0 ? redisDb.del(REDIS_CONFIG.database._user, answerKeys) : '';
        })
        
        // 删除mysql数据
        // console.log(req.user);
        await Knex(mysqlUserKey.table).where(mysqlUserKey.id, '=', req.user[mysqlUserKey.id]).del().then(res => {
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