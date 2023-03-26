/**
 * api管理
 */
import request from './../utils/request';
export default {
    // 用户签到
    getSlider(){
        return request({
            url: '/slider',
            method:'get',
            data:'',
            // mock:false
        })
    },
    getBlogConfig(){
        return request({
            url: '/blog',
            method:'get',
            data:'',
            // mock:false
        })
    },
    
}