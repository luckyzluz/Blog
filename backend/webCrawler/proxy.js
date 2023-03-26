const fs = require("fs");
var proxyList = require('./ProxyList.json');
// let proxyList = JSON.parse(fs.readFileSync('./util/webCrawler/ProxyList.json','utf8'));
// console.log(proxyList)

function getRandomProxy() {
    let ip;
    const index = Math.floor(Math.random() * proxyList.length);
    ip = 'http://' + proxyList[index].IP + ':' +proxyList[index].PORT;
    // console.log(ip)
    return ip;
}
// getRandomProxy();
module.exports =getRandomProxy ;
// node util/webCrawler/proxy.js