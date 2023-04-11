<template>
    <!-- 评论模块头部 -->
    
    
</template>
<script setup>
import { onMounted,ref} from 'vue';


let openMenuActive=ref('');
let uploadWay=ref('url');
const smiliebtn=ref(null);
let smilies=[
    {
        name:'aoman',
        url:'src/assets/image/web/smilies/aoman.gif'
    },
    {
        name:'baiyan',
        url:'src/assets/image/web/smilies/baiyan.gif'
    },
    {
        name:'bishi',
        url:'src/assets/image/web/smilies/bishi.gif'
    },
    {
        name:'bizui',
        url:'src/assets/image/web/smilies/bizui.gif'
    },
    {
        name:'cahan',
        url:'src/assets/image/web/smilies/cahan.gif'
    },
    {
        name:'ciya',
        url:'src/assets/image/web/smilies/ciya.gif'
    },
    {
        name:'dabing',
        url:'src/assets/image/web/smilies/dabing.gif'
    },
    {
        name:'daku',
        url:'src/assets/image/web/smilies/daku.gif'
    },
    {
        name:'deyi',
        url:'src/assets/image/web/smilies/deyi.gif'
    },
    {
        name:'doge',
        url:'src/assets/image/web/smilies/doge.gif'
    },
    {
        name:'fadai',
        url:'src/assets/image/web/smilies/fadai.gif'
    },
    {
        name:'fanu',
        url:'src/assets/image/web/smilies/fanu.gif'
    },
    {
        name:'fendou',
        url:'src/assets/image/web/smilies/fendou.gif'
    },
    {
        name:'ganga',
        url:'src/assets/image/web/smilies/ganga.gif'
    },
    {
        name:'guzhang',
        url:'src/assets/image/web/smilies/guzhang.gif'
    },
    {
        name:'haixiu',
        url:'src/assets/image/web/smilies/haixiu.gif'
    },
    {
        name:'hanxiao',
        url:'src/assets/image/web/smilies/hanxiao.gif'
    },
    {
        name:'zuohengheng',
        url:'src/assets/image/web/smilies/zuohengheng.gif'
    },
    {
        name:'zhuakuang',
        url:'src/assets/image/web/smilies/zhuakuang.gif'
    },
    {
        name:'zhouma',
        url:'src/assets/image/web/smilies/zhouma.gif'
    },
    {
        name:'zhemo',
        url:'src/assets/image/web/smilies/zhemo.gif'
    },
    {
        name:'zhayanjian',
        url:'src/assets/image/web/smilies/zhayanjian.gif'
    },
    {
        name:'zaijian',
        url:'src/assets/image/web/smilies/zaijian.gif'
    },
    {
        name:'yun',
        url:'src/assets/image/web/smilies/yun.gif'
    },
    {
        name:'youhengheng',
        url:'src/assets/image/web/smilies/youhengheng.gif'
    },
    {
        name:'yiwen',
        url:'src/assets/image/web/smilies/yiwen.gif'
    },
    {
        name:'yinxian',
        url:'src/assets/image/web/smilies/yinxian.gif'
    },
    {
        name:'xu',
        url:'src/assets/image/web/smilies/xu.gif'
    },
    {
        name:'xieyanxiao',
        url:'src/assets/image/web/smilies/xieyanxiao.gif'
    },
    {
        name:'xiaoku',
        url:'src/assets/image/web/smilies/xiaoku.gif'
    },
    {
        name:'xiaojiujie',
        url:'src/assets/image/web/smilies/xiaojiujie.gif'
    },
    {
        name:'xia',
        url:'src/assets/image/web/smilies/xia.gif'
    },
    {
        name:'wunai',
        url:'src/assets/image/web/smilies/wunai.gif'
    },
    {
        name:'wozuimei',
        url:'src/assets/image/web/smilies/wozuimei.gif'
    },
    {
        name:'weixiao',
        url:'src/assets/image/web/smilies/weixiao.gif'
    },
    {
        name:'weiqu',
        url:'src/assets/image/web/smilies/weiqu.gif'
    },
    {
        name:'tuosai',
        url:'src/assets/image/web/smilies/tuosai.gif'
    },
    {
        name:'tu',
        url:'src/assets/image/web/smilies/tu.gif'
    },
    {
        name:'touxiao',
        url:'src/assets/image/web/smilies/touxiao.gif'
    },
    {
        name:'tiaopi',
        url:'src/assets/image/web/smilies/tiaopi.gif'
    },
    {
        name:'shui',
        url:'src/assets/image/web/smilies/shui.gif'
    },
    {
        name:'se',
        url:'src/assets/image/web/smilies/se.gif'
    },
    {
        name:'saorao',
        url:'src/assets/image/web/smilies/saorao.gif'
    },
    {
        name:'qiudale',
        url:'src/assets/image/web/smilies/qiudale.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
//     qiaoda
// piezui
// penxue
// nanguo
// liulei
// liuhan
// lenghan
// leiben
// kun
// kuaikule
// ku
// koubi
// kelian
// keai
// jingya
// jingxi
// jingkong
// jie
// huaixiao
// haqian
// aini
// OK
// qiang
// quantou
// shengli
// woshou
// gouyin
// baoquan
// aixin
// bangbangtang
// xiaoyanger
// xigua
// hexie
// pijiu
// lanqiu
// juhua
// hecai
// haobang
// caidao
// baojin
// chi
// dan"
// kulou
// shuai
// shouqiang
// yangtuo
// youling


]
// onMounted(()=>{
//     window.addEventListener('click',()=>{
//         openMenuActive.value='';
//         })
// })
// const openMenu=(value)=>{
//     openMenuActive.value=value;
// }
</script>
<style lang="scss">

</style>