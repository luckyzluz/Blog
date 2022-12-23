// const {User} = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const MysqlMethods = require('../util/mysql')
const md5 = require('../util/md5')
const moment = require('moment')
const {createSixNum} = require('../util/utils')
const nodemail =require('../util/nodemailer')
const {redisDb} = require('../util/redis');
// ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}"
//用户登录
exports.login = async (req, res, next) => {
    try{
        console.log(req)
        //1.数据验证
        //2.生成token
        // const user = req.user.toJSON()
        const user = req.user
        // console.log(user[0].id)
        const token= await jwt.sign({
            // userId:user._id
            Id:user[0].id
        },jwtSecret,{
            expiresIn: 60 * 60 * 24//设置jwt过期时间
        })
        // delete user.password
        // console.log(user)
        user[0].refresh_token=token
        delete user[0].password
        delete user[0].id
        // //3.发送成功响应(包含token的用户信息)
        res.status(200).json({
            code:200,
            message:'用户登录成功',
            token:user[0]
            // ,
            // token
        })
        // res.send('用户登录')
    }catch (err){
        next(err)
    }
}

//用户注册
exports.register = async (req, res, next) => {
    try{
        let user=req.body.user
        let time = new Date().getTime()
        let code=''
        let status=0;
        let statusCode=0;
        await redisDb.hGet(0,'logon',user.email).then(res=>{
            // res!==null?:statusCode=2;
            // console.log();
            if(res==null){
                statusCode=2;
            }else{
                code=JSON.parse(res).code
                console.log(code,user.code)
                if(user.code==code){
                    statusCode=1;
                    status+=1;
                }else{
                    statusCode=0;
                    status=0;
                }
            }
        })
        if(status==1){
            let results = await MysqlMethods.insert('lz_users',['user_name','user_pwd','user_email','user_regtime'],[`"${user.username}"`,`"${md5(user.password)}"`,`"${user.email}"`,`"${new Date()}"`])
            // console.log(results);
            if(results.affectedRows>0){
                status+=1;
            }else{
                status=0;
            }
        }
        if(status==2&&statusCode==1){
            res.send({
                codex:200,
                message:"用户注册成功"
            })
        }else if(statusCode==0){
            res.send({
                codex:200,
                message:"验证码错误"
            })
        }else if(statusCode==2){
            res.send({
                codex:200,
                message:"请先发送验证码"
            })
        }else{
            res.send({
                codex:200,
                message:"用户注册失败"
            })
        }
        
    }catch (err){
        next(err)
    }
}

////获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
    try{
        //处理请求
        // console.log(req.headers)
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
        res.send('updateCurrentUser')
    }catch (err){
        next(err)
    }
}