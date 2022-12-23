import { createRouter, createWebHashHistory,createWebHistory} from 'vue-router'
// import adminRouter from './modules/adminRouter'
import blogRouter_1 from './modules/blogRouter_1'

const router = createRouter({
    // createWebHashHistory,createWebHistory 
    history:createWebHistory(),
    routes:[...blogRouter_1]
})
// ,...adminRouter
export default router