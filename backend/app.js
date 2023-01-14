//导入 express 模块
const express = require('express')
// 创建服务器的实例对象
const app =express()
app.use(express.json())

const { PORT, ENV } = require("./config/config.default");
process.env.NODE_ENV = ENV;

//导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

const { logConfig } = require('./config/config.log');

if(logConfig.isAllLog){ // 是否进行所有请求日志记录
  const handleLog = require('./middleware/handleLog');
  // 记录Http请求日志
  app.use(handleLog);
}

const handleError =require("./middleware/handleError")
// 错误捕捉
app.use(handleError)


if(process.env.NODE_ENV == 'development'){
  const morgan = require("morgan")
  app.use(morgan('dev'))
}

// 配置解析表单数据的中间件，注意：这个中间件只能解析 application/x-www-form-urlencodeed 格式的表单数据
app.use(express.urlencoded({ extended: false }))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 导入并注册挂载用户路由模块
const router = require('./router')
app.use('/api', router)

//挂载统一处理服务端错误中间件
// const errorHandler = require('./middleware/error-handler')
// const bodyParser = require('body-parser')
// app.use(errorHandler())


app.get('/uploads/*', function (req, res) {
  res.sendFile( __dirname + "/" + req.url );
  // console.log("Request for " + req.url + " received.");
})
app.get('/static/upload/*', function (req, res) {
  res.sendFile( __dirname + "/" + req.url );
  // console.log("Request for " + req.url + " received.");
})

// express静态html页面
app.get("/large",(req,res)=>{
    res.sendFile(__dirname+"/static/"+"index1.html")        //设置/tow下访问文件位置
})








//调用 app.listen 方法，指定端口号并启动服务器
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})