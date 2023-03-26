var ping = require('ping')

module.exports = {
  awaitWrap: promise => {
    return promise.then(data => [data, null]).catch(err => [null, err])
  },

  pingIp: ip =>
    new Promise((resolve, reject) => {
      let startTime = new Date().getTime()
      ping.sys.probe(ip, function(isAlive) {
        if (isAlive) {
          resolve({
            ip: ip,
            time: new Date().getTime() - startTime
          })
        } else {
          reject({
            ip: ip,
            time: -1
          })
        }
      })
    }),

  moveHttp: val => { // 去除地址前后多余符号luckyzluz.github.io
    val = val.replace(/http(s)?:\/\//i, '')
    var temp = val.split('/')
    if (temp.length <= 2) {
      if (val[val.length - 1] == '/') {
        val = val.substring(0, val.length - 1)
      }
    }
    console.log(val)
    return val
  }
}
