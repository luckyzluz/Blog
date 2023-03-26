// 修改数据(类似于methods)
export default{
    setWebData(state, data){
        state.WebData = data;
        // console.log(data)
    },
    isLogin(state){
        state.isLogin = !state.isLogin;
    }
}