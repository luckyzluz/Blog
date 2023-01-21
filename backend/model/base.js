const knex = require('../model/knex');

class Base{
  constructor(props){
    this.table = props;
  }

  // 查找
  all (){
    return knex(this.table).select();
  }
  select (params,orders){
    // let result;
    let orderx=orders?orders:{
      name:'user_regtime',
      order:'desc'
    }
    let options=params.options;
    if(options){
      return knex.select(params.field).from(this.table).where(options).orderBy(orderx.name, orderx.order)
    }else{
      return knex.select(params.field).from(this.table).orderBy(orderx.name, orderx.order)
    }
    // return result;
    // knex.column('id').select().from('lz_member')
  }
  // 新增
  insert (params){
    return knex(this.table).insert(params);
  }

  // 更改
  update (id, params){
    return knex(this.table).where('user_id', '=', id).update(params);
  }

  // 删除
  delete (id){
    return knex(this.table).where('id', '=', id).del();
  }

}

module.exports = Base;
