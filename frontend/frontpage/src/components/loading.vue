<template>
    <!-- 路由跳转动画 -->
    <div class="loading-container" style="/* display: none; */">
        <div class="loading-text">
            <span class="loader">
                <span class="L">L</span>oad&nbsp;ng
            </span>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue';
let isLoading = ref(false);
</script>
<style>
.loading-container{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: #fff;
    background-image: url("src/assets/image/web/loadingbg.svg");
    background-repeat: no-repeat no-repeat;
    background-position: center center;
    background-size: cover;
}
.loading-text {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.loader {
    color: #3491fa;
    position: relative;
    font-family: Arial,Helvetica,sans-serif;
    font-size: 48px;
    letter-spacing: 4px;
    box-sizing: border-box;
    text-align: left;
}
.loader::before {
    right: 70px;
    bottom: 17px;
    height: 28px;
    width: 4.9px;
    background: currentColor;
    animation: animloader1-5892cf96 1s linear infinite alternate;
}
.L {
    animation: Lani-5892cf96 2s linear infinite;
}
.L, .loader {
    display: inline-block;
}
.loader::after {
    width: 10px;
    height: 10px;
    left: 125px;
    top: 2px;
    border-radius: 50%;
    background: red;
    animation: animloader-5892cf96 1s linear infinite alternate;
}
.loader::after, .loader::before {
    content: "";
    position: absolute;
    box-sizing: border-box;
}
@keyframes animloader-5892cf96{0%{transform:translate(0,0) scaleX(1)}14%{transform:translate(-12px,-16px) scaleX(1.05)}28%{transform:translate(-27px,-28px) scaleX(1.07)}42%{transform:translate(-46px,-35px) scaleX(1.1)}57%{transform:translate(-70px,-37px) scaleX(1.1)}71%{transform:translate(-94px,-32px) scaleX(1.07)}85%{transform:translate(-111px,-22px) scaleX(1.05)}to{transform:translate(-125px,-9px) scaleX(1)}}@keyframes animloader1-5892cf96{0%{box-shadow:0-6px}25%,75%,to{box-shadow:0 0}}@keyframes Lani-5892cf96{0%,40%,60%,to{transform:scaleY(1) translateY(0)}50%{transform:scaleY(1.1) translateY(-5%)}}
</style>