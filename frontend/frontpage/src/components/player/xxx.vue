<template>
    <div class="artplayer" ref="artRef" ></div>
</template>
<!-- style="width: 100%; height: 100%;" -->
<script setup>
import Artplayer from "artplayer";
import artplayerPluginAds from 'artplayer-plugin-ads';
import {ref,reactive,onMounted,onBeforeUnmount ,nextTick } from 'vue';
const artRef = ref();
let state=reactive({instance: null});
onMounted(()=>{
function artplayerPluginAds(art) {
    return {
            // html广告，假如是视频广告则忽略该值
            // html: '<img src="/assets/sample/poster.jpg">',

            // 视频广告的地址
            video: 'src/assets/video/test1.mp4',

            // 广告跳转网址，为空则不跳转
            url: '',

            // 必须观看的时长，期间不能被跳过，单位为秒
            // 当该值大于或等于totalDuration时，不能提前关闭广告
            // 当该值等于或小于0时，则随时都可以关闭广告
            playDuration: 5,

            // 广告总时长，单位为秒
            totalDuration: 10,

            // 视频广告是否默认静音
            muted: false,

            // 多语言支持
            i18n: {
                close: '关闭广告',
                countdown: '%s秒',
                detail: '查看详情',
                canBeClosed: '%s秒后可关闭广告',
            },
        }
}
let option={
    container: '.artplayer', // 播放器挂载的 DOM 容器
    url: 'https://r16---sn-2x3een76.c.2mdn.net/videoplayback/id/c1e292e1c1701f0e/itag/343/source/web_video_ads/ctier/L/acao/yes/ip/0.0.0.0/ipbits/0/expire/3804422295/sparams/acao,ctier,expire,id,ip,ipbits,ipbypass,itag,mh,mip,mm,mn,ms,mv,mvi,pl,source/signature/3B63F046E06C0A78798BEF91E68C3F894826171F.6C1B337A52B9667E66864E3A20BFC1F6EFB7B95E/key/cms1/mh/zp/pl/15/redirect_counter/1/rm/sn-2x3ld7l/req_id/3abc51b985aaa3ee/cms_redirect/yes/ipbypass/yes/mip/123.138.44.57/mm/42/mn/sn-2x3een76/ms/onc/mt/1667265896/mv/m/mvi/16?file=file.mp4', // 视频源地址
    // type: 'm3u8', // 用于指明视频的格式，需要配合 customType 一起使用，默认视频的格式就是视频地址的后缀（如 .m3u8, .mkv, .ts），但有时候视频地地址没有正确的后缀，所以需要特别指明
    // customType: { // 通过视频的 type 进行匹配，把视频解码权交给第三方程序进行处理，处理的函数能接收三个参数
    //     m3u8: function (video, url, art) { //video : 视频 DOM 元素 url : 视频地址 art : 当前实例
    //         //
    //     },
    // },
    lang: 'zh-cn', // 默认显示语言，目前支持：en, zh-cn, zh-tw, cs, pl, es, fa, fr, id
    // i18n: { // 自定义 i18n 配置，该配置会和自带的 i18n 进行深度合并
    //     'your-lang': { // 新增语言:
    //         Play: 'Your Play'
    //     },
    //     'zh-cn': { // 修改现有的语言
    //         Play: 'Your Play'
    //     }
    // },
    lock: false, //是否在移动端显示一个 锁定按钮 ，用于隐藏底部 控制栏
    fastForward: false, // 是否在移动端添加长按视频快进功能
    autoPlayback: false, // 是否使用自动 回放功能
    autoOrientation: true, // 是否在移动端的网页全屏时，根据视频尺寸和视口尺寸，旋转播放器
    airplay: false, // 是否显示 airplay 按钮，当前只有部分浏览器支持该功能
    id: 'your-url-id', // 播放器的唯一标识，目前只用于记忆播放 autoplayback
    // poster: '/assets/sample/poster.jpg', // 视频的海报，只会出现在播放器初始化且未播放的状态下
    title: 'Your Name', // 视频标题，目前会出现在 视频截图 和 迷你模式 下
    theme: '#ffad00', // 23ade5播放器主题颜色，目前用于 进度条 和 高亮元素 上
    volume: 0.5, // 播放器的默认音量
    isLive: false, // 使用直播模式，会隐藏进度条和播放时间
    muted: false, // 是否默认静音
    autoplay: false, // 是否自动播放
    autoSize: true, // 播放器的尺寸默认会填充整个 container 容器尺寸，所以经常出现黑边，该值能自动调整播放器尺寸以隐藏黑边，类似 css 的 object-fit: cover;
    autoMini: true, // 当播放器滚动到浏览器视口以外时，自动进入 迷你播放 模式
    loop: false, // 是否循环播放
    flip: true, // 是否显示视频翻转功能，目前只出现在 设置面板 和 右键菜单 里
    playbackRate: true, // 是否显示视频播放速度功能，会出现在 设置面板 和 右键菜单 里
    aspectRatio: true, // 是否显示视频长宽比功能，会出现在 设置面板 和 右键菜单 里
    screenshot: false, // 是否在底部控制栏里显示 视频截图 功能
    setting: true, // 是否在底部控制栏里显示 设置面板 的开关按钮
    // settings: [ // 初始化自定义的 设置面板
    //     {
    //         html: 'setting01',
    //         selector: [
    //             {
    //                 html: 'setting01-01',
    //             },
    //             {
    //                 html: 'setting01-02',
    //             },
    //         ],
    //         onSelect: function (...args) {
    //             console.info(args);
    //         },
    //     },
    //     {
    //         html: 'setting02',
    //         selector: [
    //             {
    //                 html: 'setting02-01',
    //             },
    //             {
    //                 html: 'setting02-02',
    //             },
    //         ],
    //         onSelect: function (...args) {
    //             console.info(args);
    //         },
    //     },
    // ],
    hotkey: true, // 是否使用快捷键
    pip: true, // 是否在底部控制栏里显示 画中画 的开关按钮
    mutex: true, // 假如页面里同时存在多个播放器，是否只能让一个播放器播放
    fullscreen: true, // 是否在底部控制栏里显示播放器 窗口全屏 按钮
    fullscreenWeb: true, // 是否在底部控制栏里显示播放器 网页全屏 按钮
    // subtitleOffset: true, // 字幕时间偏移，范围在 [-5s, 5s]，出现在 设置面板 里
    // subtitle: { // 设置视频的字幕，支持字幕格式：vtt, srt, ass
    //     url: '/assets/sample/subtitle.srt', // 字幕地址
    //     type: 'srt', // 字幕类型，可选 vtt, srt, ass
    //     encoding: 'utf-8', // 字幕编码，默认 utf-8
    //     escape: true, // 是否转义 html 标签，默认为 true
    //     style: { // 字幕样式
    //         color: '#03A9F4',
    //         'font-size': '30px',
    //     },
    // },
    miniProgressBar: true, // 迷你进度条，只在播放器失去焦点后且正在播放时出现
    useSSR: false, // 是否使用 SSR 挂载模式，假如你希望在播放器挂载前，就提前渲染好播放器所需的 HTML 时有用.你可以通过 Artplayer.html 访问到播放器所需的 HTML
    playsInline: true, // 在移动端是否使用 playsInline 模式
    // layers: [ // 初始化自定义的 层
    //     {
    //         name: 'potser',
    //         html: `<img style="width: 100px" src="${img}">`,
    //         style: {
    //             position: 'absolute',
    //             top: '20px',
    //             right: '20px',
    //             opacity: '.9',
    //         },
    //         click: function (...args) {
    //             console.info('click', args);
    //             art.layers.show = false;
    //         },
    //         mounted: function (...args) {
    //             console.info('mounted', args);
    //         },
    //     },
    // ],
    // contextmenu: [ // 初始化自定义的 右键菜单
    //     {
    //         html: 'your-menu',
    //         click: function (...args) {
    //             console.info('click', args);
    //             art.contextmenu.show = false;
    //         },
    //     },
    // ],
    // controls: [ // 初始化自定义的底部 控制栏
    //     {
    //         position: 'left',
    //         html: 'your-control',
    //         tooltip: 'Your Control',
    //         style: {
    //             color: 'green',
    //         },
    //         click: function (...args) {
    //             console.info('click', args);
    //         },
    //     },
    // ],
    // quality: [ // 是否在底部控制栏里显示 画质选择 列表
    //     {
    //         default: true, // 默认画质
    //         html: 'SD 480P', // 画质名字
    //         url: '/assets/sample/video.mp4', // 画质地址
    //     },
    //     {
    //         html: 'HD 720P',
    //         url: '/assets/sample/video.mp4',
    //     },
    // ],
    // highlight: [ // 在进度条上显示 高亮信息
    //     {
    //         time: 60, // 高亮时间（单位秒）
    //         text: 'One more chance', // 高亮文本
    //     }
    // ],
    plugins: [
        artplayerPluginAds
    ], // 初始化自定义的 插件
    // whitelist: [(ua) => /iPhone/gi.test(ua)], //因为不同的移动设备存在多种差异和限制，有时候你希望在某些移动设备上不使用本播放器，而是直接使用原生的功能时，可以通过该选项控制白名单是一个数组类型，分别与 window.navigator.userAgent 进行匹配，只要其中一项匹配成功则启用播放器(支持 字符串 匹配, 函数 匹配, 正则 匹配)
    // thumbnails: { // 在进度条上设置 预览图
    //     url: '/assets/sample/thumbnails.png', // 预览图地址
    //     number: 100, // 预览图数量
    //     column: 10, // 预览图列数
    //     width: 300, // 预览图宽度
    //     height: 300 // 预览图高度
    // },
    moreVideoAttr: { // 更多视频属性，这些属性将直接写入视频元素里
        // 'webkit-playsinline': true,
        // playsInline: true,
        crossOrigin: 'anonymous',
    },
    // icons: { // 用于替换默认图标，支持 Html 字符串和 HTMLElement
    //     loading: '<img src="/assets/img/ploading.gif">',
    //     state: '<img src="/assets/img/state.png">',
    // },
}
state.instance = new Artplayer(option,
// function onReady(state.instance) {
//     this.play()
// },
);
// state.instance.on('ready', () => {
//     state.instance.play();
// });
// nextTick(()=>{
//     emit("get-instance", state.instance);
// })
})
onBeforeUnmount(()=>{
if (state.instance && state.instance.destroy) {
    state.instance.destroy(false);
    }
})
</script>
<style>
.artplayer{
    width: 100%;
    height: 100%;
}
</style>
  