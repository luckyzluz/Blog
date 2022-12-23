const express = require('express')
const router = express.Router()
const yuqueCtrl = require('../controller/yuque')
const yuqueValidator = require('../validator/yuque')
const auth = require('../middleware/auth')
// ,yuqueValidator.createArticle
// 查询用户信息
router.get('/user',yuqueCtrl.userInfo)
// 查询所有知识库
router.get('/repos',yuqueCtrl.reposInfos)
// 创建新的知识库
router.post('/reposx',yuqueCtrl.createrepos)
// 查询知识库详情
router.post('/redetails',yuqueCtrl.redetails)
// 更新知识库
router.put('/uprepos',yuqueCtrl.updateRepos)

router.delete('/derepos',yuqueCtrl.deleteRepos)
router.get('/doclist',yuqueCtrl.docList)
router.get('/doc',yuqueCtrl.docdetails)
router.post('/createdoc',yuqueCtrl.createdoc)
router.put('/updoc',yuqueCtrl.updatedoc)
router.delete('/dedoc',yuqueCtrl.deletedoc)
router.get('/search',yuqueCtrl.search)
module.exports = router