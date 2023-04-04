<template>
  <Artplayer @get-instance="getInstance" :option="option" :style="style" :ads="ads" :danmuku="danmuku" :subtitle="subtitle" :test="false" />
</template>
<!--  -->
<script setup>
import Artplayer from './AirPlayer.vue';
let option= {
  // url: 'https://r16---sn-2x3een76.c.2mdn.net/videoplayback/id/c1e292e1c1701f0e/itag/343/source/web_video_ads/ctier/L/acao/yes/ip/0.0.0.0/ipbits/0/expire/3804422295/sparams/acao,ctier,expire,id,ip,ipbits,ipbypass,itag,mh,mip,mm,mn,ms,mv,mvi,pl,source/signature/3B63F046E06C0A78798BEF91E68C3F894826171F.6C1B337A52B9667E66864E3A20BFC1F6EFB7B95E/key/cms1/mh/zp/pl/15/redirect_counter/1/rm/sn-2x3ld7l/req_id/3abc51b985aaa3ee/cms_redirect/yes/ipbypass/yes/mip/123.138.44.57/mm/42/mn/sn-2x3een76/ms/onc/mt/1667265896/mv/m/mvi/16?file=file.mp4'
  url:'https://vip.lz-cdn.com/20220606/17379_0df2db27/index.m3u8'
}

let ads={
  // type:'img',
  // img:'https://img14.360buyimg.com/ddimg/jfs/t1/150492/36/14386/1170832/5ffaf2afEa91ce8f4/bfc4ad14c4eb85e9.jpg',
  // video: 'https://wallpaper-static.cheetahfun.com/wallpaper/sites/dynamics/vm1.mp4',
  // url:'http://www.baidu.com'
}
let danmuku={
  // url:'src/assets/video/danmuku/danmuku-v2.xml'
}
let subtitle={
  // url: 'src/assets/video/subtitle/subtitle.srt', // 字幕地址
  // style: {
  //   color: '#03A9F4',
  //   'font-size': '30px',
  // }
}
let style= {
  width: '600px',
  height: '400px',
  margin: '60px auto 0',
}
const getInstance = (art) => {
  console.log(art);
}
</script>