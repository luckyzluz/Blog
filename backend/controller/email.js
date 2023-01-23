const MysqlMethods = require('../util/mysql')
const moment = require('moment')
const { DateSort, DateSortx, getTimeInfo } = require('../util/utils')
const nodemail = require('../util/nodemailer')
const { redisDb } = require('../util/redis');
const { EmailVerifyConfig } = require('../config/config.default');
const { REDIS_CONFIG } = require("../config/config.db")
// let isEmailVerify=false;// 是否启用邮箱验证码

// 生成的随机六位数
function createSixNum() {
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

exports.email = async (req, res, next) => {
    try {
        if(EmailVerifyConfig.isEmailVerify){ // 是否启用邮箱验证码
            var user = req.body.user;
            // delete user.password;
            var code = createSixNum(); // 这里是我写的生成的随机六位数，等等下面给代码
            user.code = code;
            // email= user.email
            // time = new Date().getTime()
            let status = 0; // 当前状态 
    
            // status  0：发送失败  1：成功 2：缓存失败 3:已发送

            // 查询是否已发放验证码
            await redisDb.get(REDIS_CONFIG.database._user, user.email).then(res => {
                res == null ? '' : status = 3;
            })
            console.log(status)
            if(status !== 3){
                // 发送验证邮件
                await nodemail(user.email,code).then(res => {
                    if(res.response.indexOf('OK') >= 0){ // 发送成功
                        status = 1;
                    }else{ // 发送失败
                        status = 0;
                    }
                })
            }

            if(status == 1){
                await redisDb.set(REDIS_CONFIG.database._user, user.email, code, 5*60).then(res=>{
                    res == 'OK' ? status = 1 : status = 2;
                });
            }
            
            if(status == 3){
                res.status(200).json({
                    code: 40000,
                    success: false,
                    // yztxt:code,
                    message:"验证码已发送"
                })
            }else if(status == 1){
                res.status(200).json({
                    code: 20000,
                    success: true,
                    // yztxt:code,
                    message:"验证码发送成功"
                })
            }else if(status==0){
                res.status(200).json({
                    code:50000,
                    success: false,
                    message:"验证码发送失败，请检查邮箱配置"
                })
            }else if(status == 2){
                res.status(200).json({
                    code:50000,
                    success: false,
                    message:"验证码发送失败,请查看后台日志"
                })
            }else{
                res.status(200).json({
                    code: 50000,
                    success: false,
                    message: "验证码发送失败"
                })
            }
        }else{
            res.status(200).json({
                code:40001,
                success: false,
                message:"邮箱验证未开启"
            })
        }
        
        
    } catch (err) {
        next(err)
    }
}