/**
 * 环境配置封装
 * https://www.fastmock.site/mock/9c617ea4462b67936e0f6c46e5c09235/api
 */
// import { getCurrentInstance } from 'vue'
// const {proxy} = getCurrentInstance();
// proxy.
// this.$api.signedin().then((res) => {
//     console.log(res)
// });
const env= import.meta.env.MODE || 'development';
const EnvConfig = {
    baseApi:`/api`, // 后端接口
    localMockApi:`/localmock`,//本地mock
    remoteMockApi: '/remotemock' // 远程mock
}
// const EnvConfig = {
//     development:{
//         baseApi:`/api`, // 后端接口
//         localMockApi:`/localmock`,//本地mock
//         remoteMockApi: '/remotemock' // 远程mock
//     },
//     production:{
//         baseApi:`/api`, // 后端接口
//         localMockApi:`/localmock`,//本地mock
//         remoteMockApi: '/remotemock' // 远程mock
//     }
// }
export default{
    env,
    mock: 'local', // '' 'local'  'remote'
    namespace:'zblog',
    ...EnvConfig //...EnvConfig[env]
}