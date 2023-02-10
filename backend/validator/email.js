const {body,check, validationResult} =require('express-validator')
const validate = require('../middleware/validator')
const MysqlMethod = require('../util/mysql')
const User = require('../model/user.js'); // knex
const Knex = require('../model/knex')

const { redisConfig } = require('../config/config.default')
const {redisDb} = require('../util/redis');
// const {User} = require('../model')
const md5 = require('../util/md5')
const { REDIS_CONFIG, mysqlUserKey } = require("../config/config.db")

exports.emailRegistration = validate([
    body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .bail()
    .isEmail().withMessage('邮箱格式不正确')
    .bail()
    .custom(async email => {
        let isGo =true; // 是否继续mysql查询
        let emailStatus=0; // 查询状态 0：不存在  1：存在 2：不存在但验证码已发送
        let user = [];

        await redisDb.hGet(REDIS_CONFIG.database._user, 'Email.to.id', email).then(res => {
            if(res == null){
                isGo = true;
                emailStatus = 0;
            }
            res == null ? isGo = true : isGo = false;
            res == null ? emailStatus = 0 : emailStatus = 1;
        })

        if(isGo){ // 继续mysql查询
            let mysqlSelectParams = {
                field: '*',
                options: {}
            }
            mysqlSelectParams.options[mysqlUserKey.email] = email;

            user = await User.select(mysqlSelectParams);
            user.length > 0 ? emailStatus = 1 : emailStatus = 0;
        }
        
        // if(emailStatus == 0){
        //     await redisDb.get(REDIS_CONFIG.database._user, email).then(res => {
        //         res == null ? '' : emailStatus = 2;
        //     })
        // }
        // console.log(emailStatus)
        if(emailStatus == 1){ // 邮箱存在则进行redis缓存
            return Promise.reject('该邮箱账号已存在')
        }
        // else if(emailStatus == 2){
        //     return Promise.reject('验证码已发送')
        // }
    }),
    // body('user.password').notEmpty().withMessage('密码不能为空'),
    // body('user.username')
    // .notEmpty().withMessage('用户名不能为空')
    // .bail()
    // .custom(async username => {
        // let isGo =true; // 是否继续mysql查询
        // let nameResult=false; // 用户名查询结果

        // if(redisConfig.isRedis){ // 是否开启了redis缓存
        // // 查询redis是否存在用户名(存在则跳过mysql查询)
        // await redisDb.hGet(0,'Username.to.id',username).then(res=>{
        //     res==null?isGo=true:isGo=false;
        //     res==null?nameResult=false:nameResult=true;
        // })
        // }

        // if(isGo){
        // // 查询mysql是否存在用户名
        // const isUsername = await Knex.select('user_id').where({user_name:username}).from("lz_users");
        // // await MysqlMethod.select('*','lz_users',`where user_name="${username}"`);
        // isUsername.length>0?nameResult=true:nameResult=false;
        // }
        // // const user = await User.findOne({username})
        // if(nameResult){
        //     return Promise.reject('用户名已存在')
        // }
    // })
])

exports.updatePwdValidation = validate([
    body('email')
    .notEmpty().withMessage('邮箱不能为空')
    .bail()
    .isEmail().normalizeEmail().withMessage('格式不正确').bail()
    .custom(async email => {
        // let isGo =true; // 是否继续mysql查询
        // let emailStatus=0; // 查询状态 0：不存在  1：存在 2：不存在但验证码已发送
        // let user = [];

        await redisDb.hGet(REDIS_CONFIG.database._user, 'Email.to.id', email).then(res => {
            if(res == null){
                // isGo = true;
                emailStatus = 0;
            }
            // res == null ? isGo = true : isGo = false;
            // res == null ? emailStatus = 0 : emailStatus = 1;
        })

        // if(isGo){ // 继续mysql查询
        //     let mysqlSelectParams = {
        //         field: '*',
        //         options: {}
        //     }
        //     mysqlSelectParams.options[mysqlUserKey.email] = email;

        //     user = await User.select(mysqlSelectParams);
        //     user.length > 0 ? emailStatus = 1 : emailStatus = 0;
        // }
        
        // // if(emailStatus == 0){
        // //     await redisDb.get(REDIS_CONFIG.database._user, email).then(res => {
        // //         res == null ? '' : emailStatus = 2;
        // //     })
        // // }
        // // console.log(emailStatus)
        // if(emailStatus == 1){ // 邮箱存在则进行redis缓存
        //     return Promise.reject('该邮箱账号已存在')
        // }
        // else if(emailStatus == 2){
        //     return Promise.reject('验证码已发送')
        // }
    }),
    // body('user.password').notEmpty().withMessage('密码不能为空'),
    // body('user.username')
    // .notEmpty().withMessage('用户名不能为空')
    // .bail()
    // .custom(async username => {
        // let isGo =true; // 是否继续mysql查询
        // let nameResult=false; // 用户名查询结果

        // if(redisConfig.isRedis){ // 是否开启了redis缓存
        // // 查询redis是否存在用户名(存在则跳过mysql查询)
        // await redisDb.hGet(0,'Username.to.id',username).then(res=>{
        //     res==null?isGo=true:isGo=false;
        //     res==null?nameResult=false:nameResult=true;
        // })
        // }

        // if(isGo){
        // // 查询mysql是否存在用户名
        // const isUsername = await Knex.select('user_id').where({user_name:username}).from("lz_users");
        // // await MysqlMethod.select('*','lz_users',`where user_name="${username}"`);
        // isUsername.length>0?nameResult=true:nameResult=false;
        // }
        // // const user = await User.findOne({username})
        // if(nameResult){
        //     return Promise.reject('用户名已存在')
        // }
    // })
])
exports.test = validate([
    check('email').isEmail().normalizeEmail().withMessage('格式不正确').bail(),
    check('password').isLength({ min: 6 }).withMessage('长度不符').bail(),
    check("ff").if(body('newPassword').exists()).bail().isLength({ min: 6 })
    // .custom((value,{req}) => {
    //     console.log(value)
    // })
])