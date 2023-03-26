const ora = require('ora');
let inputUrl = 'http://www.baidu.com/';
// process.argv[2]
if (!inputUrl) {
  ora().warn('请输入需要判断的链接')
  process.exit()
}

const puppeteer = require('puppeteer')

const { awaitWrap, pingIp, moveHttp } = require('./ping')

let url = moveHttp(inputUrl)

const BaiseUrl = 'https://ping.chinaz.com/'

;(async () => {
  const init = ora('初始化浏览器环境').start()
  const browser = await puppeteer.launch({
    headless: true // 是否不显示浏览器界面
  })
  init.succeed('初始化完成')
  const loading = ora(`正在解析 ${url}`).start()
  const page = await browser.newPage() // 创建一个新页面
  await page.goto(BaiseUrl + url, {
    timeout: 0, // 不限制超时时间
    waitUntil: 'networkidle0'
  })

  loading.stop()
  let list = await page.$$eval('#speedlist .listw', options =>
    options.map(option => {
      let [city, ip, ipaddress, responsetime, ttl] = option.innerText.split(/[\n]/g)
      return { city, ip, ipaddress, responsetime, ttl }
    })
  )

  if (list.length == 0) {
    ora().fail('请输入正确的网址或IP')
    process.exit()
  }

  ora().succeed('获取IP地址完成，尝试连接IP地址')

  let ipObj = {}
  let success = []
  let failList = []
  let fast = Infinity
  let fastIp = ''
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    let time = parseInt(item.responsetime)
    if (!isNaN(time) && !ipObj[item.ip]) {
      const tryIp = ora(`尝试 ${item.ip}`).start()
      let [res, error] = await awaitWrap(pingIp(item.ip))
      if (!error) {
        success.push(res.ip)
        if (res.time < fast) {
          fast = res.time
          fastIp = res.ip
        }
        tryIp.succeed(`${res.ip} 连接成功，耗时:${res.time}ms`)
      } else {
        failList.push(error.ip)
        tryIp.fail(`${error.ip} 连接失败`)
      }

      ipObj[item.ip] = time
    }
  }

  if (success.length > 0) {
    ora().succeed(`请求成功：${JSON.stringify(success)}`)
  }
  if (failList.length > 0) {
    ora().fail(`请求失败：${JSON.stringify(failList)}`)
  }

  if (fastIp) {
    ora().info(`推荐节点: ${fastIp}，时间: ${fast}ms`)
    ora().info(`host配置: ${fastIp} ${url}`)
  }

  browser.close() // 关闭浏览器
})()
// node util/test/index.js
