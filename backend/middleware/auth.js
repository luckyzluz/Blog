const {verify} = require('../util/jwt')
const {jwtSecret} = require('../config/config.default')
const MysqlMethods = require('../util/mysql')
const Knex = require('../model/knex');
// const {User} = require('../model')
const jwt = require('jsonwebtoken')
const logger =require('../util/logger')

module.exports = async (req, res, next) =>{
    //从请求头获取  token 数据，验证是否有效req.headers['authorization']
    
    let refresh_token = req.headers.refresh_token
    refresh_token = refresh_token ? refresh_token.split('Bearer ')[1] : null;

    let access_token = req.headers.access_token
    access_token = access_token ? access_token.split('Bearer ')[1] : null;
    // console.log("access_token "+access_token)
    // console.log("refresh_token "+refresh_token)
    // console.log(req.headers)
    if(!refresh_token){
        return res.status(401).json({
            code:401,
            msg:"请登录账号"
        })
    }



    // const accessDecodedToken = await jwt.verify(access_token,jwtSecret,(err,decoded)=>{
    //     console.log(err.name)
    // });
    // console.log(accessDecodedToken)
    // next()
    try{
        // const accessDecodedToken =await  verify(access_token,jwtSecret).then((decoded)=>{
        //     console.log(decoded)
        // }).catch(err=>{
        //     console.log(err.name)
        //     next()
        // })
        // const refreshDecodedToken =await  verify(refresh_token,jwtSecret).then((xx)=>{
        //     console.log(xx)
        // }).catch(err=>{
        //     console.log(err.name)
        // })
            // const refreshDecodedToken =  jwt.verify(refresh_token,jwtSecret,(err,decoded)=>{
            //     console.log(decoded)
            // })
    //     // const refreshDecodedToken = await verify(refresh_token,jwtSecret);
    //     // req.user = await User.findById(decodedToken.zuserId)
        
    //     // req.user = await Knex.select().where({user_id:decodedToken.Id}).from("lz_users");
    //     // await MysqlMethods.select('*','lz_users',`where user_id="${decodedToken.Id}"`);
    //     // console.log(req.user)
    //     // delete req.user[0].zuser_id
    //     // delete req.user[0].user_pwd
    // logger.clear()
        next()
    }catch(err){
        // console.log("err"+err)
    //     return res.status(401).json({
    //         code:401,
    //         msg:"token已失效"
    //     })
    }
    //无效->响应401状态码
    //有效->把用户的信息读取出来挂载到 req 请求对象上，继续往后执行

}