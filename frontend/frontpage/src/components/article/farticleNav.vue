<template>
    <!-- 文章页底部切换导航 -->
    <div class="theme-box" style="height: 99px;">
        <nav class="article-nav">
            <div class="main-bg box-body radius main-shadow">
                <a href="">
                    <p class="muted-2-color">
                        <!-- <i class="iconfont icon-angleleft" style="font-size: 1.2em;"></i> -->
                        <i class="iconfont icon-angle-double-left" style="font-size: 0.1em; margin-right: 6px;"></i>上一篇
                    </p>
                    <div class="text-ellipsis-2">文章标题标题标题</div>
                </a>
            </div>
            <div class="main-bg box-body radius main-shadow">
                <a href="">
                    <p class="muted-2-color">
                    下一篇<i class="iconfont icon-angle-double-right" style="font-size: 0.1em; margin-left: 6px;"></i>
                    </p>
                    <div class="text-ellipsis-2">文章标题标题标题</div>
                </a>
            </div>
        </nav>
    </div>
</template>
<style lang="scss">
.article-nav .box-body {
    width: calc(50% - 7px);
    margin: 0;
    display: inline-block;
    &+.box-body {
        margin-right: 0;
        float: right;
        text-align: right;
    }
}
</style>