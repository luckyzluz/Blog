const puppeteer = require('puppeteer')
const proxyConfig={
	url:'https://www.proxy-list.download/HTTP',
	// url:'https://www.kuaidaili.com/free/',
}
//max retry times
const MAX_RT = 1;

// 获取代理ip列表
function getproxylist() {

	return new Promise(async (resolve, reject) => {
		
		var tempbrowser;
		// console.log('开始从web获取代理列表...');
		for (var i = MAX_RT; i > 0; i--) {
			if (tempbrowser) {
				break;
			}
			// console.log('开始初始化浏览器...');
			tempbrowser = await puppeteer.launch({
			headless: true,
			args: [
			//'--proxy-server=socks5://127.0.0.1:12580'
			]
			}).catch(ex => {
				if (i-1 > 0) {
					console.log('浏览器启动失败。现在重试...');
				} else {
					console.log('浏览器启动失败！');
				}
			});
		}

		if (!tempbrowser) {
			reject('无法启动浏览器');
			return;
		}
		const browser = tempbrowser;

		// console.log('开启新页面...');
		var page = await browser.newPage().catch(ex=>{
			console.log(ex);
		});
		if (!page) {
			reject('页面打开失败!');
			return;
		}

		var respond;
		for (var i = MAX_RT; i > 0; i--) {

			if (respond) {
				break;
			}
			
			// console.log('开始前往页面...');
			respond = await page.goto(proxyConfig.url, {
				'waitUntil':'domcontentloaded',
				'timeout':120000
			}).catch(ex=>{
				if(i-1 > 0) {
					console.log('访问网站失败，重试中...');
				} else {
					console.log('无法访问网站！');
				}
				
			});
		}
		if (!respond) {
			reject('无法访问网站！');
			return;
		}
		// console.log('开始在页面中查找元素...');
		var layoutVisible = await page.waitForSelector('#tabli').catch(ex=>{
			console.log("哦不我什么也看不见！！！");
		});
		if (!layoutVisible) {
			reject('布局不可见！');
			return;
		}

		// console.log('开始从元素获取信息...');
		var proxyModelArray=await page.$$eval('tbody#tabli tr',xx=>{
			return xx.map(cc=>{
				let[ip, port, anonymity,country, speed]=cc.innerText.split(/[\t]/g);
				return{ip, port, anonymity,country, speed}
			})
		});
		
		
		await browser.close().catch(ex=>{
			console.log('无法关闭浏览器!');
		});
		// console.log('浏览器已关闭');

		// console.log(proxyModelArray);
		if (!proxyModelArray || proxyModelArray.length === 0) {
			reject();
			return;
		}
		resolve(proxyModelArray);
	})	
}

// 创建n个代理浏览器
async function getProxyBrowser(checkurl, rtc = 3) {

	return new Promise(async (resolve, reject) => {

		var proxyList = await getproxylist().catch();
		if (!proxyList) {
			reject();
			return;
		}

		var browserList = [];

		for (var i = 0; i < rtc; i++) {

			var proxyserver = proxyList[i];
			var proxyOption = proxyserver.version.toLowerCase() + '://' + proxyserver.ip + ':' + proxyserver.port;

			var browser = await puppeteer.launch({
				headless:true,
				args: [
				//'--window-size="800,600"',
				//'--start-fullscreen'
				'--proxy-server='+proxyOption
				]
				}).catch();
			if (browser) {

				browserList.push(browser);
			}
		}

		if (browserList.length == 0) {
			reject()
			return;
		}

		resolve(browserList);
	})
}

// 测试一下是否获取正常
async function test() {
	var proxylist;
	for (var i = 0; i < MAX_RT; i++) {
		if (proxylist) {
			break;
		}
		// 获取代理列表...
		proxylist = await getproxylist().catch(ex=> {
			if (i+1<MAX_RT) {
				console.log('无法获取proxylist。现在重试...');
			} else {
				console.log('无法获取proxylist。终止');
			}
		});
	}
	if (!proxylist) {
		console.log('无法获取proxylist！！！');
		return;
	}
	console.log(proxylist);
}

// test();

module.exports.getProxyList = getproxylist;
// node webCrawler\script\proxyserver.js