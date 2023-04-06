<template>
    <!-- 最新评论模块 -->
    <div class="theme-box">
        <noTop :data="notopData" />
        <div class="box-body comment-mini-lists lz-widget">
            <div v-for="(v,i) in data" :key="i" class="posts-mini">
                <a :href="v.href">
                    <span class="avatar-img">
                        <img class="avatar lazyloaded" :src="v.author.img" :alt="v.authorname+'的头像'">
                    </span>
                </a>
                <div class="posts-mini-con flex xx jsb">
                    <p class="flex jsb">
                        <span class="flex1 flex">
                            <span class="inflex ac relative-h">
                                <a class="text-ellipsis " :href="'author/'+v.author.id">
                                    {{ v.author.name }}
                                </a>
                                <img class="ml3 img-icon medal-icon lazyloaded" :src="'src/assets/image/web/medal/medal-'+v.author.level+'.svg'" alt="'徽章-'资深玩家">
                            </span>
                            <span class="flex0 icon-spot muted-3-color" title="2021">
                                {{ v.time }}
                            </span>
                        </span>
                        <span class="flex0" style="margin-left: 10px;">
                            <a class="action action-comment-like pull-right muted-2-color">
                                <svg class="icon" aria-hidden="true" style="margin-right: 3px;">
                                    <use xlink:href="#icon-zan"></use>
                                </svg>
                                <span>{{v.like}}</span>
                            </a>
                        </span>
                    </p>
                    <a class="muted-color text-ellipsis-5" :href="'article'+v.comment.from+'#comment-'+v.comment.id">
                        {{ v.comment.content }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import noTop from 'c/notop.vue'
let notopData={
    title:'最新评论'
}
let data=[
    {
        author:{
            id:'1',
            name:'商界人士',
            img:'src/assets/image/avatar-default.png',
            level:'1'
        },
        href:'',
        time:'5个月前',
        comment:{
            id:222,
            content:'点赞！支持一下！',
            from:333
        },
        like:5
    },
    {
        author:{
            id:'1',
            name:'用户32056375',
            img:'src/assets/image/avatar-default.png',
            level:'1'
        },
        href:'',
        time:'5个月前',
        comment:{
            id:77,
            content:'点赞！支持一下！',
            from:333
        },
        like:6
    },
    {
        author:{
            id:'1',
            name:'商界人士',
            img:'src/assets/image/avatar-default.png',
            level:'1'
        },
        href:'',
        time:'5个月前',
        comment:{
            id:99,
            content:'点赞！支持一下！',
            from:333
        },
        like:8
    },
    {
        author:{
            id:'1',
            name:'商界人士',
            img:'src/assets/image/avatar-default.png',
            level:'1'
        },
        href:'',
        time:'5个月前',
        comment:{
            id:33,
            content:'点赞！支持一下！',
            from:333
        },
        like:10
    },
]
</script>
<style lang="scss">
.comment-mini-lists{
    &.lz-widget {
        padding: 5px;
    }
    .posts-mini-con{
        margin-left: 10px;
        font-size: .9em;
        p {
            margin-bottom: 6px;
            color: var(--focus-color);
            --main-color: var(--focus-color);
        }
    }
    .posts-mini-con {
        flex: auto;
        overflow: hidden;
    }
    .medal-icon{
        margin-left: 3px;
    }
}
.posts-mini {
    padding: 10px;
    display: inline-flex;
    width: 50%;
}

</style>