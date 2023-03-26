const BasicFunc = require('./script/puppeteer');
const ora = require('ora');
const Utils = require('../util/utils');
let Url = 'http://www.yuedsk.com/html/1/1124/';
// http://www.yuedsk.com/html/1388/1388982/
let taskName = 'Book';
let xx=async(browser)=>{
    const loading = ora(`正在前往网址: ${Url}`).start();
        const page = await browser.newPage() // 创建一个新页面
        await page.goto(Url, {
            timeout: 0, // 不限制超时时间
            waitUntil: 'networkidle0'
        })
    loading.stop();

    let ccy= await page.$$eval('ul.chapters:nth-child(3) li',options=> {
        return options.map(option =>{
        // let url=option.href;
            let [name] = option.innerText.split(/[\t]/g);
            return {name};
        })
        // return options[1];Page.goBack()
    });
    options.click();
    // return ccy;
  // await page.screenshot({ path: 'example.png' });
//   let xx=await page.evaluate(() => {
//     let xxc=document.querySelector('#jieqi_page_contents tr')
//   });
let result = '';
// ccy.map(async options=>{
//     // let xx='';
//     // await Utils.delay(10000);
//     const loading = ora(`正在获取章节: ${options.name}`).start();
//     await page.goto(options.url, {
//         timeout: 0, // 不限制超时时间
//         waitUntil: 'networkidle0'
//     })
//     loading.stop();
//     result = result + options.name+'\n\n' + await page.$eval("#clickeye_content",option=>{
//         return option.innerText;
//     });
    
//     ora().info(`${options.name}:内容获取成功`);
//     // return result;
    
// })


    // return ccy[1].name+'\n'+result;
    // return result;
}

BasicFunc(Url,taskName,xx);
// node webCrawler/book.js result