<template>
    <!-- 作者相关内容推荐 -->
    <swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
      '--swiper-navigation-size': '15px'
    }" 
    :slidesPerView=props.PerView
    :spaceBetween=10
    :navigation='true'
    :modules="modules"
    class="mySwiper more-posts"
    >
        <swiper-slide v-for="(v,i) in data" :key="i">
            <a :href="v.href">
                <div class="graphic hover-zoom-img style-3" style="padding-bottom: 70%!important; font-size: .9em;">
                    <img class="fit-cover ls-is-cached lazyloaded" :src="v.img" alt="">
                    <div class="abs-center left-bottom graphic-text text-ellipsis">{{ v.title }}</div>
                    <div class="abs-center left-bottom graphic-text">
                        <div class="" style="font-size: .9em; opacity: .8;">{{ v.title }}</div>
                        <div class="px12 opacity8 mt6" style="margin-top: 6px; opacity: .8;font-size: 12px;">
                            <span>{{ v.time }}</span>
                            <span class="pull-right">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-chakan"></use>
                                </svg>{{ v.views }}
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        </swiper-slide>
    </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
const props = defineProps({
    PerView: {
        type: Number,
        default: 2.5
    }
})
const modules= [Navigation];

let data=[
    {
        title:'测试标题',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
        href:'', // 更新日志.jpg
        title:'测试',
        time:'3年前',
        views:2356
    },
    {
        title:'测试标题',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
        href:'', // 更新日志.jpg
        title:'测试',
        time:'3年前',
        views:2356
    },
    {
        title:'测试标题',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
        href:'', // 更新日志.jpg
        title:'测试',
        time:'3年前',
        views:2356
    },
    {
        title:'测试标题',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
        href:'', // 更新日志.jpg
        title:'测试',
        time:'3年前',
        views:2356
    },
    {
        title:'测试标题',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
        href:'', // 更新日志.jpg
        title:'测试',
        time:'3年前',
        views:2356
    },
    {
        title:'测试标题',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
        href:'', // 更新日志.jpg
        title:'测试',
        time:'3年前',
        views:2356
    },
]
</script>
<style lang="scss">
.relates-thumb li a, .user-card .more-posts a {
    width: 100%;
    height: 0;
    padding-bottom: 70%;
    display: block;
    overflow: hidden;
}
.style-3 .graphic-text {
    background: rgba(0,0,0,.2);
}
.style-3 .graphic-text+.graphic-text {
    opacity: 0;
    transform: translateY(100%);
    white-space: normal;
    word-break: break-all;
}
.graphic.style-3:hover .graphic-text {
    opacity: 0;
    transform: translateY(100%);
}
.graphic.style-3:hover .graphic-text+.graphic-text {
    opacity: 1;
    transform: unset;
}
.pull-right {
    float: right!important;
}
// 按钮样式
.mySwiper .swiper-button-next, .mySwiper .swiper-button-prev, .swiper-thumbsbox .swiper-button-next, .swiper-thumbsbox .swiper-button-prev {
    opacity: 0;
    background-color: rgba(0,0,0,.5);
    width: 26px;
    height: 40px;
    transition: .4s;
}
.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
    opacity: 0!important;
    cursor: auto!important;
    pointer-events: none!important;
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    left: -15px;
    right: auto;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev {
    right: -15px;
    left: auto;
}
.mySwiper:hover .swiper-button-next, .swiper-container-initialized:hover .swiper-container-rtl .swiper-button-prev {
    right: 0;
    opacity: .8;
}
.mySwiper:hover .swiper-button-prev, .swiper-container-initialized:hover .swiper-container-rtl .swiper-button-next {
    left: 0;
    opacity: .8;
}
</style>