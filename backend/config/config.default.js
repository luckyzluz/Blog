/**
 * 默认配置
 */
module.exports = {
    PORT: 3000, // express 服务启动端口(默认3000)
    ENV:"development", // development production test
    /* Mysql数据库相关配置 */
    dbMysqlConfig: {
      host: 'localhost', // 主机名 默认： localhost
      port: 3306,        // MySQL 默认端口为 3306
      user: 'root',          // 使用 root 用户登入 MySQL
      password: 'root', // MySQL 密码，用你自己的
      database: 'bkzluz', // 使用数据库bkzluz
      timezone: "local",
      connectTimeout:30000,//初始连接的超时时间。单位是毫秒(默认:无超时限制)
      multipleStatements:true // 支持执行多条 sql 语句
    },
    jwtSecret:'9faea7c8-67aa-11ec-90d6-0242ac120003',
    yuqueConfig:{
      AccessToken:"x9VOFtj9D4VFNceGrD9nKKdSOCPurCWh9Nkurpjc",
      user:"luckyzluz",
      baseUrl:"https://www.yuque.com/api/v2"
    },
    /* Redis数据库相关配置 */
    redisConfig:{
      isRedis:true,//是否开启redis缓存
      port:6379,
      host:'127.0.0.1',
      password:'570818',
      detect_buffers: false,
      database:{
        _user:0,
        _article:1
      },

    },
    video:{
      videoApi:[
        {
          name:"M3u8",
          url:"https://www.m3u8.tv.cdn.8old.cn/jx2022/index..php",
          delete:""
        },
        {
          name:"测试1",
          url:"https://json.hfyrw.com/mao.go",
          delete:"Mao"
        }
      ],
      videoUrl:[
        {
          name:"M3u8",
          url:"https://jx.m3u8.tv/jiexi/?url="
        },
        {
          name:"parwix",
          url:"https://jx.parwix.com:4433/player/?url="
        },
        {
          name:"iztyy",
          url:"https://jx.iztyy.com/svip/?url="
        },
        {
          name:"M3u8",
          url:"https://jx.iztyy.com/svip/?url="
        },
        {
          name:"忘忧国",
          url:"https://ax.jx.cn/?url="
        }
    ]
    },
    EmailVerifyConfig:{
      isEmailVerify:false,
      smtpConfig:{
        host: 'smtp.qq.com',
        port: 465,
        secure: true, // 使用 SSL
        secureConnection: true, // 使用 SSL
        auth: {
          user: '2567046155@qq.com', //注册的邮箱账号
          pass: 'eckhfvvstjendjgh' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
        }
      }
    }
}