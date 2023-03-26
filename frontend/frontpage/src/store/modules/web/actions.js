// 发起异步请求
import axios from 'axios'
import api from 'api/index'
export default{
    // 切换登录框开关
    isShowSign({ state, commit }){
        // 切换登录框开关
        commit('isShowSign');
        // 切换模态背景开关
        commit("isShowModalBackdrop", {}, { root: true });
    },
    // 登录
    UserLoginFunc({ state, commit }){
        api.login().then((res) => {
            // console.log(res)
            if(res.data.success){
                commit("isLogin");
            }else{
                console.log('denglu')
            }
        })
    },
    getBlog({ commit }){
        api.getBlog().then((res)=>{
            // console.log(res)
            commit('setWebData',res.data.data)
        })
    }
}