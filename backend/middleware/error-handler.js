//统一处理服务端错误中间件
const util = require('util')

module.exports = () =>{
    return (err,req,res,next) =>{
        res.status(500).json({
            error:util.format(err)
        })
    }
}
// 代完善，会把  服务器相关信息发送给前端，  不安全