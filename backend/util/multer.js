const multer = require('multer')
const path = require('path')
var fse = require('fs-extra');
const { createFolder, ifExist, ifFileName } = require('../util/utils')
const md5 = require('./md5')
const moment = require('moment')
// 文件上传的路径
var uploadFolder = './uploads/';
var uploadPics = `${uploadFolder}picture/${moment(new Date()).format('YYYY-MM-DD')}`
createFolder(uploadFolder);
const uploadPath = path.join(__dirname, './../uploads/transfer');
const uploadTempPath = path.join(uploadPath, 'temp');
let multerTools = {
    multerPic() {
        let upload = multer({
            limits: {
                //限制文件大小10mb
                fileSize: 10 * 1024 * 1024,
                // 限制文件数量
                // files: 5
            },
            storage: multer.diskStorage({
                // 配置上传的目录
                destination: function (req, file, cb) {
                    // cb(null, 'uploads/picture');
                    // 用于进行复杂的路径配置，此处考虑分片上传，先将分片文件保存在临时目录中
                    // let [fname, index, fext] = file.originalname.split(".");//index文件houzm
                    // if (file.fileSize >= 100 * 1024 * 1024) {
                    // chunkDir = `${uploadFolder}/transfer/${fname}`
                    // }
                    // if (index == 'gif') {
                    // chunkDir = 'xxx1/';

                    // } else {
                    // chunkDir = `${uploadFolder}/${index}`
                    // }

                    // if (!fse.existsSync(chunkDir)) {
                    // fse.mkdirsSync(chunkDir);
                    // }
                    // uploadPics=uploadPics+`${moment(new Date()).format('YYYY-MM-DD')}`
                    createFolder(uploadPics);
                    cb(null, uploadPics); //内部提供的回调函数 
                },
                // 修改文件名
                filename: function (req, file, cb) {
                    // let extname = path.extname(file.originalname)//文件的后缀名，直接拼接不需要.
                    let [fname, index, fext] = file.originalname.split(".");
                    // fname = ifFileName(uploadPics,fname,index)
                    // var changedName = Date.now() + extname
                    var changedName = `${fname}${moment(new Date()).format('mm:ss')}.${index}`
                    changedName = changedName.replace(":", "")
                    // md5(fname+Date.now())+'.'+index
                    cb(null, changedName);
                }
            }),
            fileFilter: function (req, file, cb) {
                // 限制文件上传类型，仅可上传png格式图片
                if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/gif' || file.mimetype == 'image/jpg' || file.mimetype == 'image/webp') {
                    cb(null, true)
                } else {
                    cb(null, false)
                }
            }
        });
        return upload
    },
    multerLarge() {
        let upload = multer({dest: uploadTempPath});
        return upload
    },
}
module.exports = multerTools