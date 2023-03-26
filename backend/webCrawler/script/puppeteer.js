const ora = require('ora');
const Utils =require('../../util/utils');
const puppeteer = require('puppeteer');
const fs = require("fs");
// 确认是否有缓存node util/test/index.js
let isWebCache = false; // 采集缓存开关
let isWebCacheFile = false; // 缓存文件是否存在
const createPage = async(proxy)=>{
    const browser = await puppeteer.launch({
        // 是否创建无头浏览器
        headless: true,
        // 步骤延时，有助于观察浏览器的每一步操作
        // slowMo: 100,
        executablePath: config.localChromePath,
        args: proxy?[
            // `--window-size=1680,1050`,
            '--proxy-server=61.216.156.222:60808'
        ]:[],
      });
      const page = await browser.newPage();
      // 设置navigator.userAgent,可以做到：比如网站设置了判断ua来跳转移动端站点
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36');
      await page.setViewport({
        width: 1800,
        height: 2000,
      });
      return {
        browser,
        page,
      };
}
// 初始化 - 创建文件夹和文件
const initFolderAndFile = () => {
    const dataFullpath = path.join(__dirname, config.dataFolder);
    // 创建数据文件夹
    if (!fs.existsSync(dataFullpath)) {
      console.log('创建数据文件夹:', dataFullpath);
      fs.mkdirSync(dataFullpath);
    }
    // 创建存储小说的txt文件
    if (!fs.existsSync(txtFileFullpath)) {
      console.log('创建存储小说的txt文件:', txtFileFullpath);
      fs.writeFileSync(txtFileFullpath, '', { encoding: 'utf-8' });
    }
};
// createPage();
module.exports = {createPage,initFolderAndFile}
// async (Url,taskName, callback) => {
//     let formatUrl = new URL(Url);
//     let result;
//     if(isWebCache){
//         const initCache = ora('检查缓存中').start()
//         isWebCacheFile = Utils.ifExist(`./cache/webCrawler/${formatUrl.host}/${taskName}.json`);
//         initCache.stop();
//         // console.log(isWebCacheFile);
//     }
//     if(!(isWebCache && isWebCacheFile)){
//         const init = ora('初始化浏览器环境').start();
//         const browser = await puppeteer.launch({
//             headless: false, // 是否不显示浏览器界面
//             slowMo: 250, // 放慢浏览器执行速度，方便测试观察
//             args: [
//                 // '--proxy-server=socks5://127.0.0.1:1080'
//                 ]
//         })
//         init.succeed('初始化完成');
        
//         result = await callback(browser);
//         // console.log(typeof(result));
//         // console.log(result);
//         // result ? 
//         Utils.createFolder(`./cache/webCrawler/${formatUrl.host}`) 
//         // : '';
//         // result=JSON.stringify(result);
//         // fs.writeFile(`./cache/webCrawler/${formatUrl.host}/${taskName}.json`,result,"utf-8",(error)=>{
//         //     //监听错误，如正常输出，则打印null
//         //     if(error==null){
//         //         // 请打开json文件，先Ctrl+A，再Ctrl+K,最后Ctrl+F格式化后查看json文件(仅限Visual Studio Code编辑器
//         //         console.log("恭喜您，数据爬取成功!)"); // ../public/CrawlerExport/
//         //     }
//         //     });
//         browser.close() // 关闭浏览器node webCrawler/book.js
//     }else{
//         console.log('又换成')
//     }
// };