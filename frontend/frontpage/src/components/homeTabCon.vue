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
                    <div v-for="(x,y) in v.lists" class="posts-item">
                        <div class="post-graphic">
                            <div class="item-thumbnail">
                                <a :href="x.href">
                                    <img class="fit-cover" :src="x.cover" alt="">
                                </a>
                                <span v-if="x.istop" class="badge img-badge jb-red">置顶</span>
                            </div>
                        </div>
                        <div class="item-body">
                            <h2 class="item-heading">
                                <a :href="x.href">{{ x.title }}
                                    <span class="focus-color">[{{ x.sub }}]</span>
                                </a>
                            </h2>
                            <div class="item-excerpt text-ellipsis muted-color">
                                {{ x.intro }}
                            </div>
                            <div>
                                <div class="item-tags scroll-x">
                                    <!-- meta-pay but jb-yellow -->
                                    <a v-for="(w,p) in x.tags" :class="['but',w.pay?'meta-pay':'',w.bgColor]">
                                        <i v-if="w.icon&&w.icon!==''" :class="['iconfont',w.icon]"></i>
                                        {{ w.name }}
                                        <span v-if="w.pay&&w.pay!=={}">R币</span>{{ w.pay?w.pay.sum:'' }}
                                    </a>
                                </div>
                                <div class="item-meta muted-2-color">
                                    <span class="meta-author">
                                        <a :href="x.author.id">
                                            <span class="avatar-mini">
                                                <img class="avatar lazyloaded" :src="x.author.img" :alt="x.author.name+'的头像'">
                                            </span>
                                        </a>
                                        <span class="hidden-sm-only" style="margin-left: 6px;">{{ x.author.name }}</span>
                                        <span class="icon-circle" :title="x.time">{{ x.time }}</span>
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
                                                        </svg>{{ x.comment }}
                                                    </a>
                                            </el-tooltip>
                                        </span>
                                        <span class="meta-view">
                                            <a href="">
                                                <svg class="icon" aria-hidden="true">
                                                    <use xlink:href="#icon-yuedu"></use>
                                                </svg>{{ x.views }}
                                            </a>
                                        </span>
                                        <span class="meta-like">
                                            <a href="">
                                                <svg class="icon" aria-hidden="true">
                                                    <use xlink:href="#icon-zan"></use>
                                                </svg>{{ x.like }}
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-affix>
    </div>
</template>
<script setup>
import {ref,reactive} from 'vue'
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
            }
        ]
    },
    {
        name:'科技新闻',
        href:'http://www.baidu.com'
    },
    {
        name:'健康养生',
        href:'http://www.baidu.com'
    },
    {
        name:'智能硬件',
        href:'http://www.baidu.com'
    },
    {
        name:'轻松时刻',
        href:'http://www.baidu.com'
    },
    {
        name:'SEO优化',
        href:'http://www.baidu.com'
    }
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
.posts-item .item-meta a, .posts-mini .item-meta a {
    color: inherit;
}
</style>