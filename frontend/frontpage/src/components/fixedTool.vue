<template>
  <!-- 右侧悬浮工具 -->
  <!-- <div id="fixed-tool">
    <div class="fixed-tool">
      <a class="tool-btn service-qq" @click="modelBrn">
        <i
          :class="[
            'btn',
            'iconfont',
            { 'icon-taiyang': dark },
            { 'icon-yueliang': !dark },
          ]"
        ></i>
      </a>
      <a class="tool-btn service-qq">
        <i class="iconfont icon-QQ"></i>
      </a>
      <a class="tool-btn service-qq" @click="muisLogin">
        <i class="iconfont icon-menu21"></i>
      </a>
      <a v-show="arrowup" class="tool-btn service-qq" @click="goTop">
        <i class="iconfont icon-arrowup"></i>
      </a>
    </div>
  </div> -->
  <div class="float-right round position-center scrolling-hide">
    <el-tooltip
        class="box-item"
        effect="dark"
        content="主题切换"
        placement="left"
      >
        <a @click="modelBrn" class="float-btn more-btn">
          <i :class="['iconfont',dark?'icon-taiyang':'icon-yueliang']"></i>
        </a>
    </el-tooltip>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="主题切换"
        placement="left"
      >
        <a class="float-btn more-btn">
          <i :class="['iconfont','icon-qr-code']"></i>
        </a>
    </el-tooltip>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="返回顶部"
        placement="left"
      >
        <a v-show="arrowup" class="float-btn more-btn" @click="goTop">
          <i :class="['iconfont','icon-arrowup']"></i>
        </a>
    </el-tooltip>
    <!-- <el-tooltip
        class="box-item"
        effect="dark"
        :content="v.title"
        placement="left" v-for="(v,i) in xx"
      >
        <a v-if="v.href!==''" :href="v.href" class="float-btn more-btn">{{ v.title }}</a>
        <a v-else class="float-btn more-btn">
          <i :class="['iconfont',v.icon]"></i>
        </a>
    </el-tooltip> -->
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "fixedTool",
  setup() {
    const store = useStore();
    const muisLogin = () => {
      // 2.3 提交B模块的修改
      store.commit("moduleBlog/set_IsLogin");
      if (store.getters["moduleBlog/IsLogin"]) {
        var blogPage=document.querySelector("#blog-page");
        var backdrop=document.createElement("div");
        backdrop.className="modal-backdrop fade in"
        blogPage.appendChild(backdrop)
        document.querySelector("body").className="modal-open"
      }
      console.log(document.querySelector("body").style)
    };
    const acisLogin = () => {
      // 2.4 调用模块B的actions
      store.dispatch("moduleBlog/change_IsLogin");
    };
    return {
      muisLogin,
      acisLogin,
    };
  },
  data() {
    return {
      dark: false,
      arrowup: false,
      xx:[
        {
          title:'主题切换',
          style:{
            color:'#fff',
            bg:'rgba(255,75,125,0.9)'
          },
          href:'',
          icon:'icon-yueliang'
        }
      ]
    };
  },
  created() {console.log(this.xx)},
  methods: {
    fun() {
      this.$store.commit("moduleBlog/set_IsLogin");
      // console.log(this.$store.getters.isLogin)
      console.log(this.$store.state.moduleBlog.isLogin);
    },
    goTop() {
      // 动画
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop =
          document.documentElement.scrollTop =
          top -=
            50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    modelBrn() {
      this.dark = !this.dark;
      if (this.dark) {
        window.document.documentElement.setAttribute("data-theme", "dark");
        document.getElementsByTagName('body')[0].className += ' dark-theme';
      } else {
        window.document.documentElement.setAttribute("data-theme", "light");
        document.getElementsByTagName('body')[0].classList.remove("dark-theme");
      }
    },
    gundong() {
      var dis =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (dis > 600) {
        this.arrowup = true;
      } else {
        this.arrowup = false;
      }
    },
  },
  mounted() {
    this.gundong();
    window.document.documentElement.setAttribute("data-theme", "light");
    window.addEventListener("scroll", this.gundong);
    // document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop >120 ?this.arrowup = true:this.arrowup = false;
  },
  destroyed() {
    window.removeEventListener("scroll", this.gundong);
  },
};
</script>
<style lang="scss">
.scroll-ing .scrolling-hide.float-right.position-center {
    transform: translate(200%, -50%);
}
// @import "/@/assets/style/scss/common/common";
.fixed-tool {
  position: fixed;
  bottom: 60px;
  right: 20px;
  z-index: 1030;
  text-align: center;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  transition: 0.3s;
  .tool-btn {
    margin-top: 6px;
    border-radius: 8px;
    width: 40px;
    line-height: 40px;
    display: block;
    font-size: 19.6px;
    // --this-color: var(--muted-2-color);
    // --this-bg: var(--float-btn-bg);
    // background: rgba(70, 70, 70, 0.4);
    // background: rgba(200,200,200,.4);
    // @include background_color("fixed-btn-bg");
    background-color: rgba(200,200,200,.4);
    // @include font_color("fixed-btn-color");
    color: #999;
    i {
      display: inline-block;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
    }
  }
}
</style>