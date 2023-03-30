import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import storage from '@/utils/storage.js'

const store = {
    namespaced:true,
    state: {
        name: 'user',
        isShowSign: false, //登录注册弹窗
        isLogin: true, // 是否已登录
        UserData:{
            level:1
        } // 用户数据
    },
    mutations,
    actions,
    getters: {
        getUserData(state){
            // state.UserData = storage.getItem('UserData');
        }
    }
}

export default store
