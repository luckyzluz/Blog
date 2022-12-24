const {verify} = require('../util/jwt')
const {jwtSecret} = require('../config/config.default')
const MysqlMethods = require('../util/mysql')
// const {User} = require('../model')

module.exports = async (req, res, next) =>{
    //从请求头获取  token 数据，验证是否有效
    
    let token = req.headers['authorization']
    token = token ? token.split('Bearer ')[1] : null
    if(!token){
        return res.status(401).json({
            code:401,
            msg:"请登录"
        })
    }
    try{
        const decodedToken = await verify(token,jwtSecret)
        // req.user = await User.findById(decodedToken.zuserId)
        req.user = await MysqlMethods.select('*','lz_users',`where id="${decodedToken.Id}"`)
        // delete req.user[0].zuser_id
        delete req.user[0].password
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