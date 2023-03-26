import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import storage from '@/utils/storage.js'
const store = {
    namespaced:true,
    state: {
        name: 'test'
    },
    mutations,
    actions,
    getters: {}
}

export default store
