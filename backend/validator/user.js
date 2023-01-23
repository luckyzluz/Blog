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
const { REDIS_CONFIG, mysqlUserKey } = require("../config/config.db")

// 用户注册前参数验证
exports.register = validate([
    body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .bail()
    .custom(async username => {
        let isGo = false; // 是否继续mysql查询
        let user = []; // 用户信息

        // 查询redis是否存在用户名(存在则跳过mysql查询)
        await redisDb.hGet(REDIS_CONFIG.database._user, 'Username.to.id',  username).then(res=>{ // 返回字符串
            res == null ? isGo = true : isGo = false;
        })

        if(isGo){ // 查询mysql是否存在用户名
            let mysqlSelectParams = {
                field: '*', 
                options: {}
            }
            mysqlSelectParams.options[mysqlUserKey.name] = username;
            user = await User.select(mysqlSelectParams);

            if(user.length !== 0){ // mysql存在,则进行该账号的缓存
                delete user[0].user_pwd;

                // 开始redis写入
                await redisDb.hSet(REDIS_CONFIG.database._user, 'UsersInfo', user[0].user_id, JSON.stringify(user[0]));

                await redisDb.hSet(REDIS_CONFIG.database._user, 'Username.to.id', user[0].user_name, user[0].user_id);

                await redisDb.hSet(REDIS_CONFIG.database._user, 'Email.to.id', user[0].user_email, user[0].user_id);

                // 这里只要mysql写入成功即可，redis失败无所谓(读时redis不存在则取mysql，进行缓存)
                return Promise.reject('用户名已存在')
            }
        }else{
            return Promise.reject('用户名已存在');
        }
    }),
    body('user.password')
    .notEmpty()
    .withMessage('密码不能为空')
    .bail()
    .custom(async password => {
        if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(password)==false){
            return Promise.reject('密码不符合规定，请重新编辑')
        }
    }),
    body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .bail()
    .isEmail().withMessage('邮箱格式不正确')
    .bail()
    .custom(async email => {
        let isGo = true; // 是否继续mysql查询
        let user = []; // 用户信息

        await redisDb.hGet(0, 'Email.to.id', email).then(res => {
            res == null ? isGo = true : isGo = false;
        })

        if(isGo){ // redis不存在数据，开始查询mysql
            let mysqlSelectParams = {
                field: '*',
                options: {}
            }
            mysqlSelectParams.options[mysqlUserKey.email] = email;

            user = await User.select(mysqlSelectParams);

            if(user.length !== 0){ // mysql查询数据成功
                delete user[0].user_pwd;
                // 开始redis写入
                await redisDb.hSet(REDIS_CONFIG.database._user, 'UsersInfo', user[0].user_id, JSON.stringify(user[0]));

                await redisDb.hSet(REDIS_CONFIG.database._user, 'Username.to.id', user[0].user_name, user[0].user_id);

                await redisDb.hSet(REDIS_CONFIG.database._user, 'Email.to.id', user[0].user_email, user[0].user_id);

                // 这里只要mysql写入成功即可，redis失败无所谓(读时redis不存在则取mysql，进行缓存)
                return Promise.reject('邮箱已存在')
            }
        }else{
            return Promise.reject('邮箱已存在');
        }
    })
])

// 用户登录前参数验证
exports.login = [
    validate([
        // body('user.username').notEmpty().withMessage('账户不能为空'),
        body('user.email').notEmpty().withMessage('邮箱不能为空'),
        body('user.password').notEmpty().withMessage('密码不能为空')
    ]),
    validate([
        body('user.email').custom(async (email, {req,res}) => {
            let isGo = true; // 是否继续mysql查询
            let user = []; // 用户信息

            await redisDb.hGet(REDIS_CONFIG.database._user, 'Email.to.id', email).then(res => {
                // res==null意味着redis缓存数据不存在
                res==null ? isGo = true : isGo = false;
                res==null ? "" : req.user = { 'user_id': res };
            })

            if(isGo){
                let mysqlSelectParams = {
                    field: '*',
                    options: {}
                }
                mysqlSelectParams.options[mysqlUserKey.email] = email;

                user = await User.select(mysqlSelectParams);

                if(user.length !== 0){  // mysql查询数据成功
                    delete user[0].user_pwd;
                    // 开始redis写入
                    await redisDb.hSet(REDIS_CONFIG.database._user, 'UsersInfo', user[0].user_id, JSON.stringify(user[0]));

                    await redisDb.hSet(REDIS_CONFIG.database._user, 'Username.to.id', user[0].user_name, user[0].user_id);

                    await redisDb.hSet(REDIS_CONFIG.database._user, 'Email.to.id', user[0].user_email, user[0].user_id);
                }else{
                    return Promise.reject('用户不存在')
                }
            }
        })
    ]),
    validate([
        body('user.password').custom(async (password,{req,res}) => {
            let pwdMysql = ""; // 是否继续mysql查询

            if(req.user && req.user.user_pwd){ //确保数据存在
                pwdMysql = req.user.user_pwd;
            }else{ //密码数据不存在
                let mysqlSelectParams = {
                    field: 'user_pwd',
                    options: {}
                }
                mysqlSelectParams.options[mysqlUserKey.id] = req.user.user_id;
                
                let queryPwd = await User.select(mysqlSelectParams);
                pwdMysql = queryPwd[0][mysqlUserKey.password];
            }
            // console.log(pwdMysql,md5(password))
            if(md5(password) !== pwdMysql){
                return Promise.reject('密码错误');
                }
            
        })
    ])
]

// 用户更新前参数验证
exports.put = validate([
    // body('user.username')
    // .notEmpty().withMessage('用户名不能为空')
    // .bail()
    // .custom(async username => {
    //         // return Promise.reject('用户名已存在')
    // }),
])

// 用户更新密码参数验证
exports.cipher = validate([
    body('password')
    .notEmpty().withMessage('密码不能为空')
    .bail()
    .custom(async password => {
            // return Promise.reject('用户名已存在')
            if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(password)==false){
                return Promise.reject('密码不符合规定，请重新编辑')
            }
    }),
])