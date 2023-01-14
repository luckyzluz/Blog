const path = require('path');
const fs = require('fs');
const {formatNowDate}=require("../util/utils");
const { createLogger, format, transports, addColors } = require('winston');
require('winston-daily-rotate-file');
const {logConfig} = require('../config/config.log');
/**
 * - 先判断项目根目录是否存在logs文件夹，不存在则创建。
 * - 配置日志等级和颜色
 * - 配置日志以文件存储是的等级和文件名
 * - 自定义日志格式
 * - 创建stream用于添加morgan的Http请求日志信息
 */

// 确保项目根目录存在logs文件夹
const logDirectory = path.resolve('./', 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// 配置等级和颜色
const levelConfig = {
  levels: {
    error: 0, // 错误
    debug: 1, // 调试
    warn: 2, // 警告
    data: 3, // 数据
    info: 4, // 信息
    verbose: 5, // 冗长的
    silly: 6, // 未知
    http: 7 // 请求
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    http: 'yellow'
  }
}

// 添加自定义颜色
// addColors(levelConfig.colors);

// 日志路径配置
const pathConfig = {
  httpLog: {
    level: 'http',
    filename: path.resolve(logDirectory, 'all', formatNowDate("yyyy"), formatNowDate("MM"))
  },
  errorLog: {
    level: 'error',
    filename: path.resolve(logDirectory, 'error', formatNowDate("yyyy"), formatNowDate("MM"))
  }
}

/**
 * winston 输出字符串日志格式设置函数
 * @param {*} info 日志相关信息
 * @returns 
 */
function formatParams(info) {
  let { timestamp, level, message } = info;
  message = message.replace(/[\r\n]/g, '');
  return `[${timestamp}] ${level}: ${message}`;
}
// transport.on('rotate', function(oldFilename, newFilename) {
//   // do something fun
//   console.log(oldFilename,newFilename)
// });

/**
 * winston 日志分割处理函数
 * @param {*} levelName 等级名称（用于文件的命名以及归类）
 * @returns 
 */
let DailyRotateFileTransport = (levelName) => {
  return new (transports.DailyRotateFile)({
    level: levelName,
    filename: levelName?`${levelName}-%DATE%.log`:`%DATE%.log`, // 要用于登录的文件名。此文件名可以包含%DATE%占位符，该占位符将在文件名中包含此时格式化的datePattern。（默认值：“winston.log.%DATE%”）
    datePattern: 'YYYY-MM-DD', //表示用于旋转的moment.js日期格式的字符串。此字符串中使用的元字符将决定文件旋转的频率。例如，如果您的datePattern只是“HH”，那么您将得到24个日志文件，这些文件每天都会被提取并附加到日志文件中。（默认值：'YYYY-MM-DD'）
    zippedArchive: logConfig.zippedArchive,
    dirname:pathConfig[`${levelName}Log`]["filename"],
    maxSize: logConfig.maxFiles, // 文件的最大大小。这可以是字节数，也可以是kb、mb和gb的单位。如果使用单位，请添加“k”、“m”或“g”作为后缀。单位需要直接跟随数字。（默认值：空）
    maxFiles: logConfig.maxFiles, // 要保留的最大日志数。如果未设置，则不会删除任何日志。这可以是多个文件或天数。如果使用天，请添加“d”作为后缀。它使用auditFile以json格式跟踪日志文件。它不会删除其中不包含的任何文件。它可以是多个文件或天数（默认值：空）
    // timestamp: () => new Date().format('yyyy-MM-dd hh:mm:ss.S'),
    // level: levelConfig.levels
  })
}

// logger创建
const logger = createLogger({
  level: 'http',
  levels: levelConfig.levels,
  handleExceptions: true,
  json: true,
  // maxsize: 1228, // 5MB5242880
  // maxFiles: 5, // 上面日志分割进行处理，这里不做处理
  format: format.combine(
    // format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // format.printf(formatParams),
    // format.label(label),
    format.json()
  ),
  transports: [
    DailyRotateFileTransport("error"), 
    DailyRotateFileTransport("http")
  ]
  // [new transports.File(pathConfig.allLog), new transports.File(pathConfig.errorLog), new transports.Console()]
})
  
// 添加morgan日志信息
logger.stream = {
  write: function(message, encoding) {
    // 这里为了json化存储，做了一些处理
    logger.http(JSON.parse(message));
  }
}

/**
 * 归纳请求的相关信息，进行错误日志记录
 * @param {*} msg 信息
 * @param {*} res 请求
 * @param {*} req 响应
 */
logger.reprocess_error=function(msg,res, req) {
  let devErrorLog={
    "Msg":msg,
    "Url":req.originalUrl
  }
  logger.error({
    message:process.env.NODE_ENV == 'development' ? devErrorLog : Object.assign(devErrorLog,{
    "IP" : req.ip,
    "User-Agent" : req.headers['user-agent'],
    "Http-Version" : req.httpVersion,
    "Content-Length":req.headers["content-length"],
    "Method" : req.method,
    "Referer":req.headers.referer ? req.headers.referer : ''
    })
 })
}

module.exports = logger;