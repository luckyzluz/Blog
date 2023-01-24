/**
 * 数据库配置
 */
const env = process.env.NODE_ENV  // 环境参数

// 连接配置
let MYSQL_CONFIG
let REDIS_CONFIG

if (env === 'development') {
    // mysql
    MYSQL_CONFIG = {
        host: 'localhost', // 主机名 默认： localhost
        port: 3306,        // MySQL 默认端口为 3306
        user: 'root',          // 使用 root 用户登入 MySQL
        password: 'root', // MySQL 密码，用你自己的
        database: 'bkzluz', // 使用数据库bkzluz
        timezone: "local",
        connectTimeout: 30000,//初始连接的超时时间。单位是毫秒(默认:无超时限制)
        multipleStatements: true // 支持执行多条 sql 语句
    }

    // redis
    REDIS_CONFIG = {
        isRedis: true, // 是否开启redis缓存
        port: 6379, // 端口
        host: '127.0.0.1', // 主机名
        password: '570818', // 密码
        detect_buffers: false, // 
        database: {
             _user:0, // 用户存储db
             _article:1 // 文章存储db
        },
        keys: {}
    }
}

if (env === 'production') {
    /* Mysql数据库相关配置 */
    MYSQL_CONFIG = {
        host: 'localhost', // 主机名 默认： localhost
        port: 3306,        // MySQL 默认端口为 3306
        user: 'root',          // 使用 root 用户登入 MySQL
        password: 'root', // MySQL 密码，用你自己的
        database: 'bkzluz', // 使用数据库bkzluz
        timezone: "local",
        connectTimeout:30000,//初始连接的超时时间。单位是毫秒(默认:无超时限制)
        multipleStatements:true // 支持执行多条 sql 语句
    }

    /* redis数据库相关配置 */
    REDIS_CONFIG = {
        isRedis: true, // 是否开启redis缓存
        port: 6379, // 端口
        host: '127.0.0.1', // 主机名
        password: '570818', // 密码
        detect_buffers: false, // 
        database: {
             _user:0, // 用户存储db
             _article:1 // 文章存储db
        },
    }
   
}
/**
 * 数据库键名配置
 */
let mysqlUserKey = { // 用户
    table:'lz_users',
    id: 'user_id',
    name: 'user_name',
    password: 'user_pwd',
    email: 'user_email',
    avatar: 'user_avatar',
    ip: 'user_ip',
    regtime: 'user_regtime',
    nickname: 'user_nickname',
    level: 'user_level'
}
let mysqlArtKey = { // 文章
    table:'lz_article',
    id: 'art_id',
    title: 'art_title',
    password: 'user_pwd',
    email: 'user_email',
    avatar: 'user_avatar',
    ip: 'user_ip',
    regtime: 'user_regtime',
    nickname: 'user_nickname',
    level: 'user_level'
}
module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG,
    mysqlUserKey,
    mysqlArtKey
}