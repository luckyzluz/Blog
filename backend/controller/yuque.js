// const {User} = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const MysqlMethods = require('../util/mysql')
const md5 = require('../util/md5')
const moment = require('moment')
var child_process = require("child_process");
const { yuqueConfig } = require('../config/config.default')
const request = require('request');
var rp = require('request-promise');
// ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}"
// var curl = `curl -H "X-Auth-Token: ${yuqueConfig.AccessToken}" https://www.yuque.com/api/v2/users/${yuqueConfig.user}`
//         var child = child_process.exec(curl, function (err, stdout, stderr) {
//             // console.log(stdout);
//             res.status(200).json(JSON.parse(stdout))
//         });
//知识库
exports.userInfo = async (req, res, next) => {
    try {
        //    var curl = `curl -H "X-Auth-Token: ${yuqueConfig.AccessToken}" https://www.yuque.com/api/v2/users/${yuqueConfig.user}`
        //     var child = child_process.exec(curl, function (err, stdout, stderr) {
        //         // console.log(stdout);
        //         res.status(200).json(JSON.parse(stdout))
        //     });
        // ------------
        // const options = {
        //     url: `https://www.yuque.com/api/v2/users/${yuqueConfig.user}`,
        //     method:'GET',
        //     headers: {
        //       'User-Agent': 'request',
        //       'Content-Type':'application/json',
        //       'X-Auth-Token':yuqueConfig.AccessToken
        //     }
        //   };
        //   request(options, function callback(error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         res.status(200).json(JSON.parse(body))
        //     }
        //   });
        var options = {
            uri: `https://www.yuque.com/api/v2/users/${yuqueConfig.user}`,
            method:'GET',
            qs: {
                // access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
            },
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}
exports.reposInfos = async (req, res, next) => {
    try {
        // let user = req.body.user
        // var curl = `curl -H "X-Auth-Token: ${yuqueConfig.AccessToken}" https://www.yuque.com/api/v2/users/${yuqueConfig.user}/repos`
        // var child = child_process.exec(curl, function (err, stdout, stderr) {
        //     // console.log(stdout);
        //     res.status(200).json(JSON.parse(stdout))
        // });
        // ------------------------
        var options = {
            uri: `https://www.yuque.com/api/v2/users/${yuqueConfig.user}/repos`,
            method:'GET',
            qs: {
                // access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
            },
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}
exports.createrepos = async (req, res, next) => {
    try {
        // console.log(req.body)
        // "{"name":${req.body.name},"description":${req.body.description},"slug":${req.body.slug},"public":${Number(req.body.public)},"type":${req.body.type}}"
        // ?name=测试1&description=测试11&public=1&type=Book
        // let json ={
        //     "name":req.body.name,
        //     "description":req.body.description,
        //     "slug":req.body.slug,
        //     "public":req.body.public,
        //     "type":req.body.type
        // }
        // console.log(encodeUnicode(req.body.name));
        // var curl = `curl -H "X-Auth-Token: ${yuqueConfig.AccessToken}" -d name=测试1&description=测试11&public=1&type=Book https://www.yuque.com/api/v2/users/${yuqueConfig.user}/repos`
        // console.log(curl)
        // var child = child_process.exec(curl, function (err, stdout, stderr) {
        //     // console.log(stdout);
        //     res.status(200).json(JSON.parse(stdout))
        //     // 
        // });
        var options = {
            uri: `https://www.yuque.com/api/v2/users/${yuqueConfig.user}/repos`,
            method:'POST',
            qs: req.body,
            // {
            //     // access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
            //     "name":req.body.name,
            //     "description":req.body.description,
            //     "slug":req.body.slug,
            //     "public":req.body.public,
            //     "type":req.body.type
            // },
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}
exports.redetails = async(req,res,next)=>{
    try {
        var options = {
            uri: `https://www.yuque.com/api/v2/repos/${req.body.id}`,
            method:'GET',
            qs: {
                // access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
                // "name":req.body.name,
                // "description":req.body.description,
                // "slug":req.body.slug,
                // "public":req.body.public,
                // "type":req.body.type
            },
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}
exports.updateRepos = async(req,res,next)=>{
    try {
        var options = {
            uri: `https://www.yuque.com/api/v2/repos/${req.body.id}`,
            method:'PUT',
            qs: req.body.repos,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}
exports.deleteRepos = async(req,res,next)=>{
    try {
        var options = {
            uri: `https://www.yuque.com/api/v2/repos/${req.body.id}`,
            method:'DELETE',
            // qs: req.body.id,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}
exports.docList = async(req,res,next)=>{
    try {
        var options = {
            uri: `https://www.yuque.com/api/v2/repos/${yuqueConfig.user}/${req.body.namespace}/docs`,
            method:'GET',
            qs: {
                "offset":req.offset?req.offset:0,
                "limit":req.limit?req.limit:10
            },
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}
exports.docdetails = async(req,res,next)=>{
    try {
        var options = {
            uri: `https://www.yuque.com/api/v2/repos/${yuqueConfig.user}/${req.body.namespace}/docs/${req.body.slug}`,
            method:'GET',
            // qs: {
            //     "raw":req.body.raw?req.body.raw:''
            // },
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}
exports.createdoc = async(req,res,next)=>{
    try {
        var options = {
            uri: `https://www.yuque.com/api/v2/repos/${yuqueConfig.user}/${req.body.namespace}/docs`,
            method:'POST',
            qs: req.body.doc,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}
exports.updatedoc = async(req,res,next)=>{
    try {
        var options = {
            uri: `https://www.yuque.com/api/v2/repos/${yuqueConfig.user}/${req.body.namespace}/docs/${req.body.id}`,
            method:'PUT',
            qs: req.body.doc,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}
exports.deletedoc = async(req,res,next)=>{
    try {
        var options = {
            uri: `https://www.yuque.com/api/v2/repos/${yuqueConfig.user}/${req.body.namespace}/docs/${req.body.id}`,
            method:'DELETE',
            // qs: req.body.doc,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}
exports.search = async(req,res,next)=>{
    try {
        var options = {
            uri: `https://www.yuque.com/api/v2/search`,
            method:'GET',
            // ?q=${req.body.q}&type=doc&scope
            // repos/${yuqueConfig.user}/${req.body.namespace}/docs/${req.body.id}
            qs: req.body,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type':'application/json',
              'X-Auth-Token':yuqueConfig.AccessToken
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
            res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}