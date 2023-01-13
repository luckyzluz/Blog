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
  return status
  // `\x1b[${color}m${status}\x1b[0m`
})

module.exports = morgan( function (tokens, req, res) {
  if(process.env.NODE_ENV == 'development'){
    return JSON.stringify({
      "Method":tokens.method(req, res), // 请求的HTTP方法。
      "Url":tokens.url(req, res), // 请求的URL。这将导致usereq.originalUrlif存在，否则为req.url。
      "Status":tokens.status(req, res), // 响应的状态代码。如果请求/响应周期在响应发送到客户端之前完成（例如，TCP套接字因客户端中止请求而过早关闭），则状态将为空（在日志中显示为“-”）。
      "Response-Time":tokens['response-time'](req, res) + " ms", // 请求进入内存与写入响应头之间的时间
      "User-Agent":tokens['user-agent'](req,res)?tokens['user-agent'](req,res):"", // 请求的User-Agent标头的内容
      "IP":tokens['remote-addr'](req,res), // 请求的远程地址。这将使用usereq.ip，否则使用standardreq.connection.remoteAddressvalue（套接字地址）。
      "Referrer":tokens.referrer(req,res)?tokens.referrer(req,res):"" // 引用页
    })
  }else{
    return JSON.stringify({
      "Http-Version":tokens['http-version'](req, res), // 请求的HTTP版本。 
      "Method":tokens.method(req, res), // 请求的HTTP方法。
      "Url":tokens.url(req, res), // 请求的URL。这将导致usereq.originalUrlif存在，否则为req.url。
      "Status":tokens.status(req, res), // 响应的状态代码。如果请求/响应周期在响应发送到客户端之前完成（例如，TCP套接字因客户端中止请求而过早关闭），则状态将为空（在日志中显示为“-”）。
      "Content-Length":tokens.res(req, res, 'content-length'), // HTTP消息长度
      "Response-Time":tokens['response-time'](req, res) + " ms", // 请求进入内存与写入响应头之间的时间
      "User-Agent":tokens['user-agent'](req,res)?tokens['user-agent'](req,res):"", // 请求的User-Agent标头的内容
      "IP":tokens['remote-addr'](req,res), // 请求的远程地址。这将使用usereq.ip，否则使用standardreq.connection.remoteAddressvalue（套接字地址）。
      "Referrer":tokens.referrer(req,res)?tokens.referrer(req,res):"" // 引用页
    })
  }
}, { stream: logger.stream })
// morgan(morganFormat, { stream: logger.stream })
 
// 代完善，会把  服务器相关信息发送给前端，  不安全