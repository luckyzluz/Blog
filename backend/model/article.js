const Base = require('./base');
const {mysqlArtKey} = require("../config/config.db")
class Article extends Base {
  // 定义参数默认值为 user 表
  constructor(props = mysqlArtKey.table){
    super(props);
  }
}

module.exports = new Article();