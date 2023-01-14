/**
 * 日志配置
 * morgan & winston
 */
module.exports = {
    logConfig:{
      isAllLog: true, // (是否进行所有请求日志记录，error默认一直记录)
      logStorageMode: 'day', // day按天，size  大小
      maxSize: '50m', // 文件的最大大小。如果使用单位，请添加“k”、“m”或“g”作为后缀。单位需要直接跟随数字。（默认值：空）
      maxFiles: '7d', // // 要保留的最大日志数。这可以是多个文件或天数。如果使用天，请添加“d”作为后缀。（默认值：空,不会删除任何日志）
      zippedArchive: false // 用于定义是否gzip存档日志文件的布尔值。（默认值：'false'）
    }
}