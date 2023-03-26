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
            slider:[
                {
                  title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                  url:'http://baidu.com',
                  imgUrl: 'src/assets/image/slider/社区论坛-幻灯片1.jpg'
                }
              ]
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
