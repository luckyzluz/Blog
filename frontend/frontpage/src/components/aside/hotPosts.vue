<template>
    <!-- 热门文章模块 -->
    <div class="lz-widget hot-posts">
        <div class="relative">
            <a :href="data[0].href">
                <div class="graphic hover-zoom-img" style="padding-bottom: 60%!important;">
                    <img class="fit-cover radius" :src="data[0].img" alt="">
                    <div class="absolute linear-mask"></div>
                    <div class="abs-center left-bottom box-body">
                        <div style="margin-bottom: 6px;">
                            <span class="badg b-theme badg-sm">{{ data[0].views }}人已阅读</span>
                        </div>{{data[0].title}}[{{ data[0].intro }}]
                    </div>
                </div>
            </a>
            <span class="badge img-badge left hot" style="font-size: 1.2em;">
                <i>TOP1</i>
            </span>
        </div>
        <div class="flex relative hover-zoom-img" v-for="(v,i) in data.slice(1)" style="margin-top: 15px;">
            <a :href="v.href">
                <div class="graphic">
                    <img class="fit-cover radius" :src="v.img" :alt="v.title">
                </div>
            </a>
            <div class="term-title flex xx flex1 jsb">
                <div class="text-ellipsis-2">
                    <a :href="v.href">
                        {{ v.title }}[{{ v.intro }}]
                    </a>
                </div>
                <div class="muted-3-color text-ellipsis flex jsb" style="font-size: 12px;">
                    <span>
                        <i style="margin-right: 3px;" class="iconfont icon-clocko"></i>{{ v.time }}
                    </span>
                    <span>{{ v.views }}人已阅读</span>
                </div>
            </div>
            <span class="badge img-badge left hot" :class="[i+2==2?'jb-red':i+2==3?'jb-yellow':i+2>=4?'b-gray':'']">TOP{{ i+2 }}</span>
        </div>
    </div>
</template>
<script setup>
let data=[
    {
        title:'1优雅的支付系统-给站长提供强劲的生产力',
        href:'http://www.baidu.com',
        intro:'支付功能简介及体验',
        views:'3.2W+',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg'
    },
    {
        title:'优雅的支付系统-给站长提供强劲的生产力',
        href:'http://www.baidu.com',
        intro:'支付功能简介及体验',
        views:'3.2W+',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
        time:'3年内'
    },
    {
        title:'优雅的支付系统-给站长提供强劲的生产力',
        href:'http://www.baidu.com',
        intro:'支付功能简介及体验',
        views:'3.2W+',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
        time:'3年内'
    },
    {
        title:'优雅的支付系统-给站长提供强劲的生产力',
        href:'http://www.baidu.com',
        intro:'支付功能简介及体验',
        views:'3.2W+',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
        time:'3年内'
    },
    {
        title:'优雅的支付系统-给站长提供强劲的生产力',
        href:'http://www.baidu.com',
        intro:'支付功能简介及体验',
        views:'3.2W+',
        img:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
        time:'3年内'
    }
]
</script>
<style lang="scss">
.hot-posts {
    .img-badge {
        left: -15px !important;
    }
    .flex .graphic {
        padding-bottom: 70%!important;
        width: 93px;
    }
    .term-title{
        margin-left: 10px;
    }
}
</style>