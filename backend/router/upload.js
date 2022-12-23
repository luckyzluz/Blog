const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const uploadCtrl = require('../controller/upload')

// const multerTools = require('../util/multer')
// // const multer = require('multer')
// // var upload = multer({ dest: 'uploads/picture' });
// let singleUpload = multerTools.multer().single('pic');
// router.post('/pic',auth,uploadCtrl.uploadPic)
router.post('/pics',auth,uploadCtrl.uploadPics)

router.post('/large',uploadCtrl.uploadLarge)
// ,auth
router.post('/merge_chunks',uploadCtrl.mergeChunks)
// 大文件hash校验
router.post('/check_chunks',uploadCtrl.checkChunks)

// multerTools.multer().single('pic')singleUpload,
module.exports = router