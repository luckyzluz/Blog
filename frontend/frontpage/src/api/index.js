/**
 * api管理
 */
import request from './../utils/request'
export default {
    login(params){
        return request({
            url: '/users/login',
            method:'post',
            data:params,
            // mock:false
        })
    },
    regemail(params){
        return request({
            url: '/email',
            method:'post',
            data:params,
            // mock:false
        })
    },
    reguser(params){
        return request({
            url: '/users',
            method:'post',
            data:params,
            // mock:false
        })
    },
    noticeCount(){
        return request({
            url: '/leave/count',
            method:'get',
            data:{},
            // mock:false
        })
    },
    getMenuList(){
        return request({
            url: '/menu/list',
            method:'get',
            data:{},
            // mock:false
        })
    },
    getArtsList(){
        return request({
            url: '/articles',
            method:'get',
            data:{},
            // mock:true
        })
    }
}