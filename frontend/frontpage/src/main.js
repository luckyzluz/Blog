import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router/index.js'
// 引入vuex
import store from './store'


// swiper轮播图css引入
import 'swiper/css';

import SvgIcon from 'c/SvgIcon.vue'

// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

// icontant 图标引入
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js';
// import '//at.alicdn.com/t/c/font_2851110_621gzdpa1j6.js'


// 引入自定义css样式（放在最后确保覆盖原有样式）
import './styles/reset.scss'

import './styles/common.scss'

import './styles/main.scss'
import './styles/themes.css'


const app = createApp(App);
app.component('SvgIcon', SvgIcon);
//创建v-highlight全局指令
app.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
      hljs.highlightBlock(block)
    })
})
// 全局挂载请求封装方法
import request from './utils/request'
app.config.globalProperties.$request = request;
// 全局挂载api接口方法
import api from './api'
app.config.globalProperties.$api = api;

// 全局挂载vuex方法

import storage from './utils/storage'
app.config.globalProperties.$storage = storage;


// 应用向根组件 App 中注入一个 property
// app.provide('$api', api)
app.use(router)
.use(ElementPlus)
.use(store)
.mount('#app')
