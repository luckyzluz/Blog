<template>
    <div class="slider">
      <!-- :Data="home.slider" -->
        <Slider  />
    </div>
    <Articlemini />
    <Aggregation />
    <HomeTabCon />
    <!-- <Test /> -->
</template>
<script setup>
import Slider from 'c/Slider.vue'
import Articlemini from 'c/articlemini.vue'
import Aggregation from 'c/aggregation.vue'
import HomeTabCon from 'c/homeTabCon.vue'


// import Test from '@/views/test.vue'
import { reactive,watch, watchEffect,onMounted,getCurrentInstance } from 'vue'
import { useStore } from "vuex";
let {state,getters, dispatch,commit} = useStore();
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
  // console.log(getters['web/getWebData'])
  // proxy.$api.getBlogConfig().then((res)=>{
  //   // console.log(res.data.data);getters.web.getWebData()
  //   home = res.data.data;
  //   console.log(home)
  // })
})
</script>
<style lang="scss">
.slider{
    // height: 500px;
    margin-bottom: 20px;
    position: relative;
}
</style>
