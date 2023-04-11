<template>
    <!-- 文章页评论 -->
    <div class="theme-box" id="comments">
        <noTop :data="notTopData" />
        <div class="no_webshot main-bg theme-box box-body radius8 main-shadow">
            <!-- 未登录 -->
            <div v-if="!isLogin" class="comment-signarea text-center box-body radius">
                <h3 class="theme-box muted-3-color" style="font-size: 1.2em;">请登录后发表评论</h3>
                <p>
                    <a class="signin-loader but c-blue padding-lg">
                        <i class="iconfont icon-login-full"></i>
                        登录
                    </a>
                    <a class="signup-loader but c-yellow padding-lg" style="margin-left: 10px;">
                        <i class="iconfont icon-zhuce"></i>
                        注册
                    </a>
                </p>
                <p class="social-separator separator muted-3-color em09">社交帐号登录</p>
                <div class="social_loginbar">
                    <a class="social-login-item qq toggle-radius">
                        <i class="iconfont icon-QQ"></i>
                    </a>
                    <a class="social-login-item weixingzh toggle-radius qrcode-signin">
                        <i class="iconfont icon-weixin1"></i>
                    </a>
                    <a class="social-login-item github toggle-radius">
                        <i class="iconfont icon-github"></i>
                    </a>
                </div>
            </div>
            <!-- 已登录 -->
            <commentEdit v-else />
            <commentList />
        </div>
    </div>
</template>
<script setup>
import { onMounted,ref} from 'vue';
import noTop from 'c/notop.vue';
import commentEdit from 'c/article/comment/commentEdit.vue';
import commentList from 'c/article/comment/commentList.vue';
let notTopData={
    title:'评论',
    intro:'共99条'
}
let isLogin=true;
onMounted(()=>{
})
const openMenu=(value)=>{
    // openMenuActive.value=value;
    // console.log(e.currentTarget.classList)//smiliebtn.valuesmilie-icon
    // let smilieClass= e.currentTarget.classList;
    // if(Array.from(smilieClass).includes('smilie-icon')){ // 点击了icon图标
    //     // console.log(e.currentTarget) //这里以后处理
    // }else if(Array.from(smilieClass).includes('open')){ // 该菜单已显示
    //     smilieClass.remove('open');
    // }else{
    //     smilieClass.add('open');
    // }
}
</script>
<style lang="scss">



</style>