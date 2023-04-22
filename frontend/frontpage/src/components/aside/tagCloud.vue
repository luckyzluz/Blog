<template>
    <div class="theme-box">
        <noTop :data="nooTopData" />
        <div class="lz-widget widget-tag-cloud author-tag fixed-width">
            <a v-for="(v,i) in data" :key="i" :href="'tag/'+v.name" :class="['text-ellipsis but', 'c-green-2']">{{ v.name }}
                <span class="em09 tag-count">({{ v.sum }})</span>
            </a>
        </div>
    </div>
</template>
<script setup>
import noTop from 'c/notop.vue'
let nooTopData={
    title:'标签云'
}
let color=['c-blue-2','c-red','c-yellow','c-green','c-yellow-2','c-green-2','c-purple-2','c-red-2','c-blue']
let data=[
    {
        name:'seo',
        sum:35
    },
    {
        name:'seo优化',
        sum:35
    },
    {
        name:'搜索引擎',
        sum:35
    },
    {
        name:'seo工具',
        sum:35
    },
    {
        name:'seo教程',
        sum:35
    },
    {
        name:'科技',
        sum:28
    },
    {
        name:'游戏',
        sum:21
    },
    {
        name:'苹果',
        sum:21
    },
    {
        name:'潮流',
        sum:20
    },
    {
        name:'智能',
        sum:20
    },
    {
        name:'IOS',
        sum:20
    },
    {
        name:'科技新闻',
        sum:18
    },
    {
        name:'搞笑gif',
        sum:18
    },
    {
        name:'五谷杂粮',
        sum:16
    },
    {
        name:'营养饮食',
        sum:13
    },
    {
        name:'演示内容',
        sum:10
    },
    {
        name:'萌宠',
        sum:10
    },
    {
        name:'新闻',
        sum:7
    },
    {
        name:'测评',
        href:'',
        sum:8
    },
    {
        name:'iphpne',
        href:'',
        sum:7
    }
]
</script>
<style lang="scss">
.widget-tag-cloud{
    &.author-tag .but {
        font-size: 13px;
    }
    a span{
        font-size: .9em;
    }
}
.widget-tag-cloud.fixed-width .but {
    width: 89px;
}
</style>