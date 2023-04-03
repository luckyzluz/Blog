<template>
    <div v-if="props.listStyle=='list'" :class="['posts-item list',props.Data.data.type=='pic'?'mult-thumb':'']" :num='props.Data.index'>
        <div v-if="!(props.Data.data.type=='pic')" class="post-graphic">
            <div v-if="props.Data.data.video&&props.Data.data.video !==''" class="item-thumbnail" :style="props.Data.data.type=='article'&&props.Data.data.video?'overflow: hidden; position: relative;':''">
                <div @mouseenter="xx(props.Data.index,$event)" @mouseleave="yy" class="video-thumb-box">
                    <div class="img-thumb">
                        <img class="fit-cover" :src="props.Data.data.covers[0]" alt="">
                    </div>
                    <div class="video-thumb">
                        <Dplayer v-if="activeIndex==props.Data.index" class="dplayer-thumb controller-hide dplayer dplayer-thumb-hide dplayer-hide-controller" :url="props.Data.data.video" :showmenu=false :volume=0 />
                    </div>
                </div>
                <div class="abs-center right-top">
                    <i class="iconfont icon-bofang c-white" style="margin-top: 6px; opacity: .8; font-size: 1.2em;"></i>
                </div>
            </div>
            <div v-else class="item-thumbnail">
                <a v-if="props.Data.data.covers.length==1" :href="props.Data.data.href">
                    <img class="fit-cover" :src="props.Data.data.covers[0]" alt="">
                </a>
                <div v-else class="lz-slider">
                    <swiper :loop="true" :style="{'--swiper-pagination-color': '#fff'}" :modules="modules" :autoplay="{delay: 5000,disableOnInteraction: false,}" :pagination="{clickable: true,}" class="mySwiper item-thumbnail miniswiper">
                        <swiper-slide v-for="(z,w) in props.Data.data.covers" :key="w">
                            <a :href="props.Data.data.href">
                                <img :src="z" alt="">
                            </a>
                            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div> 
                        </swiper-slide>
                    </swiper>
                </div>
                <span v-if="props.Data.data.istop" class="badge img-badge jb-red">置顶</span>
            </div>
        </div>
        <!-- 图库列表只显示以下内容 -->
        <div class="item-body">
            <h2 class="item-heading">
                <a :href="props.Data.data.href">{{ props.Data.data.title }}
                    <span class="focus-color">[{{ props.Data.data.sub }}]</span>
                </a>
            </h2>
            <div v-if="props.Data.data.type=='article'" class="item-excerpt text-ellipsis muted-color">
                {{ props.Data.data.intro }}
            </div>
            <a v-if="props.Data.data.type=='pic'" class="thumb-items">
                <span v-for="(v,i) in props.Data.data.covers.lists">
                    <div v-if="i==3" class="abs-center right-top">
                        <span class="badge b-black">
                            <i class="iconfont icon-image"></i>+{{ props.Data.data.covers.num }}
                        </span>
                    </div>
                    <img class="fit-cover" :src="v" :alt="props.Data.data.title">
                </span>
            </a>
            <div>
                <div class="item-tags scroll-x no-scrollbar">
                    <a v-for="(w,p) in props.Data.data.tags" :class="['but',w.bgColor]">
                        <i v-if="w.icon&&w.icon!==''" :class="['iconfont',w.icon]"></i>
                        {{ w.name }}
                        <span v-if="w.pay&&JSON.stringify(w.pay)!=='{}'">R币</span>{{ w.pay&&JSON.stringify(w.pay)!=='{}'?w.pay.sum:'' }}
                    </a>
                </div>
                <div class="item-meta muted-2-color">
                    <span class="meta-author">
                        <a :href="props.Data.data.author.id">
                            <span class="avatar-mini">
                                <img class="avatar lazyloaded" :src="props.Data.data.author.img" :alt="props.Data.data.author.name+'的头像'">
                            </span>
                        </a>
                        <span class="hidden-sm-only" style="margin-left: 6px;">{{ props.Data.data.author.name }}</span>
                        <span class="icon-circle" :title="props.Data.data.time">{{ props.Data.data.time }}</span>
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
                                        </svg>{{ props.Data.data.comment }}
                                    </a>
                            </el-tooltip>
                        </span>
                        <span class="meta-view">
                            <a href="">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yuedu"></use>
                                </svg>{{ props.Data.data.views }}
                            </a>
                        </span>
                        <span class="meta-like">
                            <a href="">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-zan"></use>
                                </svg>{{ props.Data.data.like }}
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 卡片式列表&& -->
    <div v-else-if="props.listStyle=='card'" class="posts-item card style3">
        <div class="item-thumbnail">
            <!-- 幻灯片 -->
            <div v-if="!(props.Data.data.video&&props.Data.data.video!=='')&&props.Data.data.covers.length!==1" class="lz-slider">
                <swiper :loop="true" :style="{'--swiper-pagination-color': '#fff'}" :modules="modules" :autoplay="{delay: 5000,disableOnInteraction: false,}" :pagination="{clickable: true,}" class="mySwiper item-thumbnail miniswiper">
                        <swiper-slide v-for="(z,w) in (props.Data.data.type=='pic'?props.Data.data.covers.lists:props.Data.data.covers)" :key="w">
                            <a :href="props.Data.data.href">
                                <img :src="z" alt="">
                            </a>
                            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div> 
                        </swiper-slide>
                </swiper>
            </div>
            <div v-if="!(props.Data.data.video&&props.Data.data.video!=='')&&props.Data.data.type=='pic'&&props.Data.data.covers.length!==1" class="abs-center right-top">
                <span class="badge b-black"><i class="iconfont icon-image"></i>{{ props.Data.data.covers.num }}</span>
            </div>
            <!-- 视频 -->
            <div v-if="props.Data.data.video&&props.Data.data.video!==''" @mouseenter="xx(props.Data.index,$event)" @mouseleave="yy" class="video-thumb-box">
                <div class="img-thumb">
                    <img class="fit-cover" :src="props.Data.data.covers[0]" alt="">
                </div>
                <div class="video-thumb">
                    <Dplayer v-if="activeIndex==props.Data.index" class="dplayer-thumb controller-hide dplayer dplayer-thumb-hide dplayer-hide-controller" :url="props.Data.data.video" :showmenu=false :volume=0 />
                </div>
            </div>
            <div v-if="props.Data.data.video&&props.Data.data.video!==''" class="abs-center right-top">
                <i class="iconfont icon-bofang c-white" style="margin-top: 6px; opacity: .8; font-size: 1.2em;"></i>
            </div>
            <!-- 一般 -->
            <a v-if="props.Data.data.covers.length==1&&!(props.Data.data.video&&props.Data.data.video!=='')" href="">
                <img class="fit-cover" :src="props.Data.data.covers[0]" alt="">
            </a>
        </div>
        <div class="item-body">
            <h2 class="item-heading">
                <a href="">{{ props.Data.data.title }}
                    <span v-if="props.Data.data.sub&&props.Data.data.sub !== ''" class="focus-color">[{{ props.Data.data.sub }}]</span>
                </a>
            </h2>
            <div class="item-tags scroll-x no-scrollbar">
                <a v-for="(v,i) in props.Data.data.tags" :class="['but',v.bgColor&&v.bgColor!==''?v.bgColor:'']" title="查看此标签更多文章">
                    <i v-if="v.icon" :class="['iconfont',v.icon ]"></i>{{ v.name }}
                </a>
            </div>
            <div class="item-meta muted-2-color">
                <span class="meta-author">
                    <a>
                        <span class="avatar-mini">
                            <img class="avatar lazyloaded" :src="props.Data.data.author.img" :alt="props.Data.data.author.name+'的头像'">
                        </span>
                    </a>
                    <span>{{ props.Data.data.time }}</span>
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
                                        </svg>{{ props.Data.data.comment }}
                                    </a>
                            </el-tooltip>
                        </span>
                        <span class="meta-view">
                            <a href="">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yuedu"></use>
                                </svg>{{ props.Data.data.views }}
                            </a>
                        </span>
                        <span class="meta-like">
                            <a href="">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-zan"></use>
                                </svg>{{ props.Data.data.like }}
                            </a>
                        </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Dplayer from 'c/player/Dplayer.vue';
import {ref,reactive} from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import {  Autoplay, Pagination } from 'swiper';
const modules= [ Autoplay, Pagination];
const changePlayb=ref(null);
let player =reactive({});
const props = defineProps({
    Data: {
      type: Object,
    //   default: () =>[]
    },
    listStyle:{
        type:String
    }
});
let activeIndex=ref(-1); // 是否加载视频预览模块

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
</script>
<style lang="scss">
.dplayer-controller,.controller-hide .dplayer-controller-mask,.mobile-nav-widget .dplayer-full-in,.mobile-nav-widget .dplayer-loop,.sidebar .dplayer-full-in,.sidebar .dplayer-loop{display:none!important}
.dplayer-played,.dplayer-thumb,.dplayer-volume-bar-inner{background:var(--focus-color)!important}
.dplayer-scale-height{padding-bottom:var(--scale-height)!important}
.dplayer-scale-height .dplayer-video-wrap{position:absolute!important}
.post-dplayer,.wp-block-gallery,.wp-block-image{margin-bottom:20px}

.dplayer-thumb{
    padding-bottom:var(--posts-list-scale);transition:opacity .3s
}
.item-thumbnail .dplayer-thumb .dplayer-bezel .dplayer-bezel-icon{opacity:0!important}
.item-thumbnail .dplayer-video-wrap,.item-thumbnail .swiper-wrapper,.item-thumbnail img{position:absolute}
.dplayer.dplayer-hide-controller {
    cursor: none;
}
.item-thumbnail .dplayer-video-wrap{z-index:1}.dplayer-thumb-hide{opacity:0}
.posts-item {
    padding: 20px;
    margin: 15px 0;
    display: flex;
    background: var(--main-bg-color);
    overflow: hidden;
    transition: .2s;
    box-shadow: 0 0 10px var(--main-shadow);
    border-radius: var(--main-radius);
    .post-graphic:not(.order1) {
        margin-right: 20px;
    }
    .item-thumbnail {
        width: 190px;
        height: 0;
        padding-bottom: var(--posts-list-scale);
        position: relative;
        overflow: hidden;
        border-radius: var(--main-radius);
        img{
            border-radius: var(--main-radius);
        }
        .img-badge {
            left: 0;
            border-radius: 0 50px 50px 0;
            right: auto;
        }
    }
    .item-body{
        display: flex;
        flex: auto;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
    }
    .item-heading {
        margin-top: 0;
        margin-bottom: 5px;
        font-size: 18px;
        line-height: 1.4em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
        max-height: 2.8em;
        &>a {
            color: var(--key-color);
        }
    }
    .item-excerpt{
        margin-bottom: 6px;
    }
    .thumb-items {
        margin: 0 -3px 6px -3px;
        &>span {
            width: calc(25% - 6px);
            display: inline-block;
            height: 0;
            padding-bottom: calc(var(--posts-list-scale)/ 4);
            margin: 0 3px;
            position: relative;
            &>img {
                position: absolute;
                border-radius: var(--main-radius);
            }
            .badge{
                font-size: .9em;
            }
        }
    }
    .item-meta{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avatar-mini {
            transform: translateY(-1px);
        }
        .meta-author,.meta-right span {
            margin-right: 8px;
            font-size: 13px;
        }
        .meta-author {
            display: flex;
            align-items: center;
        }
    }
    .item-tags{
        margin-bottom: 6px;
        a {
            font-size: 11px;
            padding: 2px 5px;
            margin-right: 5px;
            span{
                font-size: .9em;
                margin-left: 3px;
            }
            .iconfont {
                font-size: 1em;
            }
        }
    }
    .badge{
        margin-top: 6px;
        margin-right: 6px;
        i{
            margin-right: 3px;
        }
    }
}
// 卡片样式列表
.posts-item{
    &.card {
        width: calc(33.333% - 16px);
        display: inline-block !important;
        margin: 8px;
        padding: 10px;
        vertical-align: top;
        transition: .3s;
        &.style3 {
            padding: 0;
            .item-thumbnail, .item-thumbnail img {
                border-radius: var(--main-radius) var(--main-radius) 0 0;
            }
            .item-body {
                padding: 10px;
                margin: 0;
            }
        }
        .item-thumbnail {
            width: 100%;
            padding-bottom: var(--posts-card-scale);
        }
        .item-body {
            width: 100%;
            margin: 10px 0 0 0;
            padding: 0;
        }
        .item-heading {
            min-height: 2.8em;
        }
        .item-tags {
            min-height: 23px;
        }
        .item-meta>span {
            font-size: 12px;
            &>span{
                margin-left: 6px;
            }
        }
        .meta-right span{
            font-size: 12px;
        }
    }
}

</style>