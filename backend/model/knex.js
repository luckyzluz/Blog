// 引用配置文件
const { MYSQL_CONFIG } = require('../config/config.db');
// 把配置文件中的信息，设置在初始化配置中
module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host: MYSQL_CONFIG.host,
    port: MYSQL_CONFIG.port,
    user: MYSQL_CONFIG.user,
    password: MYSQL_CONFIG.password,
    database: MYSQL_CONFIG.database
  },
  useNullAsDefault: true,
  asyncStackTraces:false,
  acquireConnectionTimeout: 10000, // 获取连接超时
  pool: {
    min: 0, // 建议设置min:0，以便可以终止所有空闲连接
    max: 1000
  },
  // 打印错误
  log: {
    warn(message) {
      console.log('[knex warn]:', message)
    },
    error(message) {
      console.log('[knex error]:', message)
    },
    deprecate(message) {
      console.log('[knex deprecate]:', message)
    },
    debug(message) {
      console.log('[knex debug]:', message)
    },
  }
})
