<template>
    <!-- 一个单行显示的卡片文章模块container -->
    <div class="fluid-widget">
        <notop :data="datax" />
        <swiper 
        :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
      '--swiper-navigation-size': '15px'
    }"
    :navigation="true"
    :spaceBetween="21"
    :slidesPerView="4"
    :slidesPerGroup="4"
        :modules="modules"
        class="swiper-container swiper-scroll swiper-container-initialized"
        >
        <swiper-slide class="posts-item card style3" v-for="(v,i) in data.lists" :key="i">
            <CardList :Data="v" />
        </swiper-slide>
        </swiper>
    </div>
</template>
<script setup>
import CardList from 'c/List/card.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import notop from 'c/notop.vue';
const props = defineProps({
    Data: {
      type: Object,
    //   default: () =>[]
    }
});

let datax={
    title:'轻松时刻',
    intro:'一个单行显示的卡片文章模块'
}
let data={
            name:'健康养生',
            href:'http://www.baidu.com',
            styleType:'card',
            lists:[
            
            {
                    title:'优雅的支付系统-给站长提供强劲的生产力',
                    sub:'支付功能简介及体验',
                    type:'article',
                    covers: ['src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg'],
                    href:'http://www.baidu.com',
                    intro:'子比主题本次更新，终于带来了大家期待的支付功能，这下方便站长愉快的收钱啦.... 作为一款资讯阅读类的优质主题，付费阅读、付费下载、付费VIP等功能是必不可少的，子比主题本次更新则带来了付...',
                    istop: true,
                    tags:[
                        {
                            name:'付费阅读',
                            pay:{
                                sum:0.3
                            },
                            bgColor: 'jb-yellow'
                        },
                        {
                            name:'智能硬件',
                            icon:'icon-folder',
                            bgColor: 'c-yellow'
                        },
                        {
                            name:'科技新闻',
                            icon:'icon-folder',
                            bgColor: 'c-green'
                        },
                        {
                            name:'# 付费下载'
                        },
                        {
                            name:'# 支付功能'
                        }
                    ],
                    author:{
                        id:1,
                        name:'糖巴',
                        img:'src/assets/image/article/bizh-4-1.jpeg'
                    },
                    time:'2年前',//2021-04-09 23:38:43
                    comment:7,
                    views: '3.2W+',
                    like:434
                }, {
                    title:'优雅的支付系统-给站长提供强劲的生产力',
                    sub:'支付功能简介及体验',
                    type:'article',
                    covers: ['src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg'],
                    href:'http://www.baidu.com',
                    intro:'子比主题本次更新，终于带来了大家期待的支付功能，这下方便站长愉快的收钱啦.... 作为一款资讯阅读类的优质主题，付费阅读、付费下载、付费VIP等功能是必不可少的，子比主题本次更新则带来了付...',
                    istop: true,
                    tags:[
                        {
                            name:'付费阅读',
                            pay:{
                                sum:0.3
                            },
                            bgColor: 'jb-yellow'
                        },
                        {
                            name:'智能硬件',
                            icon:'icon-folder',
                            bgColor: 'c-yellow'
                        },
                        {
                            name:'科技新闻',
                            icon:'icon-folder',
                            bgColor: 'c-green'
                        },
                        {
                            name:'# 付费下载'
                        },
                        {
                            name:'# 支付功能'
                        }
                    ],
                    author:{
                        id:1,
                        name:'糖巴',
                        img:'src/assets/image/article/bizh-4-1.jpeg'
                    },
                    time:'2年前',//2021-04-09 23:38:43
                    comment:7,
                    views: '3.2W+',
                    like:434
                }, {
                    title:'优雅的支付系统-给站长提供强劲的生产力',
                    sub:'支付功能简介及体验',
                    type:'article',
                    covers: ['src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg'],
                    href:'http://www.baidu.com',
                    intro:'子比主题本次更新，终于带来了大家期待的支付功能，这下方便站长愉快的收钱啦.... 作为一款资讯阅读类的优质主题，付费阅读、付费下载、付费VIP等功能是必不可少的，子比主题本次更新则带来了付...',
                    istop: true,
                    tags:[
                        {
                            name:'付费阅读',
                            pay:{
                                sum:0.3
                            },
                            bgColor: 'jb-yellow'
                        },
                        {
                            name:'智能硬件',
                            icon:'icon-folder',
                            bgColor: 'c-yellow'
                        },
                        {
                            name:'科技新闻',
                            icon:'icon-folder',
                            bgColor: 'c-green'
                        },
                        {
                            name:'# 付费下载'
                        },
                        {
                            name:'# 支付功能'
                        }
                    ],
                    author:{
                        id:1,
                        name:'糖巴',
                        img:'src/assets/image/article/bizh-4-1.jpeg'
                    },
                    time:'2年前',//2021-04-09 23:38:43
                    comment:7,
                    views: '3.2W+',
                    like:434
                }, 
                {
                    title:'优雅的支付系统-给站长提供强劲的生产力',
                    sub:'支付功能简介及体验',
                    type:'article',
                    covers: ['src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg'],
                    href:'http://www.baidu.com',
                    intro:'子比主题本次更新，终于带来了大家期待的支付功能，这下方便站长愉快的收钱啦.... 作为一款资讯阅读类的优质主题，付费阅读、付费下载、付费VIP等功能是必不可少的，子比主题本次更新则带来了付...',
                    istop: true,
                    tags:[
                        {
                            name:'付费阅读',
                            pay:{
                                sum:0.3
                            },
                            bgColor: 'jb-yellow'
                        },
                        {
                            name:'智能硬件',
                            icon:'icon-folder',
                            bgColor: 'c-yellow'
                        },
                        {
                            name:'科技新闻',
                            icon:'icon-folder',
                            bgColor: 'c-green'
                        },
                        {
                            name:'# 付费下载'
                        },
                        {
                            name:'# 支付功能'
                        }
                    ],
                    author:{
                        id:1,
                        name:'糖巴',
                        img:'src/assets/image/article/bizh-4-1.jpeg'
                    },
                    time:'2年前',//2021-04-09 23:38:43
                    comment:7,
                    views: '3.2W+',
                    like:434
                }, 
                {
                    title:'iPhone XS：合格的 iPhone X 升级机型',
                    sub:'图片类型文章-幻灯片封面体验2',
                    type:'article',
                    covers: ['src/assets/image/article/img201810291355550-scaled.jpg','src/assets/image/article/img201810291447260.jpg','src/assets/image/article/img201810291446430.png','src/assets/image/article/img201810291445470.jpg','src/assets/image/article/img201810291446000.jpg'],
                    href:'http://www.baidu.com',
                    intro:'子比主题本次更新，终于带来了大家期待的支付功能，这下方便站长愉快的收钱啦.... 作为一款资讯阅读类的优质主题，付费阅读、付费下载、付费VIP等功能是必不可少的，子比主题本次更新则带来了付...',
                    istop: false,
                    tags:[
                        {
                            name:'付费阅读',
                            pay:{
                                sum:0.3
                            },
                            bgColor: 'jb-yellow'
                        },
                        {
                            name:'智能硬件',
                            icon:'icon-folder',
                            bgColor: 'c-yellow'
                        },
                        {
                            name:'科技新闻',
                            icon:'icon-folder',
                            bgColor: 'c-green'
                        },
                        {
                            name:'# 付费下载'
                        },
                        {
                            name:'# 支付功能'
                        }
                    ],
                    author:{
                        id:1,
                        name:'糖巴',
                        img:'src/assets/image/article/bizh-4-1.jpeg'
                    },
                    time:'2年前',//2021-04-09 23:38:43
                    comment:7,
                    views: '3.2W+',
                    like:434
                },
                {
                    title:'超级耐看的小可爱美女图集',
                    sub:'图库文章及图片灯箱体验',
                    type:'pic',
                    covers:{
                        num:44,
                        lists:[
                        'src/assets/image/article/21b8cafa3bf84aeea60fbc47a2caf8f0.jpeg',
                        'src/assets/image/article/21b8cafa3bf84aeea60fbc47a2caf8f0.jpeg',
                        'src/assets/image/article/6ab766676b6cbeda03493791e253f6ab.jpeg',
                        'src/assets/image/article/ce78171be8151585a9e868f2258988f1.jpeg'
                        ]
                    },
                    href:'http://www.baidu.com',
                    intro:'子比主题本次更新，终于带来了大家期待的支付功能，这下方便站长愉快的收钱啦.... 作为一款资讯阅读类的优质主题，付费阅读、付费下载、付费VIP等功能是必不可少的，子比主题本次更新则带来了付...',
                    istop: false,
                    tags:[
                        {
                            name:'智能硬件',
                            icon:'icon-folder',
                            bgColor: 'c-yellow'
                        },
                        {
                            name:'轻松时刻',
                            icon:'icon-folder',
                            bgColor: 'c-green'
                        },
                        {
                            name:'# 博客主题'
                        }
                    ],
                    author:{
                        id:1,
                        name:'糖巴',
                        img:'src/assets/image/article/bizh-4-1.jpeg'
                    },
                    time:'2年前',//2021-04-09 23:38:43
                    comment:1,
                    views: '2W+',
                    like:428
                },
                {
                    title:'GoPro 宣布收购 ReelSteady',
                    sub:'积分商品体验',
                    type:'article',
                    covers:['src/assets/image/article/20200903@陆家嘴金融贸易区-中国上海.jpg'],
                    video:'http://127.0.0.1:5173/src/assets/video/test.mp4',//https://vip.lz-cdn.com/20220606/17379_0df2db27/index.m3u8
                    href:'http://www.baidu.com',
                    intro:'经常接触 GoPro 运动相机的人应该都听说过 ReelSteady，这是一款面向 After Effects 的增稳插件，可以在后期为视频实现更为稳定的效果，此外还有一款于去年推出的 ReelSte......',
                    istop: true,
                    tags:[
                        {
                            name:'付费阅读',
                            pay:{
                                sum:0.3
                            },
                            bgColor: 'jb-yellow'
                        },
                        {
                            name:'智能硬件',
                            icon:'icon-folder',
                            bgColor: 'c-yellow'
                        },
                        {
                            name:'科技新闻',
                            icon:'icon-folder',
                            bgColor: 'c-green'
                        },
                        {
                            name:'# 付费下载'
                        },
                        {
                            name:'# 支付功能'
                        }
                    ],
                    author:{
                        id:1,
                        name:'糖巴',
                        img:'src/assets/image/article/bizh-4-1.jpeg'
                    },
                    time:'2年前',//2021-04-09 23:38:43
                    comment:7,
                    views: '3.2W+',
                    like:434
                },
                {
                    title:'子比主题优雅的支付体验',
                    sub:'付费商品-付费图库体验',
                    type:'article',
                    covers:['src/assets/image/article/f291c740628cd8a58ca2f0efe443a018.jpeg','src/assets/image/article/0af7334cd892a851701ba4aa232e5dc6.jpeg','src/assets/image/article/200580fcde9031843c0d03494e58ea65.jpeg'],
                    href:'http://www.baidu.com',
                    intro:'子比主题V5.2版本新增付费图片、付费视频功能，此文章为付费图片功能体验！ 支持设置免费查看数量 其它付费功能体验：',
                    istop: false,
                    tags:[
                        {
                            name:'付费阅读',
                            pay:{
                                sum:0.3
                            },
                            bgColor: 'jb-yellow'
                        },
                        {
                            name:'智能硬件',
                            icon:'icon-folder',
                            bgColor: 'c-yellow'
                        },
                        {
                            name:'科技新闻',
                            icon:'icon-folder',
                            bgColor: 'c-green'
                        },
                        {
                            name:'# 付费下载'
                        },
                        {
                            name:'# 支付功能'
                        }
                    ],
                    author:{
                        id:1,
                        name:'糖巴',
                        img:'src/assets/image/article/bizh-4-1.jpeg'
                    },
                    time:'2年前',//2021-04-09 23:38:43
                    comment:7,
                    views: '3.2W+',
                    like:434
                }
            ]
        };
const modules= [Navigation];
</script>
<style>
.swiper-scroll .posts-item.card {
    margin: 0;
}
.swiper-scroll .swiper-button-next, .swiper-scroll .swiper-button-prev, .swiper-thumbsbox .swiper-button-next, .swiper-thumbsbox .swiper-button-prev {
    background-color: rgba(0,0,0,.5);
    width: 26px;
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    left: -15px;
    right: auto;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev {
    right: -15px;
    left: auto;
}
.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
    opacity: 0!important;
    cursor: auto!important;
    pointer-events: none!important;
}
.swiper-container-initialized:hover .swiper-button-prev, .swiper-container-initialized:hover .swiper-container-rtl .swiper-button-next {
    left: 0;
    opacity: .8;
}
.swiper-container-initialized:hover .swiper-button-next, .swiper-container-initialized:hover .swiper-container-rtl .swiper-button-prev {
    right: 0;
    opacity: .8;
}
.swiper-button-next, .swiper-button-prev {
    position: absolute;
    top: 50%;
    width: 30px;
    height: 40px;
    margin-top: -25px;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: .4s;
    opacity: 0;
    text-shadow: 0 0 6px #444;
    justify-content: center;
    color: var(--swiper-navigation-color,var(--swiper-theme-color));
}
</style>