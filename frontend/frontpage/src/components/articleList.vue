<template>
    <div class="posts-item">
        <div v-if="props.Data.type=='article'" class="post-graphic">
            <div v-if="props.Data.video&&props.Data.video !==''" class="item-thumbnail" :style="props.Data.type=='article'&&props.Data.video?'overflow: hidden; position: relative;':''">
                <div @mouseenter="xx" @mouseleave="yy" class="video-thumb-box">
                    <div class="img-thumb">
                        <img class="fit-cover" :src="props.Data.cover" alt="">
                    </div>
                    <div class="video-thumb">
                        <!--  -->
                        <Dplayer class="dplayer-thumb controller-hide dplayer dplayer-thumb-hide dplayer-hide-controller" :url="'https://vip.lz-cdn.com/20220606/17379_0df2db27/index.m3u8'" :showmenu=false :getplayer=true :volume=0 @player="clickEven"/>
                    </div>
                </div>
                <div class="abs-center right-top">
                    <i class="iconfont icon-bofang c-white" style="margin-top: 6px; opacity: .8; font-size: 1.2em;"></i>
                </div>
            </div>
            <div v-else class="item-thumbnail">
                <a :href="props.Data.href">
                    <img class="fit-cover" :src="props.Data.cover" alt="">
                </a>
                <span v-if="props.Data.istop" class="badge img-badge jb-red">置顶</span>
            </div>
        </div>
        <div class="item-body">
            <h2 class="item-heading">
                <a :href="props.Data.href">{{ props.Data.title }}
                    <span class="focus-color">[{{ props.Data.sub }}]</span>
                </a>
            </h2>
            <div v-if="props.Data.type=='article'" class="item-excerpt text-ellipsis muted-color">
                {{ props.Data.intro }}
            </div>
            <a v-if="props.Data.type=='pic'" class="thumb-items">
                <span v-for="(v,i) in props.Data.cover.lists">
                    <div v-if="i==3" class="abs-center right-top">
                        <span class="badge b-black">
                            <i class="iconfont icon-tupian2"></i>+{{ props.Data.cover.num }}
                        </span>
                    </div>
                    <img class="fit-cover" :src="v" :alt="props.Data.title">
                </span>
            </a>
            <div>
                <div class="item-tags scroll-x">
                    <a v-for="(w,p) in props.Data.tags" :class="['but',w.bgColor]">
                        <i v-if="w.icon&&w.icon!==''" :class="['iconfont',w.icon]"></i>
                        {{ w.name }}
                        <span v-if="w.pay&&JSON.stringify(w.pay)!=='{}'">R币</span>{{ w.pay&&JSON.stringify(w.pay)!=='{}'?w.pay.sum:'' }}
                    </a>
                </div>
                <div class="item-meta muted-2-color">
                    <span class="meta-author">
                        <a :href="props.Data.author.id">
                            <span class="avatar-mini">
                                <img class="avatar lazyloaded" :src="props.Data.author.img" :alt="props.Data.author.name+'的头像'">
                            </span>
                        </a>
                        <span class="hidden-sm-only" style="margin-left: 6px;">{{ props.Data.author.name }}</span>
                        <span class="icon-circle" :title="props.Data.time">{{ props.Data.time }}</span>
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
            </div>
        </div>
    </div>
</template>
<script setup>
import Dplayer from 'c/Dplayer.vue';
import {ref,reactive} from 'vue'
const changePlayb=ref(null);
let player =reactive({});
const props = defineProps({
    Data: {
      type: Object,
    //   default: () =>[]
    }
});
const clickEven=(val)=>{
//   val.paused=false
  player=val
  console.log(player);
}
let xx=(e)=>{
    // console.log();
    e.target.lastElementChild.lastElementChild.classList.remove('dplayer-thumb-hide','dplayer-hide-controller');
    
    document.querySelector('.dplayer-video').play();
    // dplayer-thumb-hide 
    // e.target.parentNode.classList.add('thumb-dplayer-playing')
    // e.target.lastElementChild.lastElementChild.classList.add('dplayer-playing');
    // player.toggle();
    // changePlayb.value[0].changePlay();
    // player.play()
    // console.log()
    }
    let yy=(e)=>{
    // console.log();
    e.target.lastElementChild.lastElementChild.classList.add('dplayer-thumb-hide','dplayer-hide-controller');
    document.querySelector('.dplayer-video').pause();
    // e.target.parentNode.classList.remove('thumb-dplayer-playing'); //,'dplayer-playing'
    // e.target.lastElementChild.lastElementChild.classList.remove('dplayer-playing');
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
                margin-top: 6px;
                margin-right: 6px;
                font-size: .9em;
                i{
                    margin-right: 3px;
                }
            }
        }
    }
    .item-meta{
        .meta-author,.meta-right span {
            margin-right: 8px;
            font-size: 13px;
        }
        .meta-author {
            display: flex;
            align-items: center;
        }
        .meta-right{

        }
    }
}
</style>