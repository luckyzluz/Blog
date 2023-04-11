<template>
    <!-- 文章mini模块 -->
    <div class="theme-box">
        <Notop :data="notop" />
        <!-- 模块内容 -->
        <div class="posts-mini-lists widget">
            <ul class="list-inline mini-scrollbar tab-nav scroll-x">
                <li v-for="(v,i) in data" :key="i" @click="changeTab(i)" :class="tab==i?'active':''">
                    <a>{{ v.title }}</a>
                </li>
            </ul>
            
            <div class="tab-content">
                <div v-for="(v,i) in data" :key="i" ref="tabPanes" :class="['tab-pane fade',tab==i?'active':'']">
                    <div v-for="(x,y) in v.content" :key="y" class="posts-mini">
                        <div class="item-thumbnail">
                            <a :href="x.href">
                                <img :src="x.thumbnail" class="fit-cover" alt="">
                            </a>
                        </div>
                        <div class="posts-mini-con">
                            <h2 class="item-heading text-ellipsis-2">
                                <a :href="x.herf">
                                    {{ x.title }}
                                    <span class="focus-color" v-if="x.sub && x.sub!==''">[{{ x.sub }}]</span>
                                </a>
                            </h2>
                            <div class="item-meta muted-2-color">
                                <div class="meta-author">
                                    <a :href="'/author/'+x.author.id">
                                        <span class="avatar-mini">
                                            <img :src="x.author.img" class="avatar lazyloaded" alt="">
                                        </span>
                                    </a>
                                    <span>2年前</span>
                                </div>
                                <div class="meta-right">
                                    <el-tooltip
                                        v-if="x.pay"
                                        class="box-item"
                                        effect="dark"
                                        :content="'付费'+x.pay.name"
                                        placement="top"
                                        
                                    >
                                    <span class="meta-pay badg badg-sm c-yellow">
                                        <i :class="['iconfont', x.pay.icon] "></i>
                                        <span>R币</span>{{ x.pay.sum }}
                                    </span>
                                    </el-tooltip>
                                    <span class="meta-view">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-yuedu"></use>
                                        </svg>{{ x.view }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Notop from 'c/notop.vue'
import {onMounted, ref} from 'vue'
let tabPanes=ref(null);
let notop={
    title:'多栏目',
    intro:'文章mini模块',
    info:'右侧按钮'
}
let data=[
    {
        id:1,
        title:'热门文章',
        content:[
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
                title:'优雅的支付系统-给站长提供强劲的生产力',
                sub:'支付功能简介及体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                pay:{
                    icon:'icon-shuji',
                    name:'阅读',
                    sum:0.3
                },
                view:'3.2W+'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/f97a55d38bb4477ca9adab1fe1d08117.jpeg',
                title:'子比主题付费下载演示-简单优雅的支付体验',
                sub:'付费资源下载体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                pay:{
                    icon:'icon-xiazai',
                    name:'下载',
                    sum:0.3
                },
                view:'2.7W+'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/217c-fyqtwzu0475616-1.png',
                title:'《超能陆战队》预告片 大白“三难三赞”等你发现',
                sub:'视频文章体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'2.1W+'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/21b8cafa3bf84aeea60fbc47a2caf8f0.jpeg',
                title:'超级耐看的小可爱美女图集',
                sub:'图库文章及图片灯箱体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'1.9W+'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/c57f09b235707d84fee533902c206ddb.jpg',
                title:'新iPad测评：苹果在教育领域的野心',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'1.2W+'
            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/2a655f846a8342da9d2c022680982e6f.png',
                title:'子比主题优雅的支付体验',
                sub:'付费商品-付费图库体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                pay:{
                    icon:'icon-tupian1',
                    name:'图片',
                    sum:0.03
                },
                view:'1.2W+'
            }
        ]
    },
    {
        id:2,
        title:'科技早报',
        content:[
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/73aedaf4f6012dff306c73905402d9bd.jpg',
                title:'iPhone XS：合格的 iPhone X 升级机型',
                sub:'图片类型文章-幻灯片封面体验2',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'8305'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/217c-fyqtwzu0475616-1.png',
                title:'《超能陆战队》预告片 大白“三难三赞”等你发现',
                sub:'视频文章体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'2.1W+'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/2a655f846a8342da9d2c022680982e6f.png',
                title:'子比主题优雅的支付体验[付费商品-付费图库体验]',
                sub:'付费资源下载体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                pay:{
                    icon:'icon-tupian1',
                    name:'图片',
                    sum:0.03
                },
                view:'1.2W+'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/0af7334cd892a851701ba4aa232e5dc6.jpeg',
                title:'zibll子比主题最新支付功能',
                sub:'付费查看视频文章体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                pay:{
                    icon:'icon-bofang',
                    name:'视频',
                    sum:0.03
                },
                view:'7797'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/aac85dd060b1280685f199492d1fff89-scaled.jpg',
                title:'iPhone XR上手：亮丽外观下却有一颗质朴的心',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'5628'
            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/2a655f846a8342da9d2c022680982e6f.png',
                title:'谁是iPhone最佳搭档 各价位无线充电器横评',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/5d8dbbe6d757636411a7dab804cdf7ca.jpg'
                },
                view:'7057'
            }
        ]
    },
    {
        id:3,
        title:'猜你喜欢',
        content:[
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/ef8881440228c1af4694cacc3983999b-scaled.jpg',
                title:'iPhone 11 和 iPhone 11 Pro 该怎么选？',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'1015'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/aac85dd060b1280685f199492d1fff89-scaled.jpg',
                title:'iPhone XR上手：亮丽外观下却有一颗质朴的心',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'5635'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/e3f205035ee22ff4fb0e3c2c035e1cb1.jpg',
                title:'搞笑GIF趣图:右边的妹子是我女朋友，其他的你们选择吧！',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'888'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/3cb9e7130b275e50b3155f518ccc8d50.jpg',
                title:'早高FENG：Steam同时在线突破2000万/法拉利意大利厂停产',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'590'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/f19c089b3d284d7e9bd54eb39ab1b972.jpeg',
                title:'优雅的支付系统-给站长提供强劲的生产力',
                sub:'支付功能简介及体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                pay:{
                    icon:'icon-shuji',
                    name:'阅读',
                    sum:0.3
                },
                view:'3.2W+'
            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/74798a3a2419e2aad6905db40de5cf68.jpg',
                title:'“理财产品”《健身环大冒险》在法国也缺货了',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/5d8dbbe6d757636411a7dab804cdf7ca.jpg'
                },
                view:'650'
            }
        ]
    },
    {
        id:4,
        title:'SEO教程',
        content:[
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/217c-fyqtwzu0475616-1.png',
                title:'《超能陆战队》预告片 大白“三难三赞”等你发现',
                sub:'视频文章体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'2.1W+'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/0af7334cd892a851701ba4aa232e5dc6.jpeg',
                title:'zibll子比主题最新支付功能',
                sub:'付费查看视频文章体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                pay:{
                    icon:'icon-bofang',
                    name:'视频',
                    sum:0.03
                },
                view:'7797'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/27cb79ca2691543dfd2ffca6dced8b51.jpg',
                title:'SEO优化方案书+SEO必看的平台工具大全（非常实用，值得收藏）',
                sub:'付费资源下载体验',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'3075'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/10ac28f1501216bc2ca55c5f1df1af82.jpg',
                title:'seo优化后期网站关键词排名下降原因',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'1245'

            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/4c8db061e077c7f33d6dcebf5d82d0a5.jpg',
                title:'网站seo优化到底该怎么做？',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/bizh-4-1.jpeg'
                },
                view:'1092'
            },
            {
                href:'http://www.baidu.com',
                thumbnail: 'src/assets/image/article/aebf3930594a0c59130ed79b1c47bf0d.jpg',
                title:'老域名seo优化方法',
                sub:'',
                author:{
                    id:1,
                    img:'src/assets/image/article/5d8dbbe6d757636411a7dab804cdf7ca.jpg'
                },
                view:'1032'
            }
        ]
    }
]
let tab=ref(0);
const changeTab=(index=tab.value)=>{
    tab.value=index;
    setTimeout(()=>{
        tabPanes.value[index].classList.add('in')
    },200)
}
onMounted(()=>{
    changeTab();
})

</script>
<style lang="scss">

.fade {
    opacity: 0;
    transition: opacity .15s linear;
}
.fade.in {
    opacity: 1;
}
.posts-mini-lists {
    padding: 5px;
    .tab-nav {
        padding: 0 5px 2px;
        li{
            position: relative;
            padding-bottom: 8px;
        }
    }
    .tab-content{
        &>.tab-pane {
            display: none;
            .posts-mini {
                padding: 8px;
                display: inline-flex;
                width: 50%;
                .item-thumbnail {
                    margin-right: 10px;
                    a{
                        width: 96px;
                        display: block;
                        height: 0;
                        padding-bottom: var(--posts-list-scale);
                        position: relative;
                        overflow: hidden;
                        border-radius: var(--main-radius);
                        img {
                            position: absolute;
                            transition: .2s ease-out;
                            border-radius: var(--main-radius);
                        }
                    }
                }
                .posts-mini-con{
                    display: flex;
                    flex: auto;
                    overflow: hidden;
                    justify-content: space-between;
                    flex-direction: column;
                    .item-heading {
                        margin: 0;
                        font-size: 14px;
                    }
                    .item-meta {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 12px;
                        a {
                            color: inherit;
                        }
                        .meta-author{
                            display: flex;
                            align-items: center;
                            span{
                                margin-left: 6px;
                            }
                        }
                        .avatar-mini {
                            transform: translateY(-1px);
                        }
                        .meta-pay {
                            padding: 0 4px;
                            margin-right: 6px;
                            i{
                                margin-right: 3px;
                            }
                            span{
                                font-size: .9em;
                            }
                        }
                    }
                    .badg {
                        min-width: 18px;
                    }
                }
            }
        }
        &>.active {
            display: block;
        }
    }
}

</style>