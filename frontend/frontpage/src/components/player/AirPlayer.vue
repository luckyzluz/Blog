<template>
    <div ref="artRef"></div>
</template>

<script setup>
import Artplayer from 'artplayer';
import Hls from 'hls.js/dist/hls.min.js'
import artplayerPluginAds from 'artplayer-plugin-ads';
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
const emit = defineEmits(['get-instance']);
const props = defineProps({
    option: {
        type: Object,
        required: false,
    },
    ads: {
        type: Object,
        required: false
    },
    danmuku: {
        type:Object,
        required: false
    },
    subtitle: {
        type: Object,
        required: false
    },
    test: {
        type: Boolean,
        default: false,
        required: false
    }
});
const instance = ref(null);
const artRef = ref(null);
onMounted(() => {
    let option={
        url: 'src/assets/video/video.mp4', // 视频源地址
        type: 'm3u8', // 用于指明视频的格式，需要配合 customType 一起使用，默认视频的格式就是视频地址的后缀（如 .m3u8, .mkv, .ts），但有时候视频地地址没有正确的后缀，所以需要特别指明
        customType: { // 通过视频的 type 进行匹配，把视频解码权交给第三方程序进行处理，处理的函数能接收三个参数
            m3u8: function (video, url, art=instance.value) { //video : 视频 DOM 元素 url : 视频地址 art : 当前实例
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(url);
                    hls.attachMedia(video);

                    // optional
                    art.hls = hls;
                    art.once('url', () => hls.destroy());
                    art.once('destroy', () => hls.destroy());
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = url;
                } else {
                    art.notice.show = 'Unsupported playback format: m3u8';
                }
            },
            // flv: function playFlv(video, url, art) {
                // https://github.com/Bilibili/flv.js
            //     if (flvjs.isSupported()) {
            //         const flv = flvjs.createPlayer({ type: 'flv', url });
            //         flv.attachMediaElement(video);
            //         flv.load();

            //         // optional
            //         art.flv = flv; 
            //         art.once('url', () => flv.destroy());
            //         art.once('destroy', () => flv.destroy());
            //     } else {
            //         art.notice.show = 'Unsupported playback format: flv';
            //     }
            // },
            // torrent: function playTorrent(video, url, art) {
                // https://github.com/webtorrent/webtorrent
            //     const torrent = new WebTorrent();
            //     torrent.add(url, function (torrent) {
            //         var file = torrent.files[0];
            //         file.renderTo(video, {
            //             autoplay: art.option.autoplay,
            //         });
            //     });

            //     // optional
            //     art.torrent = torrent;
            //     art.once('url', () => torrent.destroy());
            //     art.once('destroy', () => torrent.destroy());
            // },
            // mpd: function (video, url, art) {
                // https://github.com/Dash-Industry-Forum/dash.js
            //     if (dashjs.supportsMediaSource()) {
            //         const dash = dashjs.MediaPlayer().create();
            //         dash.initialize(video, url, art.option.autoplay);

            //         // optional
            //         art.dash = dash; 
            //         art.once('url', () => dash.destroy());
            //         art.once('destroy', () => dash.destroy());
            //     } else {
            //         art.notice.show = 'Unsupported playback format: mpd';
            //     }
            // }
        },
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
        poster: props.test?'src/assets/image/poster.jpg':'', // 视频的海报，只会出现在播放器初始化且未播放的状态下
        title: '视频标题', // 视频标题，目前会出现在 视频截图 和 迷你模式 下
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
        settings: props.test?[ // 初始化自定义的 设置面板
            {
                width: 200,
                html: '字幕',
                tooltip: '双语',
                icon: '<img width="22" heigth="22" src="/src/assets/image/subtitle.svg">',
                selector: [
                    {
                        html: '状态',
                        tooltip: '显示',
                        switch: true,
                        onSwitch: function (item) {
                            item.tooltip = item.switch ? '隐藏' : '显示';
                            instance.value.subtitle.show = !item.switch;
                            return !item.switch;
                        },
                    },
                    {
                        default: true,
                        html: '双语',
                        url: 'src/assets/video/subtitle/subtitle.srt',
                    },
                    {
                        html: '中文',
                        url: 'src/assets/video/subtitle/subtitle.cn.srt',
                    },
                    {
                        html: '日语',
                        url: 'src/assets/video/subtitle/subtitle.jp.srt',
                    },
                ],
                onSelect: function (item) {
                    instance.value.subtitle.switch(item.url, {
                        name: item.html,
                    });
                    return item.html;
                },
            },
            {
                html: 'Switcher',
                icon: '<img width="22" heigth="22" src="/src/assets/image/state.svg">',
                tooltip: 'OFF',
                switch: false,
                onSwitch: function (item) {
                    item.tooltip = item.switch ? 'OFF' : 'ON';
                    console.info('You clicked on the custom switch', item.switch);
                    return !item.switch;
                },
            },
            {
                html: 'Slider',
                icon: '<img width="22" heigth="22" src="/src/assets/image/state.svg">',
                tooltip: '5x',
                range: [5, 1, 10, 0.1],
                onRange: function (item) {
                    return item.range + 'x';
                },
            },
        ]:[],
        hotkey: true, // 是否使用快捷键
        pip: true, // 是否在底部控制栏里显示 画中画 的开关按钮
        mutex: true, // 假如页面里同时存在多个播放器，是否只能让一个播放器播放
        fullscreen: true, // 是否在底部控制栏里显示播放器 窗口全屏 按钮
        fullscreenWeb: true, // 是否在底部控制栏里显示播放器 网页全屏 按钮
        subtitleOffset: props.subtitle&&JSON.stringify(props.subtitle)!=='{}'||props.test?true:false, // 字幕时间偏移，范围在 [-5s, 5s]，出现在 设置面板 里
        miniProgressBar: true, // 迷你进度条，只在播放器失去焦点后且正在播放时出现
        useSSR: false, // 是否使用 SSR 挂载模式，假如你希望在播放器挂载前，就提前渲染好播放器所需的 HTML 时有用.你可以通过 Artplayer.html 访问到播放器所需的 HTML
        playsInline: true, // 在移动端是否使用 playsInline 模式
        layers: props.test?[ // 初始化自定义的 层
            {
                name: 'potser',
                html: `<img style="width: 100px" src="${'src/assets/image/layer.png'}">`,
                style: {
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    opacity: '.9',
                },
                click: function (...args) {
                    console.info('click', args);
                    instance.value.layers.show = false;
                    // window.open('https://aimu.app');
                },
                mounted: function (...args) {
                    console.info('mounted', args);
                },
            },
        ]:[],
        contextmenu: props.test?[ // 初始化自定义的 右键菜单
            {
                html: 'your-menu',
                click: function (...args) {
                    console.info('click', args);
                    instance.value.contextmenu.show = false;
                },
            },
        ]:[],
        controls: props.test?[ // 初始化自定义的底部 控制栏
            {
                position: 'right',
                html: 'Control',
                index: 1,
                tooltip: 'Control Tooltip',
                style: {
                    color: 'green',
                },
                style: {
                    marginRight: '20px',
                },
                click: function (...args) {
                    console.info('click', args);
                },
            },
        ]:[],
        quality: props.test?[ // 是否在底部控制栏里显示 画质选择 列表
            {
                default: true, // 默认画质
                html: 'SD 480P', // 画质名字
                url: 'src/assets/video/video.mp4', // 画质地址
            },
            {
                html: 'HD 720P',
                url: 'src/assets/video/video.mp4',
            },
        ]:[],
        highlight: props.test?[ // 在进度条上显示 高亮信息
            {
                time: 15, // 高亮时间（单位秒）
                text: 'One more chance', // 高亮文本
            },
            {
                time: 30,
                text: '谁でもいいはずなのに',
            },
            {
                time: 45,
                text: '夏の想い出がまわる',
            },
            {
                time: 60,
                text: 'こんなとこにあるはずもないのに',
            },
            {
                time: 75,
                text: '终わり',
            }
        ]:[],
        // whitelist: [(ua) => /iPhone/gi.test(ua)], //因为不同的移动设备存在多种差异和限制，有时候你希望在某些移动设备上不使用本播放器，而是直接使用原生的功能时，可以通过该选项控制白名单是一个数组类型，分别与 window.navigator.userAgent 进行匹配，只要其中一项匹配成功则启用播放器(支持 字符串 匹配, 函数 匹配, 正则 匹配)
        thumbnails: props.test?{ // 在进度条上设置 预览图
            url: 'src/assets/image/thumbnails.png', // 预览图地址
            number: 60, // 预览图数量
            column: 10, // 预览图列数
            // width: 300, // 预览图宽度
            // height: 300 // 预览图高度
        }:{},
        moreVideoAttr: { // 更多视频属性，这些属性将直接写入视频元素里
            // 'webkit-playsinline': true,
            // playsInline: true,
            crossOrigin: 'anonymous',
        },
        icons: { // 用于替换默认图标，支持 Html 字符串和 HTMLElement
            loading: '<img src="src/assets/image/ploading.gif">',
            state: '<img  width="150" heigth="150" src="src/assets/image/state.svg">',
            indicator: '<img width="16" heigth="16" src="src/assets/image/indicator.svg">',
        },
        ...props.option
    }

    let plugins=[];
    // 播放前广告
    if(props.ads&&JSON.stringify(props.ads)!=="{}"||props.test){
        let adsParams=()=>{
            if(props.ads.type=='img'){
                return {
                    // html广告，假如是视频广告则忽略该值
                    html: `<img src="${props.ads.img?props.ads.img:'https://img14.360buyimg.com/ddimg/jfs/t1/150492/36/14386/1170832/5ffaf2afEa91ce8f4/bfc4ad14c4eb85e9.jpg'}">`
                }
            }else{
                return {
                    // 视频广告的地址
                    video: props.ads.video?props.ads.video:'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/scene/ded278008277bd43267a484d262c8499_preview.mp4'
                }
            }
        }
        plugins.push(artplayerPluginAds({
            // 广告跳转网址，为空则不跳转
            url: props.ads.url?props.ads.url:'',
            // 必须观看的时长，期间不能被跳过，单位为秒
            // 当该值大于或等于totalDuration时，不能提前关闭广告
            // 当该值等于或小于0时，则随时都可以关闭广告
            playDuration: props.ads.playDuration?props.ads.playDuration:5,
            // 广告总时长，单位为秒
            totalDuration: props.ads.totalDuration?props.ads.totalDuration:10,
            // 视频广告是否默认静音
            muted: props.ads.muted?props.ads.muted:false,
            // 多语言支持
            i18n: props.ads.i18n?props.ads.i18n:{
                close: '关闭广告',
                countdown: '%s秒',
                detail: '查看详情',
                canBeClosed: '%s秒后可关闭广告',
            },
            ...adsParams(),
        }))
    }
    // 弹幕库
    if(props.danmuku&&JSON.stringify(props.danmuku)!=="{}"||props.test){
        plugins.push(artplayerPluginDanmuku({
            danmuku: props.danmuku.url?props.danmuku.url:'src/assets/video/danmuku/danmuku-v2.xml',
            speed: props.danmuku.speed?props.danmuku.speed:5, // 弹幕持续时间，单位秒，范围在[1 ~ 10]
            opacity: props.danmuku.opacity?props.danmuku.opacity:1, // 弹幕透明度，范围在[0 ~ 1]
            fontSize: props.danmuku.fontSize?props.danmuku.fontSize:25, // 字体大小，支持数字和百分比
            color: props.danmuku.color?props.danmuku.color:'#FFFFFF', // 默认字体颜色
            mode: props.danmuku.mode?props.danmuku.mode:0, // 默认模式，0-滚动，1-静止
            margin: props.danmuku.margin?props.danmuku.margin:[10, '25%'], // 弹幕上下边距，支持数字和百分比
            antiOverlap: props.danmuku.antiOverlap?props.danmuku.antiOverlap:true, // 是否防重叠
            useWorker: props.danmuku.useWorker?props.danmuku.useWorker:true, // 是否使用 web worker
            synchronousPlayback: props.danmuku.synchronousPlayback?props.danmuku.synchronousPlayback:false, // 是否同步到播放速度
            filter: props.danmuku.filter?props.danmuku.filter:(danmu) => danmu.text.length < 50, // 弹幕过滤函数，返回 true 则可以发送
            lockTime: props.danmuku.lockTime?props.danmuku.lockTime:5, // 输入框锁定时间，单位秒，范围在[1 ~ 60]
            maxLength: props.danmuku.maxLength?props.danmuku.maxLength:100, // 输入框最大可输入的字数，范围在[0 ~ 500]
            minWidth: props.danmuku.minWidth?props.danmuku.minWidth:200, // 输入框最小宽度，范围在[0 ~ 500]，填 0 则为无限制
            maxWidth: props.danmuku.maxWidth?props.danmuku.maxWidth:400, // 输入框最大宽度，范围在[0 ~ Infinity]，填 0 则为 100% 宽度
            theme: props.danmuku.theme?props.danmuku.theme:'dark', // 输入框自定义挂载时的主题色，默认为 dark，可以选填亮色 light
            beforeEmit: props.danmuku.beforeEmit?props.danmuku.beforeEmit:(danmu) => !!danmu.text.trim(), // 发送弹幕前的自定义校验，返回 true 则可以发送

            // 通过 mount 选项可以自定义输入框挂载的位置，默认挂载于播放器底部，仅在当宽度小于最小值时生效
            // mount: props.danmuku.mount?props.danmuku.mount:document.querySelector('.artplayer-danmuku'),
        }))
    }
    // 画质自动分级
    // if(option.type=='m3u8'){
    //     plugins.push(artplayerPluginHlsQuality({
    //         // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
    //         // Show quality in control
    //         control: true,

    //         // Show quality in setting
    //         setting: true,

    //         // Get the resolution text from level
	// 		getResolution: (level) => level.height + 'P',

    //         // I18n
    //         title: 'Quality',
    //         auto: 'Auto',
    //     }))
    // }

    instance.value = new Artplayer({
        ...option,
        plugins: plugins, // 初始化自定义的 插件
        subtitle: { // 设置视频的字幕，支持字幕格式：vtt, srt, ass
            url: (!props.subtitle)&&JSON.stringify(props.subtitle)=='{}'||props.test?'src/assets/video/subtitle/subtitle.srt':'', // 字幕地址
            type: 'srt', // 字幕类型，可选 vtt, srt, ass
            encoding: 'utf-8', // 字幕编码，默认 utf-8
            escape: true, // 是否转义 html 标签，默认为 true
            style: { // 字幕样式
                color: '#03A9F4',
                'font-size': '30px',
            },
            ...props.subtitle
        },
        container: artRef.value,
    });
    
    nextTick(() => {
        emit('get-instance', instance.value);
    });
    // 广告插件api
    // 广告被点击
    // instance.value.on('artplayerPluginAds:click', (ads) => {
    //     console.info(ads);
    // });

    // 已跳过广告
    // instance.value.on('artplayerPluginAds:skip', (ads) => {
    //     console.info(ads);
    // });

    // 弹幕库api
    // 监听手动输入的弹幕，保存到数据库
    // instance.value.on('artplayerPluginDanmuku:emit', (danmu) => {
    //     console.info('新增弹幕', danmu);
    // });

    // // 监听加载到的弹幕数组
    // instance.value.on('artplayerPluginDanmuku:loaded', (danmus) => {
    //     console.info('加载弹幕', danmus.length);
    // });

    // // 监听加载到弹幕的错误
    // instance.value.on('artplayerPluginDanmuku:error', (error) => {
    //     console.info('加载错误', error);
    // });

    // // 监听弹幕配置变化
    // instance.value.on('artplayerPluginDanmuku:config', (option) => {
    //     console.info('配置变化', option);
    // });

    // // 监听弹幕停止
    // instance.value.on('artplayerPluginDanmuku:stop', () => {
    //     console.info('弹幕停止');
    // });

    // // 监听弹幕开始
    // instance.value.on('artplayerPluginDanmuku:start', () => {
    //     console.info('弹幕开始');
    // });

    // // 监听弹幕隐藏
    // instance.value.on('artplayerPluginDanmuku:hide', () => {
    //     console.info('弹幕隐藏');
    // });

    // // 监听弹幕显示
    // instance.value.on('artplayerPluginDanmuku:show', () => {
    //     console.info('弹幕显示');
    // });

    // // 监听弹幕销毁
    // instance.value.on('artplayerPluginDanmuku:destroy', () => {
    //     console.info('弹幕销毁');
    // });
    document.querySelector(".art-contextmenu-version").remove();
});
onBeforeUnmount(() => {
    if (instance.value) {
        instance.value.destroy(false);
    }
});
</script>
<style>
.art-control-fullscreenWeb,.art-control-fullscreen{
    font-size: 18px !important;
}
</style>