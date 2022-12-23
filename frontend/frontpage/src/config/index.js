/**
 * 环境配置封装
 */
const env= import.meta.env.MODE || 'test';
const EnvConfig = {
    dev:{
        baseApi:'http://localhost:3000/api',
        mockApi:'https://www.fastmock.site/mock/edfe3e6794e5c3273dcbd720d7657349/api'
        // 
    },
    test:{
        baseApi:'http://localhost:3000/api',
        mockApi:'https://www.fastmock.site/mock/454f58b030e7903400b943b9163118e5/blog1'
    },
    prod:{
        baseApi:'http://localhost:3000/api',
        mockApi:'https://www.fastmock.site/mock/edfe3e6794e5c3273dcbd720d7657349/api'
    }
}
export default{
    env,
    mock:false,
    namespace:'zblog',
    ...EnvConfig[env]
}