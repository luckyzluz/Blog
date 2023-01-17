const {verify} = require('../util/jwt')
const {jwtAccessSecret,jwtRefreshSecret} = require('../config/config.default')
const MysqlMethods = require('../util/mysql')
const Knex = require('../model/knex');
// const {User} = require('../model')
const jwt = require('jsonwebtoken')
const logger =require('../util/logger')

module.exports = async (req, res, next) =>{
    // 获取访问令牌(access_token)
    let access_token = req.headers.authorization
    access_token = access_token ? access_token.split('Bearer ')[1] : null;
    console.log("access_token "+access_token)

    // 判断访问令牌(access_token)是否过期
    // const accessDecodedToken = await jwt.verify(access_token,jwtAccessSecret).then((xx)=>{
    //     console.log(xx)
    // }).catch(err=>{
    //     console.log(err.name)
    // })
    //从请求头获取  token 数据，验证是否有效req.headers['authorization']
    
    // let refresh_token = req.headers.refresh_token
    // refresh_token = refresh_token ? refresh_token.split('Bearer ')[1] : null;

    
    
    // console.log("refresh_token "+refresh_token)
    // console.log(req.headers)
    // if(!refresh_token){
    //     return res.status(401).json({
    //         code:401,
    //         msg:"请登录账号"
    //     })
    // }
    // 判断access_token是否过期

    

    // console.log(accessDecodedToken)
    // next()
    try{
        // const accessDecodedToken =await  verify(access_token,jwtSecret).then((decoded)=>{
        //     console.log(decoded)
        // }).catch(err=>{
        //     console.log(err.name)
        //     next()
        // })refresh_token
        // const refreshDecodedToken =await  verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjkwIiwiZGV2aWNlQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI5LjAiLCJJcCI6IjEyNy4wLjAuMSIsImlhdCI6MTY3Mzg0NDY4NywiZXhwIjoxNjc2NDM2Njg3fQ.wKpuqdblSQMJq1CQrbf9isACl0ExHi7DgKaunwmCma4',jwtRefreshSecret).then((xx)=>{
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