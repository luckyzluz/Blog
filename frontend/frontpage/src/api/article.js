/**
 * api管理
 */
import request from './../utils/request';
export default {
    getArtsList(){
        return request({
            url: '/articles',
            method:'get',
            data:{},
            // mock:true
        })
    }
}