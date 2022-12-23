/**
 * Vuex状态管理
 */
 import { createStore } from "vuex"
 import mutations from "./mutations"
 import storage from "./../utils/storage"
 import moduleBlog from "./modules/blog"

 const state = {
     userInfo: "" || storage.getItem("userInfo") //获取用户信息
 }
 export default createStore({
    //  state,
    //  mutations,
     modules: {
        moduleBlog
    }
 })
// export default new Vuex.Store({
//     // 通过modules属性引入login 模块。
//     modules: {
//       blog: moduleBlog
//     }
//   })