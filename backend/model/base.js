const knex = require('../model/knex');
const { mysqlUserKey, mysqlArtKey } = require("../config/config.db")

class Base{
  constructor(props){
    this.table = props;
    if(props == 'lz_users'){
      this.ordername = mysqlUserKey.regtime;
      this.id = mysqlUserKey.id;
    }else if(props == 'lz_article'){
      this.ordername = mysqlArtKey.regtime;
      this.id = mysqlArtKey.id;
    }
  }

  // 查找
  all (order, offset, limit){
    let orders= order ? order : 'desc';
    let pages= offset ? offset - 1 : 0;
    let pieces= limit ? limit : 10;
    return knex(this.table).select().orderBy(this.ordername, orders).limit(pieces).offset(pages);
  }

  /**
   * 
   * @param {*} params {fileld:,options:}
   * @param {*} orders 顺序
   * @returns 
   */
  select (params, order, offset, limit){
    // let result;
    let orders= order ? order : 'desc'
    let pages= offset ? offset - 1 : 0;
    let pieces= limit ? limit : 10;
    let options=params.options;
    if(options){
      return knex.select(params.field).from(this.table).where(options).orderBy(this.ordername, orders).limit(pieces).offset(pages);
    }else{
      return knex.select(params.field).from(this.table).orderBy(this.ordername, orders).limit(pieces).offset(pages);
    }
    // return result;
    // knex.column('id').select().from('lz_member')
  }
  /**
   * 新增
   * @param {*} params 
   * @returns 数组  数据id
   */
  insert (params){
    return knex(this.table).insert(params);
  }

  // 更改
  update (id, params){
    return knex(this.table).where(this.id, '=', id).update(params);
  }

  /**
   * 删除
   * @param {*} id 
   * @returns Number 0: 不存在该条数据  1以及以上代表删除条数
   */
  delete (id){
    return knex(this.table).where(this.id, '=', id).del();
  }

}

module.exports = Base;
