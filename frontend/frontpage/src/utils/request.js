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
    if(!headers.authorization) headers.authorization = storage.getItem("token").refresh_token
    return req;
})

//响应拦截
service.interceptors.response.use((res)=>{
    const { code, data, msg} = res.data;
    if(code === 200){
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
 * @param {*} options 请求配置
 * @returns 
 */
function request(options){
    options.method = options.method || 'get'
    if(options.method.toLowerCase() === 'get'){
        options.params = options.data;
    }
    if(typeof options.mock != 'undefined'){
        config.mock = options.mock;
    }
    if(config.env === 'prod'){
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = config.mock ? config.mockApi:config.baseApi
    }
    return service(options)
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