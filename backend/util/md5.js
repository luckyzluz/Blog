/**
 * 数据加密
 */
const crypto = require('crypto')
// console.log(crypto.getHashes())
module.exports = str => {
    return crypto.createHash('md5')
        .update('zluz' + str)
        .digest('hex')
}