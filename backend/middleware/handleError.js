const logger = require('../util/logger')


// 错误捕捉
module.exports = (err, req, res, next) => {
    logger.error(err.message)
    res.status(500).send({
      success: false,
      message: err.message
    })
  }
  





// module.exports = () =>{
//     return (err,req,res,next) =>{
//         res.status(500).json({
//             error:util.format(err)
//         })
//     }
// }