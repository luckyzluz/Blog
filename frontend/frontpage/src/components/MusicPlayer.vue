<template>
    <!-- 音乐悬浮播放器 -->
    <div id="music-player">
			<div class="music-player-container">
				<div class="music-player-left">
					<ul>
                        <li>
                            <span>09</span>
                            <span>35</span>
                        </li>
						<li>
							<svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-menu2"></use>
                            </svg>
						</li>
						<li>
							<svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-sort"></use>
                            </svg>
						</li>
                        <li>
							<svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-sort"></use>
                            </svg>
						</li>
                        <li>
							<svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-sort"></use>
                            </svg>
						</li>
					</ul>
				</div>
				<div class="music-player-right">
                    <div class="music-player-controlpanel">
                        <div class="music-player-header">
                        <div class="music-title" ref="music_name"></div>
                        <div class="music-author" ref="music_artist"></div>
                    </div>
                    <i class="music-player-line"></i>
                    <div class="music-player-body">
                        <div class="music-player-icons">
                            <span @click="randomPlay">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-xihuan1"></use>
                                </svg>
                            </span>
                            <span @click="changeMode">
                                <svg class="icon" aria-hidden="true">
                                    <use ref="playModeBtn" xlink:href="#icon-a-27Gxunhuanbofang"></use>
                                </svg>
                            </span>
                            <span>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-24gf-playlist4"></use>
                                </svg>
                            </span>
                            <span @click="xxx">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-shujuyewu"></use>
                                </svg>
                            </span>
                        </div>
                        <div class="progress-area" ref="progressArea" @click="changeProgress">
                            <div class="progress-bar" ref="progress" ></div>
                            <audio @pause="onPause" @play="onPlay" @canplay="onLoadedmetadata" @timeupdate="getCurr" id="music-audio" ref="music_audio" src="../ll"></audio>
                        </div>
                        <div class="timer">
                                <span class="current">{{ toTime(MusiccurrentTime) }}</span>
                                <span class="duration">{{ toTime(Musicduration) }}</span>
                        </div>
                        <div class="music-player-controlicon">
                            <span @click="lastMusic">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-shangyishou"></use>
                                </svg>
                            </span>
                            <span @click="playing?pauseMusic():playMusic()">
                                <svg class="icon"  aria-hidden="true">
                                    <use ref="playstate_icon"  xlink:href="#icon-arrow-"></use>
                                </svg>
                            </span>
                            <span @click="nextMusic">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-audio-up"></use>
                                </svg>
                            </span>
                        </div>
                    </div>
                    </div>
                    <div class="music-player-info">
                        <!-- 歌词 -->
                        <div class="music-lyric"></div>
                        <div class="music-image">
                            <img ref="music_image" src="" alt="">
                            <span class="msk"></span>
                            <!-- https://p1.music.126.net/oNshL9M-JJDis6toIrfz6g==/109951165960217286.jpg -->
                        </div>
                        <!--  -->
                    </div>
				</div>
			</div>
		</div>
</template>
<script setup> 
import { reactive,watch, watchEffect,onMounted,onUpdated,onBeforeUnmount,onUnmounted,ref } from 'vue'
const playstate_icon = ref(null); // 播放状态按钮
const music_name = ref(null); // 歌曲名称
const music_image = ref(null); // 歌曲图片
const music_audio = ref(null); // 歌曲音频
const music_artist = ref(null); // 歌曲作者
const playModeBtn=ref(null); // 循环按钮

let playing= false; // 默认暂停状态
let volumes = ref(70); // 歌曲音量
let Musicduration =ref(); // 歌曲总时间
let MusiccurrentTime = ref(); // 当前时间
let playModes=[
        {
            index:0,
            name:'repeat_order',
            title:'列表循环',
            icon:'#icon-a-27Gxunhuanbofang'
        },
        {
            index:1,
            name:'repeat_one',
            title:'单曲循环',
            icon:'#icon-danquxunhuan'
        },
        {
            index:2,
            name:'repeat_random',
            title:'列表随机',
            icon:'#icon-xunhuanbofang'
        }
    ]
let playedMusicList=[];
let playMode=2;
let progress = ref(null); // 进度条进度
let progressArea=ref(null);
let Playingnum=ref(1); // 当前播放id
const xxx=()=>{
    // let yy= document.querySelector('#music-audio');
    console.log(obj)
    // music_audio.value.play(); 
}

let obj = reactive({Playingnum:1});


// obj['Playingnum']=Playingnum.value;
const io=()=>{
    localStorage.setItem('MusicPlayer', JSON.stringify(obj))
}
onMounted(()=>{
    if(JSON.parse(localStorage.getItem('MusicPlayer'))!==null){
        obj = JSON.parse(localStorage.getItem('MusicPlayer'));
        Playingnum.value=obj.Playingnum;
    }
    loadMusic(Playingnum.value);
    // 离开刷新页面保存最后播放歌曲
    window.addEventListener("beforeunload",io);
    // playedMusicList.push(Playingnum.value);
    // localStorage.setItem('MusicPlayer', JSON.stringify(obj));
    // 请求相关数据
})

onBeforeUnmount(()=>{
    // localStorage.setItem('MusicPlayer', JSON.stringify(obj))
})

//单独监听,如监听num
watch(() => Playingnum.value, (newNum, prevNum) => {
    // loadMusic(playerConfig.index);currentTime
    // console.log(playedMusicList);
    console.log(newNum, prevNum)
    obj['Playingnum']=Playingnum.value;
    pauseMusic();
    playedMusicList.push(Playingnum.value);
    loadMusic(Playingnum.value);
    playMusic();
    // ,{deep:true}
})
// 音乐列表
let MusicList = reactive([
{
        name:"断桥残雪",
        artist:"许嵩",
        img:"music-1",
        src:"duanqiaocanxue"
    },
    {
        name:"黄昏",
        artist:"周传雄",
        img:"music-2",
        src:"huanghun"
    },
    {
        name:"寂寞沙洲冷",
        artist:"周传雄",
        img:"music-3",
        src:"jimo"
    },
    {
        name:"清明雨上",
        artist:"许嵩",
        img:"music-4",
        src:"duanqiaocanxue"
    },
])
// 加载音乐信息
const loadMusic = (indexNumb) => {
    music_name.value.innerText =MusicList[indexNumb - 1].name;
    music_image.value.src=`../src/assets/music/images/${MusicList[indexNumb - 1].img}.jpg`;
    music_artist.value.innerText=MusicList[indexNumb - 1].artist;
    music_audio.value.src=`../src/assets/music/songs/${MusicList[indexNumb - 1].src}.mp3`;
    // console.log(music_name)
}
// 加载总时长
const onLoadedmetadata= ()=>{
    Musicduration.value = parseInt(music_audio.value.duration);
    // console.log((music_audio.value.duration));
    // 默认声音70%
    // volumes.value = parseInt(audio.value.volume) * 70
}
// 获取当前播放时间
const getCurr =()=>{
    MusiccurrentTime.value = parseInt(music_audio.value.currentTime)
    progress.value.style = `width:${MusiccurrentTime.value / Musicduration.value * 100}%;`;
    MusiccurrentTime.value == Musicduration.value ? nextMusic() : '';
}
// 进度条操作
const changeProgress=(event)=>{ //
    music_audio.value.currentTime = (event.offsetX/progressArea.value.clientWidth)*music_audio.value.duration;
}
// 切换播放方式
const changeMode=()=>{
    // let mode=['#icon-a-27Gxunhuanbofang','#icon-xunhuanbofang','#icon-danquxunhuan'];
    ++playMode < playModes.length ? '' : playMode = 0;
    console.log(playMode);
    // console.log(playModeBtn.value.attributes[0].value)
}
// 循环模式
const ccc=()=>{
    
    playMode=='repeat_order'?'#icon-a-27Gxunhuanbofang':playMode=='repeat_one'?'#icon-danquxunhuan':'#icon-xunhuanbofang'
}
// 音乐播放
const playMusic = () => {
    playstate_icon.value.attributes[0].value = '#icon-zanting';
    music_image.value.parentNode.style.animationPlayState="running";
    music_audio.value.play(); 
}
// 音乐暂停
const pauseMusic=()=>{
    playstate_icon.value.attributes[0].value = '#icon-arrow-';
    music_image.value.parentNode.style.animationPlayState="paused";
    music_audio.value.pause();
}
// 下一首
const nextMusic = () => {
    switch (playMode) {
        case 0:
            ++Playingnum.value > MusicList.length ? Playingnum.value=1 : '';
            break;
        case 1:
            ++Playingnum.value > MusicList.length ? Playingnum.value=1 : '';
            break;
        case 2:
            randomPlayNum();
            break;
        default:
            ++Playingnum.value > MusicList.length ? Playingnum.value=1 : '';
            break;
    }
    // console.log(playedMusicList)
}
// 上一首
const lastMusic = () => {
    --Playingnum.value < 1 ? Playingnum.value=MusicList.length : '';
}
const randomPlayNum=()=>{
    let randIndex;
    do{
        randIndex=Math.floor((Math.random() * MusicList.length)+1);
    }while(Playingnum.value==randIndex);
    Playingnum.value=randIndex;
    // console.log(Playingnum)
}
// 时间格式转化
const toTime = (sec) => { //秒数转化为mm:ss形式
    let s = sec % 60 < 10 ? ('0' + sec % 60) : sec % 60
    let min = Math.floor(sec / 60) < 10 ? ('0' + Math.floor(sec / 60)) : Math.floor(sec / 60)
    if (!isNaN(s)) {
      return min + ':' + s
    } else {
      return "00" + ':' + "00"
    }
    // console.log(min +" "+ s);


}
//是否暂停状态
const onPause = () => {
    playing = false;
}
//是否播放状态
const onPlay = () => {
playing = true;
}
</script>
<style lang="scss">
#music-player{
    position: fixed;
    bottom: 0;
    left: -640px;
    z-index: 5555;
}
.music-player-container{
    background: #2b2a2f;
    width: 640px;
    height: 240px;
    overflow: hidden;
    border-radius: 8px;
    color: #fff;
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    min-width: 0; 
    font-size: 27px
}
.music-player-left{
    width: 48px;
    background: #000;
    svg{
        font-size: 20px;
        color: #fff;
    }
    ul{
        display: flex;
        height: 100%;
        flex-direction: column ;
        justify-content: flex-end;
        li{
            &:first-child{
                span{
                    font-size: 9px;
                    display: block;
                    &:first-child{
                        margin-bottom: -4px;
                    }
                }
            }
            text-align: center;
            margin: 3px 0;
        }
    }
}
.music-player-right{
    width: 592px;
    display: flex;
    flex-direction: row;
    margin-left: 30px;
    .music-player-controlpanel{
        width: 294px;
        margin: 18px 0;
        .music-player-header{
            .music-title{
                font-size: 16px;
            }
            .music-author{
                font-size: 10px;
                color: #8d8c92;
            }
        }
        .music-player-line{
            display: block;
            height: 2px;
            width: 100%;
            background: #000;
            // box-shadow: 0 1px #26252b;
            box-shadow: 0 0 3px 1.5px #26252b;
            margin: 4px 0 12px 0;
        }
        .music-player-body{
            .music-player-icons{
                margin: 0 22px;
                span{
                    // margin: 0 25px;
                    margin-right: 50px;
                    font-size: 25px;
                    font-weight: 700;
                    &:last-child{
                        margin-right: 0;
                    }
                    svg{
                        font-weight: 700;
                    }
                }
            }
            .progress-area {
                margin-top: 14px;
                height: 4px;
                width: 100%;
                background: #000;
                border-radius: 50px;
                cursor: pointer;
                .progress-bar {
                    height: inherit;
                    width: 0%;
                    position: relative;
                    border-radius: inherit;
                    background: #fff;
                    // linear-gradient(90deg,blue 0%,var(--violet) 100%)
                    &::before {
                        content: '';
                        position: absolute;
                        height: 4px;
                        width: 4px;
                        background-color: transparent;
                        border-radius: inherit;
                        top: 50%;
                        right: -8px;
                        border: 4px solid #fff;
                        transform: translateY(-50%);
                        // background: inherit;
                        // box-shadow: 10px 10px 5px #fff;
                        opacity: 0;
                        // margin: 1px; 
                        transition: opacity 0.2s ease;
                    }
                }
                &:hover {
                        .progress-bar::before{
                            opacity: 1;
                        }
                }
            }
            .timer {
                    margin-top: 2px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    span {
                    font-size: 13px;
                    color: #fff;
                }
                }
            .music-player-controlicon{
                margin-top: 30px;
                display: flex;
                justify-content: center;
                text-align: center;
                // vertical-align: center;
                span{
                    width: 60px;
                    height: 60px;
                    text-align: center;
                    border-radius: 50%;
                    background: #2c2b31;
                    line-height: 60px;
                    box-shadow: 0px 0px 5px #fff;
                    margin-right: 25px;
                    font-size: 18px;
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
        }
    }
    .music-player-info{
        margin: 22px 36px;
        .music-lyric{
            display: none;
        }
        .music-image{
            position: relative;
            width: 197px;
            height: 196px;
            border-radius: 50%;
            box-shadow: 0 0 0 16px rgba(0,0,0,0.16);
            animation: turn 3s linear infinite;
            animation-play-state: paused; // paused|running
            &::before{
                content: '';
                display: block;
                width: 116%;
                height: 116%;
                border-radius: 50%;
                position: absolute;
                top: -13px;
                left: -16px;
                box-shadow: 0 0 11px rgba(0,0,0,0.5),0 0 20px rgba(255,255,255,0.5);
                filter:blur(10px);
            }
            text-align:center;
            img{
                position: absolute;
                width: 130px;
                height: 130px;
                display: block;
                top: 17%;
                left: 18%;
            }
            .msk{
                width: 206px;
                position: absolute;
                height: 205px;
                display: block;
                top: -2%;
                left: -2%;
                background: url(../assets/image/musicPlayer/singlecover.png) no-repeat;
            }
        }
    }
}
@keyframes turn {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(90deg);
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(270deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>