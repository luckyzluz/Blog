const express = require('express')
const router = express.Router()
const jxCtrl = require('../controller/jx')
// const yuqueValidator = require('../validator/yuque')
const auth = require('../middleware/auth')
// ,yuqueValidator.createArticle
// 查询用户信息
router.get('/',jxCtrl.videojx)
module.exports = router