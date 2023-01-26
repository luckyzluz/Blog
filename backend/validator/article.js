/**
 * 文章数据验证
 */
const {check, oneOf,query,body, param,validationResult } =require('express-validator')
const validate = require('../middleware/validator')
const MysqlMethods = require('../util/mysql')
const ArtRedis =require("../util/getArticle")
// const mongoose = require('mongoose')
// const { Article } = require('../model')

//获取文章列表验证数据check
exports.getArticles = validate([
    // async (res,req,next)=>{
        query('offset').custom(async value=>{
            if(value<0){
                // return Promise.reject('只允许是正整数并且要大于于等于 1')
            //     //同步:失败
                throw new Error('只允许是正整数并且要大于于等于 0')
            }
        })
    // }
    
])
// 创建文章时验证数据
exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('文章标题不能为空'),
    body('article.description').notEmpty().withMessage('文章摘要不能为空'),
    body('article.body').notEmpty().withMessage('文章内容不能为空'),
])

// 获取文章时验证数据(封装验证ID格式是否有效)
exports.getArticle = validate([
    param('articleId').custom(async value => {
        // if(!mongoose.isValidObjectId(value)){
        //     //返回一个失败状态的 Promise
        //     return Promise.reject('文章ID类型错误')
        //     //同步:失败
        //     throw new Error('文章ID类型错误')
        // }
        // 同步:成功
        return true
    })
    // 第二种方法
    // validate.isValidObjectId(['params'],'articleId')
])

// 更新文章时验证数据(封装验证ID是否有效)
exports.updateArticle = [
    // 验证ID是否有效
    // validate([
    //     validate.isValidObjectId(['params'],'articleId')
    // ]),
    // 验证文章是否存在
    async (req, res, next) => {
        const articleId = req.body.artId;
        await ArtRedis.getArtsList('0','artLists',articleId).then((res)=>{
            console.log(res)
        })
        // let art_result=await MysqlMethods.select('*','lz_article',`where id in (${req.body.artId.toString()})`)
        // req.article = art_result
        // if(art_result.length<=0){
        //     return res.status(404).end();
        // }
        // if(!article){
        //     return res.status(404).end()
        // }
        next()
    },
    //验证所更新文章作者是否本人
    // async (req, res, next) => {
        // if(req.user._id.toString() !== req.article.author.toString()) {
        //     return res.status(403).end()
        // }
        // console.log(req.user[0].zuser_id,req.article[0].art_author)
        // if(req.user[0].zuser_id.toString() !== req.article[0].art_author.toString()) {
            // return res.status(403).end()
        // }
        // next()
    // }
]
//校验文章是否存在
// 修改的文章作者是否为当前用户

// 删除文章
exports.deleteArticle = [
    //判断文章权限
    async (req, res, next) => {
        let isArtExists=0;
        let dontdel=[];
        let artId=req.body.artId;
        let art_result=await MysqlMethods.select('id,member_id','lz_article',`where id in (${req.body.artId.toString()})`);
        if(art_result.length<=0){
            return res.status(404).end("文章不存在");
        }
        for(let item in art_result){
            if(art_result[item].member_id!==req.user[0].id){
                dontdel.push(artId[item]);
            }
        }
        if(dontdel.length>0){
            return res.status(404).end("存在操作权限问题，请检查")
        }
        next()
    },
]
