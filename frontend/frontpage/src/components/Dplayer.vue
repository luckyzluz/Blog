
<template>
    <div ref="videoRef"></div>
  </template>
       
<script setup>
import DPlayer from 'dplayer'
// import Hls from 'hls.js';
import Hls from 'hls.js/dist/hls.min.js'
import { ref, reactive, onBeforeUnmount, onMounted,defineEmits  } from 'vue'
const emit = defineEmits(['player']);
const videoRef = ref();
const state = reactive({
    instance: null
})
const identifyType=(param,live=false)=>{
    if (live) {
        return "customHls";
    } else if (
        param.indexOf(".m3u8") > 0 &&
        live == false
    ) {
        return "customHls";
    } else {
    return "auto";
    }
}

const props = defineProps({
url:{
    type:String,
    default:'https://vip.lz-cdn.com/20220606/17379_0df2db27/index.m3u8'
},
// 是否自动播放
autoplay: {
    type: Boolean,
    default: false
},
// 主题色
theme: {
    type: String,
    default: '#0093ff'
},
// 视频是否循环播放
loop: {
    type: Boolean,
    default: false
},
// 开启直播模式
live: {
    type: Boolean,
    default: false
},
// 语言(可选值: 'en', 'zh-cn', 'zh-tw')
lang: {
    type: String,
    default: 'zh-cn'
},
// 是否开启截图(如果开启，视频和视频封面需要允许跨域)
screenshot: {
    type: Boolean,
    default: false
},
// 是否开启热键
hotkey: {
    type: Boolean,
    default: true
},
// 视频是否预加载(可选值: 'none', 'metadata', 'auto')
preload: {
    type: String,
    default: 'auto'
},
// 默认音量
volume: {
    type: Number,
    default: 0.7
},
// 可选的播放速率，可以设置成自定义的数组
playbackSpeed: {
    type: Array,
    default: [0.5, 1, 1.25, 1.5, 2]
},
// 在左上角展示一个 logo，你可以通过 CSS 调整它的大小和位置
logo: {
    type: String,
    default: ''
},
// 视频信息
video: {
    type: Object,
    default: {
    url: 'src/assets/video/test1.mp4', //视频地址
    type: 'auto', // 可选值: 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal','customHls' 或其他自定义类型
    pic:'', // 视频封面
    thumbnails:'', // 视频缩略图
     // 外挂字幕
    customType: {
        customHls: function (video, player) {
        const hls = new Hls(); //实例化Hls  用于解析m3u8
        hls.loadSource(video.src);
        hls.attachMedia(video);
        }
    }
    },
},
// 外挂字幕
subtitle: {
    type: Object,
    default: {}
},
// 显示弹幕
danmaku: {
    type: Object,
    default: {}
},
// 自定义右键菜单
contextmenu: {
    type: Array,
    default: [
    {
      text: '播放器信息',
      click: (player) => {
        console.log(player);
      },
    },
  ]
},
// 自定义进度条提示点
highlight: {
    type: Array,
    default: []
},
// 阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
mutex: {
    type: Boolean,
    default: true
},
showmenu:{
    type: Boolean,
    default: true
},
showsetting:{
    type: Boolean,
    default: true
},
getplayer:{
    type: Boolean,
    default: false
}
})
onMounted(() => {
    let player = {
        container: videoRef.value, // 播放器容器元素
        live:props.live, // 开启直播模式
        autoplay: props.autoplay, // 视频自动播放
        theme: props.theme, // 主题色
        loop: props.loop, // 视频循环播放
        lang: props.lang, // 可选值: 'en', 'zh-cn', 'zh-tw'
        screenshot: props.screenshot, // 开启截图，如果开启，视频和视频封面需要允许跨域
        hotkey: props.hotkey, // 开启热键，支持快进、快退、音量控制、播放暂停
        preload: props.preload, // 视频预加载，可选值: 'none', 'metadata', 'auto'
        volume: props.volume, // 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
        playbackSpeed: props.playbackSpeed, // 可选的播放速率，可以设置成自定义的数组
        logo: props.logo, // 在左上角展示一个 logo，你可以通过 CSS 调整它的大小和位置
        video: {
                url: props.url, //视频地址src/assets/video/test1.mp4
                type: identifyType(props.url,props.live),
                customType: {
                    customHls: function (video, player) {
                    const hls = new Hls(); //实例化Hls  用于解析m3u8
                    hls.loadSource(video.src);
                    hls.attachMedia(video);
                    }
                }
            }, // 视频信息props.video
        contextmenu: props.contextmenu, // 自定义右键菜单
        highlight: props.highlight, // 自定义进度条提示点
        mutex: props.mutex, // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    }
    if (props.subtitle.url) {
        player.subtitle = props.subtitle
    }
    if (JSON.stringify(props.danmaku)!=='{}') {
        player.danmaku = props.danmaku
    }
    // console.log(player);
    state.instance = new DPlayer(player);

    // 删除默认右键菜单
    if(!props.showmenu){
        setTimeout(()=>{document.querySelector(".dplayer-menu").remove();},0)
    }
    // 删除设置按钮
    if(!props.showsetting){
        document.querySelector(".dplayer-setting").remove();
    }
    document.querySelectorAll(".dplayer-menu-item")[document.querySelectorAll(".dplayer-menu-item").length - 1].remove(); // 去掉作者信息
    document.querySelectorAll(".dplayer-menu-item")[document.querySelectorAll(".dplayer-menu-item").length - 1].remove(); // 去掉项目地址
    if(props.getplayer){
        emit('player',player)
    }
})
// 销毁
onBeforeUnmount(() => {
    state.instance.destroy()
})


</script>
    
<style lang='scss' scoped>
</style>
