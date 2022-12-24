const {verify} = require('../util/jwt')
const {jwtSecret} = require('../config/config.default')
const MysqlMethods = require('../util/mysql')
const Knex = require('../model/knex');
// const {User} = require('../model')

module.exports = async (req, res, next) =>{
    //从请求头获取  token 数据，验证是否有效
    
    let token = req.headers['authorization']
    token = token ? token.split('Bearer ')[1] : null
    if(!token){
        return res.status(401).json({
            code:401,
            msg:"请登录账号"
        })
    }
    try{
        const decodedToken = await verify(token,jwtSecret)
        // req.user = await User.findById(decodedToken.zuserId)
        console.log(decodedToken)
        req.user = await Knex.select().where({user_id:decodedToken.Id}).from("lz_users");
        // await MysqlMethods.select('*','lz_users',`where user_id="${decodedToken.Id}"`);
        // console.log(req.user)
        // delete req.user[0].zuser_id
        delete req.user[0].user_pwd
        next()
    }catch(err){
        return res.status(401).json({
            code:401,
            msg:"token已失效"
        })
    }
    //无效->响应401状态码
    //有效->把用户的信息读取出来挂载到 req 请求对象上，继续往后执行

}