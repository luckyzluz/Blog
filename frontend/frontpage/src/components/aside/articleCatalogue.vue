<template>
    <div class="posts-nav-box">
        <noTop :data="noTopData" />
        <div class="lz-widget">
            <div class="posts-nav-lists scroll-y mini-scrollbar list-unstyled">
                <ul class="bl relative nav">
                    <li v-for="(v,i) in data" :key="i" :class="'n-'+v.type">
                        <a class="text-ellipsis" href="javascript:void(0)" @click="goAnchor(v.index)">{{ v.title }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import noTop from 'c/notop.vue';
let noTopData={
    title:'文章目录'
}
const goAnchor=(selector)=> {
     document.querySelector('#wznav_'+selector).scrollIntoView({
          behavior: "smooth",
          block:'center'
     });
  }
let data=[
    {
        type:'H2',
        title:'效果预览',
        index:'0'
    },
    {
        type:'H2',
        title:'接入教程',
        index:'1'
    },
    {
        type:'H3',
        title:'获取AppID和AppSecret',
        index:'2'
    },
    {
        type:'H3',
        title:'微信公众号的服务器URL配置',
        index:'3'
    },
    {
        type:'H2',
        title:'其他配置',
        index:'4'
    },
]
</script>
<style lang="scss">
.posts-nav-lists {
    max-height: 400px;
    padding-left: 10px !important;
    .bl::after, .bl::before,  li::before {
        position: absolute;
        bottom: 0;
        left: -6px;
        width: 11px;
        height: 11px;
        border: 2px solid var(--focus-color);
        background: var(--main-bg-color);
        border-radius: 15px;
        content: '';
        transition: .15s;
    }
    .bl {
        border-left: 1px solid var(--main-border-color);
        padding: 20px 10px 20px 0;
        &::before {
            bottom: auto;
            top: 0;
        }
    }
    li {
        transform: scale(1);
        transform-origin: bottom;
        transition: transform .2s,opacity 0s;
        &::before {
            top: 50%;
            transform: translateY(-50%);
            border: 3px solid var(--main-bg-color);
            background: var(--muted-3-color);
            opacity: 0;
        }
        &.n-H1::before, &.n-H2::before {
            border-width: 2px;
            opacity: 1;
        }
        &.n-H2::before {
            border-width: 3px;
        }
        &.n-H3::before {
            border-width: 4px;
            opacity: .6;
        }
        &.n-H1 a, &.n-H2 a {
            font-weight: 700;
        }
        a {
            margin: 0 10px;
            display: block;
            border-radius: 4px;
            margin-right: 25px;
            padding: 8px;
        }
    }
}
.nav>li {
    position: relative;
    display: block;
    &>a {
        position: relative;
        display: block;
        padding: 10px 15px;
    }
}
.artlist.el-affix {
    transition: opacity .3s;
    &>div{
        position: fixed;
        opacity: 0;
    z-index: -999;
    }
    .el-affix--fixed{
    //     opacity: 1;
    // z-index: 9999;
    }
}
</style>