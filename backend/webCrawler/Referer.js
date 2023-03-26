const refererChina=[
    // 百度搜索
    'https://www.baidu.com/s?wd=$url$',
    // 搜狗搜索https%3A%2F%2Fwww.lmlphp.com
    'https://www.sogou.com/web?query=$url$user%2F83865%2Farticle%2Fitem%2F2555018%2F&_asf=www.sogou.com&_ast=&w=01019900&p=40040100&ie=utf8&from=index-nologin&s_from=index&sut=14592&sst0=1678519018450&lkt=0%2C0%2C0&sugsuv=1678519002510227&sugtime=1678519018450',
    // 神马搜索
    'https://m.sm.cn/s?q=$url$user%2F83865%2Farticle%2Fitem%2F2555018%2F&from=smor&safe=1&snum=1',
    // 360搜索
    'https://www.so.com/s?q=$url$user%2F83865%2Farticle%2Fitem%2F2555018%2F&src=srp&ssid=&fr=none&sp=aa5&cp=08850009aa&psid=f66290bd608fd32c035a2145b29e2f89',
    // 必应搜索
    'https://cn.bing.com/search?q=$url$user%2F83865%2Farticle%2Fitem%2F2555018%2F&form=QBLH&sp=-1&lq=0&pq=https%3A%2F%2Fwww.lmlphp.com%2Fuser%2F83865%2Farticle%2Fitem%2F2555018%2F&sc=0-55&qs=n&sk=&cvid=60E028D5E2164588B6E43BC25F52E1C6&ghsh=0&ghacc=0&ghpl=',
    // Google搜索
    'https://www.google.com/search?q=$url$',
]
const referers = [
    ...refererChina,
    // 谷歌图片搜索
    'https://www.google.com/search?q=$url$&tbm=isch',
    // Twitter分享
    'https://twitter.com/intent/tweet?url=$url$&text=精准搜索',
    // Facebook分享
    'https://www.facebook.com/sharer.php?u=$url$&t=精准搜索'
]

function getRandomReferer(url, params) {
    let index;
    let data;
    if(params=='china'){
        index = Math.floor(Math.random() * refererChina.length);
        data = refererChina[index];
    }else{
        index = Math.floor(Math.random() * referers.length);
        data = referers[index];
    }
    // 数据处理
    data = data.replace("$url$", encodeURIComponent(url));
    // console.log(data);
    return data;
}
module.exports =getRandomReferer ;
// getRandomReferer('https://baidu.com/','china');
// node util/webCrawler/Referer.js