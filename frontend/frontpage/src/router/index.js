import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

import store from '@/store'
// 路由列表
const routes = [
    {
        path: '/',
        name: 'home',
        meta:{
            title: '首页',
            needLogin: false
        },
        component: () => import('../views/home.vue')
    },
    {
        path: '/article/:id',
        name: 'article',
        meta:{
            title: '文章详情页',
            needLogin: false
        },
        component: () => import('../views/article.vue')
    },
    {
        path: '/404',
        name: '404',
        meta:{
            title: '404',
            needLogin: false
        },
        component: () => import('../views/article.vue')
    },
    {
        path: '/test',
        name: 'test',
        meta:{
            title: 'test',
            needLogin: false
        },
        component: () => import('../views/test.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    // console.log(to.path == from.path)

    if (to.matched.length === 0) { 
        next('/404') 
    }
    let title='博客系统';
    if(to.meta&&to.meta.title){
        title = `${to.meta.title}:${to.params[to.meta.params] || ''} - ${title}`
    }else {
        title = `${to.meta.title} - ${title}`
    }
    document.title=title; // 设置网页标题

    // ----------是否加载loading---start-----------
    // if (to.path !== from.path) {
        store.commit('changeLoading')
    // }
    if (to.meta.needLogin) {
        next()
    }else{
        next();
    }
  });
  
  router.afterEach((to, from) => {
    // 隐藏loading组件
    // setTimeout(() => { // 延迟 关闭 loading
        store.commit('changeLoading');
    // }, 50000);
  });

// 导出路由
export default  router;