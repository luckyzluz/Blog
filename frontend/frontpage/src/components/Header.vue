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
            <ul class="list-inline">
              <li>
                <a class="nav-search-btn btn">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-nav-search"></use>
                  </svg>
                </a>
              </li>
              <li>
                <a class="btn signin-loader" @click="openSign">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                  </svg>
                </a>
                <ul v-if="isLogin" class="sub-user-box">
                  <div class="sub-user-box-center">
                    <a href="" class=" payvip-icon">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huangguan"></use>
                      </svg>
                      开通会员 尊享会员权益
                    </a>
                    <div class="header-user-href">
                      <a href="" class="signin-loader">
                        <div class="icon-radius c-blue">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-user"></use>
                          </svg>
                        </div>
                        <div>登录</div>
                      </a>
                      <a href="" class="signup-loader">
                        <div class="icon-radius">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-zhuce"></use>
                          </svg>
                        </div>
                        <div>注册</div>
                      </a>
                      <a href="" class="findpwd-loader">
                        <div class="icon-radius">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiesuo"></use>
                          </svg>
                        </div>
                        <div>找回密码</div>
                      </a>
                    </div>
                  </div>
                  <p class="social-separator">快速登录</p>
                  <div class="social_loginbar">
                    <a title="QQ登录" class="social-login-item qq">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-QQ"></use>
                      </svg>
                    </a>
                    <a title="微信登录"  class="social-login-item weixingzh">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixin1"></use>
                      </svg>
                    </a>
                    <a title="GitHub登录"  class="social-login-item github">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-github"></use>
                      </svg>
                    </a>
                  </div>
                </ul>
                <ul v-else class="sub-user-box">
                  <div class="user-info">
                    <a href="https://demo.zibll.com/author/2724">
                      <span class="avatar-img">
                        <img alt="wang wu的头像-Wordpress主题模板-zibll子比主题官方演示" src="//demo.zibll.com/wp-content/themes/zibll/img/avatar-default.png" data-src="//demo.zibll.com/wp-content/themes/zibll/img/avatar-default.png" class="avatar avatar-id-2724 ls-is-cached lazyloaded">
                      </span>
                    </a>
                    <div class="user-right">
                      <div>
                        <b>
                        <a class="text-ellipsis">
                          wang wu
                        </a>
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="LV1"
                          placement="top"
                        >
                        <img class="img-icon" src="https://demo.zibll.com/wp-content/themes/zibll/img/user-level-1.png" />
                      </el-tooltip>
                        
                      </b>
                      <div class="text-ellipsis user-profile">
                        这家伙很懒，什么都没有写...
                      </div>
                      </div>
                    </div>
                    <a class="msg-news-icon">
                      <span class="msg-icon">
                        <i class="iconfont icon-xiaoxi"></i>
                      </span>
                    </a>
                  </div>
                  <a href="" class=" payvip-icon">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huangguan"></use>
                      </svg>
                      开通会员 尊享会员权益
                    </a>
                  <a class="initiate-checkin">
                    <i class="iconfont icon-qiandao"></i>
                     签到领取今日奖励
                  </a>
                  <div class="user-amount">
                    <!-- 余额 -->
                    <a>
                      <div>余额
                        <i class="iconfont icon-arrowright"></i>
                      </div>
                      <div class="specific-value">
                        <span>0</span>
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-money"></use>
                        </svg>
                      </div>
                    </a>
                    <!-- 积分 -->
                    <a>
                      <div>积分
                        <i class="iconfont icon-arrowright"></i>
                      </div>
                      <div class="specific-value">
                        <span>25</span>
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-jinbi"></use>
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div class="user-tag">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="共0篇帖子"
                      placement="top"
                    >
                      <a class="tag-forum-post">
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
                      <a class="tag-posts">
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
                      <a class="tag-comment">
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
                      <a class="tag-view">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-redu"></use>
                      </svg>0
                    </a>
                    </el-tooltip>
                  </div>
                  <!-- <i class="line-form-line"></i> -->
                  <el-divider />
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
              </li>
            </ul>
          </div>
          <div v-if="config.menu.place=='right'" class="navbar-right">
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
let isLogin=true;
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
}
.container-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.container-header{
  max-width: 1380px;
  max-width: calc(var(--mian-max-width) + 180px);
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
}

#header {
  .navbar{
    .container-header {
      .navbar-collapse{
        .navbar-nav {
          &>li {
            &:hover{
              &>.sub-menu {
                visibility: unset;
                opacity: 1;
                transform: translateY(0);
              }
            }
            .sub-menu {
              visibility: hidden;
              position: absolute;
              min-width: 120px;
              @include background_color('main-bg-color');
              padding: 10px 5px;
              z-index: 99;
              border-radius: $main-radius;
              box-shadow: 0 0 10px rgb(0 0 0 / 10%);
              text-shadow: none;
              opacity: 0;
              transform: translateY(6px);
              transition: .4s;
              li>a{
                white-space: nowrap;
                width: calc(100% + 1.4em);
                display: block;
                padding: 5px 10px;
                padding-right: 2em;
                transition: .3s;
                &:hover {
                  transform: translateX(5px);
                }
                .badge, .badge.top {
                  transform: translate(-5px,-8px) scale(.85);
                  margin-right: -10px;
                }
              }
              svg {
                @include font_color('main-color');
              }
            }
          }

        }
        .navbar-right {
          float: right!important;
          padding-right: 5px;
          margin-right: 0;
          width: auto;
          padding-top: 0;
          padding-bottom: 0;
          margin-left: 0;
          border: 0;
          padding: 0px 5px 0px 15px;
          margin-top: 8px;
          margin-bottom: 8px;
          box-shadow: none;
          .list-inline {
            position: relative;
            padding-left: 0;
            list-style: none;
            margin-left: 0;
            &>li {
              display: inline-block;
              padding-right: 5px;
              padding-left: 5px;
              vertical-align: middle;
              &:hover>.sub-user-box {
                visibility: unset;
                opacity: 1;
                transform: translateY(0);
              }
              &:nth-child(2){
                position: relative;
                &:before {
                  content: "";
                  width: 1px;
                  height: 1.1em;
                  position: absolute;
                  display: inline-block;
                  @include background_color('main-color');
                  left: -1px;
                  top: 50%;
                  opacity: .2!important;
                  transform: translateY(-50%);
                }
              }
            }
            .sub-user-box{
              visibility: hidden;
              padding: 10px;
              width: 242px;
              word-break: break-word;
              white-space: normal;
              right: 0;
              position: absolute;
              min-width: 120px;
              @include background_color('main-bg-color');
              padding: 20px 15px;
              z-index: 99;
              border-radius: $main-radius;
              text-shadow: none;
              transition: .4s;
              box-shadow: 0 0 10px rgb(0 0 0 / 10%);
              opacity: 0;
              transform: translateY(6px);
              transition: .4s;
              .sub-user-box-center{
                text-align: center;
              }
              .payvip-icon {
                display: inline-block;
                border-radius: 4px;
                vertical-align: middle;
                text-align: center;
                line-height: 1.44;
                margin-top: 10px;
                padding: 8px 0;
                background: linear-gradient(300deg,#4c4d51,#2a2a31 15%,#85858a 40%,#393a3c 60%,#393838 80%,#5e5f62 100%);
                text-shadow: none;
                font-weight: 400;
                position: relative;
                color: #ece0e0;
                border: none;
                --this-color: #ece0e0;
                overflow: hidden;
                font-size: .9em;
                width: 100%;
                svg{
                  margin-right: 10px;
                  font-size: 1.2em;
                }
                &:focus,&:hover {
                  opacity: .8;
                }
                &.payvip-icon:before {
                  content: "\eb70";
                  font: normal normal normal 14px/1 iconfont;
                  font-size: 3.5em;
                  right: -.2em!important;
                  top: 80%!important;
                  opacity: .06;
                  position: absolute;
                  transform: translateY(-50%);
                  z-index: 1;
                }
              }
              .header-user-href{
                display: flex;
                justify-content: space-around;
                &>a {
                  display: inline-block;
                  padding: 10px 10px 0 10px;
                  div+div {
                    font-size: 12px;
                  }
                  &:hover {
                    opacity: .7;
                  }
                }
                .icon-radius{
                  width: 36px;
                  height: 36px;
                  margin-bottom: 6px;
                  transition: .15s;
                  display: inline-block;
                  text-align: center;
                  border: 1px solid transparent;
                  border-radius: 100%;
                  position: relative;
                  vertical-align: text-top;
                  padding: .3em .6em;
                  font-weight: 400;
                  line-height: 1.44;
                  text-shadow: 0 0 0;
                  .icon{
                      position: absolute;
                      top: 50%;
                      right: 0!important;
                      left: 0!important;
                      margin: auto;
                      transform: translateY(-50%);
                      z-index: 1;
                  }
                }
                .signin-loader{
                  color: $icon-signin-color;
                  .icon-radius{
                    // @include background_color('main-border-color');
                    background-color: $icon-signin-background;
                    .icon{
                      color: $icon-signin-color;
                    }
                  }
                }
                .signup-loader{
                  color: $icon-signup-color;
                  .icon-radius{
                    background-color: $icon-signup-background;
                    .icon{
                      font-size: 20px;
                      color: $icon-signup-color;
                    }
                  }
                }
                .findpwd-loader{
                  color: $icon-findpwd-color;
                  .icon-radius{
                    background-color: $icon-findpwd-background;
                    .icon{
                      font-size: 20px;
                      color: $icon-findpwd-color;
                    }
                  }
                }
              }
              
              // 已登录页面
              .user-info{
                align-items: center;
                display: flex;
                position: relative;
                .avatar-img{
                position: relative;
                display: inline-block;
                flex-shrink: 0;
                --this-size: 38px;
                width: var(--this-size);
                height: var(--this-size);
                .avatar{
                    border-radius: 100px;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    transition: all .2s;
                    overflow: hidden;
                    -o-object-fit: cover;
                    object-fit: cover;
                  }
                }
                .user-right{
                  display: flex;
                  flex: auto;
                  overflow: hidden;
                  justify-content: space-between;
                  align-items: center;
                  margin-left: 10px;
                  
                  &>div{
                    max-width: calc(100% - 40px);
                    flex: auto;
                    overflow: hidden;
                    .img-icon {
                    margin-left: 3px;
                    height: 1em;
                    vertical-align: -.15em;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    display: inline-block;
                  }
                  .user-profile{
                    font-size: 12px;
                    @include font_color('muted-2-color');
                  }
                  }
                }
              }
              .msg-news-icon {
                top: .4em;
                right: 0;
                position: absolute;
                transform: translateY(-50%);
                z-index: 1;
                .msg-icon{
                  margin: 0!important;
                  @include background_color('main-border-color');
                  width: 29px;
                  height: 29px;
                  display: inline-block;
                  text-align: center;
                  border-radius: 100%;
                  position: relative;
                  vertical-align: text-top;
                  .iconfont{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1;
                    right: 0!important;
                    left: 0!important;
                    margin: auto;
                  }
                }
              }
              // 签到
              .initiate-checkin{
                padding: 2px;
                margin-top: 6px;
                display: block;
                font-size: .9em;
                $this-color: $c-yellow-color;
                $this-bg: $c-yellow-background;
                color: $this-color;
                background-color: $this-bg;
                border-radius: 4px;
                border: 1px solid $this-border;
                vertical-align: middle;
                padding: .3em .6em;
                text-align: center;
                font-weight: 400;
                box-shadow: $this-shadow;
                text-shadow: 0 0 0;
                line-height: 1.44;
                &>i{
                  margin-right: .25em;
                  transition: .2s;
                }
                &:hover {
                  opacity: .8;
                }
              }
              .user-amount{
                padding: 2px;
                margin-top: 6px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                &>a{
                  flex: 1;
                  overflow: hidden;
                  padding: 6px;
                  @include background_color('muted-border-color');
                  $main-radius:4px;
                  border-radius: $main-radius;
                  div:first-child{
                    font-size: 12px;
                    @include font_color('muted-2-color');
                    &>i{
                      margin-left: 6px;
                      font-size: 1.2em;
                    }
                  }
                  .specific-value{
                    display: flex;
                    justify-content: space-between;
                    span{
                      font-weight: 700;
                      $this-color: $c-blue-2-color;
                      color: $this-color;
                    }
                    svg{
                      font-size: 1.4em;
                    }
                  }
                }
                a:nth-child(2){
                  margin-left: 6px;
                  span{
                    $this-color: $c-yellow-color;
                    color: $this-color;
                  }
                }
              }
              .user-tag{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 10px;
                margin-top: 6px;
                font-size: .9em;
                &>* {
                  max-height: 41px;
                  overflow: hidden;
                  flex: auto;
                }
                a{
                  margin: 2px;
                  padding: .15em .4em;
                  font-size: 12px;
                  font-weight: 400;
                  display: inline-block;
                  border-radius: 4px;
                  border: 1px solid $this-border;
                  vertical-align: middle;
                  text-align: center;
                  box-shadow: $this-shadow;
                  text-shadow: 0 0 0;
                  line-height: 1.44;
                  &:hover{
                    opacity: .8;
                  }
                  .icon{
                    margin-right: 2px;
                  }
                }
                .tag-forum-post{
                  color: $c-blue-2-color;
                  background: $c-blue-2-background;
                  svg{
                    color: $c-blue-2-color;
                  }
                }
                .tag-posts{
                  color: $c-blue-color;
                  background: $c-blue-background;
                  svg{
                    color: $c-blue-color;
                  }
                }
                .tag-comment{
                  color: $c-green-color;
                  background: $c-green-background;
                  svg{
                    color: $c-green-color;
                  }
                }
                .tag-view{
                  display: inline-block;
                  border-radius: 4px;
                  transition: .15s;
                  border: 1px solid $this-border;
                  vertical-align: middle;
                  text-align: center;
                  text-shadow: 0 0 0;
                  line-height: 1.44;
                  margin: 2px;
                  padding: .15em .4em;
                  font-size: 12px;
                  font-weight: 400;
                  color: $c-red-color;
                  background: $c-red-background;
                  svg{
                    color: $c-red-color;
                  }
                }
              }
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