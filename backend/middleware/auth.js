const {verify} = require('../util/jwt')
const {jwtAccessSecret,jwtRefreshSecret} = require('../config/config.default')
const MysqlMethods = require('../util/mysql')
const Knex = require('../model/knex');
// const {User} = require('../model')
const jwt = require('jsonwebtoken')
const logger =require('../util/logger');
const { resolveContent } = require('nodemailer/lib/shared');
const {redisDb} = require('../util/redis');
const { REDIS_CONFIG, mysqlUserKey } = require("../config/config.db");
const { User } = require("../model");

module.exports = async (req, res, next) =>{
    try{
        // 有没有过期，未过期再进行相应操作，判断是否属于未登录
        // let refresh_token = req.headers.refresh_token
        // refresh_token = refresh_token ? refresh_token.split('Bearer ')[1] : null;
        // console.log("refresh_token "+refresh_token)
        // 获取访问令牌(access_token)
        let access_token = req.headers.authorization
        access_token = access_token ? access_token.split('Bearer ')[1] : null;
        console.log("access_token "+access_token)

        // 判断访问令牌(access_token)是否过期
        const accessDecodedToken = jwt.verify(access_token,jwtAccessSecret)
        // .then((xx)=>{
        //     req.user= xx;
        // })
        // console.log(accessDecodedToken)
        let user = await redisDb.hGet(REDIS_CONFIG.database._user, 'UsersInfo', accessDecodedToken.Uuid);

        if(user !== null){
            req.user = JSON.parse(user);
        }else if(req.user.user_id == undefined){
            let mysqlSelectParams = {
                field: '*',
                options: {}
            }
            mysqlSelectParams.options[mysqlUserKey.table] = accessDecodedToken.Uuid;
            user = await User.select(mysqlSelectParams);
            delete user[0][mysqlUserKey.password];
            req.user = user[0];
        }
        
        // {'user_id': accessDecodedToken.Uuid};
        // .catch(err=>{
        //     console.log(err.name)
        // })
        // 这里再做判断，当更新密码（或者刷新token后）后，及时作废access_token
        if(accessDecodedToken.Uuid !== undefined){ // access_token未过期
            let tokenKey; // refresh_token在redis中的key值
            let accessTokenValid; // redis有效accessToken

            await redisDb.keys(REDIS_CONFIG.database._user, `Token-${accessDecodedToken.Uuid}#*`).then(answerKeys => {
                // 判断是否存在有效 refresh_token
                answerKeys.length !== 0 ? tokenKey = answerKeys[0] : '';

            })   

            if(tokenKey !== undefined){ // 确定refresh_tokenKey存在
                // 查询redis中有效access_token
                await redisDb.hGet(REDIS_CONFIG.database._user, tokenKey,'access_token').then(res => {
                    accessTokenValid = res;
                })
            }

            // 判断 有效期内的access_token和refresh_token发放的是否相同
            if(accessTokenValid !== `"${access_token}"`){ // 不一致（已作废）
                // 抛出错误TokenVoidedError
                // throw new Error('TokenVoidedError');
                throw { name: "TokenVoidedError", message: "accessToken has been voided" };
            }
        }
        // console.log(req.user)
        next()
    }catch(err){
        // console.log("err"+err)
        
        switch (err.name) {
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
                    message:"token已作废,请使用有效值"
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
function verson(req){
    var token=req.headers.token;
    let con = jwt.verify(token, 'x-token', (err, decoded) => {
        if (err) {
            console.log(err);
            if(err.name == 'TokenExpiredError'){//token过期
                let str = {
                    iat:1,
                    exp:0,
                    msg: 'token过期'
                }
                return str;
            }else if(err.name == 'JsonWebTokenError'){//无效的token
                let str = {
                    iat:1,
                    exp:0,
                    msg: '无效的token'
                }
                return str;
            }
        }else{
            return decoded;
        }
    })
 
 
    console.log(con);
    if(con.iat<con.exp){
        return true //开始时间小于结束时间，代表token还有效
    }else{
        return false
    }
}