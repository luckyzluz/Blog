const express = require('express')
const router = express.Router()

//用户相关路由
router.use(require('./user'))

//用户资料相关路由
router.use('/profiles',require('./profile'))

//文章相关路由
router.use('/articles',require('./article'))

//标签相关路由
router.use('/tags',require('./tag'))

//文件上传相关路由
router.use('/upload',require('./upload'))

router.use('/email',require('./email'))
router.use('/yuque',require('./yuque'))
router.use('/jx',require('./jx'))
router.use('/test',require('./test'))


module.exports = router