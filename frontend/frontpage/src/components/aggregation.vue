<template>
    <!-- 聚合模块 -->
    <div>
        <Notop :data="notop" />
        <el-row :gutter="10">
            <el-col :sm="12" :xl="24" v-for="(v,i) in data" :key="i">
                <div class="widget term-aggregation">
                    <div class="term-seal">
                        <div class="term-img">
                            <a :href="v.href">
                                <div class="graphic" style="padding-bottom: 70%!important;">
                                    <img class="fit-cover" :src="v.cover" :alt="'专题-'+v.title">
                                    <span class="img-badge badge">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-redu1"></use>
                                        </svg>
                                        {{ v.view }}
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div class="term-title">
                            <a class="key-color" :href="v.href">{{ v.title }}</a>
                            <div class="text-ellipsis-2 muted-color">
                                {{ v.intro }}
                            </div>
                            <div class="term-meta">
                                <span class="muted-3-color">
                                    <i :class="['iconfont',v.type=='article'?'icon-wendang':'icon-bofang']"></i>
                                    {{ v.total }}{{ v.type=='article'?'篇文章':'部视频' }}
                                </span>
                                <a class="but c-blue" :href="v.herf">
                                    <i class="iconfont icon-arrowright"></i>更多{{ v.type=='article'?'文章':'视频' }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-for="(x,y) in v.lists" :key="i">
                        <div class="text-ellipsis">
                            <a class="icon-circle" href="">
                                {{ x.title }}
                            </a>
                        </div>
                        <div class="muted-3-color" style="margin-left: 10px; font-size: .9em; flex: none;">{{ v.type=='article'?'阅读':'播放' }}[{{x.view }}]</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import Notop from 'c/notop.vue'
let notop={
    title:'聚合模块',
    intro:'标题可自由设置是否显示'
}
let data=[
    {
        title:'演示专题二',
        intro:'这是演示专题二的描述内容',
        cover:'src/assets/image/article/bizh-19.jpg',
        type:'article',
        total:37,
        href:'http://www.baidu.com',
        view:'3.2W+',
        lists:[
            {
                title:'GoPro 宣布收购 ReelSteady[积分商品体验]',
                href:'http://www.baidu.com',
                view:6648
            },
            {
                title:'SEO优化方案书+SEO必看的平台工具大全（非常实用，值得收藏）',
                href:'http://www.baidu.com',
                view:3075
            },
            {
                title:'seo优化后期网站关键词排名下降原因',
                href:'http://www.baidu.com',
                view:1245
            },
            {
                title:'网站seo优化到底该怎么做？',
                href:'http://www.baidu.com',
                view:1092
            }
        ]
    },
    {
        title:'SEO优化',
        intro:'网站关键词快速排名与SEO优化教程分享',
        cover:'src/assets/image/article/seo01.jpg',
        type:'article',
        total:37,
        href:'http://www.baidu.com',
        view:'5.3W+',
        lists:[
            {
                title:'《超能陆战队》预告片 大白“三难三赞”等你发现[视频文章体验]',
                href:'http://www.baidu.com',
                view:'2.1W+'
            },
            {
                title:'zibll子比主题最新支付功能[付费查看视频文章体验]',
                href:'http://www.baidu.com',
                view:7805
            },
            {
                title:'SEO优化方案书+SEO必看的平台工具大全（非常实用，值得收藏）',
                href:'http://www.baidu.com',
                view:3075
            },
            {
                title:'seo优化后期网站关键词排名下降原因',
                href:'http://www.baidu.com',
                view:1245
            }
        ]
    }
]
</script>
<style lang="scss">
.term-aggregation {
    .term-seal{
        display: flex;
        margin-bottom: 20px;
        .term-img {
            width: 10em;
            flex: none;
            span.badge{
                font-size: 12px;
            }
        }
        .term-title{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            flex: auto;
            margin-left: 10px;
            overflow: hidden;
            .key-color{
                font-size: 1.4em;
            }
            .term-meta{
                display: flex;
                align-items: center;
                justify-content: space-between;
                span{
                    font-size: 12px;
                }
                a{
                    padding: 1px 6px;
                    font-size: 12px;
                }
            }
        }
    }
    &>div:not(.term-seal){
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        a{
            margin-left: -3px;
        }
    }
}

</style>