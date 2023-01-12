const path = require('path');
const fs = require('fs');
const { createLogger, format, transports, addColors } = require('winston');
require('winston-daily-rotate-file')
/**
 * - 先判断项目根目录是否存在logs文件夹，不存在则创建。
 * - 配置日志等级和颜色
 * - 配置日志以文件存储是的等级和文件名
 * - 自定义日志格式
 * - 创建stream用于添加morgan的Http请求日志信息
 */

const {logConfig} = require('../config/config.log')

// 确保项目根目录存在logs文件夹
const logDirectory = path.resolve('./', 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// 配置等级和颜色
const config = {
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
// addColors(config.colors);

const {formatNowDate}=require("../util/utils")
const options = {
  httpLog: {
    level: 'http',
    filename: path.resolve(logDirectory, 'all', formatNowDate("yyyy"), formatNowDate("MM"))
  },
  errorLog: {
    level: 'error',
    filename: path.resolve(logDirectory, 'error', formatNowDate("yyyy"), formatNowDate("MM"))
  }
}
function formatParams(info) {
    let { timestamp, level, message } = info
    message = message.replace(/[\r\n]/g, '')
    // let xx={}
    // xx["level"]=level
    // return xx
    return `[${timestamp}] ${level}: ${message}`
  }
  // transport.on('rotate', function(oldFilename, newFilename) {
  //   // do something fun
  //   console.log(oldFilename,newFilename)
  // });

  let DailyRotateFileTransport = (fileName) => {
    return new (transports.DailyRotateFile)({
      level: fileName,
    filename: fileName?`${fileName}-%DATE%.log`:`%DATE%.log`, // 要用于登录的文件名。此文件名可以包含%DATE%占位符，该占位符将在文件名中包含此时格式化的datePattern。（默认值：“winston.log.%DATE%”）
    datePattern: 'YYYY-MM-DD', //表示用于旋转的moment.js日期格式的字符串。此字符串中使用的元字符将决定文件旋转的频率。例如，如果您的datePattern只是“HH”，那么您将得到24个日志文件，这些文件每天都会被提取并附加到日志文件中。（默认值：'YYYY-MM-DD'）
    zippedArchive: false,
    dirname:options[`${fileName}Log`]["filename"],
    maxSize: '1k', // 文件的最大大小。这可以是字节数，也可以是kb、mb和gb的单位。如果使用单位，请添加“k”、“m”或“g”作为后缀。单位需要直接跟随数字。（默认值：空）
    maxFiles: '7d', // 要保留的最大日志数。如果未设置，则不会删除任何日志。这可以是多个文件或天数。如果使用天，请添加“d”作为后缀。它使用auditFile以json格式跟踪日志文件。它不会删除其中不包含的任何文件。它可以是多个文件或天数（默认值：空）
    // timestamp: () => new Date().format('yyyy-MM-dd hh:mm:ss.S'),
    // level: config.levels
    })
   }
  // logConfig
  const logger = createLogger({
    level: 'http',
    levels: config.levels,
    handleExceptions: true,
    json: true,
    // maxsize: 1228, // 5MB5242880
    // maxFiles: 5,
    format: format.combine(
      // format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      // format.printf(formatParams),
      // format.label(label),
      format.json({ ip: 'right meow!' })
    ),
    transports: [DailyRotateFileTransport("error"),DailyRotateFileTransport("http")]
    // [new transports.File(options.allLog), new transports.File(options.errorLog), new transports.Console()]
  })
  
  // 添加morgan日志信息
  logger.stream = {
    write: function(message, encoding) {
      // console.log("message:", message)
      // console.log("encoding:"+ encoding)
      logger.http(message)
    }
  }
  
  module.exports = logger