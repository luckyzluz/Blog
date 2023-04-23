// 修改数据(类似于methods)
export default{
    isShowModalBackdrop(state){ //切换模态框显隐
        state.isShowModalBackdrop = !state.isShowModalBackdrop;
    },
    changeLoading(state){ // 切换loading页面显隐
        state.isLoading=!state.isLoading;
    }
}