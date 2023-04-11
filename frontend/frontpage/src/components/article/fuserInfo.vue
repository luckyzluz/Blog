<template>
    <!-- 文章页面底部作者信息 -->
    <div class="user-card lz-widget author">
        <div class="card-content relative" style="margin-bottom: 10px;">
            <div class="user-content">
                <div class="user-avatar">
                    <a href="">
                        <span class="avatar-img avatar-lg">
                            <img class="avatar" src="src/assets/image/avatar-default.png" alt="">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="会员"
                                placement="top"
                            >
                                <img class="avatar-badge" src="src/assets/image/vip-1.svg" alt="">
                            </el-tooltip>
                        </span>
                    </a>
                </div>
                <div class="user-info">
                    <div class="user-name flex jc">
                        <span class="flex1 flex ac">
                            <a href="" class="display-name text-ellipsis ">老糖</a>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="官方成员"
                                placement="top"
                            >
                            <svg style="margin-left: 3px;" class="icon" aria-hidden="true">
                                <use xlink:href="#icon-a-authenticate3x"></use>
                            </svg>
                            </el-tooltip>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="备受瞩目"
                                placement="top"
                            >
                                <img style="margin-left: 3px;" class="img-icon medal-icon" src="src/assets/image/web/medal/medal-1.svg" alt="">
                            </el-tooltip>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="LV8"
                                placement="top"
                            >
                                <img style="margin-left: 3px;" class="img-icon" src="src/assets/image/user-level-1.png" alt="">
                            </el-tooltip>
                            <a href="" style="margin-left: 10px;" class="focus-color follow flex0 signin-loader">
                                <span>
                                    <i style="margin-right: 3px;" class="iconfont icon-hearto"></i>关注
                                </span>
                            </a>
                        </span>
                    </div>
                    <div style="margin-top: 10px;" class="author-tag mt10 mini-scrollbar">
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="共xx篇帖子"
                            placement="top"
                        >
                            <a class="but c-blue-2 tag-forum-post">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-wodetiezi"></use>
                                </svg>20
                            </a>
                        </el-tooltip>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="共xx篇文章"
                            placement="top"
                        >
                            <a class="but c-blue tag-posts">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-wendang"></use>
                                </svg>87
                            </a>
                        </el-tooltip>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="共xx条评论"
                            placement="top"
                        >
                            <a class="but c-green tag-comment">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-comment"></use>
                                </svg>87
                            </a>
                        </el-tooltip>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="共xx个粉丝"
                            placement="top"
                        >
                            <a class="but c-yellow tag-follow">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-xihuan"></use>
                                </svg>87
                            </a>
                        </el-tooltip>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="人气值 236W+"
                            placement="top"
                        >
                            <span class="badg c-red tag-view">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-redu1"></use>
                                </svg>236W+
                            </span>
                        </el-tooltip>
                    </div>
                    <div style="margin-top: 10px; font-size: .9em;text-align:start" class="user-desc muted-2-color">做个小网站，搞点小意思</div>
                </div>
            </div>
            <relatedCon />
        </div>
    </div>
</template>
<script setup>
import relatedCon from 'c/article/relatedCon.vue';
</script>
<style lang="scss">
.user-card {
    padding: 0;
    overflow: hidden;
}
.user-card {
    &.author {
        .card-content, .user-content {
            display: flex;
            align-items: center;
        }
        .card-content {
            // padding: 15px;
            margin-top: 10px;
            .user-content{
                margin-top: 0px;
            }
            &>div {
                width: 50%;
            }
        }
        .user-info {
            margin: 0 20px;
            overflow: hidden;
        }
    }
    span .display-name {
        font-size: 1.1em;
        font-weight: 700;
    }
}
.avatar-lg .avatar-badge {
    right: 0;
    bottom: 0;
}
</style>