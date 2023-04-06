import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

// 路由列表
const routes = [
    {
        path: '/',
        name: 'home',
        meta:{
            title: '首页'
        },
        component: () => import('../views/home.vue')
    },
    ,
    {
        path: '/article',
        name: 'article',
        meta:{
            title: 'article'
        },
        component: () => import('../views/article.vue')
    },
    {
        path: '/test',
        name: 'test',
        meta:{
            title: 'test'
        },
        component: () => import('../views/test.vue')
    }
]


// 导出路由
export default  createRouter({
    history: createWebHashHistory(),
    routes
})