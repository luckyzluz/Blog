const adminRouter = [{
    path: '/admin',
    name: 'Admin',
    component: () => import('/@/views/admin/index.vue'),
}]

export default adminRouter;