const mysql = require("mysql");
const {dbMysqlConfig} = require('../config/config.default')
class db  {
  constructor(databaseName){
    this.connection = mysql.createPool(dbMysqlConfig)
    this.common = [
      {
        message: "服务器出现问题",
        status: 500
      },
      {
        message: "无法访问资源",
        status: 404
      },
    ]
  }
  /**
   * 
   * @param {*} name 要查询的字段名称,用(,)隔开
   * 
   * @param {*} tableName 要查询的表名
   * 
   * @param {*} options 选择条件,字符串形式,要写where，如where id = 1
   */
  select(name,tableName,options) {
    let self = this
    return new Promise((resolve, reject) =>{

      self.connection.getConnection(function (err, conn) {  
        if(err){
          console.log(err)
          reject (self.common[0])
        }else{
          let sql = `select ${name.toString()} from ${tableName} ${options}`
          console.log(sql)
          conn.query(sql,function (err, result) {  
            if(err){
              reject (self.common[1])
            }
            conn.release()
            console.log({
              status: 200,
              message:'成功',
              data:result
            })
            resolve({
              status: 200,
              message:'成功',
              data:result
            })
          })
        }
      })
    }).catch(err => err)
  }
  /**
   * 
   * @param {*} tableName 插入的表名
   * 
   * @param {*} name 插入的字段名,多个字段用(,)隔开 
   * 
   * @param {*} value 插入的字段值,多个字段用(,)隔开,字符串类型要加上引号
   */
  insert(tableName,name, value){
    let self = this;
    return new Promise((resolve,reject) => {
      self.connection.getConnection(function(err, conn){
        if(err){
          console.log(err)
          reject(self.common[0])
        }else{
          let sql = `insert into ${tableName} (${name}) values (${value})`
          conn.query(sql,function(err, result){
            if(err){
              console.log(err)
              reject(self.common[1])
            }
            conn.release();
            resolve({
              message:'成功',
              status:200,
              data: result
            })
          })
        }
      })
    }).catch(err =>{
      return err
    })
  }
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
  update(tableName,name,value, option){
    let self = this;
    return new Promise((resolve, reject) => {
      self.connection.getConnection(function(err, conn){
        if(err){
          console.log(err);
          reject (self.common[0])
        }else{
          let sql = `update ${tableName} set ${name} = ${value} ${option}`
          conn.query(sql, function(err, result) {
            if(err){
              console.log(err);
              reject(self.common[1])
            }
            conn.release();
            resolve({
              message:'成功',
              status:'200',
              data:result
            })
          })
        }
      })
    }).catch(err => err)
  }
  /**
   * 
   * @param {*} tableName 删除字段所在的表名
   * 
   * @param {*} option 特殊条件,要带有where
   */
  delete(tableName, option){
    let self  = this
    new Promise((resolve, reject) => {
      self.connection.getConnection(function(err, conn) {
        if(err){
          console.log(err);
          reject(self.common[0])
        }else{
          let sql = `DELETE FROM ${tableName} ${option}`
          conn.query(sql, function(err, result) {
            if(err){
              reject(self.common[1])
            }
            conn.release();
            console.log({
              data:result,
              message:"成功",
              status:200
            })
            resolve({
              data:result,
              message:"成功",
              status:200
            })
          })
        }
      })
    }).catch(err => err)
  }
}
module.exports = db
