<template>
  <header id="blog-head" class="">
    <nav id="z_nav" class="show">
      <span id="blog_name"><a id="site_name" href="#">Z`BLOG</a></span>
      <div id="search-button">
        <a class="site-page"
          ><i :class="['iconfont', 'icon-nav-search']"></i><span>搜索</span></a
        >
      </div>
      <ul id="nav_links">
        <li><router-link to="/">后台</router-link></li>
        <li><router-link to="/">后台</router-link></li>
        <li><router-link to="/">后台</router-link></li>
        <li><router-link to="/">后台</router-link></li>
        <li><router-link to="/">后台3</router-link></li>
      </ul>
      <div id="toggle-menu" @click="menucontrol">
        <a class="site-page"><i class="iconfont icon-menu2"></i></a>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      oldScrollTop: 0,
      activeIndex: "1",
      zblog: {
        title: "Z'Blog",
      },
      showmytell: "有人说你不好看，我二话不说给他买了只导盲犬！",
    };
  },
  mounted() {
    this.navscrolling();
  },
  methods: {
    navscrolling() {
      let that = this;
      let initTop = 0;
      let zheader = document.querySelector("#blog-head");
      window.addEventListener(
        "scroll",
        function () {
          const currentTop =
            document.body.scrollTop ||
            document.documentElement.scrollTop ||
            window.pageYOffset;
          let isDown = currentTop > initTop ? true : false; // true is down & false is up
          initTop = currentTop;
          if (currentTop > 56) {
            if (isDown) {
              if (zheader.classList.contains("nav-visible"))
                zheader.classList.remove("nav-visible");
            } else {
              if (!zheader.classList.contains("nav-visible"))
                zheader.classList.add("nav-visible");
            }
            zheader.classList.add("nav-fixed");
          } else {
            if (currentTop === 0) {
              zheader.classList.remove("nav-fixed", "nav-visible");
            }
          }
        },
        true
      );
    },
    menucontrol() {
      this.$store.dispatch("setSidebar");
    },
  },
};
</script>
<style lang="scss">
</style>