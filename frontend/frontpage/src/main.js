import { createApp } from 'vue'
import Zblog from './Zblog.vue'
import router from './router'
// import ElementPlus from 'element-plus'  //引入插件
// import 'element-plus/theme-chalk/index.css' //默认css样式
// import zhCn from 'element-plus/es/locale/lang/zh-cn'   //引入中文包
import * as icons from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import request from './utils/request'
import storage from './utils/storage'
import api from './api'
import store from './store'

console.log("环境变量=>",import.meta.env.MODE);
const app=createApp(Zblog);
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;
app
.use(router)
.use(store)
.use(ElIcon)
// .use(ElementPlus,{locale:zhCn})
.mount('#zblog');
