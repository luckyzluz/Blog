//导入 express 模块
const express = require('express')
// 创建服务器的实例对象
const app =express()
app.use(express.json())

//导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

//导入日志输出模块(后续可统计异常请求数)
const morgan = require('morgan')
var fs = require('fs');
var path = require('path');
var logDirectory = path.join(__dirname, './log')
// 确保日志目录存在
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const {getTimeInfo}=require("./util/utils")
// 一天一个日志
function logdaysplit(){
  let time =
  console.log(fs.existsSync(`./log/${getTimeInfo(Date.now()/1000)}.log`))
  if(fs.existsSync(`./log/${getTimeInfo(Date.now()/1000)}.log`)){
console.log(1111);
  }
  return 111
  // getTimeInfo(Date.now()/1000)
}
logdaysplit()
var accessLogStream = fs.createWriteStream(path.join(__dirname, `./log/${logdaysplit()}.log`), {flags: 'a'});

morgan.format('joke', ':remote-addr - :method - :url - :status - :response-time ms - :res[content-length] - :date[iso] - :user-agent');
app.use(morgan('dev'))
app.use(morgan('joke', {stream: accessLogStream}))
// 将日志写入数据库，带write方法的对象
// var dbStream = {
//   write: function(line){
//     saveToDatabase(line);  // 伪代码，保存到数据库
//   }
// };

// 将 dbStream 作为 stream 配置项的值
// app.use(morgan('short', {stream: dbStream}));


const PORT = process.env.PORT || 3000

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