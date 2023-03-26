<template>
<!-- 混播图 -->
    <swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
      '--swiper-navigation-size': '15px'
    }"
    :loop="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :speed="1000"
    :lazy="{
      loadPrevNext: true,
      loadPrevNextAmount: 2,
      loadOnTransitionStart: true,
      
    }"
    :hideOnClick="true"
    :spaceBetween="15"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :effect="'coverflow'"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, i) in state.web.WebData.slider" :key=i>
      <!-- props.Data -->
      <a target="_blank" :href="item.url">
        <img :src="typeof item.imgUrl == 'string'?item.imgUrl:item.imgUrl.bg" loading="lazy"/>
        <div class="slide-layer" v-if="typeof item.imgUrl !== 'string'">
          <img :src="item.imgUrl.layer_1" :alt="item.title" />
        </div>
        <div class="slide-layer" v-if="typeof item.imgUrl !== 'string'">
          <img :src="item.imgUrl.layer_2" :alt="item.title" />
        </div>
      </a>
      <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div> 
      </swiper-slide>
  </swiper>
</template>
<script setup>

  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  import "swiper/css/effect-coverflow";
  import {  Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper';
  import { useStore } from "vuex";
let {state,getters, dispatch,commit} = useStore();
   
  // const props = defineProps({
  //   Data: {
  //     type: Array,
  //     default: () => [
  //       {
  //         title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
  //         url:'http://baidu.com',
  //         imgUrl: 'https://oss.zibll.com/zibll.com/2021/12/%E7%A4%BE%E5%8C%BA%E8%AE%BA%E5%9D%9B-%E5%B9%BB%E7%81%AF%E7%89%871.jpg'
  //       }
  //     ]
  //   },
  // });
  const modules= [ Autoplay, Pagination, Navigation, EffectCoverflow];
</script>
<style lang="scss" scoped>
.mySwiper {
  width: 100%;
  height:0;
  padding-bottom: 37%;
  overflow: hidden;
  position: relative;
  &:hover{
    :deep(.swiper-button-prev){
      left:0;
      opacity: .8;
    }
    :deep(.swiper-button-next){
      right:0;
      opacity: .8;
    }
    :deep(.swiper-pagination) {
    opacity: .8;
}
  }
}
:deep(.swiper-wrapper) {
    height: 100%; //var(--pc-height)
    display: flex;
    position: absolute;
}
:deep(.swiper-slide) {
    width: 844px;
    img:not(.img-icon):not(.smilie-icon):not(.avatar-badge):not(.avatar) {
      max-height: auto; //var(--max-height)
      min-height: var(--min-height);
      -o-object-fit: cover;
      object-fit: cover;
      height: 100%;
      width: 100%;
      position: absolute;
      border-radius: 4px;
  }
  //.slide-layer{
    
     //position: absolute;
     //left: 0;
     //top: 0;
     //right: 0;
     //bottom: 0;
     //width: 100%;
     //height: 100%;
     //text-align: center;
  //}
}

:deep(.swiper-button-next), :deep(.swiper-button-prev){
  text-shadow: 0 0 6px #444;
  margin-top: -25px;
  width:30px;
  height:40px;
  opacity: 0;
  transition: 0.4s;
  &:hover{
    opacity: 1;
    background-color: rgba(0,0,0,.3);
  }
}

:deep(.swiper-button-prev){
  left: -15px;
  right: auto;
}
:deep(.swiper-button-next){
  right: -15px;
  left: auto;
}
:deep(.swiper-pagination){
  text-align: right;
  padding-right: 10px;
  left: auto;
  width: auto;
  right: 0;
  .swiper-pagination-bullet{
    width: 4px;
    height: 4px;
    background: #fff;
    opacity: .7;
    border: none;
    border-radius: 20px;
    margin: 0 2px;
    transition: .4s;
  }
  .swiper-pagination-bullet-active{
    width: 8px;
    opacity: 1;
  }
}
</style>