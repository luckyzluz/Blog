<template>
    <!-- <div class="posts-item card style3"> -->
        <div class="item-thumbnail">
            <!-- 幻灯片 -->
            <div v-if="!(props.Data.video&&props.Data.video!=='')&&props.Data.covers.length!==1" class="lz-slider">
                <swiper :loop="true" :style="{'--swiper-pagination-color': '#fff'}" :modules="modules" :autoplay="{delay: 5000,disableOnInteraction: false,}" :pagination="{clickable: true,}" class="mySwiper item-thumbnail miniswiper">
                        <swiper-slide v-for="(z,w) in (props.Data.type=='pic'?props.Data.covers.lists:props.Data.covers)" :key="w">
                            <a :href="props.Data.href">
                                <img :src="z" alt="">
                            </a>
                            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div> 
                        </swiper-slide>
                </swiper>
            </div>
            <div v-if="!(props.Data.video&&props.Data.video!=='')&&props.Data.type=='pic'&&props.Data.covers.length!==1" class="abs-center right-top">
                <span class="badge b-black"><i class="iconfont icon-image"></i>{{ props.Data.covers.num }}</span>
            </div>
            <!-- 视频 -->
            <div v-if="props.Data.video&&props.Data.video!==''" @mouseenter="xx(props.Data.index,$event)" @mouseleave="yy" class="video-thumb-box">
                <div class="img-thumb">
                    <img class="fit-cover" :src="props.Data.covers[0]" alt="">
                </div>
                <div class="video-thumb">
                    <Dplayer v-if="activeIndex==props.Data.index" class="dplayer-thumb controller-hide dplayer dplayer-thumb-hide dplayer-hide-controller" :url="props.Data.video" :showmenu=false :volume=0 />
                </div>
            </div>
            <div v-if="props.Data.video&&props.Data.video!==''" class="abs-center right-top">
                <i class="iconfont icon-bofang c-white" style="margin-top: 6px; opacity: .8; font-size: 1.2em;"></i>
            </div>
            <!-- 一般 -->
            <a v-if="props.Data.covers.length==1&&!(props.Data.video&&props.Data.video!=='')" href="">
                <img class="fit-cover" :src="props.Data.covers[0]" alt="">
            </a>
        </div>
        <div class="item-body">
            <h2 class="item-heading">
                <a href="">{{ props.Data.title }}
                    <span v-if="props.Data.sub&&props.Data.sub !== ''" class="focus-color">[{{ props.Data.sub }}]</span>
                </a>
            </h2>
            <div class="item-tags scroll-x no-scrollbar">
                <a v-for="(v,i) in props.Data.tags" :class="['but',v.bgColor&&v.bgColor!==''?v.bgColor:'']" title="查看此标签更多文章">
                    <i v-if="v.icon" :class="['iconfont',v.icon ]"></i>{{ v.name }}
                </a>
            </div>
            <div class="item-meta muted-2-color">
                <span class="meta-author">
                    <a>
                        <span class="avatar-mini">
                            <img class="avatar lazyloaded" :src="props.Data.author.img" :alt="props.Data.author.name+'的头像'">
                        </span>
                    </a>
                    <span>{{ props.Data.time }}</span>
                </span>
                <div class="meta-right">
                    <span class="meta-comm">
                            <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="去评论"
                                    placement="top"
                                >
                                    <a href="">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-xiaoxi1"></use>
                                        </svg>{{ props.Data.comment }}
                                    </a>
                            </el-tooltip>
                        </span>
                        <span class="meta-view">
                            <a href="">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yuedu"></use>
                                </svg>{{ props.Data.views }}
                            </a>
                        </span>
                        <span class="meta-like">
                            <a href="">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-zan"></use>
                                </svg>{{ props.Data.like }}
                            </a>
                        </span>
                </div>
            </div>
        <!-- </div> -->
    </div>
</template>
<script setup>
import {ref} from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import {  Autoplay, Pagination } from 'swiper';
import Dplayer from 'c/player/Dplayer.vue';
const modules= [ Autoplay, Pagination];
let activeIndex=ref(-1); // 是否加载视频预览模块
const props = defineProps({
    Data: {
      type: Object,
    //   default: () =>[]
    }
});
let xx=(index,e)=>{
    activeIndex.value=index;
    setTimeout(()=>{
        e.target.lastElementChild.lastElementChild.classList.remove('dplayer-thumb-hide','dplayer-hide-controller');
        e.target.querySelector('.dplayer-video').play();
    },0)
    }
let yy=(e)=>{
    e.target.lastElementChild.lastElementChild.classList.add('dplayer-thumb-hide','dplayer-hide-controller');
    e.target.querySelector('.dplayer-video').pause();
}
// console.log(props.Data)
</script>
<style lang="scss">
.swiper-scroll .posts-item {
    flex-shrink: 0;
    margin-top: 0;
    margin-bottom: 0;
}
@media (min-width: 992px){
    .fluid-widget .card, .site-layout-1 .card {
    width: calc(25% - 16px)!important;
}
}

</style>