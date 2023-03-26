<template>
    <!-- 用户卡片 -->
    <div class="user-card">
        <div class="user-cover">
            <img src="https://demo.zibll.com/wp-content/themes/zibll/img/user_t.jpg" alt="">
        </div>
        <div class="user-content">
            <!-- 签到按钮 -->
            <a v-if="state.user.isLogin && Data.data.SignedIn == 'not'" class="img-badge" @click="SignedIn">
                <i class="iconfont icon-qiandao"></i>
                签到
            </a>
            <a v-else-if="state.user.isLogin && Data.data.SignedIn == 'yes'" class="img-badge" @click="()=>{Data.Popup=!Data.Popup}">
                <i class="iconfont icon-qiandao"></i>
                已签到
            </a>
            <a v-else-if="state.user.isLogin && Data.data.SignedIn == 'waiting'" class="img-badge" @click="SignedIn">
                <i class="iconfont icon-jiazailoading-A"></i>
                请稍候
            </a>
            <!-- 登录用户头像 -->
            <div class="user-avatar">
                <a>
                    <span class="avatar-img avatar-lg">
                        <img :src="state.user.isLogin ? props.UserData.avatar : 'https://demo.zibll.com/wp-content/themes/zibll/img/avatar-default.png'" class="avatar avatar-id-2724 ls-is-cached lazyloaded" alt="">
                    </span>
                </a>
            </div>
            <!-- 登录   用户信息 -->
            <div v-if="state.user.isLogin" class="user-info">
                <div class="user-name">
                    <div>
                        <a href="">{{ props.UserData.name }}</a>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="'LV' + props.UserData.level"
                            placement="top"
                        >
                        <img :src="'https://demo.zibll.com/wp-content/themes/zibll/img/user-level-'+ props.UserData.level +'.png'" alt="">
                        </el-tooltip>
                    </div>
                </div>
                <div class="author-tag">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="'共'+ props.UserData.forum_post +'篇帖子'"
                      placement="top"
                    >
                      <a class="tag-forum-post c-blue-2 but">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wodetiezi"></use>
                      </svg>{{ props.UserData.forum_post }}
                    </a>
                    </el-tooltip>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="'共'+ props.UserData.post +'篇文章'"
                      placement="top"
                    >
                      <a class="tag-posts c-blue but">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wendang"></use>
                      </svg>{{ props.UserData.post }}
                    </a>
                    </el-tooltip>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="'共'+ props.UserData.comment +'条评论'"
                      placement="top"
                    >
                      <a class="but tag-comment c-green ">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiaoxi1"></use>
                      </svg>{{ props.UserData.comment }}
                    </a>
                    </el-tooltip>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="'人气值 ' + props.UserData.view"
                      placement="top"
                    >
                      <a class="tag-view c-red but">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-redu"></use>
                      </svg>{{ props.UserData.view }}
                    </a>
                    </el-tooltip>
                </div>
                <div class="user-desc">
                    {{ props.UserData.profile }}
                </div>
                <div class="user-btns">
                    <a class=" newadd-btns but jb-pink">发布文章</a>
                    <a href="/user" class="userspace-btns but">用户中心</a>
                </div>
            </div>
            <!-- 未登录 -->
            <div v-else  class="notuser">
                <p>HI！请登录</p>
                <p>
                    <a class="signin-loader but jb-blue padding-lg" @click="UserLoginFunc">
                        <i class="iconfont icon-login-full"></i>登录
                    </a>
                    <a href="" class="signup-loader but jb-blue padding-lg">
                        <i class="iconfont icon-zhuce"></i>注册
                    </a>
                </p>
                <div class="separator">社交帐号登录</div>
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
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios'
import { useStore } from "vuex";

// import { Api_getUser } from "@/mockProdServer.js";
import { reactive,ref,nextTick,getCurrentInstance } from 'vue';
let {state, dispatch,commit} = useStore();
let Data=reactive({
    data:{
    SignedIn: 'not',
    Popup: false
    }
});

const props = defineProps({
    UserData: Object,
});
// 签到函数
const {proxy} = getCurrentInstance();
// let UserLoginFunc = async() => {
//     dispatch("user/UserLoginFunc",);
// }
let SignedIn=async()=>{
    // waitSigned.value.childNodes[1].nodeValue = '请稍候';
    // waitSigned.value.firstChild.classList.replace('icon-qiandao', 'icon-jiazailoading-A');
    if(Data.SignedIn == 'not'){
        Data.SignedIn = 'waiting';
        proxy.$api.signedin().then((res) => {
            Data.SignedIn = res.data.success ? 'yes' : 'not';
        });
    }else{
        ElNotification({
            title: 'Warning',
            message: 'This is a warning message',
            type: 'warning',
        })
    }
}
</script>
<style lang="scss">
@import "@/styles/common.scss";
.user-card{
    padding: 0;
    overflow: hidden;
    clear: both;
    background: var(--main-bg-color);
    box-shadow: 0 0 10px var(--main-shadow);
    border-radius: var(--main-radius);
    margin-bottom: 20px;
    .user-cover {
        border-radius: var(--main-radius) var(--main-radius) 0 0;
        text-shadow: 0 0 5px rgb(0 0 0 / 20%);
        --main-color: #fff;
        color: #fff;
        position: relative;
        overflow: hidden;
        box-shadow: 0 0 10px var(--main-shadow);
        padding: 0;
        padding-bottom: 50%;
        img{
            position: absolute;
            width: 100%;
            height: 100%;
            transition: all .2s;
            overflow: hidden;
            object-fit: cover;
        }
    }
    .user-content{
        margin-top: -55px;
        padding: 15px;
        position: relative;
        .img-badge{
            color: #fff;
            background: linear-gradient(135deg, #f59f54 10%, #ff6922 100%);
            i{
                display: inline-block;
                margin-left: 3px;
                margin-right: 6px;
                // transform:rotate(7deg);
                &.icon-jiazailoading-A{
                    animation:changeright 1s linear infinite;
                }
            }
        }
        .user-avatar{
            text-align: center;
            .avatar-img{
                position: relative;
                display: inline-block;
                flex-shrink: 0;
                --this-size: 80px;
                width: var(--this-size);
                height: var(--this-size);
                .avatar{
                    width: 100%;
                    height: 100%;
                    transition: all .2s;
                    overflow: hidden;
                    -o-object-fit: cover;
                    object-fit: cover;
                    border-radius: 100px;
                    display: inline-block;
                }
            }
        }
        .user-info{
            text-align: center;
            margin: 20px 0 10px 0;
            .user-name{
                display: flex;
                align-items: center;
                justify-content: center;
                >div{
                    justify-content: center;
                    flex: auto;
                    overflow: hidden;
                    align-items: center;
                    display: flex;
                    >a{
                        font-size: 1.1em;
                        font-weight: 700;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    img{
                        height: 1em;
                        vertical-align: -.15em;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                        display: inline-block;
                        margin-left: 3px;
                    }
                }
            }
            .author-tag{
                margin-top: 10px;
                &>a{
                    margin: 2px;
                    padding: .15em .4em;
                    font-size: 12px;
                    font-weight: 400;
                    .icon{
                        margin-right: 2px;
                    }
                    &:hover {
                        opacity: .8;
                        color: var(--this-color);
                    }
                }
            }
            .user-desc{
                margin-top: 10px;
                font-size: .9em;
                color: var(--muted-2-color);
            }
            .user-btns{
                margin-top: 20px;
                &>a{
                    padding-right: 1em;
                    padding-left: 1em;
                    color: #fff;
                }
                .newadd-btns{
                    margin-right: 6px;
                    background: $jb-pink-bg;
                }
                .userspace-btns{
                    margin-left: 6px;
                    background: $jb-blue-bg;
                }
            }
        }
        .notuser{
            text-align: center;
            margin-top: 10px;
            &>p:first-child {
                padding: 15px;
                font-size: 1.2em;
                color: var(--muted-color);
            }
            &>p:nth-child(2){
                a{
                    padding: .5em 2em;
                    color: #fff;
                }
            }
            .signin-loader{
                background: $jb-blue-bg;
            }
            .signup-loader{
                background: $jb-yellow-bg;
                margin-left: 10px;
            }
            .separator{
                padding: 10px 0;
                margin: 20px 0 20px 0;
                font-size: .9em;
                color: var(--muted-3-color);
            }
            .social_loginbar{
                
            }
        }
    }
}
</style>