<template>
    <div style="margin-bottom: 20px;">
        <noTop :data="noTopData" />
        <div class="relative-h radius">
            <Dplayer />
        </div>
    </div>
</template>
<script setup>
import noTop from 'c/notop.vue'
import Dplayer from 'c/player/Dplayer.vue'
let noTopData={
    title:'视频模块'
}
// https://pl.dogevideo.com/vcloud/hls/m3u8/99552.m3u8?tm=1680760225&vtype=96&uid=17&sign=e6a9114fd841086cf5e232e2bf842f56&icp=0&durlimit=0&server=v17.dogevideo.com&vkey=B44351&token=1197616948cb1f5464c641ebd1d0e4a0&oi=1863521419&ext=.m3u8
</script>