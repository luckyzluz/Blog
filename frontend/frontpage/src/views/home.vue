<template>
    <div class="slider">
        <Slider :Data="home.slider" />
    </div>
</template>
<script setup>
import Slider from 'c/Slider.vue'
import { reactive,watch, watchEffect,onMounted,getCurrentInstance } from 'vue'
const {proxy} = getCurrentInstance();
let home= reactive({
  slider: [
    {
      title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
      url:'http://baidu.com',
      imgUrl: 'src/assets/image/slider/社区论坛-幻灯片1.jpg'
    }
  ]
})
onMounted(()=>{
  proxy.$api.getSlider().then((res)=>{
    // console.log(res.data.data);
    home.slider = [...res.data.data];
  })
})
</script>
<style lang="scss">
.slider{
    // height: 500px;
    margin-bottom: 20px;
    position: relative;
}
</style>
