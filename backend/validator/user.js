/**
 * 用户数据验证
 */
const {body} =require('express-validator')
const validate = require('../middleware/validator')
const MysqlMethod = require('../util/mysql')
const User = require('../model/user.js'); // knex
const Knex = require('../model/knex');
const {redisDb,redlock} = require('../util/redis');
const { redisConfig } = require('../config/config.default')
const md5 = require('../util/md5')
const { REDIS_CONFIG, mysqlUserKey } = require("../config/config.db")
const{ QueryMysqlUserInfos,CachingRedisUserInfos,QueryUserInfos } = require('../util/User');

// 用户注册前参数验证
exports.register = validate([
    body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .bail()
    .custom(async username => {
        let knexSelectParams = {};
        knexSelectParams[mysqlUserKey.name] = username;
        let user = await QueryUserInfos(knexSelectParams);
        if(user.length !== 0){ 
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
        let knexSelectParams = {};
        knexSelectParams[mysqlUserKey.email] = email;
        let user = await QueryUserInfos(knexSelectParams);
        if(user.length !== 0){ 
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
            let knexSelectParams = {};
            knexSelectParams[mysqlUserKey.email] = email;
            let queryResult = await QueryUserInfos(knexSelectParams,true);

            let user = {};
            typeof(queryResult[0]) == "object" ? user = queryResult[0] : user[mysqlUserKey.id] = queryResult[0];
            req.user =user;
            if(user.length == 0){ 
                return Promise.reject('邮箱不存在');
            }
        })
    ]),
    validate([
        body('user.password').custom(async (password,{req,res}) => {
            let pwdMysql = ""; // 是否继续mysql查询
            // console.log(req.user)
            if(req.user.user_pwd){ //确保数据存在
                pwdMysql = req.user.user_pwd;
            }else{ //密码数据不存在
                let mysqlSelectParams = {}
                mysqlSelectParams[mysqlUserKey.id] = req.user.user_id;
                let queryPwd = await QueryMysqlUserInfos(mysqlSelectParams);
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