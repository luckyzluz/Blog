<template>
  <div id="blog-page">
    <Head />
    <div class="box">
      <div style="overflow:hidden">
        <FeaturedNews />
      <Card />
      </div>
      <div class="clear"></div>
      <LatestPosts />
    </div>
    <FixedTool />
  <Login/>
  
  </div>
</template>
<script>
import FixedTool from "c/fixedTool.vue";
import Head from "v/blog/head.vue";
import FeaturedNews from "v/blog/featuredNews.vue";
import Card from "v/blog/myCard.vue";
import LatestPosts from "v/blog/LatestPosts.vue";
import Login from "v/blog/Login.vue";
export default {
  name: "blogPage",
  data() {
    return {
      hhhh: false,
      showList: {},
    };
  },
  components: {
    Head,
    FixedTool,
    FeaturedNews,
    Card,
    LatestPosts,
    Login
  },
  methods: {},
  mounted() {},
};
</script>

<style  lang="scss">
@import "../../assets/style/scss/blog.scss";
@import "../../assets/style/scss/blog-m.scss";
@import "../../assets/style/scss/common/common";
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #000;
    overflow-y: hidden;
}
.fade {
    opacity: 0;
    -webkit-transition: opacity .15s linear;
    -o-transition: opacity .15s linear;
    transition: opacity .15s linear;
}
.modal-backdrop.fade {
    filter: alpha(opacity=0);
    opacity: 0;
}
.fade.in {
    opacity: 1;
}
.modal-backdrop.in {
    filter: alpha(opacity=50);
    opacity: .5;
}
</style>