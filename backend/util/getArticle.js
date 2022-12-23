/**
 * 封装redis文章类函数
 */
 const MysqlMethods = require('./mysql')
 const { redisDb } = require('./redis');
 const  userRedis  = require('./getUsers');
 const {removeByVal}=require('./utils');
 const {redisConfig} =require('../config/config.default')

 let artMysqlConfig={
     table:'lz_article',
     id:'art_id',//文章id表头名
     time:'art_ctime',
     string:'*'
    //  art_id,art_title,user_id,keywords,comment_count,istop,ishot,art_tags,art_cover,art_brief,art_content,art_ctime
 }
 let userMysqlConfig={
    table:'lz_users',
    id:'user_id',
    string:'user_id,user_name,user_avatar'
}
 module.exports={
/**
 * 判断文章id数组是否存在
 * 不存在则获取并存redis，存在即返回指定范围内id数组
 * 
 * @param {*} dbNum redis存储分区号
 * @param {*} key redis的键名
 * @param {*} offset 获取数据的页数
 * @param {*} limit 获取数据的条数
 * 
 */
isAllIdArts:function(dbNum,key,offset,limit,sort){
    return new Promise(async(resolve,reject)=>{
        let start;
        let end;
        let isExists=0;
        let Idarts=[];
        // 这里使用exists方法
        //只判断list存在与否，不管其内值。不管先创建文章函数先缓存文章
        await redisDb.exists(dbNum, key).then(res => {
            isExists=res;//返回值为:1存在，0不存在
        })
        if(isExists!==1){//不存在
            let artid_result = await MysqlMethods.select(`sql_calc_found_rows ${artMysqlConfig.id}`, artMysqlConfig.table, `order by ${artMysqlConfig.time} desc;select found_rows();select count(*) from ${artMysqlConfig.table}`);//查询mysql所有文章
            for (let i = 0; i < artid_result[0].length; i++) {
                Idarts.push(artid_result[0][i][artMysqlConfig.id]);
            }
            // redisConfig.isredis?console.log('111'):console.log('222');
            await redisDb.rPush(dbNum, key, Idarts);//将全部文章id存储redis
            // console.log(start,end)
            // Idarts=Idarts.splice(start,end);let artid_result ;//mysql查询结果
        }
        if(sort=='desc'){//倒序
            start = (Number.parseInt(offset) - 1) * Number.parseInt(limit);
            limit == 1 ? end = start : end = Number.parseInt(limit) + start - 1;
        }else if(sort=='asc'){//正序
            await redisDb.llen('0', 'allIdArtsList').then(res => {
                if(res!==0){
                    start=res-limit;
                    end=res-1;
                }
            })
        }
        // console.log(start,end);
        await redisDb.lRange(dbNum, key, start, end).then(res => {//取出指定范围文章id列表
            Idarts = res;
            // console.log(Idarts);
            sort=='asc'?Idarts.reverse():''
        })
        
        resolve(Idarts);
})
},
/**
 * 根据id数组，返回文章对应数据列表详情：数组
 * @param {*} dbNum
 * @param {*} key 
 */
getArtsList:function(dbNum,key,idarr){
    return new Promise(async(resolve,reject)=>{
        let artsList=[];//文章数据，返回
        let unartList=[];//redis-hash l里查不到的id(后面为mysql不存在的值)
        let idUsersList=[];//文章所属用户id
        let idCategorysList=[];
        // 先确定id的hash文章是否存在
        for(let i=0;i<idarr.length;i++){
            await redisDb.hexists('0',key,idarr[i]).then((res)=>{
                if(res==0){
                    unartList.push(idarr[i]);
                }
            })
        }
        if(unartList.length!==0){//所需文章  hash里有不存在
            // FROM_UNIXTIME(addtime, "%Y-%m-%d") as addtime
            let art_result=await MysqlMethods.select(artMysqlConfig.string, 'lz_article', ` where ${artMysqlConfig.id} in (${unartList.toString()}) order by ${artMysqlConfig.time} desc`);
            let artjson={}
            for(let i=0;i<art_result.length;i++){
                artjson[art_result[i][artMysqlConfig.id]]=art_result[i];
            }
            // ------
            //将查询的文章数据 批量存redis-hash
            await redisDb.hMset('0',key,artjson);
        }
        // 处理文章的作者，类别数据：判断redis中是否存在，进行统计
        await redisDb.hMget('0',key,idarr).then((res)=>{
            for(let item in res){
                res[item]=JSON.parse(res[item]);
                if(res[item]!==null){
                // 将不存在的数据id分别存一个数组
                idUsersList.push(res[item].user_id);
                idCategorysList.push(res[item].category_id)
                }
            }
            artsList=res;
        })
        // 根据上面统计出未存在数据id(未去重)，进行mysql查询，存redis
        // console.log(idUsersList)
        let users=await userRedis.getUsers('0','users',idUsersList);
        let categorys=await userRedis.getCategorys('0','categorys',idCategorysList);
        // 这里已经得到文章全部数据，开始替换里面数据（作者id，分类id）
        for(let item in artsList){
            artsList[item].author=users[item];
            artsList[item].category=categorys[item];
            delete artsList[item].user_id;
            delete artsList[item].category_id;
        }
        resolve(artsList);
    })
},
/**
 * 根据id数组，返回文章数据详情：
 * @param {*} dbNum
 * @param {*} key 
 */
getArticle:function(dbNum,key,artId){
    return new Promise(async(resolve,reject)=>{
        let article=[];//文章数据，返
        let idUsersList=[];//文章所属用户id
        let idCategorysList=[];//文章所属分类id
        let isExists=0;
        // 先确定id的hash文章是否存在
            await redisDb.hexists(dbNum,key,artId).then((res)=>{
                    isExists=res;
            })
        if(isExists==0){//所需文章  hash里有不存在
            // FROM_UNIXTIME(addtime, "%Y-%m-%d") as addtime
            let art_result=await MysqlMethods.select(artMysqlConfig.string, 'lz_article', ` where ${artMysqlConfig.id} in (${artId}) order by ${artMysqlConfig.time} desc`);
            if(art_result.length==1){
                let artjson={}
                artjson[art_result[0][artMysqlConfig.id]]=art_result[0];
                // 将查询的文章数据 批量存redis-hash
                await redisDb.hMset(dbNum,key,artjson);
                isExists=1;
            }else{
                isExists=0;
            }
        }
        // 从hash  获取
        if(isExists){
            await redisDb.hMget(dbNum,key,[artId]).then((res)=>{
                if(res.length!==0){
                    // console.log(res[0])
                res[0]=JSON.parse(res[0]);
                idUsersList.push(res[0].user_id);
                idCategorysList.push(res[0].category_id)
                }
                article=res;
            })
            // 这里已经得到文章列表数据，开始替换里面数据（作者id，分类id）
            let users=await userRedis.getUsers(dbNum,'users',idUsersList);
            let categorys=await userRedis.getCategorys(dbNum,'categorys',idCategorysList);
            article[0].author=users[0];
            article[0].category=categorys[0];
            delete article[0].user_id;
            delete article[0].category_id;
        }else{
            article=[];
        }
        resolve(article);
    })
}
}