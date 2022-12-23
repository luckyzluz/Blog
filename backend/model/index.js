/**
 * Mysql数据库
 */
const mysql = require("mysql");
const {dbMysqlConfig} = require('../config/config.default')

var pool = mysql.createPool(dbMysqlConfig);
module.exports = {
    /**
     * 
     * @param {*} sql 语句
     * @param {*} params 参数
     * @param {*} callback 回调
     */
    query : function (sql, params, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log("Mysql 数据库连接失败")
                callback(err, null, null);
                // pool.releaseConnection(conn);
                throw err;
            }
                // console.log("Mysql 数据库连接成功") 
                // console.log(conn.escape(params))
                conn.query(sql, params,function (qerr, results, fields) {
                    if (qerr) {
                        //释放连接    
                        // conn.release();
                        pool.releaseConnection(conn);
                        console.log('执行sql语句失败');
                        throw qerr;
                    }
                    //事件驱动回调    
                    // callback(qerr, results, fields);
                    // --------------
                    //将查询出来的数据返回给回调函数，这个时候就没有必要使用错误前置的思想了，因为我们在这个文件中已经对错误进行了处理，如果数据检索报错，直接就会阻塞到这个文件中
                        //这一句是原版的结果插入操作时候报错，改成下面的一句就好了
                        // callback && callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)));
                        callback && callback((JSON.stringify(results)), (JSON.stringify(fields)));
                    //释放连接    
                    // conn.release();
                    
                });
            // }
            // pool.releaseConnection(conn);
        });
}}
// let params=[];
// query(sql,params, function (err, result, fields) {
//     console.log(result)
// });
// 组织导出模型
// module.exports=query