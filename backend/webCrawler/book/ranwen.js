// 单行进度打印
const singleLog = require('single-line-log2').stdout;
const ora = require('ora');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
// 配置信息
const config = require('../script/config');
// 配置信息
// const config={
//     // chrome浏览器的启动文件位置
//   localChromePath:
//   'C:\\Users\\T008287\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
//    // 加载网页的超时时间
//   pageTimeout: 30 * 60 * 1000,
//   // 小说下载在哪个文件夹
//   dataFolder: './novel',
//   // 段落分隔符
//   paraSplit: '\r\n \r\n ---------- \r\n \r\n',
//   // 章节标题分隔符
//   titleSplit: '\r\n \r\n ----------',
//   // 处理耗时
//   startTime: +new Date(),
//   endTime: +new Date(),
// }
// https://www.ranwen.tv/book/51651/2086
const mrlyConfig = {
    name: '孝经',
    txtFileName: '孝经.txt',// 小说文件名
    indexUrl: 'https://www.ranwen.tv/book/51560/',// 小说目录页
    chapterUrlPrefix: 'https://www.ranwen.tv/book/51560/',// 目录每一章链接的前缀
    novelInfoCls: '#box-info #info', // 目录页小说书名作者等信息
    linkCls: '.book_list ul.chapterlist:last-child li:not(.volume) a', //目录页每一章的a标签的css选择器
    adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],// 要移除的广告标签的css选择器 （每一章内容区域内的广告和不需要的部分）
    titleCls: '#content .wrapper_main h1.h1title',// 章节标题类名 css选择器
    contentCls: 'div#htmlContent', // 每一章内容区域 css选择器
    // 开始章节下标 1 ~ 的数字
    // startIndex: 2409,
    // 爬取多少章 startIndex + count - 1 不能超过总章节数
    count: 1,
};
// 开始
const start = (config, novelConfig) => {
    console.log(`================ 开始 ${novelConfig.name} ================`);
    config.startTime = +new Date();
    const bugConfig = novelConfig;
    // 小说配置信息 - 读取小说配置
    if (!bugConfig.txtFileName) {
        bugConfig.txtFileName = bqgConfig.getPinYin(bugConfig.name) + '.txt';
    }
    console.log('小说配置信息获取成功');
    // 小说目录页
    const site = bugConfig.indexUrl;
    // 目录每一章链接的前缀
    const chapterSitePrefix = bugConfig.chapterUrlPrefix;
    // 小说文件名
    const txtFileName = bugConfig.txtFileName;
    const txtFileFullpath = path.join(
      __dirname,
      config.dataFolder,
      txtFileName
    );
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
    initFolderAndFile();

    // 创建浏览器page对象
    const createPage = async () => {
        const browser = await puppeteer.launch({
          // 是否创建无头浏览器
          headless: true,
          // 步骤延时，有助于观察浏览器的每一步操作
          // slowMo: 100,
          executablePath: config.localChromePath,
          args: [`--window-size=1680,1050`],
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
    };

    // 处理小说名称等信息
    const handleNovelInfo = async (page) => {
        const info = await page.$eval(
          novelInfoCls,
          (dm, config) => {
            // 这里将章节和作者信息拼接到txt 段落分隔符
            return dm.innerText + config.paraSplit;
          },
          config
        );
        fs.writeFileSync(txtFileFullpath, info, { encoding: 'utf-8' });
    };
    // 处理章节列表数据
    const handleChapterList = async (page) => {
        const list = await page.$$eval(linkCls, (links) => {
          return links.map((v, i) => {
            return {
              _index: i,
              url: v.getAttribute('href'),
              title: v.innerText,
            };
          });
        });
        return list;
    };
    // 获取每一章的内容
    const getChapterTxt = async (list) => {
        let txt = ''; // 文本数据
        const len = list.length; // 处理过的章节列表数据
        const { browser, page } = await createPage();
        // 开始章节的下标，从0开始，到 list.length - 1 结束
        const startIndex = bugConfig.startIndex || 0;
        // 需要几章
        const count = bugConfig.count || list.length; // list.length
        // 爬取结束的下标 如果大于数据最后一个下标，就选择len-1
        const end = startIndex + count - 1;
        const endIndex = end > len - 1 ? len - 1 : end;
        

        console.log(`设置爬取章节数：`, count);

        console.log(`设置的开始章节：第 `, startIndex + 1, ' 章,', list[startIndex].title);
        console.log(`设置的结束章节：第 `, endIndex + 1, ' 章,', list[endIndex].title);
        let idx = startIndex;  // 开始章节
        // 获取加载页面信息
        await page.on('load', async () => {
          const pageUrl = page.url();
          // console.log(`获取第${idx + 1}/${len}章内容... url:`, pageUrl);
          // 单行进度打印
          singleLog(`正在获取第 ${idx + 1}/${len} 章内容...\n`);
  
          // 删除广告（dom节点）
          adCls.map(async (cls) => {
            await page.$$eval(cls, (el) => {
              el.map((v) => {
                v.remove();
              });
            });
          });
          // 获取章节标题
          // const title = await page.$eval(titleCls, (el: any) => {
          //   return el.innerText;
          // });
        //   章节标题
          const title = `第${idx + 1}章 ` + list[idx].title;
        //   章节内容
          const contents = await page.$$eval(contentCls, (texts) => {
            return texts.map((v) => {
                // 将章节内容进行字符替换
              v = v.innerText.replace(/<br>/gi, '\r\n').replace(/&nbsp;/gi, 's');
              return v;
            });
          });
        //   存文章标题（章节标题分隔符）拼接到内容
          contents.unshift(title + config.titleSplit);
          // 只存章节标题
          // const chapterTxt = title + config.paraSplit;
          // 存章节内容（段落分隔符）
          const chapterTxt = contents.join('\r\n \r\n') + config.paraSplit;
        //   进行覆盖
          updateTxtFile(chapterTxt); // 每个章节文本获取完就拼接进去
          // txt += chapterTxt; // 一次性拼接所有章节文本
        //   进行下标自增
          idx++;
          // if (idx > list.length - 1)
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
            // 
            await page.goto(list[idx].url, { timeout: config.pageTimeout });
          }
        });
        // 如果自增下标小于等于结束下标，则前往下一个章节
        await page.goto(list[idx].url, { timeout: config.pageTimeout });
    };
  
    // 获取章节列表（章节全部地址、名称)
    const getChapters = async (chapterSiteUrl) => {
        console.log('获取章节列表...');
        const { browser, page } = await createPage();
        await page.on('load', async () => {
        //   console.log(page.url());
          // const pageUrl = page.url();
        // 处理小说名称等信息（添加到txt文件
          await handleNovelInfo(page);
          // 处理章节列表数据（得到序号、地址、标题）
          const list = await handleChapterList(page);
          list.map((v) => {
            // 判断是否以http开头
            if (!v.url.startsWith('http')) {
                // 因为网站内链接不全，这里进行拼接
              v.url = chapterSitePrefix + v.url;
            }
            return v;
          });

          console.log('章节列表获取成功，章节数:', list.length);
          console.log('第一章名称: ', list[0].title);
          console.log('最后一章名称: ', list[list.length - 1].title);
          // console.log(list);
          await browser.close();
          console.log('开始获取每一章内容...');
          getChapterTxt(list);
        });
        await page.goto(chapterSiteUrl, { timeout: config.pageTimeout });
    };
    getChapters(site);
}
start(config.config,mrlyConfig);
// node webCrawler\book\ranwen.js
// ================ 开始 末日乐园 ================
// 小说配置信息获取成功
// 获取章节列表...     
// https://www.ranwen.tv/book/2086/
// 章节列表获取成功，章节数: 2504
// 第一章名称:  第一章 灰姑娘的恐惧
// 最后一章名称:  灏朩2286 送行与出行俨粐支蓑
// 开始获取每一章内容...
// 设置爬取章节数： 2504
// 设置的开始章节：第  1  章, 第一章 灰姑娘的恐惧
// 设置的结束章节：第  2504  章, 灏朩2286 送行与出行俨粐支蓑
// 正在获取第 2504/2504 章内容...
// 文件下载完毕，详细请查看C:\Users\T008287\Desktop\Study\project\Blog\backend\webCrawler\book\novel\末日乐园.txt
// 处理时间:1552702ms
// ================ 结束 末日乐园 ================