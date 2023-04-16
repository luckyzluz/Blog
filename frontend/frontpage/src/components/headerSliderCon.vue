<template>
    <!-- 头部slider -->
    <div class="header-slider-container mb20 filter-blur">
        <div class="relative">
            <div class="relative lz-slider">
                <swiper
                    :style="{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                        '--swiper-navigation-size': '15px',
                        '--m-height': '300px',
                        '--pc-height': '560px'
                        }"
                    class="mySwiper slide-header"
                >
                        <swiper-slide>
                            <span>
                                <video autoplay="" loop="" muted="" class="fit-cover lazyloading" src="src/assets/video/唯美视频背景.webm"></video>
                            </span>
                        </swiper-slide>
                </swiper>
            </div>
            <div class="header-slider-search abs-center">
                <div class="header-slider-search-more text-center before">
                    <div class="em16 font-bold mb10">更优雅的Wordpress主题</div>
                    <div>这是导航栏多功能组件，支持视频、图片、幻灯片</div>
                </div>
                <div class="search-input">
                    <form method="get" class="search-form" action="">
                        <div class="line-form">
                            <div class="search-input-text">
                                <input type="text" name="s" class="line-form-input" tabindex="1" value="">
                                <i class="line-form-line"></i>
                                <div class="scale-placeholder" default="开启精彩搜索">开启精彩搜索</div>
                                <div class="abs-right muted-color">
                                    <button type="submit" tabindex="2" class="null"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-search"></use></svg></button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="search-keywords">
                        <p class="muted-color">热门搜索</p>
                        <div>
                            <a class="search_keywords muted-2-color but em09 mr6 mb6" href="/?s=文章">文章</a>
                            <a class="search_keywords muted-2-color but em09 mr6 mb6" href="/?s=优化">优化</a>
                            <a class="search_keywords muted-2-color but em09 mr6 mb6" href="/?s=index">index</a>
                            <a class="search_keywords muted-2-color but em09 mr6 mb6" href="/?s=图片">图片</a>
                            <a class="search_keywords muted-2-color but em09 mr6 mb6" href="/?s=友情链接">友情链接</a>
                            <a class="search_keywords muted-2-color but em09 mr6 mb6" href="/?s=代码">代码</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-slider-card container">
            <div class="flex jse flex-row gutters-5 flex-col-sm-2">

            </div>
            <el-row :gutter="10">
                <el-col v-for="(v,i) in data" :key="i" :span="24/data.length">
                    <a :href="v.href">
                        <div class="icon-cover-card flex ac lz-widget">
                            <div :class="['icon-cover-icon badg cir',v.icon.bgColor]" style="font-size: 25px;">
                                <svg v-if="v.icon.type=='svg'" class="icon em09" aria-hidden="true">
                                    <use :xlink:href="'#icon-'+v.icon.name"></use>
                                </svg>
                                <i v-else :class="['iconfont em09', 'icon-'+v.icon.name]"></i>
                            </div>
                            <div class="icon-cover-desc ml10 flex1 px12-sm">
                                <div class="em12 text-ellipsis font-bold">{{ v.title }}
                                    <span v-if="v.badge&&v.badge.name!==''" :class="['badge ml6',v.badge.bgColor]">{{ v.badge.name }}<i v-if="v.badge.arrowright" class="iconfont icon-arrowright em12"></i>
                                    </span>
                                </div>
                                <div class="muted-color mt6 text-ellipsis">{{ v.intro }}</div>
                            </div>
                        </div>
                    </a>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import {useStore} from 'vuex'
let {state,getters, dispatch,commit} = useStore();
console.log(state.web.WebData)
let data=[
    {
        title:'测试标题A',
        icon:{
            type:'svg',
            name:'liwu_gift',
            bgColor:'c-yellow'
        },
        badge:{
            name:'标签',
            bgColor:'jb-yellow',
            arrowright:true
        },
        href:'http://www.baidu.com',
        intro:'这是一个测试介绍'
    },
    {
        title:'测试标题B',
        icon:{
            type:'svg',
            name:'VIP',
            bgColor:'c-blue-2'
        },
        badge:{
            name:'',
            bgColor:'',
            arrowright:true
        },
        href:'http://www.baidu.com',
        intro:'这是一个测试介绍'
    },
    {
        title:'测试标题C',
        icon:{
            type:'svg',
            name:'redu1',
            bgColor:'jb-pink'
        },
        badge:{
            name:'NEW',
            bgColor:'jb-yellow',
            arrowright:false
        },
        href:'http://www.baidu.com',
        intro:'这是一个测试介绍'
    },
    {
        title:'测试标题D',
        icon:{
            type:'icon',
            name:'ioxhost',
            bgColor:'jb-cyan'
        },
        badge:{
            name:'GO',
            bgColor:'jb-blue',
            arrowright:true
        },
        href:'http://www.baidu.com',
        intro:'这是一个测试介绍'
    },
]
</script>
<style lang="scss">
.search-input {
    max-width: 600px;
    margin: auto;
    .line-form {
        display: flex;
        align-items: flex-end;
        .search-input-text {
            flex-grow: 2;
        }
    }
}
.search-keywords {
    padding: 10px;
}
.header-slider-search {
    max-width: 840px;
    margin: auto;
    padding: 0 20px;
    font-size: 17px;
    top: calc(50% + 10px);
    .search-input {
        max-width: 800px;
    }
    .line-form {
        background: rgba(255,255,255,.8);
        border-radius: 100px;
        padding: .5em 1.2em;
        z-index: 1;
        color: #555;
        .abs-right {
            margin-top: 0;
            margin-right: -6px;
        }
    }
    .search-keywords {
        text-align: center;
        padding: 3px 5px;
        font-size: .85em;
    }
    .search-input-text {
        position: relative;
        padding: 5px 10px;
    }
    .line-form-input {
        padding: 0;
    }
}
.header-slider-search-more{
    color: #fff;
    &.before {
        margin-bottom: 1.8em;
    }

}
.header-slider-card {
    margin-top: -40px;
    z-index: 1;
    .lz-widget {
        margin-bottom: 0;
    }
}
.filter-blur .header-slider-card .lz-widget {
    background: var(--blur-bg);
}
</style>