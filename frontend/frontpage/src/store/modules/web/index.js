import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import storage from '@/utils/storage.js'

const store = {
    namespaced:true,
    state: {
        name: 'web',
        isShowSign: true, //登录注册弹窗
        isLogin: false, // 是否已登录
        WebData:{
            webConfig:{
                slider:{
                    home:'',
                    header:true
                }
            },
            slider:[],
            pageList:[]
        } // 网站数据
    },
    mutations,
    actions,
    getters: {
        getWebData(state){
            return state.WebData;
            // state.WebData = storage.getItem('WebData');
        }
    }
}

export default store
