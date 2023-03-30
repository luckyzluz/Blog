// const puppeteer = require('../script/puppeteer');
// 单行进度打印
const singleLog = require('single-line-log2').stdout;
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const {verifya}=require('./Verify.js');
const {delay}=require('../util/tool');

// const proxyserver= require("../script/proxyserver");

// 配置信息
const {config} = require('../script/config');
// const bookUtils = require('../script/book');
const WebConfig = {
  // http://hdyp.net/20/20116_2/
  // http://hdyp.net/17/17658/
  // http://hdyp.net/29/29316/
  // http://hdyp.net/1/1878/
  // http://hdyp.net/32/32075/
  // http://hdyp.net/29/29040/
  // http://hdyp.net/28/28062/
  // http://hdyp.net/27/27349/
  // -----
  // http://hdyp.net/13/13105/
  // http://hdyp.net/13/13106/
  // http://hdyp.net/13/13107/
  // http://hdyp.net/13/13108/
  // http://hdyp.net/13/13109/
  // http://hdyp.net/19/19099/
    indexUrl: 'http://hdyp.net/27/27931/',// 小说目录页
    chapterUrlPrefix: 'http://hdyp.net',// 目录每一章链接的前缀
    novelInfoCls: 'div.bd.column-2 > .right', // 目录页小说书名作者等信息
    linkpagingCls:'.pagelistbox',
    linkCls: '.container div.chapter-list .bd ul li a', //目录页每一章的a标签的css选择器
    adCls: [],// 要移除的广告标签的css选择器 （每一章内容区域内的广告和不需要的部分）'.google-auto-placed', '#p_ad_t3', '#content>p:last-child'
    titleCls: '.page-title',// 章节标题类名 css选择器
    contentpagingCls:'.chapterPages a',
    contentCls: '.page-content .neirong', // 每一章内容区域 css选择器
    // 开始章节下标 0 ~ length-1 的数字
    // startIndex: 2,
    // 爬取多少章 startIndex + count - 1 不能超过总章节数
    // count: 1,
};
const start = (config, novelConfig) => {
    console.log(`================ 开始 ${novelConfig.name} ================`);
    config.startTime = +new Date();
    const bugConfig = novelConfig;
    // 小说配置信息 - 读取小说配置
    // if (!bugConfig.txtFileName) {
    //     bugConfig.txtFileName = bqgConfig.getPinYin(bugConfig.name) + '.txt';
    // }
    console.log('小说配置信息获取成功');
    // 小说目录页
    let site = bugConfig.indexUrl;
    // 目录每一章链接的前缀
    const chapterSitePrefix = bugConfig.chapterUrlPrefix;
    // 小说文件名
    let txtFileName;
    let txtFileFullpath;
    // path.join(
    //   __dirname,
    //   config.dataFolder,
    //   txtFileName
    // );
    // 目录页小说书名作者等信息
    const novelInfoCls = bugConfig.novelInfoCls;
    // 目录页每一章的a标签的css选择器
    const linkCls = bugConfig.linkCls;
    // 要移除的广告标签的css选择器 （每一章内容区域内的广告和不需要的部分）
    const adCls = bugConfig.adCls;
    // 章节标题类名 css选择器
    const titleCls = bugConfig.titleCls;
    // 每一章内容区域 css选择器
    const contentCls = bugConfig.contentCls;
    const contentCls_1 = bugConfig.contentCls_1;
    
    // 获取当前txt内容（以便进行 新旧合并）
    const getCurrentTxtData = () => {
        const txtData = fs.readFileSync(txtFileFullpath, { encoding: 'utf-8' });
        const fileTxt = txtData.toString();
        // console.log('当前数据:');
        // console.log(fileTxt);
        return fileTxt;
    };
    // 覆盖txt内容
    const updateTxtFile = (data) => {
        const curCon = getCurrentTxtData();
        fs.writeFileSync(txtFileFullpath, curCon + data, { encoding: 'utf-8' });
    };
    // 初始化 - 创建文件夹和文件
    const initFolderAndFile = () => {
        const dataFullpath = path.join(__dirname, config.dataFolder); //存储文件夹
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
    

    // 创建浏览器page对象
    const createPage = async () => {
        // const iPhone = puppeteer.devices['iPhone 6'];
        const browser = await puppeteer.launch({
          // 是否创建无头浏览器deviceMap
          headless: true,
          // 步骤延时，有助于观察浏览器的每一步操作
          // slowMo: 3000,
          executablePath: config.localChromePath,
          args: [
            // `--window-size=1680,1050`,
            // '--proxy-server=61.216.156.222:60808'
        ],
        });
        const page = await browser.newPage();
        await page.emulate(puppeteer.KnownDevices['iPhone 6']);
        // 设置navigator.userAgent,可以做到：比如网站设置了判断ua来跳转移动端站点
        // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36');
        // await page.setViewport({
        //   width: 1800,
        //   height: 2000,
        // });
        await page.setRequestInterception(true);
        // req.resourceType() === "image" ||
        // req.resourceType() === "stylesheet" ||
        // req.resourceType() === "font" ||
        // req.resourceType() === "texttrack" ||
        // req.resourceType() === "imageset" ||
        // req.resourceType() === "bacon" ||
        // req.resourceType() === "csp_report" ||
        // req.resourceType() === "object"
    page.on("request", (req) => {
      if (
        req.resourceType() === "image"||req.resourceType() === "stylesheet"||req.resourceType() === "font"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });
        return {
          browser,
          page,
        };
    };

    // 处理小说名称等信息
    const handleNovelInfo = async (page) => {
        const infos = await page.$eval(
          novelInfoCls,
          (dm, config) => {
            // console.log(dm.innerText)
            // txtFileName=dm.children[0].innerText;
            
            // 这里将章节和作者信息拼接到txt 段落分隔符
            return {name:dm.children[0].innerText,info:dm.innerText + config.paraSplit};
            // return dm.innerText + config.paraSplit;
          },
          config
        );
        // initFolderAndFile();
        txtFileFullpath=path.join(
          __dirname,
          config.dataFolder,
          infos.name+'.txt'
        );;
        initFolderAndFile();
        fs.writeFileSync(txtFileFullpath, infos.info, { encoding: 'utf-8' });
    };
    // 处理章节列表数据
    const handleChapterList = async (page) => {
        let list = await page.$$eval(linkCls, (links) => { // 
          let Lists = links.map((v, i) => {
            // console.log(v.innerText)
            return {
              // _index: i,
              url: v.getAttribute('href'),
              title: v.innerText,
            };
          });
          if(Lists.length>=6){//最新章节只显示3个，最新+每页总共有6个
            Lists.splice(0,3);
          }else{//不可能为5个，2+2=4  1+1=2
            Lists.splice(0,(Lists.length/2));
          }
          return Lists;
        });
        
        // console.log(list); // node webCrawler\book\hdyp.js
        return list;
    };
    // 获取每一章的内容
    const getChapterTxt = async (list) => {
        let txt = ''; // 文本数据
        const len = list.length; // 处理过的章节列表数据
        let contentListNum=1; //文章内容分页数
        let idxcontent=1;//内容分页起止数
        const { browser, page } = await createPage();
        // 开始章节的下标，从0开始，到 list.length - 1 结束
        const startIndex = bugConfig.startIndex - 1 || 0;
        // 需要几章
        const count = bugConfig.count || list.length; // list.length
        // 爬取结束的下标 如果大于数据最后一个下标，就选择len-1
        const end = startIndex + count - 1;
        const endIndex = end > len ? len : end;
        

        console.log(`设置爬取章节数：`, count);

        console.log(`设置的开始章节：第 `, startIndex + 1, ' 章,', list[startIndex].title);
        console.log(`设置的结束章节：第 `, endIndex + 1, ' 章,', list[endIndex].title);
        let idx = startIndex;  // 开始章节

        // 获取加载页面信息
        await page.on('load', async () => {
          // const pageUrl = page.url();
          // console.log('pageUrl:'+pageUrl);
          // console.log(`获取第${idx + 1}/${len}章内容... url:`, pageUrl);
          // 单行进度打印contentpagingCls
          // 获取文章  分页数量
          if(bugConfig.contentpagingCls&&idxcontent==1){
            // console.log(page.url());
            // 如果章节存在分页，则获取分页数量
            contentListNum = await page.$$eval(bugConfig.contentpagingCls,num=>{
              let xx=1;
              if(num.length <= 0){
                // return num.length;
              }else{
                xx=num.length;
                // return 1;
              }
              console.log('xx:'+num.length);
              return xx;
            });
          }
          if(bugConfig.contentpagingCls){ //contentListNum
            // singleLog(`获取进程: ${idxcontent}/${idx + 1}/${len}(分页/当前章节/总章节)...\n`);
            singleLog(`正在获取: 第${idx + 1}/${len}章内容...\n当前进行第${idxcontent}/${contentListNum}分页内容...\n`);
          }else{
            singleLog(`正在获取第 ${idx + 1}/${len} 章内容...\n`);
          }
  
        //   章节标题
          const title = `第${idx + 1}章 ` + list[idx].title;
          
        //   章节内容
        let contents='';
          await delay(10000); //恶心，必须延迟才能获得后半部分内容
          contents = await page.$$eval(contentCls, (texts) => {
              return [texts[0].innerHTML];
          });
          
          // console.log(contents);
          // 将章节内容进行字符替换
          contents[0]=verifya(contents[0]);
        //   存文章标题（章节标题分隔符）拼接到内容
        if(bugConfig.contentpagingCls && idxcontent > 1){
          contents.unshift(config.titleSplit);
        }else{
          contents.unshift(title + config.titleSplit);
        }
          
          // 只存章节标题
          // const chapterTxt = title + config.paraSplit;
          // 存章节内容（段落分隔符）
          const chapterTxt = contents.join('\r\n \r\n') + config.paraSplit;
        //   进行覆盖
        // console.log(chapterTxt);
          
          updateTxtFile(chapterTxt); // 每个章节文本获取完就拼接进去
          // txt += chapterTxt; // 一次性拼接所有章节文本
        //   进行下标自增
          
          idxcontent++;

          if(idxcontent > contentListNum){ //超过分页总数，前往下一章节
              idx++;
              if (idx > endIndex) { // 如果自增下标大于结束下标，则结束）
              await browser.close();
              // updateTxtFile(txt); // 一次性拼接所有章节文本
              console.log(`文件下载完毕，详细请查看${txtFileFullpath}`);
              config.endTime = +new Date();
              const time = config.endTime - config.startTime;
              // console.log(`处理时间:${time}ms`);
              console.log(
                `================ 结束 ${novelConfig.name} ================`
              );
            } else {
                idxcontent=1;
                await page.goto(list[idx].url, { timeout:config.pageTimeout,waitUntil: 'networkidle0'});
            }
          }else{
            await page.goto(list[idx].url.substring(0,list[idx].url.length-5)+'_'+idxcontent+list[idx].url.substring(list[idx].url.length-5,list[idx].url.length), { timeout:config.pageTimeout,waitUntil: 'networkidle0'});//
          }
        });
        // 如果自增下标小于等于结束下标，则前往下一个章节
        await page.goto(list[idx].url, { timeout:config.pageTimeout,waitUntil: 'networkidle0'});
    };
  
    // 获取章节列表（章节全部地址、名称)
    const getChapters = async (chapterSiteUrl) => {
        console.log('获取章节列表...');
        const { browser, page } = await createPage();
        let listNum = 1;
        let idx =1;
        let listData=[];
        await page.on('load', async () => {
          //   console.log(page.url());
          // 处理小说名称等信息（添加到txt文件
            await handleNovelInfo(page);
            // await initFolderAndFile();
            if(bugConfig.linkpagingCls){
              listNum = await page.$eval(bugConfig.linkpagingCls,num=>{
                return Number(num.innerText.match(/\/(\d+)页/)[1]);
              });
            }
            // 处理章节列表数据（得到序号、地址、标题）
            
            listData=listData.concat(await handleChapterList(page));
            idx++;
            if(idx>listNum){
              await browser.close();
              listData.map((v) => {
                // 判断是否以http开头
                if (!v.url.startsWith('http')) {
                    // 因为网站内链接不全，这里进行拼接
                  v.url = chapterSitePrefix + v.url;
                }
                return v;
              });
              // console.log(listData);
              console.log('章节列表获取成功，章节数:', listData.length);
              console.log('第一章名称: ', listData[0].title);
              console.log('最后一章名称: ', listData[listData.length - 1].title);
              console.log('开始获取每一章内容...');
              getChapterTxt(listData);
            }else{
              await page.goto(chapterSiteUrl.substring(0, chapterSiteUrl.length - 1)+'_'+idx+'/', { timeout: config.pageTimeout });
            }
        });
        await page.goto(chapterSiteUrl, { timeout: config.pageTimeout });
    };
    getChapters(site);
}
// bookUtils.
start(config,WebConfig);
// node webCrawler\book\hdyp.js