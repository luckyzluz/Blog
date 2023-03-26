<template>
  <div id="blog-page">
    <Head />
    <div class="box">
<router-view/>
    </div>
    <FixedTool />
  </div>
</template>
<script>
import FixedTool from "c/fixedTool.vue";
import Head from "v/blog/head.vue";
import Index from "v/blog/index.vue";
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
    FixedTool
  },
  methods: {
  },
  mounted() {
      
  },
};
</script>

<style  lang="scss">
@import "../../assets/style/scss/blog.scss";
@import "../../assets/style/scss/blog-m.scss";
@import "../../assets/style/scss/common/common";

</style>