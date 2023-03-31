<template>
    <!-- pay有问题 -->
    <div class="home-tab-content">
        <el-affix target=".home-tab-content" :offset="80">
            <div class="index-tab">
                <ul class="scroll-x no-scrollbar">
                    <li v-for="(v,i) in tab" :key="i" @click="changeTab(i)" :class="i==indexTab?'active':''">
                        <a>{{ v.name }}</a>
                    </li>
                </ul>
            </div>
            <div class="tab-content">
                <div v-for="(v,i) in tab" :class="[indexTab==0?'posts-row':'','tab-pane','active']">
                    <div v-if="i==0" class="posts-option">
                        <div class="option-dropdown splitters-this-r">
                            排序
                        </div>
                        <ul v-if="i==0" class="option-items scroll-x list-inline">
                            <a v-for="(x,y) in options">{{x.name}}</a>
                        </ul>
                    </div>
                    <ArticleList v-for="(x,y) in v.lists" :Data="x" />
                </div>
            </div>
        </el-affix>
    </div>
</template>
<script setup>
import {ref,reactive} from 'vue'
import ArticleList from 'c/articleList.vue'
let indexTab=ref(0);
let options=reactive([
                    {
                        name:'更新',
                        orderby:'modified'
                    },
                    {
                        name:'发布',
                        orderby:'date'
                    },
                    {
                        name:'浏览',
                        orderby:'views'
                    },{
                        name:'点赞',
                        orderby:'like'
                    },
                    {
                        name:'评论',
                        orderby:'comment_count'
                    }
                ])
let tab=[
    {
        name:'最新发布',
        href:'http://www.baidu.com',
        lists:[
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                sub:'支付功能简介及体验',
                type:'article',
                cover:'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
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
                title:'超级耐看的小可爱美女图集',
                sub:'图库文章及图片灯箱体验',
                type:'pic',
                cover:{
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
                cover:'src/assets/image/article/20200903@陆家嘴金融贸易区-中国上海.jpg',
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
        ]
    },
    // {
    //     name:'科技新闻',
    //     href:'http://www.baidu.com'
    // },
    // {
    //     name:'健康养生',
    //     href:'http://www.baidu.com'
    // },
    // {
    //     name:'智能硬件',
    //     href:'http://www.baidu.com'
    // },
    // {
    //     name:'轻松时刻',
    //     href:'http://www.baidu.com'
    // },
    // {
    //     name:'SEO优化',
    //     href:'http://www.baidu.com'
    // }
]
const changeTab=(index)=>{
    indexTab.value=index;
}
</script>
<style lang="scss">
.home-tab-content{
    .index-tab{
        position: relative;
        margin-bottom: 10px;
        ul>li {
            display: inline-block;
            padding: 2px 11px;
            font-weight: 500;
            border-radius: 20px;
            margin: 0 1px;
            &.active {
                background: var(--focus-color);
                --main-color: #fff;
                a {
                    color: #fff!important;
                }
            }
        }
    }
    .tab-content{
        &>.tab-pane {
            display: none;
            .posts-option{
                display: flex;
                align-items: center;
                .option-dropdown {
                    color: var(--main-color);
                    flex:none;
                    position: relative;
                }
                .option-items {
                    margin-left: 10px;
                    --main-color: var(--muted-2-color);
                    &>a+a:before {
                        content: "";
                        width: 4px;
                        height: 4px;
                        margin: 0 .5em;
                        border-radius: 50%;
                        display: inline-block;
                        vertical-align: middle;
                        background: var(--main-color);
                        opacity: .3;
                        vertical-align: .2em;
                    }
                }
            }
            .posts-item{
                display: flex;
                .item-thumbnail{
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
                    .item-meta{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .avatar-mini {
                            transform: translateY(-1px);
                        }
                    }
                }
            }
        }
        &>.active {
            display: block;
        }
    }
}

.posts-item .item-meta a, .posts-mini .item-meta a {
    color: inherit;
}
</style>