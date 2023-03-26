// 发起异步请求
import axios from 'axios'
export default{
    test1({commit},params){
        axios({
            method: 'get',
            url: '/localmock/test',
            data: params
          }).then(res=>{
            // return ;failed
            params.callback('test请求');
        });
    }
}