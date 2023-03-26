const puppeteer = require('puppeteer');
const {verifya}=require('./ify');
let xx= async()=>{
    browser = await puppeteer.launch({
        headless:false,
        executablePath: 'C:\\Users\\T008287\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
        args: [
        //'--proxy-server=socks5://127.0.0.1:12580'https://www.proxy-list.download/HTTP
        ]
    });
    // file:///C:/Users/T008287/Desktop/Study/project/Blog/frontend/frontpage/src/assets/iconfont/demo_index.html
    const page = await browser.newPage();
    await page.emulate(puppeteer.KnownDevices['iPhone 6']);
    // await page.setRequestInterception(true);
    // page.on('request',request=>{
    //     if(request.resourceType()==='script'){
    //         request.abort();

    //     }else{
    //         request.continue();
    //     }
    // })
    await page.goto('http://hdyp.net/31/31368/715604_4.html', {
        timeout: 0, // 不限制超时时间
        
        waitUntil: 'networkidle0'
    })
    // let humanInput=await page.$('#password',xx=>{
    //     return xx;https://7yydstxt178.com/
    // });
    // if(humanInput!==null){
    //     humanInput.type('1234',{delay:20});
    //     let humansub=await page.$('.login');
    //     humansub.click();
    //     await page.waitForNavigation();
    // }
    // console.log(humanInput==null);
    // 
    // node webCrawler\test.js
    
      //页面登录成功后，需要保证redirect 跳转到请求的页面
    //    await page.waitForNavigation();
    
    //    return await page.content();
    
    
let column = await page.$$eval('.page-content .neirong',xx=>{
    return [xx[0].innerHTML];
});
column= verifya(column[0]);
    console.log(column)

    browser.close();
}
xx();

// node webCrawler\test.js

// 
// str=verify1('xx');
// console.log(str)
// node webCrawler\test.js
// node webCrawler\book\hdyp.js