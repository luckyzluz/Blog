//统一处理服务端错误中间件
const morgan = require('morgan')
const logger = require('../util/logger')
 
// 解决自定义格式时响应时间不着色的问题
morgan.token(`status`, (req, res) => {
  const status = (typeof res.headersSent !== `boolean`
  ? Boolean(res._header)
  : res.headersSent)
    ? res.statusCode
    : undefined
  // get status color
  const color =
    status >= 500
      ? 31 // red
      : status >= 400
      ? 33 // yellow
      : status >= 300
      ? 36 // cyan
      : status >= 200
      ? 32 // green
      : 0 // no color
  return `\x1b[${color}m${status}\x1b[0m`
})
 
const devModify = ':method :url :status :response-time ms'
const combinedModify = ':remote-addr :method :url :status :response-time ms :user-agent"'
const morganFormat = process.env.NODE_ENV == 'development' ? devModify : combinedModify
 
module.exports = morgan(morganFormat, { stream: logger.stream })
 
// 代完善，会把  服务器相关信息发送给前端，  不安全