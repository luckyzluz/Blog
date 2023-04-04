<template>
    <!-- 模块头部 -->
    <div class="notop">
            <div class="notop-title">
                {{ props.data.title }}
                <small>{{ props.data.intro }}</small>
                <div class="pull-right" v-if="props.data.info">
                    <a class="muted-2-color">
                        <i class="iconfont icon-arrowright"></i>
                        {{ props.data.info }}
                    </a>
                </div>
            </div>
        </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {
                title:'模块标题',
                intro:'模块介绍',
                // info:'右侧按钮'
            }
        }
    }
})
</script>
<style lang="scss">
.notop{
    padding-top: 0;
    padding: 15px;
    .notop-title{
        position: relative;
        padding-left: 1.2em;
        font-size: 15px;
        &::before{
            position: absolute;
            content: '';
            width: 4px;
            background: var(--theme-color);
            top: 10%;
            left: 2px;
            bottom: 10%;
            border-radius: 5px;
            box-shadow: 1px 1px 3px -1px var(--theme-color);
        }
        small{
            font-size: 80%;
            opacity: .7;
            margin-left: 10px;
        }
        .pull-right{
            float: right;
            margin-top: 3px;
            font-size: .9em;
            i{
                vertical-align: -8%
            }
        }
    }
}
</style>