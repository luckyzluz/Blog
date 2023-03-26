/**
 * axios二次封装
 */
import axios from 'axios'
import config from './../config'
import router from '../router'
import storage from "./../utils/storage";
import { ElMessage } from 'element-plus'
const TOKEN_INVALTD = 'Token验证失败，请重新登录'
const NETWORK_ERROR= '网络请求异常，请稍后重试'

//创建axios实例对象，添加全局配置
const service =axios.create({
    baseURL:config.baseApi,
    timeout:8000
})

//请求拦截
service.interceptors.request.use((req)=>{
    //TO-DO
    const headers=req.headers;
    // if(!headers.authorization) headers.authorization = storage.getItem("token").refresh_token
    return req;
})

//响应拦截
service.interceptors.response.use((res)=>{
    const { code, data, msg} = res.data;
    
    if(code === 20000){
        // data.user=""
        return res;
    }else if(code === 500001){
        ElMessage.error(TOKEN_INVALTD)
        setTimeout(()=>{
            router.push('/login')
        },15000)
        return Promise.reject()
    }else{
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})
/**
 * 请求核心函数
 * @param {*} options api请求配置
 * @returns 
 */
function request(options){
    options.method = options.method || 'get';
    if(options.method.toLowerCase() === 'get'){
        options.params = options.data;
    }
    if(typeof options.mock != 'undefined'){ // 是否存在单独mock配置（比总配置权限高）
        config.mock = options.mock;
    }
    if(config.env === 'production'){ // 生产环境判断development
        service.defaults.baseURL = config.baseApi;
    }else{
        // 判断是否进行mock
        if(config.mock){
            // 这里不是远程mock，统统按本地算
            service.defaults.baseURL = config.mock == 'remote' ? config.remoteMockApi : config.localMockApi;
        }else{
            service.defaults.baseURL = config.baseApi;
        }
        // console.log(service.defaults.baseURL)
        // service.defaults.baseURL = config.mock ? config.mockApi:config.baseApi
    }
    // console.log(import.meta.env.MODE)
    return service(options);
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item)=>{
    request[item] = (url, data, options)=>{
        return request({
            url, 
            data, 
            method:item, 
            ...options
        })
    }
})

export default request;