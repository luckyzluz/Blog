let ReTokenExpiresIn = 60 * 60 * 24*30; // //设置jwt过期时间(一天 :60 * 60 * 24)
let AcTokenExpiresIn = 6;
const jwt = require('./jwt');
const { jwtAccessSecret, jwtRefreshSecret } = require('../config/config.default');
const {redisDb} = require('./redis')
module.exports = {
    // 生成refresh_token
    generateReToken: async(info) => {
        return new Promise((resolve, reject) => {
            const refresh_token= jwt.sign(info,jwtRefreshSecret,{
                expiresIn: ReTokenExpiresIn
            })
            resolve(refresh_token);
        })
    },
    // 生成access_token
    generateAcToken: async(info) => {
        return new Promise((resolve, reject) => {
            const access_token = jwt.sign(info,jwtAccessSecret,{
                expiresIn: AcTokenExpiresIn
            })
            resolve(access_token);
        })
    },
    // refresh_token是否存在
    existsReToken: async(refresh_token) => {
        return new Promise((resolve, reject) => {
            redisDb.hexists(1,'UsersRefreshToken',refresh_token).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}

