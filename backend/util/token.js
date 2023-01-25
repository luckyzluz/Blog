// let ReTokenExpiresIn = 60 * 60 * 24 * 7; // //设置jwt过期时间(一天 :60 * 60 * 24)
// let AcTokenExpiresIn = 60 * 30;
const jwt = require('./jwt');
const {redisDb} = require('./redis');
const { REDIS_CONFIG } = require("../config/config.db");
const { jwtConfig } = require('../config/config.jwt');
module.exports = {
    // 生成refresh_token
    generateReToken: async(info, expiresIn) => {
        return new Promise((resolve, reject) => {
            const refresh_token= jwt.sign(info,jwtConfig.jwtRefreshSecret,{
                expiresIn: expiresIn ? expiresIn : jwtConfig.ReTokenExpiresIn
            })
            resolve(refresh_token);
        })
    },
    // 生成access_token
    generateAcToken: async(info, expiresIn) => {
        return new Promise((resolve, reject) => {
            const access_token = jwt.sign(info,jwtConfig.jwtAccessSecret,{
                expiresIn: expiresIn ? expiresIn : jwtConfig.AcTokenExpiresIn
            })
            resolve(access_token);
        })
    },
    // refresh_token是否存在
    existsReToken: async(refresh_token) => {
        return new Promise((resolve, reject) => {
            redisDb.exists(REDIS_CONFIG.database._user, refresh_token).then(res => {
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}

