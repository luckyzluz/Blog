<template>
    <!-- 广告图片模块 -->
    <div class="lz-widget widget_media_image relative">
        <a :href="data.href">
            <img class="" :src="data.img" style="max-width: 100%;height: auto;" alt="">
            <span class="abs-center right-top" style="width: 35px;top: 5px;">
                <img src="src/assets/image/web/eva.png" alt="">
            </span>
        </a>
    </div>
</template>
<script setup>
let data={
    img:'src/assets/image/article/463X224.jpg',
    href:'http://ww.baidu.com'
}
</script>
<style lang="scss">
.lz-widget.widget_media_image {
    padding: 0;
    overflow: hidden;
    img {
        width: 100%;
    }
}
</style>