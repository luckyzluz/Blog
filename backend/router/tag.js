const express = require('express')
const router = express.Router()

router.get('/', async (req,res,next) => {
    try{
        //处理请求
        res.send('获取标签列表')
    }catch (err){
        next(err)
    }
})

module.exports = router