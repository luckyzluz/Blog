const BasicFunc = require('./script/puppeteer');
const ora = require('ora');
let Url = 'http://www.yuedsk.com/fulltop/allvisit/1.html';
let taskName = 'BookList1';
let xx=async(browser)=>{
    const loading = ora(`正在前往网址: ${Url}`).start();
        const page = await browser.newPage() // 创建一个新页面
        await page.goto(Url, {
            timeout: 0, // 不限制超时时间
            waitUntil: 'networkidle0'
        })
    loading.stop();
    let list = await page.$$eval('#jieqi_page_contents tr', options =>
      options.map(option => {
        let url=option.querySelectorAll("td a")[0].href;
        // console.log(url);
        let [name, zhang, user,dian, time, state] = option.innerText.split(/[\t]/g);
        return { name, zhang, user,dian, time, state,url }
      })
    )
  // await page.screenshot({ path: 'example.png' });
//   let xx=await page.evaluate(() => {
//     let xxc=document.querySelector('#jieqi_page_contents tr')
//   });

// list={xxx:111}
    return list;
}

BasicFunc(Url,taskName,xx);
// node webCrawler/bookList.js