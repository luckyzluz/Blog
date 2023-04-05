<template>
    <div class="theme-box box-body posts-mini-lists lz-widget">
        <ul class="list-inline scroll-x mini-scrollbar tab-nav-theme">
            <li v-for="(v,i) in data" :class="[activeIndex==i?'active':'']"><a @click="changeActive(i)">{{ v.name }}</a></li>
        </ul>
        <div class="tab-content">
            <div v-for="(v,i) in data" :class="['tab-pane fade',activeIndex==i?'active in':'']">
                <div v-for="(x,y) in v.lists" class="posts-mini">
                    <div class="posts-mini-con flex xx flex1 jsb">
                        <h2 class="item-heading text-ellipsis">
                            <span :class="['badg badg-sm mr3',y==0?'c-red':y==1?'c-yellow':y==2?'c-purple':'c-blue']">{{ y+1 }}</span>
                            <a :href="x.href">{{ x.title }}
                                <span class="focus-color">[{{ x.intro }}]</span>
                            </a>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref, reactive} from 'vue';
let activeIndex=ref(0);
let data=[
    {
        name:'热门文章',
        lists:[
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            }
        ]
    },
    {
        name:'最新发布',
        lists:[
            {
                title:'2优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            }
        ]
    },
    {
        name:'科技新闻',
        lists:[
            {
                title:'3优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            }
        ]
    },
    {
        name:'随机推荐',
        lists:[
            {
                title:'4优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            },
            {
                title:'优雅的支付系统-给站长提供强劲的生产力',
                href:'http://www.baidu.com',
                intro:'支付功能简介及体验'
            }
        ]
    }
];
const changeActive=(index)=>{
    activeIndex.value=index;
}
</script>
<style lang="scss">
.list-inline{
    margin-left: 0;
    &>li{
        vertical-align: middle;
    }
}
.posts-mini-lists .tab-nav-theme {
    padding: 0 5px 2px;
}
</style>