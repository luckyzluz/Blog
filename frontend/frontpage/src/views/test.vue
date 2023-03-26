<template>
    <div>isShowSign-{{ state.user.isShowSign }}
        <br/>
        isShowModalBackdrop-{{ state.isShowModalBackdrop }}
        <br>
        isLogin-{{ state.user.isLogin }}
        <br>
        test-{{ state.test.name }}
        <br>
        <button @click="xx1">isShowModalBackdrop</button>
        <button @click="xx2">isShowModalBackdrop</button>
        <button @click="xx3">登录</button>
    </div>
</template>

<script setup>
import { reactive,ref,nextTick,getCurrentInstance } from 'vue'
import { useStore } from "vuex";
import { vuexFunc, getState } from '@/utils/vueTool';
const {proxy} = getCurrentInstance();
let {state, dispatch,commit} = useStore();
    let isShowSign = true;
    let data = getState('user/isShowSign');
    let xx1=()=>{
        console.log('isShowSign:'+state.user.isShowSign,'isShowModalBackdrop:'+state.isShowModalBackdrop);
    }
    let xx2=()=>{
        // isShowModalBackdrop()
        // dispatch("isShowModalBackdrop");
        dispatch("user/isShowSign");
        // commit("user/isShowSign");
    }
    let xx3=()=>{
        commit("user/isLogin");
    }
    // console.log(data)
//     vuexFunc(false,'isShowModalBackdrop',{
//     data:'',
//     callback(res){
//             console.log(res)
//     }
// });

    // vuexFunc('user','test1',{
    //     data:{code:'2222'},
    //     followUp:{
    //         url:'test/test1',
    //         query:'111'
    //     },
    //     failed:(aa)=>{
    //         console.log('aa'+aa)
    //     },
    // callback(res){
    //     // SignType.value = false
    //     // storage.setItem('authorization',res.data.token);
    //     console.log(res)
         
    // }
// });
</script>