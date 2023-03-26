// puppeteer 配置信息
const config={
    // chrome浏览器的启动文件位置
  localChromePath:
  'C:\\Users\\T008287\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
   // 加载网页的超时时间
  pageTimeout: 0,//30 * 60 * 1000
  // 小说下载在哪个文件夹
  dataFolder: '../book/novel',
  // 段落分隔符
  paraSplit: '\r\n \r\n ---------- \r\n \r\n',
  // 章节标题分隔符
  titleSplit: '\r\n \r\n ----------',
  // 处理耗时
  startTime: +new Date(),
  endTime: +new Date(),
}

module.exports = {
    config
};