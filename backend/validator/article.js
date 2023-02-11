/**
 * 文章数据验证
 */
const {check, oneOf,query,body, param,validationResult } =require('express-validator')
const validate = require('../middleware/validator')
const MysqlMethods = require('../util/mysql')
const ArtRedis =require("../util/getArticle")
const Knex = require('../model/knex')
const { mysqlArtKey, mysqlUserKey } = require('../config/config.db')
const { QueryArtInfos } = require('../util/Article');
// const mongoose = require('mongoose')
// const { Article } = require('../model')

//获取文章列表验证数据check
exports.getArticles = validate([
    // async (res,req,next)=>{
        query('offset').isInt({min: 1}).withMessage('offset无效值'),
        query('limit').isInt({min: 4}).withMessage('limit无效值').bail().custom(async(value, {req}) => {
            if(Number(value) < Number(req.query.offset)){
                return Promise.reject('limit不得小于offset')
            }
        }),
        query('orderby').isIn(['like', 'last', 'views', 'comment_count', undefined]).withMessage("The orderby parameter value is illegal"),
        query('sort').isIn(['desc', 'asc', undefined]).withMessage("The sort parameter value is illegal")
    // }
    
])
// 创建文章时验证数据
exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('文章标题不能为空'),
    body('article.en').if(body('article.en').exists()).isLocale().withMessage("en需小写"),
    body('article.letter').if(body('article.letter').exists()).isByteLength({max:1}).withMessage('文章首字母不符规范').bail().toUpperCase(),
    body('article.status').if(body('article.status').exists()).isIn([1,0,undefined]).withMessage('status不符规范'),
    body('article.blurb').notEmpty().withMessage('文章摘要不能为空'),
    body('article.content').notEmpty().withMessage('文章内容不能为空'),
    body('article.addtime').if(body('article.addtime').exists()).isLength({ min: 10,max:10 }).withMessage('addtime不符规范'),
    body('article.time').if(body('article.time').exists()).isLength({ min: 10,max:10 }).withMessage('addtime不符规范'),
    body('article.password').if(body('article.password').exists()).isLength({ min: 6 }).withMessage('password不能小于6位'),
    body('article.type').notEmpty().withMessage('type不能为空').bail().isInt({min: 0}).withMessage('type不能小于0'),
    body('article.type_1').notEmpty().withMessage('type_1不能为空').bail().isInt({min: 0}).withMessage('type_1不能小于0'),
    body('article.comment_count').if(body('article.comment_count').exists()).isInt({min: 0}).withMessage('type_1不能小于0'),
    body('article.level').if(body('article.level').exists()).isInt({min: 0, max: 9}).withMessage('level不符规范'),
    body('article.istop').if(body('article.istop').exists()).isIn([0, 1]).withMessage('istop不符规范'),
    body('article.lock').if(body('article.lock').exists()).isIn([0, 1]).withMessage('lock不符规范'),
    body('article.up').if(body('article.up').exists()).isInt({min :0}).withMessage('up不符规范'),
    body('article.down').if(body('article.down').exists()).isInt({min: 0}).withMessage('down不符规范'),
    body('article.hits').if(body('article.hits').exists()).isInt({min :0}).withMessage('hits不符规范'),
    body('article.hits_day').if(body('article.hits_day').exists()).isInt({min :0}).withMessage('hits_day不符规范'),
    body('article.hits_week').if(body('article.hits_week').exists()).isInt({min :0}).withMessage('hits_week不符规范'),
    body('article.hits_month').if(body('article.hits_month').exists()).isInt({min :0}).withMessage('hits_month不符规范'),
    body('article.content').notEmpty().withMessage('文章内容不能为空'),body('article.content').notEmpty().withMessage('文章内容不能为空'),

])

// 获取文章时验证数据(封装验证ID格式是否有效)
exports.getArticle = validate([
    param('Id').isInt({min: 0}).withMessage('Id不符规范')
])

// 更新文章时验证数据(封装验证ID是否有效)
exports.updateArticle = [
    // 验证ID是否有效
    validate([
        param('Id').isInt({min: 0}).withMessage('Id不符规范')
    ]),
    // 验证文章是否存在
    async (req, res, next) => {
        let selectResult = await QueryArtInfos([req.params.Id]);
        // console.log(selectResult);  // [{}]
        if(JSON.stringify(selectResult[0]) == "{}"){
            return res.status(404).json({
                code: 40004,
                success: false,
                message: '该文章Id无效'
            });
        }else{
            req.article = selectResult[0];
        }
        next()
    },
    //验证所更新文章作者是否本人
    async (req, res, next) => {
        // console.log(req.user[mysqlUserKey.id],req.article[mysqlArtKey.author])
        if(req.user[mysqlUserKey.id].toString() !== req.article[mysqlArtKey.author].toString()) {
            return res.status(403).json({
                code: 40003,
                success: false,
                message: "没有权限操作数据"
            })
        }
        next()
    }
]
// 删除文章
exports.deleteArticle = [
    // 验证ID是否有效
    validate([
        check('id.*').isInt({min: 0}).withMessage('Id不符规范')
    ]),
    // 验证文章是否存在(不用验证直接下一步)
    // async (req, res, next) => {
    //     // console.log(req.body.id)
    //     let selectResult = await QueryArtInfos(req.body.id);
    //     console.log(selectResult);  // [{}]
    //     selectResult.forEach((v, i) => {
    //         if(JSON.stringify(v) == "{}"){
    //             return res.status(404).json({
    //                 code: 40004,
    //                 success: false,
    //                 message: '该文章Id无效'
    //             });
    //         }else{
    //             req.article = selectResult[0];
    //         }
    //     });
        
    //     next()
    // },
    //验证所更新文章作者是否本人
    async (req, res, next) => {
        let noPower = [];
        let selectResult = await QueryArtInfos(req.body.id);
        // console.log(selectResult);  // [{}]
        selectResult.forEach((v, i) => {
            if(req.user[mysqlUserKey.id].toString() !== v[mysqlArtKey.author]){
                noPower.push(v[mysqlArtKey.id]);
            }
        });
        if(noPower.length > 0) {
            return res.status(403).json({
                code: 40003,
                success: false,
                message: "没有权限批量操作数据"
            })
        }
        next()
    }
]
