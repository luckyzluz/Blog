<template>
    <div class="lz-widget widget_media_image">
        <a :href="data.href">
            <img class="" :src="data.img" style="max-width: 100%;height: auto;" alt="">
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