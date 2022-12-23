// const {User} = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const MysqlMethods = require('../util/mysql')
const md5 = require('../util/md5')
const moment = require('moment')
var child_process = require("child_process");
const { video } = require('../config/config.default')
const request = require('request');
var rp = require('request-promise');
exports.videojx = async (req, res, next) => {
    try {
        console.log(video.videoApi[1].url)
        var options = {
            uri: video.videoApi[1].url,
            method:'GET',
            qs: {
                // access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
                url:req.body.url
            },
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json'
                // ,
            //   'X-Auth-Token':yuqueConfig.AccessToken
            },
            json: true // Automatically parses the JSON string in the response
        };
        
        let result=await rp(options)
            .then(function (repos) {
                return repos
            })
            .catch(function (err) {
                return err.error
                // API call failed...
            });
            delete result[video.videoApi[1].delete]
            result.QQ="联系我:2567046155"
            res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}