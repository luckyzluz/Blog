const MysqlMethods = require('../util/mysql')
const moment = require('moment')
const { DateSort, DateSortx, getTimeInfo } = require('../util/utils')
const nodemail =require('../util/nodemailer')
const {redisDb} = require('../util/redis');
const {EmailVerifyConfig} =require('../config/config.default');
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
            var user =req.body.user;
            // delete user.password;
            var code = await createSixNum(); // 这里是我写的生成的随机六位数，等等下面给代码
            user.code=code;
            // email= user.email
            // time = new Date().getTime()
            let status=0; // 当前状态 
    
            // status  0：初始状态  1：成功 2：邮件发送失败 3:验证码缓存失败
    
            // 发送验证邮件
        await nodemail(user.email,code).then(res=>{
            if(res.response.indexOf('OK')>=0){ // 发送成功
                status=1;
            }else{ // 发送失败
                status=2;
            }
        })

        await redisDb.set('0',user.email,code,5*60).then(res=>{
            res=='OK'?status=1:status=3;
        });
        if(status==1){
            res.status(200).json({
                code:20000,
                // yztxt:code,
                message:"验证码发送成功"
            })
        }else if(status==2){
            res.status(200).json({
                code:50000,
                message:"验证码发送失败，请检查邮箱配置"
            })
        }else if(status==3){
            res.status(200).json({
                code:50000,
                message:"验证码发送失败,请查看后台日志"
            })
        }else{
            res.status(200).json({
                code:50000,
                message:"验证码发送失败"
            })
        }
        }else{
            res.status(200).json({
                code:40001,
                msg:"邮箱验证未开启"
            })
        }
        
        
    } catch (err) {
        next(err)
    }
}