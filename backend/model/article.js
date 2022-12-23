const Base = require('./base');

class Article extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'lz_article'){
    super(props);
  }
}

module.exports = new Article();