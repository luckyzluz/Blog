<template>
    <!-- container -->
    <div class="container widget-graphic-cover mb20 hidden-xs-only" style="--font-size:22px;">
        <div class="graphic hover-zoom-img noshadow mb10" style="padding-bottom: 16%!important;">
            <video autoplay loop muted class="fit-cover lazyloading" src="src/assets/video/蓝色矩形循环跳动.mp4"></video>
            <div class="abs-center text-center graphic-text this-font">
                <div style="margin-bottom: 10px; font-weight: 700; font-size: 1.4em;">{{ data.title }}</div>{{ data.intro }}
            </div>
        </div>
    </div>
</template>
<script setup>
let data={
    title:'测试文章',
    intro:'更优雅的网站主题'
}
</script>