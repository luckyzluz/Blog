<template>
    <!-- 文章页面 -->
    <ul class="breadcrumb">
        <li>
            <a href="/">
                <i class="iconfont icon-mapmarker"></i>首页
            </a>
        </li>
        <li>
            <a :href="'/'+data.category.en">{{ data.category?data.category.name:'未分类' }}</a>
        </li>
        <li v-if="data.category.subcategory&&JSON.stringify(data.category.subcategory)!=='{}'">
            <a :href="'/'+data.category.en+'/'+data.category.subcategory.en">{{ data.category.subcategory.name }}</a>
        </li>
        <li>正文</li>
    </ul>
    <!-- 文章正文 -->
    <article class="article main-bg theme-box box-body radius main-shadow">
        <div class="article-header theme-box clearfix relative">
            <div class="article-title">
                <a :href="'article/'+data.id">
                    {{ data.title }}
                    <span>[{{ data.sub }}]</span>
                </a>
            </div>
            <div class="article-avatar">
                <div class="user-info flex ac article-avatar">
                    <a :href="'author/'+data.author.id">
                        <span class="avatar-img">
                            <img class="avatar" :src="data.author.img" :alt="data.author.name+'的头像'">
                            <img class="avatar-badge" :src="'src/assets/image/vip-'+data.author.level+'.svg'" alt="推广会员">
                        </span>
                    </a>
                    <div class="user-right flex flex1 ac jsb">
                        <div class="flex1">
                            <span class="flex ac flex1">
                                <a class="text-ellipsis " :href="'author/'+data.author.id">{{ data.author.name }}</a>
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="网站官方成员"
                                    placement="top"
                                    v-if="data.author.identity=='admin'"
                                >
                                    <span class="user-auth-icon" style="margin-left: 3px;">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-a-authenticate3x"></use>
                                        </svg>
                                    </span>
                                </el-tooltip>
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="备受瞩目"
                                    placement="top"
                                >
                                    <img class="img-icon medal-icon" :src="'src/assets/image/web/medal/medal-'+data.author.level+'.svg'" alt="徽章-备受瞩目" style="margin-left: 3px;">
                                </el-tooltip>
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    :content="'LV'+data.author.level"
                                    placement="top"
                                >
                                    <img class="img-icon" :src="'src/assets/image/user-level-'+data.author.level+'.png'" :alt="'等级-LV'+data.author.level" style="margin-left: 3px;">
                                </el-tooltip>
                            </span>
                            <div class=" muted-2-color text-ellipsis">
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="2021年12月30日 13:12发布"
                                    placement="bottom"
                                >
                                    <span>{{ data.time }}个月前更新</span>
                                </el-tooltip>
                            </div>
                        </div>
                        <div class="flex0 user-action">
                            <a class="but c-red" style="margin-left: 10px;">
                                <span>
                                    <i class="iconfont icon-hearto" style="margin-right: 3px;"></i>关注
                                </span>
                            </a>
                            <a class="but c-blue" style="margin-left: 6px;">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-sixin"></use>
                                </svg>私信
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>
<script setup>
let data={
    id:'12365',
    title:'第三方登录-网站接入未认证的微信公众号或订阅号扫码登录教程',
    sub:'V6.8新功能',
    author:{
        id:1,
        name:'老糖',
        identity:'admin',
        img:'src/assets/image/avatar-default.png',
        level:1
    },
    time:'5',
    category:{
        name:'主题文档',
        en:'lz_word',
        subcategory:{
            name:'用户功能',
            en:'user_func',
        }
    }
}
JSON.str
</script>
<style lang="scss">
.breadcrumb {
    background: 0 0;
    padding: 0 8px;
    opacity: .6;
    margin-bottom: 12px;
    border-radius: 4px;
    &>li{
        display: inline-block;
        &+li:before {
            content: "/\00a0";
            color: #ccc;
            padding: 0 0 0 6px;
            opacity: .6;
        }
    }
}
.article {
    padding: 0 30px;
    overflow: hidden;
    .user-right{
        margin-left: 10px;
    }
}
.article-header .article-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--key-color);
    line-height: 1.4;
    &>a:hover {
        color: inherit;
    }
}
.article-header .article-avatar, .article-header .article-title {
    margin-top: 15px;
}
.avatar-badge, .swiper-slide img.avatar-badge {
    width: calc(var(--this-size)/ 2.5);
    height: calc(var(--this-size)/ 2.5);
    max-width: 25px;
    max-height: 25px;
    min-width: 10px;
    min-height: 10px;
    position: absolute;
    right: -1px;
    bottom: -1px;
    overflow: hidden;
}
</style>