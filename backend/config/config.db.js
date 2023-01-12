// /**
//  * 数据库键名配置
//  */
//  module.exports = {
//     art,
//     user:{
        
//     }
// }
const env = process.env.NODE_ENV  // 环境参数

// 配置
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
        connectTimeout:30000,//初始连接的超时时间。单位是毫秒(默认:无超时限制)
        multipleStatements:true // 支持执行多条 sql 语句
    }

    // redis
    REDIS_CONFIG = {
        isRedis:true,//是否开启redis缓存
        port:6379,
        host:'127.0.0.1',
        password:'570818',
        detect_buffers: false,
        database:{
            _user:0,
            _article:1
        },
    }
}

if (env === 'production') {
   
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}