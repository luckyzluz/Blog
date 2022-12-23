<template>
  <div
    id="login"
    class="modal fade in"
    v-show="$store.getters['moduleBlog/IsLogin']"
  >
    <div class="sign-content">
      <div class="sign">
        <button class="close" @click="muisLogin">
          <i class="ic-close iconfont icon-off-search"></i>
        </button>
        <div class="sign-logo">
          <!-- https://img30.360buyimg.com/pop/jfs/t1/149566/34/23125/22225/620c7d32Ec4e152c8/7e9aeb8c952d0c9d.png -->
          <img src="../../assets/image/logo.png" alt="mxone" />
        </div>
        <div class="tab-content">
          <!-- 登录 -->
          <div :class="['tab-pane', { active: isUser }]" id="tab-sign-in">
            <div class="box-title">
              <div class="title-h-left">登录</div>
              <a @click="isuserExist">没有帐号？立即注册</a>
            </div>
            <div id="sign-in">
              <div class="tab-content">
                <!-- 登录（免密） -->
                <div class="tab-pane fade" id="tab-signin-nopas">
                  <form>
                    <div class="relative line-form mb10">
                      <input
                        change-show=".change-show"
                        type="text"
                        name="email"
                        class="line-form-input"
                        tabindex="1"
                        placeholder=""
                      /><i class="line-form-line"></i>
                      <div class="scale-placeholder">邮箱</div>
                    </div>
                    <div class="relative line-form mb10 change-show">
                      <input
                        type="text"
                        name="captch"
                        class="line-form-input"
                        autocomplete="off"
                        tabindex="2"
                        placeholder=""
                      /><i class="line-form-line"></i>
                      <div class="scale-placeholder">验证码</div>
                      <span class="yztx abs-right"
                        ><button
                          type="button"
                          form-action="signin_captcha"
                          class="but c-blue captchsubmit"
                        >
                          发送验证码
                        </button></span
                      >
                      <div class="abs-right match-ok muted-color">
                        <i class="fa-fw fa fa-check-circle"></i>
                      </div>
                      <span
                        ><input type="hidden" name="captcha_type" value="email"
                      /></span>
                    </div>
                    <div class="relative line-form mb10 em09">
                      <span class="muted-color form-checkbox"
                        ><input
                          type="checkbox"
                          id="remember2"
                          checked="checked"
                          tabindex="4"
                          name="remember"
                          value="forever"
                        /><label for="remember2" class="ml3"
                          >记住登录</label
                        ></span
                      ><span class="pull-right muted-2-color"
                        ><a
                          class="muted-2-color"
                          data-toggle="tab"
                          href="#tab-signin-pas"
                          aria-expanded="true"
                          >帐号密码登录</a
                        >
                      </span>
                    </div>
                    <div class="box-body">
                      <input
                        type="hidden"
                        name="action"
                        value="user_signin_nopas"
                      /><button
                        type="button"
                        class="
                          but
                          radius
                          jb-blue
                          padding-lg
                          signsubmit-loader
                          btn-block
                        "
                      >
                        <i class="fa fa-sign-in mr10"></i>登录
                      </button>
                    </div>
                  </form>
                </div>
                <!-- 登录（账号密码 -->
                <div
                  :class="['tab-pane', 'fade', { active: isUser }, 'in']"
                  id="tab-signin-pas"
                >
                  <form>
                    <div class="line-form">
                      <input
                        type="text"
                        name="username"
                        @blur="blurPrice($event)"
                        v-model="login.username"
                        class="line-form-input"
                        placeholder=""
                      /><i class="line-form-line"></i>
                      <div class="scale-placeholder">用户名或邮箱</div>
                    </div>
                    <div class="line-form">
                      <input
                        type="password"
                        name="password"
                        @blur="blurPrice($event)"
                        v-model="login.password"
                        class="line-form-input"
                        tabindex="2"
                        placeholder=""
                      />
                      <div class="scale-placeholder">登录密码</div>
                      <div class="passw">
                        <i
                          class="iconfont icon-mimashurukuang-yincangzhong"
                          @click="showpassword($event)"
                        ></i>
                      </div>
                      <i class="line-form-line"></i>
                    </div>
                    <div class="line-form form-checkbox">
                      <span
                        ><input
                          type="checkbox"
                          id="remember"
                          checked="checked"
                          name="remember"
                        /><label for="remember">记住登录</label></span
                      ><span class="pull-right"
                        ><a href="#">找回密码</a><span> | </span
                        ><a href="#tab-signin-nopas">免密登录</a>
                      </span>
                    </div>
                    <div class="submit-btn">
                      <button type="button" @click="bloglogin">
                        <i class="iconfont icon-login-full"></i>登录
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <p class="social-separator">社交帐号登录</p>
              <div class="social_loginbar">
                <a
                  title="GitHub登录"
                  href="https://www.nesxc.com/oauth/github?rurl=https://www.nesxc.com/"
                  class="social-login-item github button-lg"
                  ><i class="iconfont icon-github-fill fa fa-github"></i
                  >GitHub登录</a
                ><a
                  title="码云登录"
                  href="https://www.nesxc.com/oauth/gitee?rurl=https://www.nesxc.com/"
                  class="social-login-item gitee button-lg"
                >
                  <i class="iconfont icon-mayun"></i>
                  <!-- <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-gitee"></use></svg
                    > -->
                  码云登录</a
                ><a
                  title="百度登录"
                  href="https://www.nesxc.com/oauth/baidu?rurl=https://www.nesxc.com/"
                  class="social-login-item baidu button-lg"
                >
                  <i class="iconfont icon-BaiDu"></i>
                  <!-- <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-baidu"></use></svg
                    > -->
                  百度登录</a
                ><a
                  title="支付宝登录"
                  href="https://www.nesxc.com/oauth/alipay?rurl=https://www.nesxc.com/"
                  class="social-login-item alipay button-lg"
                >
                  <i class="iconfont icon-zhifubaozhifu"></i>
                  <!-- <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-alipay"></use></svg
                    > -->
                  支付宝登录</a
                >
              </div>
              <div class="declare">
                使用社交帐号登录即表示同意<a target="_blank" href="#"
                  >用户协议</a
                >、<a target="_blank" href="#">隐私声明</a>
              </div>
            </div>
          </div>
          <!-- 注册 -->
          <div :class="['tab-pane', { active: !isUser }]" id="tab-sign-up">
            <div class="box-title">
              <div class="title-h-left">注册</div>
              <a @click="isuserExist">已有帐号，立即登录</a>
            </div>
            <form id="sign-up">
              <div class="line-form">
                <input
                  type="text"
                  name="name"
                  v-model="reg.username"
                  class="line-form-input"
                  @blur="blurPrice($event)"
                  placeholder=""
                /><i class="line-form-line"></i>
                <div class="scale-placeholder">设置用户名</div>
              </div>
              <div class="line-form">
                <input
                  type="text"
                  name="email"
                  v-model="reg.email"
                  class="line-form-input"
                  @blur="
                    blurPrice($event);
                    emailtest($event);
                  "
                  placeholder=""
                /><i class="line-form-line"></i>
                <div class="scale-placeholder">邮箱</div>
              </div>
              <div class="line-form change-show">
                <input
                  type="text"
                  name="captch"
                  class="line-form-input"
                  @blur="blurPrice($event)"
                  placeholder=""
                  v-model="reg.code"
                /><i class="line-form-line"></i>
                <div class="scale-placeholder">验证码</div>
                <span class="yztxt"
                  ><button type="button" @click="regemail" class="captchsubmit">
                    发送验证码
                  </button></span
                >
              </div>
              <div class="line-form">
                <input
                  type="password"
                  name="password2"
                  class="line-form-input"
                  v-model="reg.password"
                  @blur="blurPrice($event)"
                  placeholder=""
                />
                <div class="scale-placeholder">设置密码</div>
                <div class="passw">
                  <i
                    class="iconfont icon-mimashurukuang-yincangzhong"
                    @click="showpassword($event)"
                  ></i>
                </div>
                <i class="line-form-line"></i>
              </div>
              <div class="submit-btn">
                <input type="hidden" name="action" value="user_signup" /><button
                  type="button"
                  @click="blogreg"
                >
                  <i class="iconfont icon-zhuce"></i>
                  注册
                </button>
                <div class="declare">
                  注册即表示同意<a target="_blank" href="#">用户协议</a>、<a
                    target="_blank"
                    href="#"
                    >隐私声明</a
                  >
                </div>
              </div>
            </form>
          </div>
          <li class="hide">
            <a href="#tab-slidercaptcha" data-toggle="tab"></a>
          </li>
          <div class="tab-pane fade slidercaptcha-tab" id="tab-slidercaptcha">
            <div style="width: 270px; margin: auto; margin-bottom: 20px">
              <div class="title-h-left fa-2x">安全验证</div>
              <a
                class="muted-2-color px12 slidercaptcha-back"
                data-toggle="tab"
                href="javascript:;"
                style="display: none"
                ><i class="fa fa-angle-left mr6"></i><text>返回上一级</text></a
              >
            </div>
            <div class="slidercaptcha">
              <div style="padding: 10px">
                <p class="placeholder" style="height: 135px"></p>
                <div class="placeholder" style="height: 42px"></div>
              </div>
            </div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import { useStore } from "vuex";
import storage from "./../../utils/storage";
export default {
  name: "Login",
  setup() {
    const store = useStore();
    const muisLogin = () => {
      // 2.3 提交B模块的修改
      store.commit("moduleBlog/set_IsLogin");
      if (!store.getters["moduleBlog/IsLogin"]) {
        var blogPage = document.querySelector("#blog-page");
        var backdrop = document.querySelector(".modal-backdrop");
        // backdrop.className="modal-backdrop fade in"

        blogPage.removeChild(backdrop);
        blogPage;
        document.querySelector("body").classList.remove("modal-open");
      }
    };
    return {
      muisLogin,
    };
  },
  data() {
    return {
      isUser: true,
      login: {
        username: "",
        password: "",
        email: "",
      },
      reg: {
        username: "",
        password: "",
        email: "",
        code: "",
      },
    };
  },
  //   watch:{
  //     user: {
  //             handler: function(newVal, oldVal) {
  //                 // console.log("newVal:", newVal,"oldVal:", oldVal);
  //             },
  //             deep: true,
  //             immediate: false//首次不执行
  //         },
  //     "user.username": function(newVal, oldVal) {
  //       // TO DO
  //       if(newVal){
  //   // console.log(e.target.parentNode.querySelector(".scale-placeholder"))
  //   e.target.parentNode.querySelector(".scale-placeholder").classList.add("is-focus")
  // }else{
  //   e.target.parentNode.querySelector(".scale-placeholder").classList.remove("is-focus")
  // }
  //     }
  //   },
  methods: {
    emailtest(email) {
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      const changeshow = email.target.parentNode.nextElementSibling;
      console.log(changeshow);
      if (reg.test(email.target.value)) {
        changeshow.style.display = "block";
      }
    },
    isuserExist() {
      this.isUser = !this.isUser;
      // console.log(this.isUser)
    },
    focusPrice(e) {
      //文本聚焦事件
      // console.log(e.target.value)
    },
    blurPrice(e) {
      //文本失焦事件
      if (e.target.value) {
        // console.log(e.target.parentNode.querySelector(".scale-placeholder"))
        e.target.parentNode
          .querySelector(".scale-placeholder")
          .classList.add("is-focus");
      } else {
        e.target.parentNode
          .querySelector(".scale-placeholder")
          .classList.remove("is-focus");
      }
    },
    bloglogin() {
      this.$api.login({ user: this.login }).then((res) => {
        let token = res.data.token;
        token.refresh_token = `Bearer ${token.refresh_token}`;
        storage.setItem("token", token);
      });
    },
    blogreg() {
      this.$api.reguser({ user: this.reg }).then((res) => {
        console.log(res.data);
      });
    },
    regemail(){
      this.$api.regemail({ user: this.reg }).then((res) => {
        console.log(res.data);
      });
    },
    showpassword(e) {
      // e.target.classList.remove("iconfont")
      if (e.target.parentNode.parentNode.firstChild.type == "password") {
        e.target.parentNode.parentNode.firstChild.setAttribute("type", "text");
        e.target.classList.remove("icon-mimashurukuang-yincangzhong");
        e.target.classList.add("icon-mimashurukuang-xianshizhong");
      } else {
        e.target.parentNode.parentNode.firstChild.setAttribute(
          "type",
          "password"
        );
        e.target.classList.remove("icon-mimashurukuang-xianshizhong");
        e.target.classList.add("icon-mimashurukuang-yincangzhong");
      }
    }
  },
};
</script>
<style >
@import "./xx.css";
</style>