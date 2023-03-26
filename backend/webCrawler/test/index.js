const ora = require('ora');
const fs = require("fs");
const path       = require("path");
const Utils =require('../../util/utils') ;
const puppeteer = require('puppeteer');

let Url = 'http://www.yuedsk.com/fulltop/allvisit/1.html';
let taskName = 'BookList1';
// 地址不能为空
// if (!inputUrl) {
//   ora().warn('请输入需要判断的链接');
//   process.exit();
// }
// process.argv[2]
let formatUrl = new URL(Url);

// 确认是否有缓存node util/test/index.js
let isWebCache = true; // 采集缓存开关
let isWebCacheFile = false; // 缓存文件是否存在
if(isWebCache){
  const initCache = ora('检查缓存中').start()
  isWebCacheFile = Utils.ifExist(`./cache/webCrawler/${formatUrl.host}/${taskName}.json`);
  initCache.stop();
  // console.log(isWebCacheFile);
}

// 开启缓存   缓存存在
if(!(isWebCache && isWebCacheFile)){
  (async () => {
    const init = ora('初始化浏览器环境').start();
    const browser = await puppeteer.launch({
      headless: true // 是否不显示浏览器界面
    })
    init.succeed('初始化完成');
    const loading = ora(`正在前往网址: ${Url}`).start();
    const page = await browser.newPage() // 创建一个新页面
    await page.goto(Url, {
      timeout: 0, // 不限制超时时间
      waitUntil: 'networkidle0'
    })
  
    loading.stop();
    // 网址资源加载完成
    let list = await page.$$eval('#jieqi_page_contents tr', options =>
  //   console.log(options.innerText)
      options.map(option => {
        let [name, zhang, user,dian, time, state] = option.innerText.split(/[\t]/g)
        return { name, zhang, user,dian, time, state }
      })
    )
  // await page.screenshot({ path: 'example.png' });
    console.log(list)
  //   if (list.length == 0) {
  //     ora().fail('请输入正确的网址或IP')
  //     process.exit()
  //   }
  
  //   ora().succeed('获取IP地址完成，尝试连接IP地址')
  
  //   let ipObj = {}
  //   let success = []
  //   let failList = []
  //   let fast = Infinity
  //   let fastIp = ''
  //   for (let i = 0; i < list.length; i++) {
  //     let item = list[i]
  //     let time = parseInt(item.responsetime)
  //     if (!isNaN(time) && !ipObj[item.ip]) {
  //       const tryIp = ora(`尝试 ${item.ip}`).start()
  //       let [res, error] = await awaitWrap(pingIp(item.ip))
  //       if (!error) {
  //         success.push(res.ip)
  //         if (res.time < fast) {
  //           fast = res.time
  //           fastIp = res.ip
  //         }
  //         tryIp.succeed(`${res.ip} 连接成功，耗时:${res.time}ms`)
  //       } else {
  //         failList.push(error.ip)
  //         tryIp.fail(`${error.ip} 连接失败`)
  //       }
  
  //       ipObj[item.ip] = time
  //     }
  //   }
  
  //   if (success.length > 0) {
  //     ora().succeed(`请求成功：${JSON.stringify(success)}`)
  //   }
  //   if (failList.length > 0) {
  //     ora().fail(`请求失败：${JSON.stringify(failList)}`)
  //   }
  
  //   if (fastIp) {
  //     ora().info(`推荐节点: ${fastIp}，时间: ${fast}ms`)
  //     ora().info(`host配置: ${fastIp} ${url}`)
  //   }
  let result = JSON.stringify(list);
  Utils.createFolder(`./cache/webCrawler/${formatUrl.host}`);
      fs.writeFile(`./cache/webCrawler/${formatUrl.host}/${taskName}.json`,result,"utf-8",(error)=>{
          //     //监听错误，如正常输出，则打印null
              if(error==null){
                  console.log("恭喜您，数据爬取成功!请打开json文件，先Ctrl+A，再Ctrl+K,最后Ctrl+F格式化后查看json文件(仅限Visual Studio Code编辑器)"); // ../public/CrawlerExport/
              }
          });
    browser.close() // 关闭浏览器
  })()

}
// node util/test/index.js


// const { awaitWrap, pingIp, moveHttp } = require('./ping');

// let url = moveHttp(inputUrl)

// const BaiseUrl = 'https://ping.chinaz.com/';



//  Folder('./cache/webCrawler/xx/');
// let xx=Utils.ifExist('./cache/webCrawler/xxx/test1.js');
// fs.mkdirSync('./cache/webCrawler/xx/');
// Utils.createFolder('./cache/webCrawler/xx/');
// console.log(xx);
// node util/test/index.js
