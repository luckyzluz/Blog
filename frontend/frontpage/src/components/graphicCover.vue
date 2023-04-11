<template>
    <!-- 小工具图形封面 container:sm="2"-->
    <div class="widget-graphic-cover mb10">
        <el-row :gutter="10" style="--font-size:18px;">
            <el-col v-for="(v,i) in data"  :span="4">
                <a :href="v.href">
                    <div class="graphic hover-zoom-img noshadow" style="padding-bottom: 35%!important;">
                        <img class="fit-cover lazyloaded" :src="v.img" alt="">
                        <div class="absolute graphic-mask" style="opacity: 0.33;"></div>
                        <div class="abs-center text-center graphic-text this-font">{{ v.title }}</div>
                    </div>
                </a>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import {ref,reactive} from 'vue';
let data=[
    {
        title:'专业测评',
        href:'http://www.baidu.com',
        img: 'src/assets/image/article/img201810291457580.jpg'
    },
    {
        title:'开箱体验',
        href:'http://www.baidu.com',
        img: 'src/assets/image/article/img201804121526540.jpg'
    },
    {
        title:'用户体验',
        href:'http://www.baidu.com',
        img: 'src/assets/image/article/img202003162053320.jpg'
    },
    {
        title:'科技早报',
        href:'http://www.baidu.com',
        img: 'src/assets/image/article/bj2.jpg'
    },
    {
        title:'社区热门',
        href:'http://www.baidu.com',
        img: 'src/assets/image/article/img201804121517540.jpg'
    },
    {
        title:'玩机技巧',
        href:'http://www.baidu.com',
        img: 'src/assets/image/article/102932ayqhuc0o206gftzn-1-scaled.jpg'
    },
]
</script>
<style lang="scss">

</style>