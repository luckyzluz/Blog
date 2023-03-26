<template>
    <!-- 登录 & 注册 -->
    <div v-show="state.user.isShowSign" id="user_sign">
        <div class="sign-content">
            <div class="sign-img hidden-sm-and-down">
                <img :src="signConfig.signImg" alt="">
            </div>
            <div class="sign">
                <button class="close" @click="closeSign">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-off-search"></use>
                    </svg>
                </button>
                <!-- 登录注册框logo -->
                <div class="sign-logo">
                    <img :src="signConfig.logo.light" :alt="signConfig.logo.alt" class="ls-is-cached lazyloaded">
                </div>
                <!-- 登录 -->
                <div :class="['tab-pane', {active: signConfig.signState == 'sign-in'}]" id="tab-sign-in">
                    <div class="pane-body">
                        <div class="pane-title">登录</div>
                        <a @click="signConfig.signState = 'sign-up'">没有帐号？立即注册<i class="iconfont icon-arrowright"></i>
                    </a>
                    </div>
                    <div id="sign-in">
                        <!-- 免密登录 -->
                        <div :class="['sign-in-pane', {active: signConfig.loginWay == 'nopas'}]" id="tab-signin-nopas">
                            <form>
                                <!-- 账号输入框（免密） -->
                                <div class="line-form">
                                    <input class="line-form-input" type="text" @focus="moveLineFormName($event)" @blur="moveLineFormName($event)"
                                    v-model="signInData.accountId">
                                    <i class="line-form-line"></i>
                                    <div class="line-form-name">手机号或邮箱</div>
                                </div>
                                <!-- 邮箱验证码输入框（免密） -->
                                <div class="line-form" ref="NoSecretLogin" style="display: none;">
                                    <input class="line-form-input" type="text" name="email_phone" @focus="moveLineFormName($event)" @blur="moveLineFormName($event)"
                                    v-model="signInData.code" maxlength="4">
                                    <i class="line-form-line"></i>
                                    <div class="line-form-name">验证码</div>
                                    <span class="yztx">
                                        <button @click.prevent="sendCaptcha" class="but c-blue">发送验证码</button>
                                    </span>
                                </div>
                                <!-- 登录勾选 & 密码登录切换 -->
                                <div class="line-form" style="margin-bottom: 10px; font-size: .9em;">
                                    <span class="form-checkbox">
                                        <input type="checkbox" id="remember-nopas" checked="checked" tabindex="4" name="remember" value="forever" v-model="signInData.remember">
                                        <label for="remember-nopas" class="ml3">记住登录</label>
                                    </span>
                                    <span style="float: right;">
                                        <a style="color: var(--muted-2-color);" @click="changeLoginWay">帐号密码登录</a>
                                    </span>
                                </div>
                                <!-- 按钮 -->
                                <div class="signsubmit">
                                    <button class="but jb-blue" @click.prevent = "loginInFunc">
                                        <i class="iconfont icon-login-full"></i>登录
                                    </button>
                                </div>
                            </form>
                        </div>
                        <!-- 密码登录 -->
                        <div :class="['sign-in-pane', {active: signConfig.loginWay == 'pas'}]" id="tab-signin-pas">
                            <form>
                                <!-- 账号输入框 -->
                                <div class="line-form">
                                    <input type="text" class="line-form-input"  @focus="moveLineFormName($event)" @blur="moveLineFormName($event)"
                                    v-model="signInData.accountId">
                                    <i class="line-form-line"></i>
                                    <div class="line-form-name">用户名/手机号/邮箱</div>
                                </div>
                                <!-- 密码输入框 -->
                                <div class="line-form">
                                    <input :type="signConfig.showInCipher ? 'text' : 'password'" ref="password"  class="line-form-input" @focus="moveLineFormName($event)" @blur="moveLineFormName($event)"
                                    v-model="signInData.password">
                                    <div class="line-form-name">登录密码</div>
                                    <div class="passw" @click="signConfig.showInCipher = !signConfig.showInCipher;">
                                        <i :class="['iconfont', signConfig.showInCipher ? 'icon-mimaxianshiyincang-' : 'icon-mimaxianshiyincang-1']"></i>
                                    </div>
                                    <i class="line-form-line"></i>
                                </div>
                                <!-- 登录勾选 & 密码登录切换 -->
                                <div class="line-form" style="margin-bottom: 10px; font-size: .9em;">
                                    <span class="form-checkbox">
                                        <input type="checkbox" id="remember-pas" checked="checked" v-model="signInData.r
                                        ">
                                        <label for="remember-pas" class="ml3">记住登录</label>
                                    </span>
                                    <span style="float: right;">
                                        <a style="color: var(--muted-2-color);">找回密码</a>
                                        <span style="opacity:.5;"> | </span>
                                        <a style="color: var(--muted-2-color);" @click="changeLoginWay">免密登录</a>
                                    </span>
                                </div>
                                <!-- 按钮 -->
                                <div class="signsubmit">
                                    <button class="but jb-blue" @click.prevent = "loginInFunc">
                                        <i class="iconfont icon-login-full"></i>登录
                                    </button>
                                </div>
                            </form>
                        </div>
                        <p class="social-separator">社交帐号登录</p>
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
                <!-- 注册 -->
                <div :class="['tab-pane', {active: signConfig.signState == 'sign-up'}]" id="tab-sign-up">
                    <div class="pane-body">
                        <div class="pane-title">注册</div>
                        <a @click="signConfig.signState = 'sign-in'">已有帐号，立即登录<i class="iconfont icon-arrowright"></i>
                        </a>
                    </div>
                    <form id="sign-up">
                        <!-- 注册用户名 -->
                        <div class="line-form">
                            <input type="text" class="line-form-input" @focus="moveLineFormName($event)" @blur="moveLineFormName($event)" v-model="signUpData.name">
                            <i class="line-form-line"></i>
                            <div class="line-form-name">设置用户名</div>
                        </div>
                        <!-- 注册邮箱/手机号 -->
                        <div class="line-form">
                            <input type="text" class="line-form-input" @focus="moveLineFormName($event)" @blur="moveLineFormName($event)" v-model="signUpData.accountId">
                            <i class="line-form-line"></i>
                            <div class="line-form-name">手机号或邮箱</div>
                        </div>
                        <!-- 注册密码框 -->
                        <div class="line-form">
                            <input :type="signConfig.showUpCipher ? 'text' : 'password'" ref="password"  class="line-form-input" @focus="moveLineFormName($event)" @blur="moveLineFormName($event)"
                            v-model="signUpData.password">
                            <div class="line-form-name">设置密码</div>
                            <div class="passw" @click="signConfig.showUpCipher = !signConfig.showUpCipher;">
                                <i :class="['iconfont', signConfig.showUpCipher ? 'icon-mimaxianshiyincang-' : 'icon-mimaxianshiyincang-1']"></i>
                            </div>
                            <i class="line-form-line"></i>
                        </div>
                        <!-- 邀请码（选填） -->
                        <div class="line-form">
                            <input type="text" ref="password"  class="line-form-input" @focus="moveLineFormName($event)" @blur="moveLineFormName($event)"
                            v-model="signUpData.inviteCode">
                            <div class="line-form-name">邀请码（选填）</div>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                placement="top"
                            >
                            <template #content> {{ signConfig.inviteCodeTip }} </template>
                            <div class="passw">
                                <i class="iconfont icon-bangzhu"></i>
                            </div>
                            </el-tooltip>
                            <i class="line-form-line"></i>
                        </div>
                        <!-- 按钮 -->
                        <div class="signsubmit">
                            <button class="but jb-green" @click.prevent = "loginUpFunc">
                                <i class="iconfont icon-zhuce"></i>注册
                            </button>
                        </div>
                    </form>
                </div>
                <!-- 扫码登录 -->
                <div :class="['tab-pane', {active: signConfig.signState == 'sign-qrcode'}]" id="tab-qrcode-signin">
                    <div class="pane-body">
                        <div class="pane-title">扫码登录</div>
                        <span style="font-size: 12px; color: var(--muted-2-color);">使用
                            <a>其它方式登录</a>
                            或
                            <a>注册</a>
                        </span>
                        <!-- <a @click="signConfig.signState = 'sign-in'">已有帐号，立即登录<i class="iconfont icon-arrowright"></i>
                        </a> -->
                    </div>
                    <div class="qrcode-signin-container">
                        <!-- <p class="placeholder" style="height:180px;width:180px;margin:auto;"></p> -->
                        <el-skeleton style="" animated>
                            <template #template>
                            <el-skeleton-item variant="p" style="height:180px;width:180px;margin:auto; border-radius: var(--main-radius);" />
                            <el-skeleton-item variant="p" style="height:27px;width:200px;margin:15px auto 0;" />
                            </template>
                        </el-skeleton>
                    </div>
                </div>
                <!-- 扫码切换角标 -->
                <div v-show="signConfig.signState == 'sign-in' || signConfig.signState == 'sign-qrcode'" class="login-qr-switch-box" @click="signConfig.signState == 'sign-qrcode' ? signConfig.signState = 'sign-in':signConfig.signState = 'sign-qrcode'" alt="1122">
                    <span>
                        <svg class="icon" aria-hidden="true">
                        <use :xlink:href="signConfig.signState == 'sign-qrcode'?'#icon-zhanghaodenglu':'#icon-saomadenglu'"></use>
                    </svg>
                    </span>
                    <div class="tooltip">{{ signConfig.signState == 'sign-qrcode' ? '账号登录': '扫码登录' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- modal-open -->
<script setup>
import { useStore } from "vuex";

import { reactive,watch, watchEffect,onMounted,ref } from 'vue'
let {state,getters, dispatch,commit} = useStore();
let signConfig = reactive({
    logo: {
        light: 'https://oss.zibll.com/demo.zibll.com/2021/01/ZIBLL-LOGO-精简-白天.svg',
        night: 'https://oss.zibll.com/demo.zibll.com/2021/01/ZIBLL-LOGO-精简-夜间.svg',
        alt: '更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示'
    },
    signImg: '/src/assets/image/%E6%8E%A8%E5%B9%BF%E8%BF%94%E4%BD%A3-%E7%99%BB%E5%BD%95%E5%9B%BE.jpg',
    signState: 'sign-in', // 默认状态   sign-in, sign-up qrcode-signin
    loginWay: 'nopas', // 默认登录方式  pas  nopas  
    xx: '',
    isSigninPas: true, // 切换密码登录
    showInCipher: true, // 登录密码框密码是否显示
    inviteCodeTip: '如您受到邀请，可填写邀请码。<br />（邀请码功能后台可设置邀请奖励、<br />必填等功能）[演示功能，请留空]',
    showUpCipher: true // 注册密码框密码是否显示
})

// 登录数据
let signInData = reactive({
    accountId :'',
    password: '',
    code:'',
    remember: true
})
// 注册数据
let signUpData = reactive({
    name: '',
    accountId :'',
    password: '',
    inviteCode:''
})
// watch()
const NoSecretLogin = ref(null); // 邮箱验证码框（免密）
const password = ref(null); // 密码框
onMounted(()=>{
            // console.log()  //【step4】：获取元素，注意需要在元素加载出来后才能获取，比如可在onMounted生命周期或者nextTick中使用
            // searchInputElem.value.focus()
})
watch(() => signInData.accountId.length, (count, prevCount) => {
    // count新值, prevCount第几次
    // console.log(count, prevCount)
    signInData.accountId.length > 5 ? NoSecretLogin.value.style="display: block;" : '';
})
// 统一监听
watchEffect(() => {
    // signInData.accountId.length > 5 ? NoSecretLogin.value.style="display: block;" : '';
    // if(signInData.accountId.length !== 0 || signInData.password.length !== 0){
    //     console.log(document.getElementsByClassName('line-form-name'))
    //     // is-focus
    // }
    
},{flush: 'post'})
const changeLoginWay = (qrcode) => {
    signConfig.loginWay == 'nopas' ? signConfig.loginWay = 'pas' : signConfig.loginWay = 'nopas';
    if(signInData.accountId.length !== 0){
        if(signConfig.loginWay == 'nopas'){
            let xx =document.querySelector('#tab-signin-nopas').getElementsByClassName('line-form-name')[0].classList;
            Array.from(xx).includes('is-focus') ? '' : xx.add('is-focus');
        }else if(signConfig.loginWay == 'pas'){
            let xx =document.querySelector('#tab-signin-pas').getElementsByClassName('line-form-name')[0].classList;
            Array.from(xx).includes('is-focus') ? '' : xx.add('is-focus');
        }
    }
}



// 获取邮箱验证码
const sendCaptcha = () => {
    if(signInData.accountId){
        // 发送请求
        ElNotification({
            title: '验证码发送成功',
            message: '请前往查看邮箱',
            type: 'success',
        })
    }else{
        ElNotification({
            title: '验证码发送失败',
            message: '请填写账号信息',
            type: 'error',
        })
    }
}
// 登录
const loginInFunc = () => {

}
// 注册
const loginUpFunc = () => {

}
// 关闭窗格
const closeSign=()=>{
    dispatch("user/isShowSign");
}
// 提示信息动画
const moveLineFormName = (e) => {
    //文本失焦事件
    // console.log('kk'+UserData.accountId);
    let classList = e.target.parentNode.querySelector(".line-form-name").classList;
    if (Array.from(classList).includes("is-focus")) {
        if(!e.target.value){
            classList.remove("is-focus");
        }
    } else {
        classList.add("is-focus");
    }
}
</script>
<style lang="scss">
#user_sign{
    width: 800px;
    transform: scale(1);
    margin: 30px auto;
    position: relative;
    margin-top: 111px;
    transition: opacity .15s linear;
    .sign-content{
        padding: 20px 0;
        width: 800px;
        transform: scale(1);
        .sign-img{
            padding-right: 35%;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            img{
                width: 100%;
                height: 100%;
                transition: all .2s;
                overflow: hidden;
                -o-object-fit: cover;
                object-fit: cover;
                border-radius: var(--main-radius);
            }
        }
        .sign-img+.sign {
            margin-left: 55%;
        }
        .sign{
            max-width: unset;
            margin: auto;
            position: relative;
            background: var(--blur-bg);
            backdrop-filter: saturate(5) blur(20px);
            clear: both;
            padding: 15px;
            box-shadow: 0 0 10px var(--main-shadow);
            border-radius: var(--main-radius);
            overflow: hidden;
            .sign-logo{
                text-align: center;
                padding: 15px;
                img {
                    max-width: 180px;
                    max-height: 60px;
                }
            }
            .tab-pane{
                transition: opacity .15s linear;
                opacity: 0;
                display: none;
                &.active {
                    display: block;
                    opacity: 1;
                }
                .pane-body{
                    padding: 15px;
                    .pane-title{
                        position: relative;
                        padding-bottom: 8px;
                        font-size: 2em;
                        &::before{
                            box-sizing: border-box;
                            position: absolute;
                            content: '';
                            width: 40px;
                            height: 3.5px;
                            top: auto;
                            left: 0;
                            bottom: 3px;
                            background: var(--theme-color);
                            border-radius: 5px;
                            box-shadow: 1px 1px 3px -1px var(--theme-color);
                            transition: .4s;
                        }
                        &:hover::before {
                            width: 60px;
                        }
                    }
                    a{
                        font-size: 12px;
                        color: var(--muted-color);
                        i{
                            vertical-align: -5%;
                            font-size: 1.2em;
                        }
                    }
                }
                .line-form{
                    margin-bottom: 10px;
                    position: relative;
                    .line-form-input {
                        padding: 0 2em .3em .3em;
                        margin-top: 1.7em;
                        outline: 0!important;
                        border: none;
                        display: block;
                        width: 100%;
                        // padding: 1em 2em .4em .3em;
                        // opacity: .8;
                        transition: .3s;
                        background: 0 ;
                    }
                    .line-form-line:before {
                            content: '';
                            width: 0;
                            background: var(--theme-color);
                    }
                    .line-form-name{
                        position: absolute;
                        bottom: 5px;
                        opacity: .5;
                        transition: .2s;
                        padding-left: 4px;
                        transform-origin: left top;
                        user-select: none;
                        pointer-events: none;
                        backface-visibility: hidden;
                        z-index: 1;
                        cursor: text;
                        &.is-focus {
                            transform: translateY(-20px);
                            font-size: 11px;
                            opacity: 0.9;
                        }
                    }
                    .yztx{
                        margin-top: -5px;
                        position: absolute;
                        top: 50%;
                        right: .7em;
                        transform: translateY(-50%);
                        z-index: 1;
                        button{
                            margin: 0;
                            margin-right: -.7em;
                            padding: .3em 1em;
                        }
                    }
                    .form-checkbox{
                        color: var(--muted-color);
                        label{
                            margin-left: 3px;
                            font-weight: 700;
                            // margin-bottom: 6px;
                        }
                    }
                    .passw{
                        position: absolute;
                        top: 50%;
                        right: .7em;
                        transform: translateY(-50%);
                        z-index: 1;
                        cursor: pointer;
                        color: var(--muted-2-color);
                        margin-top: -3px;
                    }
                }
                .signsubmit{
                    padding: 15px;
                    button{
                        margin: 0;
                        padding: .5em 2em;
                        border-radius: 50px;
                        width: 100%;
                        i{
                            margin-right: .25em;
                            vertical-align: middle;
                        }
                    }
                }
                #sign-in{
                    padding: 0 10px;
                    .sign-in-pane{
                        display: none;
                        transition: opacity .15s linear;
                        opacity: 0;
                        &.active{
                            opacity: 1;
                            display: block;
                        }
                    }
                }
                #sign-up{
                    padding: 0 10px;
                }
                .qrcode-signin-container{
                    min-height: 254px;
                    padding: 15px;
                    text-align: center;
                }
            }
            .login-qr-switch-box{
                width: 0;
                height: 0;
                position: absolute;
                right: 0;
                bottom: 0;
                // z-index: -1;
                span{
                    transition: .3s all ease;
                    display: inline-block;
                    width: 100px;
                    height: 100px;
                    transform: translate(-50px,-50px) rotate(45deg);
                    cursor: pointer;
                    background: var(--theme-color);
                    overflow: hidden;
                    opacity: .9;
                    &:hover {
                        opacity: 1;
                        & ~ .tooltip{
                            opacity: 1;
                            // display: block;
                        }
                    }
                }
                svg{
                    position: absolute;
                    font-size: 30px;
                    color: #fff;
                    bottom: 34px;
                    left: -3px;
                    -webkit-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                }
                .tooltip{
                    transition: .3s all ease;
                    // display: none;
                    position: absolute;
                    padding: 0 12px;
                    top: -24px;
                    right: 76px;
                    height: 44px;
                    line-height: 44px;
                    white-space: nowrap;
                    border-radius: 8px;
                    background: var(--theme-color);
                    color: #fff;
                    opacity: 0;
                    font-size: 14px;
                    -webkit-transform: translateY(-60%);
                    transform: translateY(-60%);
                    -webkit-box-shadow: 0 4px 10px 0 var(--main-shadow);
                    box-shadow: 0 4px 10px 0 var(--main-shadow);
                    &::after{
                        content: '';
                        display: block;
                        width: 0;
                        height: 0;
                        right: -4px;
                        top: 16px;
                        background: var(--theme-color);
                        position: absolute;
                        border-left: 6px solid transparent;
                        border-bottom: 6px solid transparent;
                        -webkit-transform: rotate(45deg) translate(0);
                        transform: rotate(45deg) translate(0);
                    }
                }
                
            }
        }
    }
}
</style>