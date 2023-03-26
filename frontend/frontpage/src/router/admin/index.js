import { createRouter, createWebHashHistory,createWebHistory} from 'vue-router'
// import adminRouter from './modules/adminRouter'
// import blogRouter from './modules/blogRouter'
const routes=[{
    path: '/',
    name: 'Admin',
    component: () => import('/@/views/admin/index.vue'),
}]
const router = createRouter({
    // createWebHashHistory,createWebHistory 
    history:createWebHistory(),
    routes
})
// ,...adminRouter
export default router