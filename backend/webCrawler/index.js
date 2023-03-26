//导入依赖包
import ora from 'ora';

const spinner = ora('Loading unicorns').start();
const http       = require("http");
const path       = require("path");
const url        = require("url");
const fs         = require("fs");
// const superagent = require("superagent");
// const proxy = require("superagent-proxy")
// const cheerio    = require("cheerio");
// const userAgents= require('./userAgents');
// const Referer= require('./Referer');
// const proxyUrl = require('./proxy');
// let ProxyStr= 'http://117.114.149.66:55443';
// proxyUrl();
// let RefererStr = Referer("https://www.126yun.cn/article?tag=3/",'china');
// let userAgentsStr = userAgents();
// console.log(ProxyStr,RefererStr,userAgentsStr)
// proxyUrl()
// proxy(superagent);
// console.log(userAgents('phone'))// .proxy(ProxyStr)'Referer': Referer("https://luckyzluz.github.io/",'china'),
        // 'X-Forwarded-For': xx // 设置伪造的 X-Forwarded-For 头部，隐藏真实 IP 地址
const puppeteer = require('puppeteer');

(async () => {
    // 启动浏览器
    const browser = await puppeteer.launch({
        headless: true // 是否 不显示浏览器界面
      });

    // 打开新页面
    const page = await browser.newPage();

    // 设置页面视窗大小
    // await page.setViewport({ width: 1366, height: 768 });

    // 设置请求头信息
    // await page.setExtraHTTPHeaders({
    // 'X-Forwarded-For': '1.2.3.4',
    // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    // 'Referer': 'https://www.google.com/'
    // });

    // 导航到目标网址
    await page.goto('https://luckyzluz.github.io/',{
        timeout: 0, // 不限制超时时间https://luckyzluz.github.io/
        waitUntil: 'networkidle0'
    });
//     let list = await page.$$eval('#speedlist .listw', options =>
//   options.map(option => {
//     let [city, ip, ipaddress, responsetime, ttl] = option.innerText.split(/[\n]/g)
//     return { city, ip, ipaddress, responsetime, ttl }
//   })
// )

    // 等待目标元素加载完成
    // await page.waitForSelector('.page');

    // 获取目标元素的文本内容
    const targetText = await page.$eval('.author-info__description', el => el.textContent);

    console.log(targetText);
    // fs.writeFile("./public/CrawlerExport/boss.html",result,"utf-8",(error)=>{
    //     //     //监听错误，如正常输出，则打印null
    //         if(error==null){
    //             console.log("恭喜您，数据爬取成功!请打开json文件，先Ctrl+A，再Ctrl+K,最后Ctrl+F格式化后查看json文件(仅限Visual Studio Code编辑器)"); // ../public/CrawlerExport/
    //         }
    //     });
    // 关闭浏览器
    await browser.close();
})();
    // node util/webCrawler/index.js