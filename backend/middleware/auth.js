const {verify} = require('../util/jwt')
const { jwtConfig } = require('../config/config.jwt')
const MysqlMethods = require('../util/mysql')
const Knex = require('../model/knex');
// const {User} = require('../model')
const jwt = require('jsonwebtoken')
const logger =require('../util/logger');
const { resolveContent } = require('nodemailer/lib/shared');
const {redisDb} = require('../util/redis');
const { REDIS_CONFIG, mysqlUserKey } = require("../config/config.db");
const { User } = require("../model");
const { QueryUserInfos } =require('../util/User');

module.exports = async (req, res, next) =>{
    try{
        // 先判断access_token是否过期。未过期，解密得到id，
        // 再判断是否已经登录（refresh_token是否存在），
        // 已登录（refresh_token存在），则未过期再判断是否有效access_token
        // 未登录，则没了

        // 获取访问令牌(access_token)
        // 首先得得到用户id（解密access_token，顺带可以知道是否过期）
        let access_token = req.headers.authorization;
        access_token = access_token ? access_token.split('Bearer ')[1] : null;
        if(access_token == null){
            throw { name: "UserNotLoggedIn", message: "User is not logged in" }
        }

        // console.log("access_token "+access_token)
        let UserLoginStatus = false; // true：  已登录  false： 未登录
        let refreshTokenKey; // 存在的有效refresh_token的key

        // 判断访问令牌(access_token)是否过期（未过期获取用户id）
        const accessDecodedToken = jwt.verify(access_token,jwtConfig.jwtAccessSecret);
        // console.log(accessDecodedToken)
        if(accessDecodedToken.Uuid !== undefined){ // access_token未过期，查询该用户id是否已登录（refresh_token是否存在redis）
            await redisDb.keys(REDIS_CONFIG.database._user, `Token:${accessDecodedToken.Uuid}#*`).then(answerKeys => {
                // 判断是否存在有效 refresh_token
                answerKeys.length !== 0 ? UserLoginStatus = true : '';
                answerKeys.length !== 0 ? refreshTokenKey = answerKeys[0] : '';
            })
        }

        if(UserLoginStatus){ // 已登录（refresh_token存在redis）
            if(accessDecodedToken.Uuid !== undefined){ // 未过期，继续查询redis中有效access_token
                await redisDb.hGet(REDIS_CONFIG.database._user, refreshTokenKey,'access_token').then(res => {
                    // 判断 有效期内的access_token和refresh_token发放的是否相同
                    // console.log(res , `${access_token}`)
                    if(res !== `${access_token}`){ // 不一致（已作废）
                        // 抛出错误TokenVoidedError
                        // throw new Error('TokenVoidedError');
                        throw { name: "TokenVoidedError", message: "accessToken has been voided" };
                    }
                })
            }else{
                // 这里应为  在校验时会抛出过期accesstoken错误，这里不做处理
            }

        }else{ // 未登录，抛出错误
            throw { name: "UserNotLoggedIn", message: "User is not logged in" };
            // throw { name: "TokenVoidedError", message: "accessToken has been voided" };
        }
        
        // 这里获取用户信息，挂载到req.user
        let mysqlSelectParams = {}
        mysqlSelectParams[mysqlUserKey.id] = accessDecodedToken.Uuid;
        let user = await QueryUserInfos(mysqlSelectParams);
        // console.log(user)
        // let user={} ;
        // user[mysqlUserKey.id] = accessDecodedToken.Uuid;
        // console.log(user)
        req.user = user[0];
        next()
    }catch(err){
        // console.log("err"+err)
        
        switch (err.name) {
            case 'UserNotLoggedIn':
                return res.status(401).json({
                    code:40001,
                    success: false,
                    message:"请先登录账号"
                })
            case 'TokenExpiredError': // token过期
            // logger.reprocess_error("Current user password update failed ("+err.message+")",res,req);
                return res.status(401).json({
                    code:40001,
                    success: false,
                    message:"token已失效,请刷新"
                })
            case 'JsonWebTokenError': // 无效的token
                return res.status(401).json({
                    code:40001,
                    success: false,
                    message:"无效token,请规范使用"
                })
            case 'TokenVoidedError': // token已作废
                return res.status(401).json({
                    code:40001,
                    success: false,
                    message:"token已作废,请重新登录!!!"
                })
            default: // 未知错误
                logger.reprocess_error("Unknown error.Token validation failed ("+err.message+")",res,req);
                return res.status(401).json({
                    code:40001,
                    success: false,
                    message:"未知错误，token身份验证失败"
                })
        } 
        // if(err.name == 'TokenExpiredError'){ // token过期
        //     return res.status(401).json({
        //         code:40001,
        //         success: false,
        //         message:"token已失效"
        //     })
        // }else if(err.name == 'JsonWebTokenError'){ // 无效的token
        //     return res.status(401).json({
        //         code:40001,
        //         success: false,
        //         message:"无效token"
        //     })
        // }else if(err.name == 'TokenVoidedError'){ // token已作废
        //     return res.status(401).json({
        //         code:40001,
        //         success: false,
        //         message:"token已作废"
        //     })
        // }else{ // 未知错误
        //     return res.status(401).json({
        //         code:40001,
        //         success: false,
        //         message:"未知错误，token身份验证失败"
        //     })
        // }
        
    }
    //无效->响应401状态码
    //有效->把用户的信息读取出来挂载到 req 请求对象上，继续往后执行

}


/**
 * 校验token是否过期
 * */
// function verson(req){
//     var token=req.headers.token;
//     let con = jwt.verify(token, 'x-token', (err, decoded) => {
//         if (err) {
//             console.log(err);
//             if(err.name == 'TokenExpiredError'){//token过期
//                 let str = {
//                     iat:1,
//                     exp:0,
//                     msg: 'token过期'
//                 }
//                 return str;
//             }else if(err.name == 'JsonWebTokenError'){//无效的token
//                 let str = {
//                     iat:1,
//                     exp:0,
//                     msg: '无效的token'
//                 }
//                 return str;
//             }
//         }else{
//             return decoded;
//         }
//     })
 
 
//     console.log(con);
//     if(con.iat<con.exp){
//         return true //开始时间小于结束时间，代表token还有效
//     }else{
//         return false
//     }
// }