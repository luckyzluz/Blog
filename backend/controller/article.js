// 文章相关路由逻辑
// const {Article, User} = require('../model')
const MysqlMethods = require('../util/mysql')
const moment = require('moment')
const { DateSort, DateSortx, getTimeInfo } = require('../util/utils')
const { redisDb } = require('../util/redis')
const ArtRedis =require("../util/getArticle")
const { REDIS_CONFIG } = require('../config/config.db');
const Article = require('../model/article.js');
let artMysqlConfig={
    table:'lz_article',
    id:'art_id',//文章id表头名
    time:'art_ctime',
    string:'*'
   //  art_id,art_title,user_id,keywords,comment_count,istop,ishot,art_tags,art_cover,art_brief,art_content,art_ctime
}

//获取首页文章列表
exports.getArticles = async (req, res, next) => {
    try {
        //处理前端请求参数
        const {
            limit = 10, //每页条数
            offset = 1, // 页数
            tag,  // 标签
            author, // 作者
            sort='desc' // 排序  desc降序  asc升序  heat  热度
        } = req.query
        let result;
        // 计算起始和结束下标
        let mysqlSelectParams = {
            field: '*',
            options: {

            }
        }
        await Article.all(sort, offset, limit).then(res => {
            result= res
        })

        res.status(200).json({
            'code': 20000,
            "success": true,
            "message": "操作成功",
            data: result,

        })
    } catch (err) {
        next(err)
    }
}

//获取用户关注的作者文章列表
exports.getFeedArticles = async (req, res, next) => {
    try {
        //处理请求
        res.send('获取用户关注的作者文章列表')
    } catch (err) {
        next(err)
    }
}

//获取文章
exports.getArticle = async (req, res, next) => {
    try {
        //处理请求
        let result=[];
        await ArtRedis.getArticle('0','allArtsList',req.params.Id).then((res)=>{
            result=res;
        })
        res.status(200).json({
            code:200,
            data:result
        })
    } catch (err) {
        next(err)
    }
}

//创建文章（redis已添加）
exports.createArticle = async (req, res, next) => {
    try {
        // //处理请求
        let article = req.body.article;
        article.member_id = req.user[0].id;
        let results = await MysqlMethods.insert('lz_article', ['title', 'tags', 'member_id', 'body', 'description', 'tid', 'litpic', 'addtime'], [`"${article.title}"`, `"${article.tagList.toString()}"`, `"${article.member_id}"`, `"${article.body}"`, `"${article.tabloid}"`, `"${article.type}"`, `"${article.litpic}"`, `"${Math.floor(Date.now() / 1000)}"`]);
        let status=0;//是否成功
        let msg;
        if(results.affectedRows==1 && REDIS_CONFIG.isRedis){
            await redisDb.lPush('0', 'allIdArtsList', results.insertId).then(async res => {
                if(res>0){
                    status=1;
                    msg='文章新增成功'
                }
            })
        }else{
            status=0;
            msg='文章新增失败'
        }
        res.status(201).json({
            code:200,
            status,
            msg
        })
    } catch (err) {
        next(err)
    }
}

//更新文章
exports.updateArticle = async (req, res, next) => {
    try {
        //处理请求
        const article = req.article[0]
        const bodyArticle = req.body.article
        // article.title = bodyArticle.title || article.title
        // article.description = bodyArticle.description || article.description
        // article.body = bodyArticle.body || article.body
        article.art_name = bodyArticle.art_name || article.art_name
        article.art_tags = bodyArticle.art_tags || article.art_tags
        article.art_content = bodyArticle.art_content || article.art_content
        article.art_tabloid = bodyArticle.art_tabloid || article.art_tabloid
        article.art_type = bodyArticle.art_type || article.art_type
        article.art_pic = bodyArticle.art_pic || article.art_pic
        article.art_status = bodyArticle.art_type || article.art_status
        // await article.save()
        let art_result = await MysqlMethods.update('z_arts', ['art_name', 'art_tags', 'art_content', 'art_tabloid', 'art_type', 'art_pic', 'art_status'], [`"${article.art_name}"`, `"${article.art_tags}"`, `"${article.art_content}"`, `"${article.art_tabloid}"`, `"${article.art_type}"`, `"${article.art_pic}"`, `"${article.art_status}"`], `where art_id="${article.art_id}"`)
        if (art_result.changedRows > 0) {
            res.status(200).json({
                article
            })
        } else {
            res.status(400).json({
                // article
                // ,
                message: '未知错误，文章未能修改'
            })
        }

    } catch (err) {
        next(err)
    }
}

//删除文章
exports.deleteArticle = async (req, res, next) => {
    try {
        //处理请求
        let msg='删除失败';
        let status=0;
        const artId = req.body.artId;
        console.log(artId)
        await redisDb.hdel('0','allArtsList',artId);
        for(let item in artId){
            await redisDb.lrem('0','allIdArtsList',0,artId[item]);
        }
        
        let del_Result =await MysqlMethods.delete('lz_article', `where id in(${artId.toString()})`);
        // res.status(204).end()await

        if(del_Result.affectedRows>0){
            msg='删除成功';
            status=1;
        }
        res.status(200).json({
            code:200,
            msg,
            status
        })
    } catch (err) {
        next(err)
    }
}

//添加文章评论
exports.createArticleComment = async (req, res, next) => {
    try {
        //处理请求
        res.send('添加文章评论')
    } catch (err) {
        next(err)
    }
}

//获取文章评论列表
exports.getArticleComments = async (req, res, next) => {
    try {
        //处理请求
        res.send('获取文章评论列表')
    } catch (err) {
        next(err)
    }
}

// 删除文章评论
exports.deleteArticleComment = async (req, res, next) => {
    try {
        //处理请求
        res.send('删除文章评论')
    } catch (err) {
        next(err)
    }
}

// 文章点赞
exports.favoriteArticle = async (req, res, next) => {
    try {
        //处理请求
        res.send('文章点赞')
    } catch (err) {
        next(err)
    }
}

//取消文章点赞
exports.unfavoriteArticle = async (req, res, next) => {
    try {
        //处理请求
        res.send('取消文章点赞')
    } catch (err) {
        next(err)
    }
}