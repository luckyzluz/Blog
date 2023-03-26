# 博客后端

express+mysql(......)
## 文件结构
├── README.md            项目介绍
├── app.js # 用于自定义启动时的初始化工作 
├── config # 配置文件
│  ├── config.default.js
├── controller # 用于解析用户的输入，处理后返回相应的结果 
├── middleware # 用于编写中间件
├── model # 数据持久层
├── router # 用于配置 URL 路由规则
├── util # 工具模块
├── validator    验证器
├── package.json          npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
└── test              

## 实现功能
数据爬虫采集
redis、lock锁
数据校验

## 待实现功能
socket双向通信
##
##

# 配置常用中间件
## 解析请求体
express.json()
express.urlencoded()
## morgan日志输出
## 为客户端提供跨域资源请求
cors()








<!-- ----------------------------------------------------------------------- -->
├── README.md            项目介绍
├── app.js           入口页面
├── build              构建脚本目录
│  ├── build-server.js         运行本地构建服务器，可以访问构建后的页面
│  └── webpack.prod.conf.js      wabpack生产环境配置
├── config             项目配置
│  ├── dev.env.js           开发环境变量
│  ├── index.js            项目配置文件
│  ├── prod.env.js           生产环境变量
│  └── test.env.js           测试环境变量
├── mock              mock数据目录
│  └── hello.js
├── package.json          npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
└── test              测试文件目录（unit&e2e）
  └── unit              单元测试
    ├── index.js            入口脚本
    ├── karma.conf.js          karma配置文件
    └── specs              单测case目录
      └── Hello.spec.js