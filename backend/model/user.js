const Base = require('./base');
const {mysqlUserKey} = require("../config/config.db")
class User extends Base {
  // 定义参数默认值为 user 表
  constructor(props = mysqlUserKey.table){
    super(props);
  }
}

module.exports = new User();