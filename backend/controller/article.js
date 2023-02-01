// 文章相关路由逻辑
// const {Article, User} = require('../model')
const MysqlMethods = require('../util/mysql')
const moment = require('moment')
const { DateSort, DateSortx, getTimeInfo } = require('../util/utils')
const { redisDb } = require('../util/redis')
const ArtRedis =require("../util/getArticle")
const { REDIS_CONFIG, mysqlArtKey } = require('../config/config.db');
const Article = require('../model/article.js');
const knex = require('../model/knex');

const { from } = require('form-data')

//获取首页文章列表
exports.getArticles = async (req, res, next) => {
    try {
        //处理前端请求参数comment_count,like,last,views
        const {https://www.imcharon.com/?orderby=
            // limit = 10, //每页条数
            offset = 1, // 页数
            orderby, //按照排序
            // tag,  // 标签
            // author, // 作者
            // sort='desc' // 排序  desc降序  asc升序  heat  热度
        } = req.query
        let artResult;
        let isRedisArtsInfo = false; // 是否存在文章信息
        let isRedisIdArtsList = false; // 是否存在文章id列表
        let isRedisTypeArtsList = false; // 是否存在文章类型
        let AllArtInfo = [];
        // 查询redis是否存在  文章信息以及文章id信息
        await redisDb.exists(REDIS_CONFIG.database._article, 'ArtsInfo').then(res => {
            res !== 0 ? isRedisArtsInfo = true : '';
        })
        await redisDb.exists(REDIS_CONFIG.database._article, 'IdArtsList').then(res => {
            res !== 0 ? isIdArtsList = true : '';
        })
        // 不存在则获取mysql文章全部数据
        isRedisArtsInfo && isRedisIdArtsList ? '' : AllArtInfo =await knex('lz_article').select().orderBy(mysqlArtKey.createtime, 'desc');
        // console.log(RedisArtsInfo)

        // 确定文章数剧mysql查询成功，进行文章全部信息缓存
        if(AllArtInfo.length !== 0){
            if(!isRedisArtsInfo){
                // 这里对获取的文章数据处理，进行redis缓存
                let RedisArtsInfo ={}
                AllArtInfo.forEach((value, key, iterable) => {
                RedisArtsInfo[value[mysqlArtKey.id]] = value;
                })
                await redisDb.hMset(REDIS_CONFIG.database._article, 'ArtsInfo', RedisArtsInfo);
            }
            if(!isRedisIdArtsList){
                // 处理文章id
                let IdArtsList=[];
                AllArtInfo.forEach((value, key, iterable) => {
                    IdArtsList.push(value[mysqlArtKey.id]);
                })
                // console.log(IdArtsList)
                // 将全部文章id存储redis
                await redisDb.rPush(REDIS_CONFIG.database._article, 'IdArtsList', IdArtsList);
            }
        }


        // await redisDb.hGet(REDIS_CONFIG.database._article, )

        // {
        //     "class":"喜剧,爱情,恐怖,动作,科幻,剧情,战争,警匪,犯罪,动画,奇幻,武侠,冒险,枪战,恐怖,悬疑,惊悚,经典,青春,文艺,微电影,古装,历史,运动,农村,儿童,网络电影",
        //     "area":"大陆,香港,台湾,美国,法国,英国,日本,韩国,德国,泰国,印度,意大利,西班牙,加拿大,其他",
        //     "lang":"国语,英语,粤语,闽南语,韩语,日语,法语,德语,其它","year":"2018,2017,2016,2015,2014,2013,2012,2011,2010",
        //     "star":"王宝强,黄渤,周迅,周冬雨,范冰冰,陈学冬,陈伟霆,郭采洁,邓超,成龙,葛优,林正英,张家辉,梁朝伟,徐峥,郑恺,吴彦祖,刘德华,周星驰,林青霞,周润发,李连杰,甄子丹,古天乐,洪金宝,姚晨,倪妮,黄晓明,彭于晏,汤唯,陈小春",
        //     "director":"冯小刚,张艺谋,吴宇森,陈凯歌,徐克,王家卫,姜文,周星驰,李安",
        //     "state":"正片,预告片,花絮",
        //     "version":"高清版,剧场版,抢先版,OVA,TV,影院版"}

        // {"class":"情感,科幻,热血,推理,搞笑,冒险,萝莉,校园,动作,机战,运动,战争,少年,少女,社会,原创,亲子,益智,励志,其他",
        // "area":"国产,日本,欧美,其他",
        // "lang":"国语,英语,粤语,闽南语,韩语,日语,其它",
        // "year":"2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004","star":"","director":"","state":"",
        // "version":"TV版,电影版,OVA版,真人版"}

        // {"class":"选秀,情感,访谈,播报,旅游,音乐,美食,纪实,曲艺,生活,游戏互动,财经,求职",
        // "area":"内地,港台,日韩,欧美",
        // "lang":"国语,英语,粤语,闽南语,韩语,日语,其它",
        // "year":"2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004",
        // "star":"何炅,汪涵,谢娜,周立波,陈鲁豫,孟非,李静,朱军,朱丹,华少,郭德纲,杨澜","director":"","state":"","version":""}
        // {"class":"古装,战争,青春偶像,喜剧,家庭,犯罪,动作,奇幻,剧情,历史,经典,乡村,情景,商战,网剧,其他",
        // "area":"内地,韩国,香港,台湾,日本,美国,泰国,英国,新加坡,其他",
        // "lang":"国语,英语,粤语,闽南语,韩语,日语,其它",
        // "year":"2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2006,2005,2004",
        // "star":"王宝强,胡歌,霍建华,赵丽颖,刘涛,刘诗诗,陈伟霆,吴奇隆,陆毅,唐嫣,关晓彤,孙俪,李易峰,张翰,李晨,范冰冰,林心如,文章,马伊琍,佟大为,孙红雷,陈建斌,李小璐",
        // "director":"张纪中,李少红,刘江,孔笙,张黎,康洪雷,高希希,胡玫,赵宝刚,郑晓龙",
        // "state":"正片,预告片,花絮",
        // "version":"高清版,剧场版,抢先版,OVA,TV,影院版"}

        res.status(200).json({
            'code': 20000,
            "success": true,
            "message": "操作成功",
            data: AllArtInfo,

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