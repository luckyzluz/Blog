// const express = require('express')
// //创建路由对象
// const router = express.Router()
// //导入用户路由处理函数模块
// const userHandler = require('../router_handler/user')

// //用户注册
// router.post('/reguser', userHandler.regUser)

// //用户登录
// router.post('/login', userHandler.login)

// //将路由对象共享出去
// module.exports = router

const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')
const {body, validationResult } = require('express-validator')
const router = express.Router()

//用户登录
router.post('/users/login',userValidator.login,userCtrl.login)
// 
router.post('/users/refresh',userCtrl.refresh)
// userValidator.retoken,
//用户注册
router.post('/users',userValidator.register,userCtrl.register)//3.通过验证，执行具体的控制器处理


//获取当前登录用户
router.get('/user',auth,userCtrl.getCurrentUser)


//更新当前登录用户
router.put('/user',auth,userCtrl.updateCurrentUser)

//更新当前登录用户密码
router.post('/cipher',auth,userCtrl.updatepasswordUser)

module.exports = router

