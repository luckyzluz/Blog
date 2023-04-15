<template>
  <!-- 网站头部导航 -->
  <div id="header" class="header show-slide">
    <nav class="navbar navbar-top center">
      <div class="container-header container-fluid">
        <div class="navbar-header">
          <!-- logo -->
          <div class="navbar-brand">
            <a class="navbar-logo" href="">
              <img
                :src="state.web.WebData.webConfig.Logo"
                switch-src="static/picture/ZIBLL-LOGO-精简-白天.svg"
                alt="更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示"
                data-src=""
                class="ls-is-cached lazyloaded"
              />
            </a>
          </div>
        </div>
        <div class="collapse navbar-collapse">
          <menuList v-if="config.menu.place=='left'" />
          <!-- user&search -->
          <div class="navbar-form navbar-right">
            <ul class="list-inline splitters relative">
              <li>
                <a class="nav-search-btn btn">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-nav-search"></use>
                  </svg>
                </a>
              </li>
              <li class="relative">
                <a class="btn signin-loader" @click="openSign">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                  </svg>
                </a>
                <ul v-if="isLogin" class="sub-menu">
                  <div class="padding-10">
                    <div class="sub-user-box">
                      <div class="text-center">
                        <div>
                          <a class="but jb-red payvip-icon mt10 btn-block">
                          <svg class="em12 mr10" aria-hidden="true">
                            <use xlink:href="#icon-huangguan"></use>
                          </svg>
                        开通会员 尊享会员权益
                      </a>
                        </div>
                        <div class="flex jsa header-user-href">
                          <a class="signin-loader">
                            <div class="badg mb6 toggle-radius c-blue">
                              <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-user"></use>
                              </svg>
                            </div>
                            <div class="c-blue">登录</div>
                          </a>
                          <a class="signup-loader">
                            <div class="badg mb6 toggle-radius c-green">
                              <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-zhuce"></use>
                              </svg>
                            </div>
                            <div class="c-green">注册</div>
                          </a>
                          <a>
                            <div class="badg mb6 toggle-radius c-purple">
                              <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-jiesuo"></use>
                              </svg>
                            </div>
                            <div class="c-purple">找回密码</div>
                          </a>
                        </div>
                      </div>
                      <p class="social-separator separator muted-3-color em09 mt10">快速登录</p>
                      <div class="social_loginbar">
                        <a title="QQ登录" class="social-login-item qq toggle-radius">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-QQ"></use>
                          </svg>
                        </a>
                        <a title="微信登录"  class="social-login-item weixingzh toggle-radius">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-weixin1"></use>
                          </svg>
                        </a>
                        <a title="GitHub登录"  class="social-login-item github toggle-radius">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-github"></use>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </ul>
                <ul v-else class="sub-menu">
                  <div class="padding-10">
                    <ul class="sub-user-box">
                      <div class="user-info flex ac relative">
                        <a href="https://demo.zibll.com/author/2724">
                          <span class="avatar-img">
                            <img alt="wang wu的头像" src="src/assets/image/avatar-default.png" class="avatar lazyloaded">
                          </span>
                        </a>
                        <div class="user-right flex flex1 ac jsb ml10">
                          <div class="flex1" style="max-width: calc(100% - 40px);">
                            <b>
                              <span class="flex ac flex1">
                                <a class="text-ellipsis">
                                  wang wu
                                </a>
                                <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="LV1"
                                placement="top"
                              >
                                <img class="img-icon ml3" src="src/assets/image/user-level-1.png" />
                              </el-tooltip>
                              </span>
                          </b>
                          <div class="px12 muted-2-color text-ellipsis">
                            这家伙很懒，什么都没有写...
                          </div>
                          </div>
                        </div>
                        <a class="msg-news-icon abs-right">
                          <span class="toggle-radius msg-icon">
                            <i class="iconfont icon-xiaoxi"></i>
                          </span>
                          <span class="badge top">1</span>
                        </a>
                      </div>
                      <div class="mt10 em09" style="padding:2px;">
                        <a class="pay-vip but radius4 payvip-icon btn-block">
                          <svg class="icon em12 mr6" aria-hidden="true">
                            <use xlink:href="#icon-huangguan"></use>
                          </svg>
                          开通会员 尊享会员权益
                        </a>
                      </div>
                      <div class="em09 mt6" style="padding:2px;">
                        <a class="but block c-yellow initiate-checkin">
                          <i class="iconfont icon-qiandao"></i>
                          签到领取今日奖励
                        </a>
                      </div>
                      <div class="user-amount mt6" style="padding:2px;">
                        <div class="flex ab jsb col-ml6">
                          <!-- 余额 -->
                          <a href="" style="flex: 1;" class="muted-box padding-6 flex1">
                            <div class="muted-2-color px12">
                              余额
                              <i class="ml6 iconfont icon-arrowright em12"></i>
                            </div>
                            <div class="flex jsb">
                              <span class="font-bold c-blue-2">0</span>
                              <svg class="icon em14" aria-hidden="true">
                                <use xlink:href="#icon-money"></use>
                              </svg>
                            </div>
                          </a>
                          <!-- 积分 -->
                          <a href="" style="flex: 1;" class="muted-box padding-6 flex1">
                            <div class="muted-2-color px12">
                              积分
                              <i class="ml6 iconfont icon-arrowright em12"></i>
                            </div>
                            <div class="flex jsb">
                              <span class="font-bold c-yellow">25</span>
                              <svg class="icon em14" aria-hidden="true">
                                <use xlink:href="#icon-jinbi"></use>
                              </svg>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="em09 author-tag mb10 mt6 flex jc">
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="共0篇帖子"
                          placement="top"
                        >
                          <a class="but c-blue-2 tag-forum-post">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-wodetiezi"></use>
                          </svg>0
                        </a>
                        </el-tooltip>
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="共0篇文章"
                          placement="top"
                        >
                          <a class="but c-blue tag-posts">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-wendang"></use>
                          </svg>0
                        </a>
                        </el-tooltip>
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="共0条评论"
                          placement="top"
                        >
                          <a class="but c-green tag-comment">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xiaoxi1"></use>
                          </svg>0
                        </a>
                        </el-tooltip>
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="人气值 0"
                          placement="top"
                        >
                          <span class="badg c-red tag-view">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-redu"></use>
                          </svg>0
                        </span>
                        </el-tooltip>
                      </div>
                      <div class="relative opacity5">
                        <i class="line-form-line"></i>
                      </div>
                      
                      <!-- <el-divider /> -->
                      <div class="sub-user-box-center">
                        <div class="header-user-href">
                          <a href="" class="user-loader">
                            <div class="icon-radius">
                              <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-user"></use>
                              </svg>
                            </div>
                            <div>用户中心</div>
                          </a>
                          <a href="" class="start-new-posts">
                            <div class="icon-radius">
                              <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-editor"></use>
                              </svg>
                            </div>
                            <div>发布文章</div>
                          </a>
                          <a href="" class="signout">
                            <div class="icon-radius">
                              <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-tuichudenglu"></use>
                              </svg>
                            </div>
                            <div>退出登录</div>
                          </a>
                        </div>
                      </div>
                      
                    </ul>
                  </div>
                </ul>
              </li>
            </ul>
          </div>
          <div v-if="config.menu.place=='right'" class="navbar-form navbar-right">
            <menuList />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import menuList from "c/header/menuList.vue"
import { reactive,watch, watchEffect,onMounted,ref } from 'vue'
let {state,getters, dispatch,commit} = useStore();
let data = [
  {
    name: '购买主题',
    color:'c-blue',
    badge:{
      name: '优惠',
      color: 'jb-yellow'
    },
    submenu:[]
  },
  {
    name: '社区',
    color:'',
    badge:{
      name: 'NEW',
      color: 'jb-blue'
    },
    submenu:[]
  },
  {
    name: '官方演示',
    color:'',
    badge:{
      name: '',
      color: ''
    },
    submenu:[]
  },
  {
    name: '需求提交',
    color:'',
    badge:{
      name: '',
      color: ''
    },
    submenu:[]
  },
  {
    name: 'BUG反馈',
    color:'',
    badge:{
      name: '',
      color: ''
    },
    submenu:[]
  },
  {
    name: '主题教程',
    color:'',
    badge:{
      name: '',
      color: ''
    },
    submenu:[
      {
        name: '视频教程',
        color: '',
        badge: {
          name: 'NEW',
          color: 'jb-blue'
        }
      },
      {
        name: '文档检索',
        color: '',
        badge: {
          name: '',
          color: ''
        }
      },
      {
        name: '主题功能',
        color: '',
        badge: {
          name: '',
          color: ''
        }
      },
      {
        name: '配置教程',
        color: '',
        badge: {
          name: '',
          color: ''
        }
      }
    ]
  }
]
let isLogin=false;
const openSign = () => {
  dispatch("user/isShowSign");
}
let config={
  menu:{
    place:'left'
  }
}
</script>

<style lang="scss">
@import "@/styles/common.scss";
.body-scroll .header {
    box-shadow: 0 4px 10px var(--main-shadow);
}
.nav-fixed .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    -webkit-backdrop-filter: saturate(5) blur(20px);
    backdrop-filter: saturate(5) blur(20px);
}
.header {
  padding: 8px 20px;
  background: var(--header-bg);
  margin-bottom: 20px;
  transition: .3s;
  a:not(.but),  svg {
    color: var(--header-color);
  }
  .sub-menu {
    background: var(--main-bg-color);
    text-shadow: none;
  }
}
.navbar {
    position: relative;
    min-height: 50px;
    margin-bottom: 20px;
    border: 1px solid transparent;
}
.navbar-top {
  margin: 0;
  border-radius: 0!important;
  font-size: 15px;
  .navbar-brand {
    padding: 7px 10px;
  }
  .navbar-nav {
    margin-left: 20px;
    padding-left: 0;
  }
  .nav>li>a {
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 4px;
    display: inline-block!important;
    overflow: hidden;
  }
  .iconfont {
    transition: .2s;
  }
  .sub-menu li>a {
    white-space: nowrap;
    width: calc(100% + 1.4em);
    display: block;
    padding: 5px 10px;
    padding-right: 2em;
    transition: .3s;
    &:hover {
      transform: translateX(5px);
    }
  }
  li:hover>.sub-menu {
    visibility: unset;
  }
  .navbar-right {
    padding-right: 0;
  }
}


.navbar-brand {
  float: left;
  height: 50px;
  padding: 15px 15px;
  font-size: 18px;
  line-height: 20px;
}
.navbar-collapse {
  padding-right: 15px;
  padding-left: 15px;
  overflow-x: visible;
  border-top: 1px solid transparent;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%);
  -webkit-overflow-scrolling: touch;
}
.navbar-logo>img {
  height: 36px;
  padding: 0 30px;
}
.navbar-nav {
  li, li a {
    max-height: 50px;
    position: relative;
  }
  &>li:before {
    content: " ";
    position: absolute;
    width: 100%;
    top: -10px;
    background: var(--focus-color);
    height: 5px;
    border-radius: 0 0 15px 15px;
    opacity: 0;
  }
  &>li>a {
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 20px;
  }
  li:hover>a .icon-angledown {
    transform: rotate(-90deg);
  }
}
.navbar-top .badge, .badge.top {
    transform: translate(-5px,-10px) scale(.85);
    margin-right: -10px;
}
nav .icon-angledown {
    float: right;
    margin-top: 2px;
    margin-left: 6px;
}
.navbar-top .sub-menu, .theme-popover {
    visibility: hidden;
    position: absolute;
    min-width: 120px;
    background-color: var(--main-bg-color);
    padding: 10px 5px;
    z-index: 99;
    border-radius: var(--main-radius);
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
}
.hover-show .hover-show-con, .navbar-top .sub-menu, .theme-popover {
    opacity: 0;
    transform: translateY(6px);
    transition: .4s;
}
.header .dropdown-menu a, .header .sub-menu a, .header .sub-menu svg {
    color: var(--main-color);
}
.hover-show:hover .hover-show-con, .hover-show:hover~.hover-show-con, .hover-show:hover~.sub-menu, .navbar-top li:hover>.sub-menu {
    opacity: 1;
    transform: translateY(0);
}
.current-menu-item>a, .navbar-top .nav li a:focus, .navbar-top .nav li a:hover {
    background-color: transparent;
    color: var(--focus-color);
}

.navbar-top span.badge, span.badge.top {
    transform: translate(-5px,-10px) scale(.85);
    margin-right: -10px;
}
.header .dropdown-menu a, .header .sub-menu a, .header .sub-menu svg {
    color: var(--main-color);
}
// 导航右侧布局
.navbar-right~.navbar-right {
    padding-right: 5px;
}
.navbar-form {
    box-shadow: none;
}
.navbar-top .navbar-right .sub-menu {
    right: 0;
}
.list-inline {
    margin-left: 0;
}
.sub-user-box {
    width: 242px;
    word-break: break-word;
    white-space: normal;
    .payvip-icon {
      padding: 8px 0;
  }
  .msg-news-icon {
    top: .4em;
    right: 0;
  }
  .author-tag>* {
    max-height: 41px;
    overflow: hidden;
    flex: auto;
  }
}
.header-user-href{
  &>a {
    display: inline-block;
    padding: 10px 10px 0 10px;
    &:hover {
      opacity: .7;
    }
    div+div {
      font-size: 12px;
    }
  }
  .toggle-radius {
    width: 36px;
    height: 36px;
  }
}
.msg-news-icon {
  .toggle-radius {
    margin: 0!important;
  }
  .badge.top {
    transform: translate(-10px,-6px) scale(.85);
    margin-right: -10px;
  }
}

@media (min-width: 768px){
  .container-fluid>.navbar-collapse, .container-fluid>.navbar-header, .container>.navbar-collapse, .container>.navbar-header {
    margin-right: 0;
    margin-left: 0;
  }
  .navbar-header {
    float: left;
  }
  .navbar>.container .navbar-brand, .navbar>.container-fluid .navbar-brand {
    margin-left: -15px;
  }
  .navbar-collapse {
    width: auto;
    border-top: 0;
    box-shadow: none;
    &.collapse {
      display: block!important;
      height: auto!important;
      padding-bottom: 0;
      overflow: visible!important;
    }
  }
  .navbar-nav {
    float: left;
    margin: 0;
    &>li {
      float: left;
      &>a {
        padding-top: 15px;
        padding-bottom: 15px;
      }
    }
  }
  // 导航右侧布局
  .navbar-right~.navbar-right {
      margin-right: 0;
    }
}

#header {
  .navbar{
    .container-header {
      .navbar-collapse{
        .navbar-right {
          .list-inline {
            .sub-user-box{
              .user-loader{
                color: $c-blue-color;
                .icon-radius{
                  background: $c-blue-background;
                  .icon{
                    color: $c-blue-color;
                  }
                }
              }
              .start-new-posts{
                color: $c-green-color;
                .icon-radius{
                  background: $c-green-background;
                  .icon{
                    color: $c-green-color;
                  }
                }
              }
              .signout{
                color: $c-red-color;
                .icon-radius{
                  background: $c-red-background;
                  .icon{
                    color: $c-red-color;
                  }
                }
              }
            }
          }
        }
      }
    }

  }

}

</style>