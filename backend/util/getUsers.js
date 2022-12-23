/**
 * 封装redis用户类函数
 */
 const MysqlMethods = require('./mysql')
 const { redisDb } = require('./redis');
 let userMysqlConfig={
     table:'lz_users',
     id:'user_id',
     string:'user_id,user_name,user_avatar'
 }
 let categoryMysqlConfig={
     table:'lz_art_category',
     id:'category_id',
     string:'*'
 }
 module.exports={
    /**
     * 获取作者信息，redis没有，则查mysql，存reids
     * 这里没有一次获取全部用户信息，用到了哪一个，查哪一个
     * @param {*} dbNum 
     * @param {*} key 
     * @param {*} member_id 
     * @returns 
     */
getUser:function(dbNum,key,user_id){
    return new Promise(async(resolve,reject)=>{
        let isExists=0;
        let member={}
        // 这里使用exists方法
        await redisDb.exists(dbNum, user_id).then(res => {
            isExists=res;//返回值为:1存在，0不存在
        })
        if(isExists==1){//存在
            await redisDb.hGet('0','users',user_id).then((res)=>{
                console.log(res)
                member=res;
            });
        }else{//不存在
            // 获取用户
        let user_result = await MysqlMethods.select(userMysqlConfig.string, userMysqlConfig.table, `where ${userMysqlConfig.id}=${user_id}`);
        resolve(user_result[0]);
        //将作者数据存储  redis
        await redisDb.hSet('0','users',user_result[0].user_id,JSON.stringify(user_result[0]));
        }
        
            // let tid_result = await MysqlMethods.select('classname', 'lz_classtype', `where id=${articles[i].tid}`);
    })
},
getUsers:function(dbNum,key,userid_arr){
    return new Promise(async(resolve,reject)=>{
        let isExists=0;//redis是否存在
        let users=[];//返回的用户数组
        let detachidMember=Array.from(new Set(userid_arr))//数组去重
        let unidMember=[];//不存在的用户id数组
        // 这里使用exists方法
        for(let item in detachidMember){
            await redisDb.hexists(dbNum,key, detachidMember[item]).then(res => {
                if(res==0){
                    // 统计不存在的用户id
                    unidMember.push(detachidMember[item]);
                }
            })
        }
        // redis若有用户未存在，则进行下面操作
        if(unidMember.length!==0){
            let user_result = await MysqlMethods.select(userMysqlConfig.string, userMysqlConfig.table, `where ${userMysqlConfig.id} in (${unidMember.toString()})`);
            let usersjson={};
            for(let i=0;i<user_result.length;i++){
                usersjson[user_result[i].user_id]=user_result[i];
            }
            //将查询的用户数据 批量存redis-hash
            await redisDb.hMset(dbNum,key,usersjson);
        }
        //  从hash  获取
        await redisDb.hMget(dbNum,key,userid_arr).then((res)=>{
            for(let item in res){
                res[item]=JSON.parse(res[item])
            }
            users=res;
        })
        resolve(users);
    })
},
getCategorys:function(dbNum,key,categoryid_arr){
    return new Promise(async(resolve,reject)=>{
        let categorys=[];//返回的分类数据
        let detachidTid=Array.from(new Set(categoryid_arr))
        let unidTid=[];//不存在的用户id
        // 这里使用exists方法
        for(let item in detachidTid){//这里查询redis对应id处不存在
            await redisDb.hexists(dbNum,key, detachidTid[item]).then(res => {
                if(res==0){
                    unidTid.push(detachidTid[item]);
                }
            })
        }
        if(unidTid.length!==0){//这里处理不存在的id，并不是mysql全部的数据
            let category_result = await MysqlMethods.select(categoryMysqlConfig.string, categoryMysqlConfig.table, `where ${categoryMysqlConfig.id} in (${unidTid.toString()})`);
            let categoryjson={};
            for(let i=0;i<category_result.length;i++){
                categoryjson[category_result[i].category_id]=category_result[i];
            }
            //将查询的用户数据 批量存redis-hash
            await redisDb.hMset(dbNum,key,categoryjson);
        }
        //  从hash  获取
        await redisDb.hMget(dbNum,key,categoryid_arr).then((res)=>{
            
            for(let item in res){
                categorys[item]=JSON.parse(res[item])
            }
            // =res;
        })
        resolve(categorys);
    })
}
}
// let tid_result = await MysqlMethods.select('classname', 'lz_classtype', `where id=${articles[i].tid}`);