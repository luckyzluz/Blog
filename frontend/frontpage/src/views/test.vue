<template>
    <dplayer :url="dplayerObj.video.url" 
    :theme="'var(--focus-color)'" :showmenu=false :showsetting=false />
      <!--:video="dplayerObj.video" :subtitle="dplayerObj.subtitle" :danmaku="dplayerObj.danmaku" :contextmenu="dplayerObj.contextmenu" -->
  </template>
  <script setup>
  import dplayer from 'c/Dplayer.vue';
//   import Hls from 'hls.js';
import Hls from 'hls.js/dist/hls.min.js'
  import { ref, reactive } from 'vue'
  const dplayerObj = reactive({
    video: {
      url: 'https://vip.lz-cdn.com/20220606/17379_0df2db27/index.m3u8', //视频地址src/assets/video/test1.mp4
      type: 'customHls',
      customType: {
        customHls: function (video, player) {
          const hls = new Hls(); //实例化Hls  用于解析m3u8
          hls.loadSource(video.src);
          hls.attachMedia(video);
        }
      }
    },
    danmaku: {
        id: 4157142,
        api: 'https://www.fastmock.site/mock/454f58b030e7903400b943b9163118e5/blog1/',
        token: 'tokendemo',
        maximum: 1000,
        addition: ['src/assets/video/danmuku/test.json'],
        user: 'DIYgod',
        bottom: '15%',
        unlimited: true,
        speedRate: 0.5,
  },
  subtitle:{
        url:'src/assets/video/subtitle/hikarunara.vtt', // 字幕链接
        type:'webvtt', // 字幕类型，可选值: 'webvtt', 'ass'，目前只支持 webvtt
        fontSize: '20px', // 字幕字号
        bottom: '10%', // 字幕距离播放器底部的距离，取值形如: '10px' '10%'
        color:'yellow'// 字幕颜色
    },
  })
//  
  </script>
  