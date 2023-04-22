<template>
    <!-- 菜单导航 -->
    <ul class="nav navbar-nav">
        <!-- class="current-menu-item" data-->
        <li class="current-menu-item3" v-for="(item, i) in state.web.webConfig.pageList" :key="i">
            <a href="" v-if="item.color !== ''">
                <span :class="item.color">{{ item.name }}</span>
                <span class="badge" :class="item.badge.color " v-if="item.badge.name !== ''">{{ item.badge.name }}</span>
                <i v-if="item.submenu.length !== 0" class="iconfont icon-arrowdown"></i>
                <!-- <svg v-if="item.submenu.length !== 0" class="icon collapse-symbol" aria-hidden="true">
                <use xlink:href="#icon-arrowdown"></use>
                </svg> -->
            </a>
            <a href="" v-else>
                {{item.name}}
                <span class="badge" :class="item.badge.color" v-if="item.badge.name !== ''">{{item.badge.name}}</span>
                <i v-if="item.submenu.length !== 0" class="iconfont icon-angledown"></i>
                <!-- <svg v-if="item.submenu.length !== 0" class="icon collapse-symbol" aria-hidden="true">
                <use xlink:href="#icon-arrowdown"></use>
                </svg> -->
            </a>
        <ul v-if="item.submenu.length !== 0" class="sub-menu">
            <li v-for="(subm, isubm) in item.submenu" :key="isubm">
                <a href="" v-if="subm.color !== ''">
                    <span class="badge" :class="subm.color">{{ subm.name }}</span>
                    <span :class="subm.badge.color" v-if="subm.badge.name !== ''">{{ subm.badge.name }}</span>
                </a>
                <a href="" v-else>
                    {{subm.name}}
                    <span class="badge" :class="subm.badge.color" v-if="subm.badge.name !== ''">{{subm.badge.name}}</span>
                    <i v-if="subm.submenu && subm.submenu.length !== 0" class="iconfont icon-arrowdown"></i>
                    <!-- <svg v-if="subm.submenu && subm.submenu.length !== 0" class="icon collapse-symbol" aria-hidden="true">
                    <use xlink:href="#icon-arrowdown"></use>
                    </svg> -->
                </a>
            </li>
        </ul>
        </li>
    </ul>
</template>
<script setup>
import { useStore } from "vuex";
let {state,getters, dispatch,commit} = useStore();
const openSign = () => {
  dispatch("user/isShowSign");
}
</script>