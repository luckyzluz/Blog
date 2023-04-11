<template>
    <div class="theme-box relates relates-thumb">
        <noTop :data="noTopData" />
        <div class="lz-widget">
            <relatedCon :PerView=3.5 />
        </div>
    </div>
</template>
<script setup>
import relatedCon from 'c/article/relatedCon.vue'
import noTop from 'c/notop.vue'
let noTopData={
    title:'相关推荐'
}
</script>