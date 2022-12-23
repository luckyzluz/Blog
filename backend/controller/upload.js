const MysqlMethods = require('../util/mysql')
const { formatBytes, ifExist,getNowSceond } = require('../util/utils')
const moment = require('moment')
const multerTools = require('../util/multer')
// --------------------------------
const path = require('path');
const fs = require('fs-extra');
const uploadPath = path.join(__dirname, '../uploads/transfer');
// const uploadTempPath = path.join(uploadPath, 'temp');
const { mkdirsSync } = require('../util/dir');


// let singleUploadPic = multerTools.multer().single('pic');
let uploadPics = multerTools.multerPic().array('pics')
let uploadLarge = multerTools.multerLarge().single('file')

// 单文件上传
// exports.uploadPic = async (req, res,next) => {
//     try{
//         await singleUploadPic(req,res,(err)=>{
//             if(!!err){
//                 // console.log(err.message)
//                 res.json({
//                     code: '2000',
//                     type:'single',
//                     originalname: '',
//                     msg: err.message
//                 })
//                 return;
//             }
//             if(!!req.file){
//                 res.json({
//                     code: '0000',
//                     type:'single',
//                     originalname: req.file.originalname,
//                     msg: "",
//                     size:req.file.size,
//                     path: req.file.path.replace(/\\/g,"/")
//                 })
//             } else {
//                 res.json({
//                     code: '1000',
//                     type:'single',
//                     originalname: '',
//                     msg: '',
//                     size:formatBytes(req.file.size),
//                     path: req.file.path.replace(/\\/g,"/")
//                 })
//             }
//         })
//     }catch(err){
//         next(err)
//     }
// }
exports.uploadPics = async (req, res, next) => {
    try {
        uploadPics(req, res, (err) => {
            if (!!err) {
                res.json({
                    code: '2000',
                    type: 'multer',
                    fileList: [],
                    msg: err.message
                });
            }
            let fileList = [];
            let results = [];
            req.files.map(async (elem, index) => {
                fileList.push({
                    originalname: elem.originalname,
                    size: formatBytes(elem.size),
                    path: elem.path.replace(/\\/g, "/"),

                })
                try {
                    results = await MysqlMethods.insert('z_pics', ['pic_author', 'pic_ip', 'pic_describe', 'pic_add_time', 'pic_url', 'pic_size'], [`"${req.user[0].zuser_id}"`, `"10.3656.666"`, `"${'嘿嘿'}"`, `"${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}"`, `"${elem.path.replace(/\\/g, "/")}"`, `"${formatBytes(elem.size)}"`])
                    // })
                } catch (err) {
                    next(err)
                }

            });
            // console.log()
            res.json({
                code: '0000',
                type: 'multer',
                fileList: fileList,
                msg: '',
                results
            });
        });
    } catch (err) {
        next(err)
    }
}
exports.uploadLarge = async (req, res, next) => {
    try {
        uploadLarge(req, res, (err) => {
            console.log('file upload...')
            // 根据文件hash创建文件夹，把默认上传的文件移动当前hash文件夹下。方便后续文件合并。
            const {
                name,
                total,
                index,
                size,
                hash
            } = req.body;

            const chunksPath = path.join(uploadPath, hash, '/');
            if(!fs.existsSync(chunksPath)) mkdirsSync(chunksPath);
            fs.renameSync(req.file.path, chunksPath + hash + '-' + index);
            res.status(200).end('Success');
        })
    } catch (err) {
        next(err)
    }
}

exports.mergeChunks = async (req, res, next) => {
    const {
        size,
        name,
        total,
        hash
    } = req.body;
    // 根据hash值，获取分片文件。
    // 创建存储文件
    // 合并
    let ccv=path.join(uploadPath,'..')
    // console.log(ccv)
    const chunksPath = path.join(uploadPath, hash, '/');
let fileType =name.split('.')[1]
    if(fileType=='pdf'||fileType=='doc'||fileType=='txt'||fileType=='xls'){
        var filePath=path.join(`${uploadPath}`,'..','doc',`${moment(Date.now()).format('YYYY-MM')}` ,name)
        if(!fs.existsSync(path.join(`${uploadPath}`,'..','doc',`${moment(Date.now()).format('YYYY-MM')}`))) mkdirsSync(path.join(`${uploadPath}`,'..','doc',`${moment(Date.now()).format('YYYY-MM')}`));
    }else if(fileType=='mp4'||fileType=='mkv'||fileType=='avi'||fileType=='wmv'||fileType=='rmvb'||fileType=='flv'||fileType=='m3u8'){
        var filePath=path.join(`${uploadPath}`,'..','video',`${moment(Date.now()).format('YYYY-MM')}`  ,name)
        if(!fs.existsSync(path.join(`${uploadPath}`,'..','video',`${moment(Date.now()).format('YYYY-MM')}`))) mkdirsSync(path.join(`${uploadPath}`,'..','video',`${moment(Date.now()).format('YYYY-MM')}`));
    }else if(fileType=='webp'||fileType=='jpg'||fileType=='gif'||fileType=='psd'||fileType=='png'||fileType=='svg'||fileType=='jpeg'||fileType=='ico'){
        var filePath=path.join(`${uploadPath}`,'..','picture',`${moment(Date.now()).format('YYYY-MM')}`  ,name)
        if(!fs.existsSync(path.join(`${uploadPath}`,'..','picture',`${moment(Date.now()).format('YYYY-MM')}` ))) mkdirsSync(path.join(`${uploadPath}`,'..','picture',`${moment(Date.now()).format('YYYY-MM')}` ));
    }else{
        var filePath=path.join(`${uploadPath}`,'..','other',`${moment(Date.now()).format('YYYY-MM')}`  ,name)
        if(!fs.existsSync(path.join(`${uploadPath}`,'..','other',`${moment(Date.now()).format('YYYY-MM')}`))) mkdirsSync(path.join(`${uploadPath}`,'..','other',`${moment(Date.now()).format('YYYY-MM')}`));
    }
    
    // var filePath = path.join(`${uploadPath}/xx`, name);//合并后存储的位置
    // 读取所有的chunks 文件名存放在数组中
    const chunks = fs.readdirSync(chunksPath);
    //   console.log(chunksPath,filePath,chunks)
    // 创建存储文件
    fs.writeFileSync(filePath, '');
    if (chunks.length !== total || chunks.length === 0) {
        res.status(200).end('切片文件数量不符合');
        return;
    }
    for (let i = 0; i < total; i++) {
        // 追加写入到文件中
        fs.appendFileSync(filePath, fs.readFileSync(chunksPath + hash + '-' + i));
        // 删除本次使用的chunk    
        fs.unlinkSync(chunksPath + hash + '-' + i);
    }
    fs.rmdirSync(chunksPath);
    // 文件合并成功，可以把文件信息进行入库。
    //   res.status(200).end('合并成功');
    res.status(200).json({
        total: total,
        size: size,
        name: name,
        progress: 100 + '%',
        path: filePath
    })
}
exports.checkChunks = async (req, res, next) =>{
    try{
        let hash = req.body.hash
        let filenum= 0
        const chunksPath = path.join(uploadPath, hash, '/');
        if(ifExist(chunksPath)){
            filenum= fs.readdirSync(chunksPath).length
        }
        res.status(200).json({
            filenum:filenum
        })
    }catch(err){
        next(err)
    }
}
