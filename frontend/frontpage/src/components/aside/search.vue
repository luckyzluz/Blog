<template>
    <div class="theme-box">
        <noTop :data="noTopData" />
        <div class="lz-widget widget-search">
            <div class="search-input">
                <form class="search-form">
                    <div class="line-form">
                        <div class="search-input-text">
                            <input type="text" class="line-form-input">
                            <i class="line-form-line"></i>
                            <div class="scale-placeholder">{{ pp }}</div>
                            <div class="abs-right muted-color">
                                <button type="submit" class="null">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-search"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import noTop from 'c/notop.vue'
let noTopData={
    title:'搜索模块'
}
let pp='开启精彩搜索'
</script>
<style lang="scss">
.search-input {
    max-width: 600px;
    margin: auto;
    form{
        padding: 10px;
    }
    .line-form .search-input-text {
        flex-grow: 2;
    }
}
.line-form .abs-right {
    margin-top: 3px;
}
.line-form-input {
    outline: 0!important;
    border: none;
    display: block;
    width: 100%;
    padding: 1em 2em .4em .3em;
    opacity: .8;
    transition: .3s;
    background: 0 0!important;
}
.line-form-line, .line-form-line:before {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    transition: .8s;
    background: var(--main-border-color);
}
.line-form-input:focus {
    opacity: 1;
}
input:focus~.scale-placeholder {
    color: var(--focus-color);
    opacity: .9;
}
.scale-placeholder.is-focus, input:focus~.scale-placeholder {
    transform: translateY(-20px);
    font-size: 11px;
}
.line-form-line:before {
    content: '';
    width: 0;
    background: var(--focus-color);
}
.line-form-input:focus~.line-form-line:before, .line-form-input:hover~.line-form-line:before {
    width: 100%;
}
.scale-placeholder {
    position: absolute;
    bottom: 5px;
    opacity: .5;
    transition: .2s;
    padding-left: 4px;
    transform-origin: left top;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 1;
    cursor: text;
}
</style>