/**
 * 用户数据验证
 */
const {body} =require('express-validator')
const validate = require('../middleware/validator')
const MysqlMethod = require('../util/mysql')
const User = require('../model/user.js'); // knex
const Knex = require('../model/knex');
const {redisDb} = require('../util/redis');
const { redisConfig } = require('../config/config.default')
const md5 = require('../util/md5')

exports.register = validate([
    body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .bail()
    .custom(async username => {
        let isGo =true; // 是否继续mysql查询
        let nameResult=false; // 用户名查询结果

        if(redisConfig.isRedis){ // 是否开启了redis缓存
        // 查询redis是否存在用户名(存在则跳过mysql查询)
        await redisDb.hGet(0,'Username.to.id',username).then(res=>{
            res==null?isGo=true:isGo=false;
            res==null?nameResult=false:nameResult=true;
        })
        }

        if(isGo){
        // 查询mysql是否存在用户名
        const isUsername = await Knex.select('user_id').where({user_name:username}).from("lz_users");
        // await MysqlMethod.select('*','lz_users',`where user_name="${username}"`);
        isUsername.length>0?nameResult=true:nameResult=false;
        }
        // const user = await User.findOne({username})
        if(nameResult){ // 存在则进行该账号的缓存
            // 查询新增用户id
                user = await Knex.select('*').where({user_name:username}).from("lz_users");
                // await User.select({fileld:"*",options:{"user_name":username}},{name:'user_regtime',order:'desc'})
                delete user[0].user_pwd;

                // 开始redis写入
                let redisResult = 0;
                await redisDb.hSet(0,'Users',results[0],JSON.stringify(user))
                // .then(res=>{
                //     redisResult=res+redisResult
                // })
                await redisDb.hSet(0,'Username.to.id',user[0].user_name,user[0].user_id)
                // .then(res=>{
                //     redisResult=res+redisResult
                // })
                await redisDb.hSet(0,'Email.to.id',user[0].user_email,user[0].user_id)
                // .then(res=>{
                //     redisResult=res+redisResult
                // })

                // 这里只要mysql写入成功即可，redis失败无所谓(读时redis不存在则取mysql，进行缓存)
            return Promise.reject('用户名已存在')
        }
    }),
    body('user.password').notEmpty().withMessage('密码不能为空'),
    body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .bail()
    .isEmail().withMessage('邮箱格式不正确')
    .bail()
    .custom(async email => {
        let isGo =true; // 是否继续mysql查询
        let emailResult = false; // 邮箱查询结果

        if(redisConfig.isRedis){ // 是否开启了redis缓存
            await redisDb.hGet(0,'Email.to.id',email).then(res=>{
            res==null?isGo=true:isGo=false;
            res==null?emailResult=false:emailResult=true;
            })
        }

        if(isGo){
            const isEmail = await Knex.select('user_id').where({user_email:email}).from("lz_users");
            // await MysqlMethod.select('*','lz_users',`where user_email="${email}"`);
            isEmail.length>0?emailResult=true:emailResult=false;
        }
        
        // const user = await User.findOne({email})
        if(emailResult){
            return Promise.reject('邮箱已存在')
        }
    })
])

exports.login = [
    validate([
        // body('user.username').notEmpty().withMessage('账户不能为空'),
        body('user.email').notEmpty().withMessage('邮箱不能为空'),
        body('user.password').notEmpty().withMessage('密码不能为空')
    ]),
    validate([
        body('user.email').custom(async (email,{req,res}) => {
            let isGo =true; // 是否继续mysql查询
            let emailResult = false; // 邮箱查询结果

            if(redisConfig.isRedis){ // 是否开启了redis缓存
            await redisDb.hGet(0,'Email.to.id',email).then(res=>{
                // res==null意味着redis缓存数据不存在
                // console.log(res)
            res==null?isGo=true:isGo=false;
            res==null?emailResult=false:emailResult=true;
            res==null?"":req.user ={user_id:res};
            })

        }

            if(isGo){
                const isEmail = await Knex.select().where({user_email:email}).from("lz_users");
                // await MysqlMethod.select('*','lz_users',`where user_email="${email}"`);
                isEmail.length>0?emailResult=true:emailResult=false;
                isEmail.length>0?req.user = isEmail:'';
                // console.log(isEmail)
                isEmail.length>0?req.user =isEmail[0]:"";
            }
            if(!emailResult){
                return Promise.reject('邮箱不存在')
            }  
        })
    ]),
    validate([
        body('user.password').custom(async (password,{req,res}) => {
            let pwdMysql =""; // 是否继续mysql查询
            if(req.user&&req.user.user_pwd){ //确保数据存在
                pwdMysql=req.user.user_pwd;
            }else{ //密码数据不存在
                let queryPwd=await Knex.select('user_pwd').where({user_id:req.user.user_id}).from("lz_users");
                pwdMysql=queryPwd[0].user_pwd;
            }
            // console.log(pwdMysql,md5(password))
            if(md5(password) !== pwdMysql){
                return Promise.reject('密码错误')
                }
            
        })
    ])
]