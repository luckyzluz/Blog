// 文章相关路由逻辑
// const {Article, User} = require('../model')
const MysqlMethods = require('../util/mysql')
const moment = require('moment')
const { DateSort, DateSortx, getTimeInfo } = require('../util/utils')
const { redisDb, client } = require('../util/redis')
const ArtRedis =require("../util/getArticle")
const { REDIS_CONFIG, mysqlArtKey } = require('../config/config.db');
const Article = require('../model/article.js');
const knex = require('../model/knex');

const { from } = require('form-data')
const {QueryArtsInfosList, QueryArtInfos,QueryMysqlArtInfos,InsertArtsInfos, UpdateArtsInfos, delArts} = require('../util/Article');
const logger =require("../util/logger");

//获取首页文章列表
exports.getArticles = async (req, res, next) => {
    try {
        //处理前端请求参数comment_count,like,last,views
        const {//https://www.imcharon.com/?orderby=
            limit = 10, //每页条数
            offset = 1, // 页数
            orderby='last', //按照排序
            sort='desc' // 排序  desc降序  asc升序  heat  热度
        } = req.query

        let AllArtInfo = []; // 返回前端的数据
        // 获取展示文章列表id
        let ArtsIdData= await QueryArtsInfosList({limit, offset, orderby, sort});
        // console.log(ArtsIdData)
// console.log(new Date().getTime(),Math.round(new Date() / 1000))
// AllArtInfo = ArtsIdData.ArtsIdList
        if(ArtsIdData !== 'paramWarning'){
            if(ArtsIdData.ArtsIdList.length !== 0){
                AllArtInfo = await QueryArtInfos(ArtsIdData.ArtsIdList, offset);
            }
            res.status(200).json({
                'code': 20000,
                "success": true,
                "message": "操作成功",
                CurrentPage: offset,
                PageCount: ArtsIdData.PageCount,
                total: ArtsIdData.total,
                data: AllArtInfo,
    
            })
        }else{
            res.status(200).json({
                'code': 50000,
                "success": false,
                "message": "操作失败",
                data: 'not allow limit <= Number of top articles'
            })
        }
    } catch (err) {
        next(err)
        logger.reprocess_error("Failed to get the first page article list ("+err+")", res, req);
        // next(new Error(`账号注册失败`+err));
        // res.status(200).json({
        //     'code': 50000,
        //     "success": true,
        //     "message": "操作失败",
        //     data:err

        // })
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
        result = await QueryArtInfos([req.params.Id], 0);
        // await ArtRedis.getArticle('0','allArtsList',req.params.Id).then((res)=>{
        //     result=res;
        // })
        res.status(200).json({
            code: 20000,
            success: true,
            message: "操作成功",
            data: result
        })
    } catch (err) {
        next(err)
        logger.reprocess_error("Failed to obtain article information ("+err.message+")", res, req);
        // next(new Error(`账号注册失败`+err));
    }
}

//创建文章（redis已添加）
exports.createArticle = async (req, res, next) => {
    try {
        // //处理请求
        let article = req.body.article;
        // article.member_id = req.user[0].id;
        // 处理前端数据
        let status = 0;//是否成功
        // console.log(req.user.user_id)
        article.author = req.user.user_id;
        status =  await InsertArtsInfos([article]);
        if(status.length > 0){
            res.status(201).json({
                code:20000,
                success: true,
                message: '操作成功',
                data: status
            })
        }else{
            res.status(200).json({
                code:20000,
                success: false,
                message: '操作失败',
            })
        }
    } catch (err) {
        logger.reprocess_error("Failed to add article ("+err+")", res, req);
        next(err);
        
        // next(new Error(`账号注册失败`+err));
    }
}

//更新文章
exports.updateArticle = async (req, res, next) => {
    try {
        // console.log(JSON.stringify(req.body.article)=="{}")
        let UpdateResult = await UpdateArtsInfos([req.params.articleId], [req.body.article]);
        // if (art_result.changedRows > 0) {
            res.status(200).json({
                code: 20000,
                success: true,
                message: '操作成功',
                data: UpdateResult
            })
        // } else {
        //     res.status(400).json({
        //         // article
        //         // ,
        //         message: '未知错误，文章未能修改'
        //     })
        // }
            
    } catch (err) {
        next(err)
    }
}

//删除文章
exports.deleteArticle = async (req, res, next) => {
    try {
        //处理请求
        let status=0;
        const artId = req.body.artId;
        // console.log(artId)
        status = await delArts(artId);
        // await redisDb.hdel('0','allArtsList',artId);
        // for(let item in artId){
        //     await redisDb.lrem('0','allIdArtsList',0,artId[item]);
        // }
        
        // let del_Result =await MysqlMethods.delete('lz_article', `where id in(${artId.toString()})`);
        // res.status(204).end()await

        // if(del_Result.affectedRows>0){
        //     msg='删除成功';
        //     status=1;
        // }
        if(status >0){
            res.status(200).json({
                code: 20000,
                success: true,
                message:'操作成功'
            })
        }else if(status == 0){
            res.status(200).json({
                code: 40004,
                success: false,
                message:'数据不存在'
            })
        }else{
            res.status(200).json({
                code: 50000,
                success: false,
                message:'操作失败'
            })
        }
        
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