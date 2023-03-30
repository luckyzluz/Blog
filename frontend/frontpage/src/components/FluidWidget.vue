<template>
  <!-- 公告 -->
<div class="container fluid-widget">
  <div class="swiper-bulletin">
    <swiper
    :navigation="false"
    :spaceBetween="30"
    :centeredSlides="true"
    :direction="'vertical'"
    :loop="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :speed="1000"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, i) in state.web.WebData.webConfig.notice" :key=i>
      <a class="text-ellipsis">
        <div class="relative bulletin-icon mr6">
          <i :class='["iconfont","abs-center",item.icon]'></i>
          </div>
          {{item.content}}
          </a>
          </swiper-slide>
  </swiper>
  </div>
</div>
  
</template>
<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import { Autoplay, Pagination, Navigation } from 'swiper';
  import { useStore } from "vuex";
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    props:{
      notice:{
        type: Array,
        default: ()=>[
          {
            icon:'icon-point',
            content: '主题功能较多，部分功能未能演示，敬请谅解，如有疑问请与客服联系'
          },
          {
            icon: 'icon-aixin_shixin',
            content: '本站为演示站，购买主题、管理授权请转至www.zibll.com'
          }
        ]
      } 
    },
    setup(props) {
      
  let {state,getters, dispatch,commit} = useStore();
      return {
        modules: [Autoplay],
        props,
        state
      };
    },
  };
</script>
<style lang="scss">
@import "@/styles/common.scss";
.container {
    max-width: 1200px;//var(--mian-max-width)
    width: auto;
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    .swiper-bulletin {
      padding: .1em 6px;
      background: $c-red-background;
      border-radius: 100px;
      margin-bottom: 20px;
      .swiper {
        line-height: 2.4em;
        height: 2.4em;
        overflow: hidden;
        touch-action: pan-x;
      }
      .text-ellipsis {
        display: block;
        line-height: 33px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .bulletin-icon{
          margin-right: 6px;
          position: relative;
          .abs-center {
            left: 0;
            width: 100%;
            position: absolute;
            top: 50%;
            right: .7em;
            transform: translateY(-50%);
            z-index: 1;
          }
        }
      }
      a {
        color: $this-color;
      }
    }
}
.bulletin-icon {
    background: $this-color;
    width: 26px;
    height: 26px;
    text-align: center;
    border-radius: 30px;
    color: #fff;
    font-size: 16px;
    display: inline-block;
    vertical-align: -8px;
}
// .swiper-slide {
  /* Center slide text vertically */
// }
</style>
