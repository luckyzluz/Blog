<template>
    <!-- 回复（子）评论 -->
    <li class="comment byuser comment-author-user45133241 even thread-even depth-1" v-for="(v,i) in props.Data" :key="i" :id="'comment-'+v.comment_id">
                <ul class="list-inline">
                    <li class="comt-main" :id="'div-comment-'+v.comment_id">
                        <div class="comment-header" style="margin-bottom: 10px;">
                            <div class="author-box flex ac">
                                <a :href="'/author/'+v.user_info.user_id">
                                    <span class="avatar-img comt-avatar">
                                        <img class="avatar avatar-id-16147" :src="v.user_info.avatar_large" :alt="v.user_info.user_name">
                                    </span>
                                </a>
                                <span class="flex ac flex1">
                                    <a class="text-ellipsis font-bold" :href="'/author/'+v.user_info.user_id">
                                        {{ v.user_info.user_name }}
                                    </a>
                                    <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        content="初出茅庐"
                                        placement="top"
                                    >
                                        <img class="img-icon medal-icon" src="src/assets/image/web/medal/medal-1.svg" alt="" style="margin-left: 3px;">
                                    </el-tooltip>
                                    <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        content="LV2"
                                        placement="top"
                                    >
                                        <img src="src/assets/image/user-level-2.png" alt="" class="img-icon" style="margin-left: 3px;">
                                    </el-tooltip>
                                </span>
                                <a class="action action-comment-like muted-2-color flex0" style="margin-left: 10px;">
                                    <svg class="icon" aria-hidden="true" style="margin-right: 3px;">
                                        <use xlink:href="#icon-zan"></use>
                                    </svg>
                                    <span>{{ v.comment_info.digg_count }}</span>
                                </a>
                            </div>
                        </div>
                        <div class="comment-footer">
                            <div class="comment-content" style="margin-bottom: 10px;" :id="'comment-content-'+v.comment_id">
                                {{ v.comment_info.comment_content }}
                                <template v-if="v.comment_info.comment_pics&&v.comment_info.comment_pics.length!==0">
                                    <img v-for="(z,c) in v.comment_info.comment_pics" :key="c" :src="z.pic_url" alt="">
                                </template>
                            </div>
                            <div class="comt-meta muted-2-color">
                                <span class="comt-author" :title="v.comment_info.ctime">3天前</span>
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    :content="'回复给'+v.user_info.user_name"
                                    placement="top"
                                >
                                    <span class="reply-link">
                                        <a rel="nofollow" class="comment-reply-link" @click="openEdit(i)">回复</a>
                                    </span>
                                </el-tooltip>
                                <el-dropdown placement="bottom" trigger="click">
                                    <span class="dropdown drop-fixed-sm open" style="padding: 6px;">
                                        <a class="muted-color" style="padding: 6px;">
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-menu_2"></use>
                                            </svg>
                                        </a>
                                    </span>
                                    <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <a>
                                                <i class="iconfont icon-fasfa-exclamation-triangle iconfont-fw c-red" style="margin-right: 10px;"></i>举报
                                            </a>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                    </li>
                    <commentEdit v-if="commentEditActive==i" class="show" />
                </ul>
                <ul v-if="v.comment_info.comment_replys&&v.comment_info.comment_replys.length!==0" class="children">
                  <!-- <template v-for="(x,y) in v.comment_info.comment_replys" :key="y"> -->
                    <!-- <li class="comment byuser comment-author-user35887246 odd alt depth-2">
                        <ul class="list-inline">
                            <li class="comt-main" :id="'div-comment-'+x.reply_id"></li>
                        </ul>
                    </li> -->
                    <!--  v-if="x.comment_replys.reply_to_reply_id == '0'" -->
                    <commentListChild :Data="v.comment_info.comment_replys" />
                    <!-- <commentListChild  v-if="x.reply_to_reply_id == '0'" /> -->
                  <!-- </template> -->
                </ul>
                <!-- <commentListChild  :Data="data" /> reply_comment_id-->
            </li> 
</template>
<script setup>
import {ref,reactive} from 'vue';
let commentEditActive=ref(null);
let kValue=reactive({
    user_id:'user_id',
    comment_id:'comment_id',
    comment_content:'comment_content',
    user_info:'user_info',
    ctime:'ctime',
    avatar_large:'avatar_large',
    user_name:'user_name',
    comment_info:'comment_info',
    digg_count:'digg_count'
});

const props = defineProps({
    Data: {
        type: Array,
        default:() => {
            return []
            // {
                // title:'模块标题',
                // intro:'模块介绍',
                // info:'右侧按钮'
            // }
        }
    },
    index:{
        type:Number
    },
    Key:{
        type:String,
        default:''
    }
})
if(props.Key&&props.Key=='child'){
    kValue=reactive({
    user_id:'user_id',
    comment_id:'reply_id',
    comment_content:'reply_content',
    user_info:'user_info',
    ctime:'ctime',
    avatar_large:'avatar_large',
    user_name:'user_name',
    comment_info:'comment_info',
    digg_count:'digg_count'
});
}
const openEdit=(i)=>{
    commentEditActive.value=i;
}
console.log(props.Data)
// console.log(2233)
</script>
<style lang="scss">

</style>