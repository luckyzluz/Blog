<script setup>
import { ref, reactive, toRefs,onMounted, watchEffect,onUnmounted, watch, getCurrentInstance } from 'vue'
import Header from 'c/Header.vue'
import headerSliderCon from 'c/headerSliderCon.vue';
import FluidWidget from 'c/FluidWidget.vue'
import userCard from 'c/aside/userCard.vue'
import Footer from 'c/Footer.vue'
import Sign from 'c/Sign.vue'
import Fixedtool from 'c/Fixedtool.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import { useStore } from "vuex";

import hotPosts from 'c/aside/hotPosts.vue'
import mediaImage from 'c/aside/mediaImage.vue'
import postsMiniLists from 'c/aside/postsMiniLists.vue'
import newComment from './components/aside/newComment.vue'
import tagCloud from 'c/aside/tagCloud.vue'
import search from 'c/aside/search.vue'
import Video from './components/aside/video.vue'
import articleCatalogue from 'c/aside/articleCatalogue.vue'
const {proxy} = getCurrentInstance();
let {state,getters, dispatch,commit} = useStore();
const data=[]
const notice=[
          {
            icon:'icon-point',
            content: '主题功能较多，部分功能未能演示，敬请谅解，如有疑问请与客服联系'
          },
          {
            icon: 'icon-aixin_shixin',
            content: '本站为演示站，购买主题、管理授权请转至www.zibll.com'
          }
    ]
let isShowModal = true;
let UserData = {
  name:'hhhh',
  profile: '这家伙很懒，什么都没有写...',
  avatar: 'https://gw.alipayobjects.com/zos/basement_prod/740e223d-7c72-4259-93f3-df7e608e9376.svg',
  level: 2,
  forum_post:6,
  post: 33,
  comment: 33,
  view:33
}
let WebData=reactive({});
// 实时滚动条高度
const scrollTop = () => {
      let scroll = document.documentElement.scrollTop || document.body.scrollTop;
      let bodyClass=document.querySelector('body').classList;
      if(scroll>0&&!bodyClass.contains('body-scroll')){
        bodyClass.add('body-scroll')
      }else{
        bodyClass.remove('body-scroll');
      }
}
// 统一监听
watchEffect(() => {
  if(state.isShowModalBackdrop){
        document.body.classList.add('modal-open');
    }else{
      document.body.classList.remove('modal-open');
    }
})


onMounted(()=>{
  dispatch("web/getBlog");
  if(true){
    dispatch("user/getUser");
  }
  // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // console.log(scrollTop)
  // window.addEventListener("scroll", getDistanceToViewportTop)
  // console.log(state.web.WebData.slider)
  // 监听滚动条位置
  window.addEventListener('scroll', scrollTop, true);
})
onUnmounted(()=>{
  // window.removeEventListener("scroll", getDistanceToViewportTop)
})
const cc=(value)=>{
  // console.log(value)
  // 5505
  let uu=document.querySelector('.artlist.el-affix .el-affix--fixed')
  // console.log(uu)
  if(uu&&value.scrollTop>=2759){
    uu.style.setProperty("opacity", "1")
    uu.style.setProperty("z-index", "100")
  }else if(uu){
    uu.style.setProperty("opacity", "0")
    uu.style.setProperty("z-index", "-999")
  }
  if(uu&&value.scrollTop>=5505){
    uu.style.removeProperty("top");
    // uu.style.setProperty("bottom", "171px")
    uu.style.bottom='510px'
  }else if(uu){
    uu.style.removeProperty("bottom");
    // uu.style.setProperty("bottom", "171px")
    uu.style.top='68px'
  }
}
</script>
<template>
  <!-- header -->
  <Header />
  <headerSliderCon />
  <!-- 公告 -->
  <FluidWidget/>
  <!-- main -->
  <main class="container">
    <div class="content">
      <div class="content-layout">
        <router-view></router-view>
      </div>
    </div>
    <aside class="sidebar">
      <!-- <el-affix class="artlist" @scroll="cc" :offset="68">
        <articleCatalogue />
      </el-affix> -->
      <!-- <articleCatalogue /> -->
      <userCard :UserData="state.user.UserData" />
      <hotPosts />
      <mediaImage />
      <postsMiniLists />
      <newComment />
      <tagCloud />
      <search />
      <Video />
    </aside>
  </main>


  <Footer />
  <!-- 窗格容器 -->
  <div v-show="state.isShowModalBackdrop" class="modal-dialog">
    <Sign />
  </div>
  <!-- 窗格模态背景 -->
  <div v-show="state.isShowModalBackdrop" class="modal-backdrop fade in"></div>
  <Fixedtool />
  <MusicPlayer />

</template>
<style lang="scss">
html{
  -webkit-tap-highlight-color: transparent;
}
body{
    background-color: var(--body-bg-color);
    color: var(--main-color);
    &.nav-fixed{
        padding-top: 88px;
        &:not(.body-scroll) .header.show-slide {
          --header-bg: linear-gradient(0, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, .1) 80%);
          --header-color: #fff;
          -webkit-backdrop-filter: unset;
          backdrop-filter: unset;
      }
      .slide-header {
          margin-top: -90px;
      }
    }
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    display: block;
    line-height: 1.42857143;
}
.content{
  float: left;
  width: 100%;
  // background-color: yellow;
}
.content-layout{
  margin-right: calc(311px + 15px);
}
.sidebar {
    float: left;
    margin-left: -311px;
    width: 311px;
    position: unset;
}
// 全屏遮罩
.modal-backdrop{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #000;
    opacity: .5;
    transition: opacity .15s linear;
    display: block;
}
.modal-open {
    overflow: hidden;
}
.modal-dialog{
  padding-right: 0!important;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    transition: opacity .15s linear;
}
.modal-open .modal-dialog{
  overflow-x: hidden;
    overflow-y: auto;
    
}
</style>