const moduleBlog = {
    namespaced:true,
    state: () => { 
        return{
            isLogin:false,//登录页
            modalBackdrop:false//模态背景
        }
     },
     mutations: { 
        set_IsLogin(state) {
             state.isLogin = !state.isLogin;
        },
        set_ModalBackdrop(state) {
            state.modalBackdrop = !state.modalBackdrop;
       },
     },
    actions: { 
        // commit
     },
    getters: { 
        IsLogin(state) {
            return state.isLogin;
        },
        ModalBackdrop(state) {
            return state.modalBackdrop;
        },
     }
}
export default moduleBlog