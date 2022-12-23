// const mysql = require("mysql");
const db = require('../model/index')
// class db  {
//   constructor(databaseName){
//     this.connection = mysql.createPool({
//         host:"localhost",
//         user:"root",
//         password:"123456",
//         database:databaseName
//     })
//     this.common = [
//       {
//         message: "服务器出现问题",
//         status: 500
//       },
//       {
//         message: "无法访问资源",
//         status: 404
//       },
//     ]
//   }
module.exports ={
  xx: async function(sql,params) {
    // let self = this
    return new Promise((resolve, reject) =>{
    db.query(sql,params, function(results,fields){
        resolve(results)
    })
    }).catch(err => reject(err))
  },
  // 单条sql执行语句
  /**
   * 
   * @param {*} name 要查询的字段名称,用(,)隔开
   * 
   * @param {*} tableName 要查询的表名
   * 
   * @param {*} options 选择条件,字符串形式,要写where，如where id = 1
   */
  select: function(name,tableName,options) {
    // let self = this
    return new Promise((resolve, reject) =>{

    //   self.connection.getConnection(function (err, conn) {  
        // if(err){
        //   console.log(err)
        //   reject (self.common[0])
        // }else{
          let sql = `select ${name.toString()} from ${tableName} ${options}`
          // console.log(sql)
          db.query(sql,function (err, results) {
            // console.log("111")  
            if(err){
                throw err
            //   reject (self.common[1])
            }
            // conn.release()
            // console.log({
            //   status: 200,
            //   message:'成功',
            //   data:result
            // })
            // console.log(results)
            resolve(results
            //   {
            //     total:results.length,
            //   message:'查询成功',
            //   data:results
            // }
            )
          })
        // }
    //   })
    }).catch(err => err)
  },
  /**
   * 
   * @param {*} tableName 插入的表名
   * 
   * @param {*} name 插入的字段名,多个字段用(,)隔开 
   * 
   * @param {*} value 插入的字段值,多个字段用(,)隔开,字符串类型要加上引号
   */
  insert:function(tableName,name, value){
    // let self = this;
    return new Promise((resolve,reject) => {
    //   self.connection.getConnection(function(err, conn){
        // if(err){
        //   console.log(err)
        //   reject(self.common[0])
        // }else{
          let sql = `insert into ${tableName} (${name}) values (${value})`
          // console.log(sql)
          db.query(sql,function(err, results){
            if(err){
                throw err
            //   reject(self.common[1])
            }
            // conn.release();
            resolve(results)
          })
        // }
    //   })
    }).catch(err =>{
      return err
    })
  },
  /**
   * 
  * @param {*} tableName 修改字段所在的表名
  * 
   * @param {*} name 需要修改的字段名称
   * 
   * @param {*} value 修改的值 
   * 
   * @param {*} option 特殊条件,要带有where
   */
  update:function(tableName,name,value, option){
      let updatestr=''
      for(let i=0;i<name.length;i++){
        updatestr+=`${name[i]}=${value[i]},`
      }
      updatestr = updatestr.substring(0, updatestr.length - 1); 
    // let self = this;
    return new Promise((resolve, reject) => {
    //   self.connection.getConnection(function(err, conn){
        // if(err){
        //   console.log(err);
        //   reject (self.common[0])
        // }else{
        //   let sql = `update ${tableName} set ${name} = ${value} ${option}`
        let sql = `update ${tableName} set ${updatestr} ${option}`
          db.query(sql, function(err, result) {
            if(err){
                throw err;
            //   reject(self.common[1])
            }
            // conn.release();
            resolve(result
            //   {
            //   message:'成功',
            //   status:'200',
            //   data:result
            // }
            )
          })
        // }
    //   })
    }).catch(err => err)
  },
  /**
   * 
   * @param {*} tableName 删除字段所在的表名
   * 
   * @param {*} option 特殊条件,要带有where
   */
  delete:function(tableName, option){
    // let self  = this
    return new Promise((resolve, reject) => {
    //   self.connection.getConnection(function(err, conn) {
        // if(err){
        //   console.log(err);
        //   reject(self.common[0])
        // }else{
          let sql = `DELETE FROM ${tableName} ${option}`
          db.query(sql, function(err, results) {
            if(err){
                throw err;
            //   reject(self.common[1])
            }
            // db.release();
            // console.log({
            //   data:result,
            //   message:"成功",
            //   status:200
            // })
            resolve(results
            //   {
            //   data:results,
            //   message:"成功",
            //   status:200
            // }
            )
          })
        // }
    //   })
    }).catch(err => err)
  },
  morequery:function(sql){

  }
}
// module.exports = MysqlMethod
