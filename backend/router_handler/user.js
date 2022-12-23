/**
 * 定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
//导入数据库操作模块
const db = require('../db/index')

// 注册用户的处理函数
exports.regUser = (req, res,next) => {
    try{
        const userInfo = req.body.user
        // 对表单中的数据，进行合法校验
        if(!userInfo.username || !userInfo.password){
            return res.send({status:4,message:'用户名或密码不合法'})
        }
        const sqlStr = 'select *from z_users where zuser_name=?'
        db.query(sqlStr,userInfo.username,(err,results)=>{
            if(err){
                return res.send({status:1,message:err.message})
            }
            if(results.length > 0){
                return res.send({status:1,message:'用户名已存在'})
            }
        })
        // res.status(201).json({
        //     ...userInfo,
        //     // token
        // })
    }catch(err){
        next(err)
    }
}

// 登录用户的处理函数
exports.login = (req, res) => {
    res.send('login')
}