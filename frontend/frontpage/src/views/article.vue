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
                                    class="box-span"
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
                                    class="box-span"
                                    effect="dark"
                                    content="备受瞩目"
                                    placement="top"
                                >
                                    <img class="img-icon medal-icon" :src="'src/assets/image/web/medal/medal-'+data.author.level+'.svg'" alt="徽章-备受瞩目" style="margin-left: 3px;">
                                </el-tooltip>
                                <el-tooltip
                                    class="box-span"
                                    effect="dark"
                                    :content="'LV'+data.author.level"
                                    placement="top"
                                >
                                    <img class="img-icon" :src="'src/assets/image/user-level-'+data.author.level+'.png'" :alt="'等级-LV'+data.author.level" style="margin-left: 3px;">
                                </el-tooltip>
                            </span>
                            <div class=" muted-2-color text-ellipsis">
                                <el-tooltip
                                    class="box-span"
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
                <div class="relative">
                    <i class="line-form-line"></i>
                    <div class="flex ac single-metabox abs-right">
                        <div class="post-metas">
                            <el-tooltip
                                class="box-span"
                                effect="dark"
                                content="去评论"
                                placement="top"
                            >
                                <span class="meta-comm">
                                    <a href="javascript:(scrollTo('#comments',-50));" data-original-title="">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-xiaoxi1"></use>
                                        </svg>41
                                    </a>
                                </span>
                            </el-tooltip>
                            <span class="meta-view">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yuedu"></use>
                                </svg>9281
                            </span>
                            <span class="meta-like">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-zan"></use>
                                </svg>101
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="article-content">
            <div class="theme-box lz-posts-content">
                <p>使用WordPress建站，那么第三方登录肯定是必不可少的，子比主题支持丰富的社交帐号登录，当然少不了现在最常用的微信登录了，但是大家都知道，使用微信公众号登录需要认证的服务号，认证需要花费300元每年，而部分站长并没有服务号的需求，所以这个功能就不能使用了！</p>
                <p>但是！现在子比主题已支持订阅号、未认证的公众号进行扫码登录了！</p>
                <h2 id="wznav_0">效果预览</h2>
                <p>首先我看一下微信公众号的登录页面预览：</p>
                <figure class="lz-block-image size-full">
                    <img alt="图片[1]-" width="1236" height="878" src="https://mimg.127.net/vip/newindex/img/bg/vip188/bg1.jpg" sizes="(max-width: 1236px) 100vw, 1236px">
                </figure>
                <div class="lz-block-quote">
                    <div class="quote_q" style="--quote-color:#fb2121">
                        <i class="iconfont icon-quoteleft"></i>
                        <p>此功能需升级zibll子比主题至V6.8及以上版本</p>
                    </div>
                </div>
                <p><strong>功能简介：</strong></p>
                <ul>
                    <li>订阅号以及未认证的公众号接口权限缺少很多，我们通过公众号获取验证码的方式进行登录接入</li>
                    <li>用户登录流程为：点击微信登录，扫码关注公众号，公众号会自动回复一个验证码，用户输入验证码登录</li>
                    <li>已经关注的用户可以发送”登录“，重新获取验证码进行登录</li>
                    <li>发送的关键词以及自动回复模板都支持自定义</li>
                </ul>
                <h2 id="wznav_1">接入教程</h2>
                <p>接下来我们就一步一步的开始接入教程，首先我们整理一下，大致为以下流程：</p>
                <ol>
                    <li>申请并开通微信公众号，<span style="color:#f85722" class="has-inline-color">无需认证，订阅号也可以</span></li>
                    <li>获取AppID和AppSecret并填入主题设置</li>
                    <li><strong>添加微信公众号IP白名单</strong></li>
                    <li><strong>设置微信公众号的服务器URL配置</strong></li>
                </ol>
                <p>申请微信公众号以及认证百度已经有很多教程了，按照流程一步一步来就行了，这里就不在阐述了。</p>
                <p>接下来针对已经申请并认证成功的微信公众号做详细的接入教程。</p>
                <p><span style="color:#08B89A;background:undefined">如果您有已经认证的服务号需要接入，请查看以下教程：</span></p>
                <div class="lz-block-postsbox">
                    <div class="article-postsbox relative-h radius">
                        <div class="abs-blur-bg">
                            <img src="https://mimg.127.net/vip/newindex/img/bg/vip188/bg1.jpg" alt="Zi" class="fit-cover radius no-imgbox">
                        </div>
                        <div class="posts-mini posts-span relative">
                            <div class="mr10">
                                <div class="item-thumbnail">
                                    <a href="https://www.zibll.com/2206.html">
                                        <img src="https://mimg.127.net/vip/newindex/img/bg/vip188/bg1.jpg" alt="Zi" class="fit-cover radius no-imgbox">
                                    </a>
                                </div>
                            </div>
                            <div class="posts-mini-con flex xx flex1 jsb">
                                <div class="item-heading text-ellipsis-2 main-color">
                                    <a class="main-color" href="https://www.zibll.com/2206.html">Zibll子比主题-第三方登录-接入微信公众号扫码登录图文教程</a>
                                </div>
                                <div class="item-meta muted-2-color flex jsb ac">
                                    <span class="meta-author flex ac">
                                        <a href="https://www.zibll.com/author/1">
                                            <span class="avatar-mini">
                                                <img alt="老糖的头像-" src="src/assets/image/avatar-default.png" class="avatar">
                                                <img class="avatar-badge" src="src/assets/image/vip-1.svg" title="" alt="推广会员">
                                            </span>
                                        </a>
                                        <span title="2021-06-29 14:11:07">2年前</span>
                                    </span>
                                    <div class="meta-right">
                                        <span class="meta-comm">
                                            <el-tooltip
                                                class="box-item"
                                                effect="dark"
                                                content="去评论"
                                                placement="top"
                                            >
                                                <a title="" href="https://www.zibll.com/2206.html#comments">
                                                    <svg class="icon" aria-hidden="true">
                                                        <use xlink:href="#icon-comment"></use>
                                                    </svg>23
                                                </a>
                                            </el-tooltip>
                                        </span>
                                        <span class="meta-view">
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-yuedu"></use>
                                            </svg>1.3W+
                                        </span>
                                        <span class="meta-like">
                                            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-zan"></use>
                                            </svg>43
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 id="wznav_2">获取AppID和AppSecret</h3>
                <p>登录<a rel="noreferrer noopener" aria-label="微信公众号平台（在新窗口打开）" href="https://www.zibll.com/?golink=aHR0cHM6Ly9tcC53ZWl4aW4ucXEuY29t" target="_blank">微信公众号平台</a>，进入<span style="color:#1F91F3;background:undefined">设置与开发-&gt;开发-&gt;基本配置</span></p>
                <p>1.获取AppID和AppSecret并填入<span style="color:#1F91F3;background:undefined">主题设置-&gt;用户&amp;互动-&gt;社交登录-&gt;微信登录(公众号模式)</span></p>
                <p>2.点击配置<span style="color:#1F91F3;background:undefined">IP白名单</span>，将网站服务器的IP地址加入到白名单</p>
                <div class="lz-block-image">
                    <figure class="aligncenter size-large is-resized">
                        <img alt="图片[2]-WordPress接入未认证微信公众号订阅号使用微信扫码登录教程-Wordpress主题模板-zibll子比主题" decoding="async" src="https://mimg.127.net/vip/newindex/img/bg/vip188/bg1.jpg" class="wp-image-2210" width="500" sizes="(max-width: 1706px) 100vw, 1706px">
                    </figure>
                </div>
                <h3 id="wznav_3">微信公众号的服务器URL配置</h3>
                <p>首先进入<span style="color:#1F91F3;background:undefined">主题设置-&gt;用户&amp;互动-&gt;社交登录-&gt;微信登录(公众号模式)</span>：复制<code>服务器接口URL</code>，并设置一个Token并保存！<br>然后进入<span style="color:#1F91F3;background:undefined">公众号平台-&gt;设置与开发-&gt;开发-&gt;基本配置-&gt;服务器配置</span>：点击修改，填写复制的<code>接口URL</code>以及Token<br>保存成功之后，记得点击<span style="color:#1F91F3;background:undefined">启用</span></p>
                <p>注意事项：</p>
                <ul><li>token可以随意填写，主题设置和微信平台保持一致即可</li><li>必须先设置主题设置的token并保存，然后再去微信公众号平台提交服务器配置，顺序反了则会失败</li><li>消息加解密方式必须选择<span style="color:#fb2121;background:undefined">明文模式</span></li><li>提交成功之后记得启用服务器配置</li></ul>
                <h2 id="wznav_4">其他配置</h2>
                <p>最后我们还需要上传我们公众号的二维码，同时根据需要设置验证码回复模板即可</p>
                <hr class="lz-block-separator is-style-dots">
                <div class="lz-block-buttons radius">
                    <span class="an_1 but jb-blue">
                        <a href="https://www.zibll.com/zibll_word/user-function">查看更多登录教程</a>
                    </span>
                </div>
            </div>
            <!-- 版权 -->
            <div class="muted-3-color" style="font-size: .9em;">
                <div>
                    <span>©</span> 版权声明
                </div>
                <div class="posts-copyright">
                    分享是一种美德，转载请保留原链接
                </div>
            </div>
            <!-- end -->
            <div class="text-center theme-box muted-3-color box-body separator" style="font-size: .9em;">
                THE END
            </div>
            <!-- 文章标签 -->
            <div class="theme-box article-tags">
                <a class="but ml6 radius c-blue" title="查看更多分类文章" href="https://www.zibll.com/zibll_word/user-function">
                    <i class="iconfont icon-folder" aria-hidden="true"></i>用户功能
                </a>
                <br>
                <a href="https://www.zibll.com/tag/%e7%ac%ac%e4%b8%89%e6%96%b9%e7%99%bb%e5%bd%95" title="查看此标签更多文章" class="but ml6 radius"># 第三方登录</a>
                <a href="https://www.zibll.com/tag/%e5%be%ae%e4%bf%a1%e7%99%bb%e5%bd%95" title="查看此标签更多文章" class="but ml6 radius"># 微信登录</a>
                <a href="https://www.zibll.com/tag/%e5%be%ae%e4%bf%a1%e5%85%ac%e4%bc%97%e5%8f%b7" title="查看此标签更多文章" class="but ml6 radius"># 微信公众号</a><a href="https://www.zibll.com/tag/%e7%a4%be%e4%ba%a4%e8%b4%a6%e5%8f%b7%e7%99%bb%e5%bd%95" title="查看此标签更多文章" class="but ml6 radius"># 社交账号登录</a>
            </div>
        </div>
        <div class="text-center muted-3-color box-body" style="font-size: .9em;">文章不错？点个赞呗</div>
        <Interact />
    </article>
    <fuserInfo />
    <farticleNav />
    <frelatedCon />
    <Comments />
</template>
<script setup>
import Interact from 'c/article/interact.vue'
import fuserInfo from 'c/article/fuserInfo.vue'
import farticleNav from 'c/article/farticleNav.vue'
import frelatedCon from 'c/article/frelatedCon.vue'
import Comments from 'c/article/comments.vue'
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
    .post-actions {
        padding-bottom: 15px;
    }
    .action {
        width: 80px;
        padding: 10px 0;
        display: inline-block;
        opacity: .7;
        vertical-align: top;
        .icon {
            font-size: 24px;
            width: 100%;
            margin: 5px 0;
        }
        span {
            opacity: .7;
            font-size: .9em;
            &:nth-of-type(2){
                margin-left: 2px;
            }
        }
        &:hover {
            color: inherit;
            opacity: 1;
        }
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
.article-header .article-avatar .relative {
    margin-top: 20px;
}
.single-metabox {
    .post-metas {
        background: var(--body-bg-color);
        right: 0;
        padding: 2px 6px;
        border-radius: 100px;
        color: var(--meta-color);
    }
    .post-metas span {
        margin: 0 6px;
        a {
            color: inherit;
        }
    }
}
.lz-posts-content {
    line-height: 2;
    font-size: 16px;
    min-height: 90px;
    p {
        margin-bottom: 20px;
        word-wrap: break-word;
    }
    h2 {
        font-size: 18px;
    }
    h3 {
        font-size: 16px;
    }
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: auto;
    }
    ul {
        list-style: disc;
    }
    ol {
        list-style: decimal;
    }
    li {
        margin-bottom: 10px;
    }
    .aligncenter {
        display: table;
        margin: auto;
    }
    code:not([class]) {
        color: #ff3c98;
        background-color: rgba(253,153,153,.2);
        margin: 2px;
    }
}
.wp-posts-content h1, .lz-posts-content h2, .lz-posts-content h3, .wp-posts-content h4, .wp-posts-content h5 {
    margin: 20px 0;
    font-weight: 700;
}
.tab-nav-theme li:before, .title-h-center:before, .title-h-left:before, .title-theme:before, .wp-posts-content>h1.has-text-align-center:before, .wp-posts-content>h1.wp-block-heading:before, .wp-posts-content>h1:not([class]):before, .wp-posts-content>h2.has-text-align-center:before, .wp-posts-content>h2.wp-block-heading:before, .lz-posts-content>h2:not([class]):before, .wp-posts-content>h3.has-text-align-center:before, .wp-posts-content>h3.wp-block-heading:before, .lz-posts-content>h3:not([class]):before, .wp-posts-content>h4.has-text-align-center:before, .wp-posts-content>h4.wp-block-heading:before, .wp-posts-content>h4:not([class]):before, .zib-widget>h3:before {
    position: absolute;
    content: '';
    width: 4px;
    background: var(--theme-color);
    top: 10%;
    left: 2px;
    bottom: 10%;
    border-radius: 5px;
    box-shadow: 1px 1px 3px -1px var(--theme-color);
}
.tab-nav-theme li:before, .title-h-center:before, .title-h-left:before, .wp-posts-content>h1.has-text-align-center:before, .wp-posts-content>h1.wp-block-heading:before, .wp-posts-content>h1:not([class]):before, .wp-posts-content>h2.has-text-align-center:before, .wp-posts-content>h2.wp-block-heading:before, .lz-posts-content>h2:not([class]):before, .wp-posts-content>h3.has-text-align-center:before, .wp-posts-content>h3.wp-block-heading:before, .lz-posts-content>h3:not([class]):before, .wp-posts-content>h4.has-text-align-center:before, .wp-posts-content>h4.wp-block-heading:before, .wp-posts-content>h4:not([class]):before, .zib-widget>h3:before {
    width: 40px;
    height: 3px;
    top: auto;
    left: 0;
    bottom: 3px;
    transition: .4s;
}
.tab-nav-theme li, .title-h-center, .title-h-left, .wp-posts-content>h1.has-text-align-center, .wp-posts-content>h1.wp-block-heading, .wp-posts-content>h1:not([class]), .wp-posts-content>h2.has-text-align-center, .wp-posts-content>h2.wp-block-heading, .wp-posts-content>h2:not([class]), .wp-posts-content>h3.has-text-align-center, .wp-posts-content>h3.wp-block-heading, .lz-posts-content>h3:not([class]), .wp-posts-content>h4.has-text-align-center, .wp-posts-content>h4.wp-block-heading, .wp-posts-content>h4:not([class]), .zib-widget>h3 {
    position: relative;
    padding-bottom: 8px;
}
.wp-posts-content>h3.has-text-align-center:before, .lz-posts-content>h3:not([class]):before, .wp-posts-content>h4.has-text-align-center:before, .lz-posts-content>h4:not([class]):before {
    width: 25px!important;
    height: 2px!important;
}
.post-dplayer, .wp-block-gallery, .lz-block-image {
    margin-bottom: 20px;
}
.lz-block-image {
    img {
        height: auto;
        max-width: 100%;
        vertical-align: bottom;
    }
    &:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}
.quote_q {
    padding: 1.2em;
    margin: 10px 0 20px 0;
    position: relative;
    --quote-color: var(--main-color);
    color: var(--quote-color);
    &::before {
        content: "";
        border-radius: 6px;
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: .04;
        right: 0;
        background: var(--quote-color);
        top: 0;
    }
    .iconfont {
        font-size: 1.2em;
        margin-right: .5em;
        position: absolute;
        color: var(--quote-color);
        opacity: .6;
    }
    &>div, &>p {
        position: relative;
        margin: 0;
        padding-left: 2em;
        opacity: .6;
        position: relative;
    }
}
.lz-posts-content ol:not(.blocks-gallery-grid), .lz-posts-content ul:not(.blocks-gallery-grid) {
    margin: 10px 0 20px 15px;
    padding-left: 15px;
}
.article-postsbox {
    line-height: 1.6;
    overflow: hidden;
    font-size: 14px;
    max-width: 550px;
    margin: auto;
    margin-bottom: 20px;
    box-shadow: none;
    .fit-cover {
        height: 100%;
    }
    .posts-mini {
        width: 100%!important;
        margin: 0!important;
        background: var(--muted-border-color);
        position: relative;
        &>div:first-child{
            margin-right: 10px;
        }
        .item-thumbnail {
            width: 96px;
            height: 0;
            padding-bottom: var(--posts-list-scale);
            position: relative;
            overflow: hidden;
            border-radius: var(--main-radius);
            img {
                border-radius: 4px;
            }
        }
        .item-meta {
            font-size: 12px;
            a {
                color: inherit;
            }
            &>span,.meta-right>span {
                margin-right: 8px;
                font-size: 13px;
            }
            .meta-right span:last-child {
                margin-right: 0;
            }
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
}
.posts-span.card .span-heading, .posts-mini-con .span-heading {
    font-size: 14px;
}
.posts-mini {
    padding: 10px;
    display: inline-flex;
    width: 50%;
    .meta-author>span{
        margin-left: 6px;
    }
    .avatar-mini {
        transform: translateY(-1px);
    }
}
.abs-blur-bg {
    position: absolute;
    left: -50px;
    top: -50px;
    width: calc(100% + 100px);
    height: calc(100% + 100px);
    -webkit-filter: blur(30px);
    filter: blur(30px);
}
.article-postsbox .abs-blur-bg, .author-minicard .abs-blur-bg {
    opacity: .15;
}
.lz-block-separator {
    border: 1px solid;
    border-right: none;
    border-left: none;
    &.is-style-dots {
        background: none!important;
        border: none;
        text-align: center;
        line-height: 1;
        height: auto;
        &:before {
            content: "···";
            color: currentColor;
            font-size: 1.5em;
            letter-spacing: 2em;
            padding-left: 2em;
            font-family: serif;
        }
    }
}
.lz-block-buttons {
    margin-bottom: 20px;
    --main-radius:100px;
    &.radius{
        border-radius: 50px;
    }
    .but {
        margin: .4em;
        display: inline-block;
        padding: 6px 18px;
    }
}
.article-content .article-tags a {
    font-size: 12px;
    margin: 3px;
}

</style>