<template>
    <!-- 评论编辑 -->
    <div  id="respond" class="mobile-fixed">
        <form id="commentform">
            <div class="flex ac">
                <div class="comt-title text-center flex0" style="margin-left: 10px;">
                    <div class="comt-avatar" style="margin-bottom: 10px;">
                        <img class="avatar" src="src/assets/image/avatar-default.png" alt="">
                    </div>
                    <p class="text-ellipsis muted-2-color">用户名称</p>
                </div>
                <div class="comt-box grow1">
                    <div class="action-text mb10 em09 muted-2-color">回复给istiqbal ismail</div>
                    <textarea placeholder="友好交流，请勿发纯表情，请勿灌水，会被封号喔" autoheight="true" maxheight="188" class="form-control grin" name="comment" id="comment" cols="100%" rows="4" tabindex="1" onkeydown="if(event.ctrlKey&amp;&amp;event.keyCode==13){document.getElementById('submit').click();return false};" style="height: 89px; overflow: hidden;"></textarea>
                    <div class="comt-ctrl relative">
                        <div class="comt-tips-right pull-right">
                            <a class="but c-red" id="cancel-comment-reply-link" style="margin-right: 3px;">取消</a>
                            <button id="submit" name="submit" class="but c-blue pw-1em">提交评论</button>
                        </div>
                        <div class="comt-tips-left">
                            <span  @click.stop="openMenu('smilie')" ref="smiliebtn" :class="['dropup relative smilie',openMenuActive=='smilie'?'open':'']">
                                <a class="but btn-input-expand input-smilie" style="overflow: hidden; position: relative; margin-right: 6px;">
                                    <i class="iconfont iconfont-fw icon-fasmileo"></i>
                                    <span class="">表情</span>
                                </a>
                                <div class="dropdown-menu" @click.stop="!openMenu">
                                    <div class="dropdown-smilie scroll-y mini-scrollbar">
                                        <a @click.stop="openMenu" class="smilie-icon" v-for="(v,i) in smilies">
                                            <img :src="v.url" :alt="v.name">
                                        </a>
                                    </div>
                                </div>
                            </span>
                            <span @click.stop="openMenu('code')" :class="['dropup relative code',openMenuActive=='code'?'open':'']">
                                <a class="but btn-input-expand input-code" style="margin-right: 6px;">
                                    <i class="iconfont icon-fa-code"></i>
                                    <span class="hide-sm">代码</span>
                                </a>
                                <div class="dropdown-menu" @click.stop="!openMenu">
                                    <div class="dropdown-code">
                                        <p>请输入代码：</p>
                                        <p>
                                            <textarea rows="6" tabindex="1" class="form-control input-textarea" placeholder="在此处粘贴或输入代码"></textarea>
                                        </p>
                                        <div class="text-right">
                                            <a type="submit" class="but c-blue pw-1em" href="javascript:;" style="overflow: hidden; position: relative;" @click.stop="openMenu">确认</a>
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <span @click.stop="openMenu('image')" :class="['dropup relative image',openMenuActive=='image'?'open':'']">
                                <a class="but btn-input-expand input-image" style="margin-right: 6px;">
                                    <i class="iconfont icon-fa-image"></i>
                                    <span class="hide-sm">图片</span>
                                </a>
                                <div class="dropdown-menu" @click.stop="!openMenu">
                                    <div class="tab-content">
                                        <div :class="['tab-pane fade dropdown-image',uploadWay=='url'?'active in':'']" id="image-tab-comment-1">
                                            <p>请填写图片地址：</p>
                                            <p><textarea rows="2" tabindex="1" class="form-control input-textarea" style="height:95px;" placeholder="http://..."></textarea></p>
                                            <div class="text-right">
                                                <a class="but c-yellow pw-1em" style="overflow: hidden; position: relative; margin-right: 10px;" @click="()=>{uploadWay='file'}">上传图片</a>
                                                <a type="submit" class="but c-blue pw-1em" @click.stop="openMenu">确认</a>
                                            </div>
                                        </div>
                                        <div :class="['tab-pane fade dropdown-image',uploadWay=='file'?'active in':'']" id="image-tab-comment-2">
                                            <p><a class="muted-color" @click="()=>{uploadWay='url'}"><i class="iconfont icon-angle-left" style="margin-right: 6px;"></i>填写图片地址</a></p>
                                            <div class="form-upload">
                                                <label style="width:100%;" class="pointer">
                                                    <div class="preview text-center" style="margin-bottom: 6px;">
                                                        <img style="width:100%;height:96px;object-fit:cover;" src="src/assets/image/web/upload-add.svg">
                                                    </div>
                                                    <input class="hide" type="file" id="input_comment_image_upload" zibupload="image_upload" accept="image/gif,image/jpeg,image/jpg,image/png" name="image_upload" action="image_upload">
                                                </label>
                                                <div class="text-right">
                                                    <button type="button" zibupload="submit" auto-submit="true" class="but jb-blue pw-1em input-expand-upload" name="submit" @click.stop="openMenu">确认上传</button>
                                                    <input type="hidden" data-name="action" data-value="user_upload_image">
                                                    <input type="hidden" id="upload_image_nonce" name="upload_image_nonce" value="f3c9cd390b">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { onMounted,ref} from 'vue';
let isLogin=true;
let openMenuActive=ref('');
let uploadWay=ref('url');
const smiliebtn=ref(null);
let smilies=[
    {
        name:'aoman',
        url:'src/assets/image/web/smilies/aoman.gif'
    },
    {
        name:'baiyan',
        url:'src/assets/image/web/smilies/baiyan.gif'
    },
    {
        name:'bishi',
        url:'src/assets/image/web/smilies/bishi.gif'
    },
    {
        name:'bizui',
        url:'src/assets/image/web/smilies/bizui.gif'
    },
    {
        name:'cahan',
        url:'src/assets/image/web/smilies/cahan.gif'
    },
    {
        name:'ciya',
        url:'src/assets/image/web/smilies/ciya.gif'
    },
    {
        name:'dabing',
        url:'src/assets/image/web/smilies/dabing.gif'
    },
    {
        name:'daku',
        url:'src/assets/image/web/smilies/daku.gif'
    },
    {
        name:'deyi',
        url:'src/assets/image/web/smilies/deyi.gif'
    },
    {
        name:'doge',
        url:'src/assets/image/web/smilies/doge.gif'
    },
    {
        name:'fadai',
        url:'src/assets/image/web/smilies/fadai.gif'
    },
    {
        name:'fanu',
        url:'src/assets/image/web/smilies/fanu.gif'
    },
    {
        name:'fendou',
        url:'src/assets/image/web/smilies/fendou.gif'
    },
    {
        name:'ganga',
        url:'src/assets/image/web/smilies/ganga.gif'
    },
    {
        name:'guzhang',
        url:'src/assets/image/web/smilies/guzhang.gif'
    },
    {
        name:'haixiu',
        url:'src/assets/image/web/smilies/haixiu.gif'
    },
    {
        name:'hanxiao',
        url:'src/assets/image/web/smilies/hanxiao.gif'
    },
    {
        name:'zuohengheng',
        url:'src/assets/image/web/smilies/zuohengheng.gif'
    },
    {
        name:'zhuakuang',
        url:'src/assets/image/web/smilies/zhuakuang.gif'
    },
    {
        name:'zhouma',
        url:'src/assets/image/web/smilies/zhouma.gif'
    },
    {
        name:'zhemo',
        url:'src/assets/image/web/smilies/zhemo.gif'
    },
    {
        name:'zhayanjian',
        url:'src/assets/image/web/smilies/zhayanjian.gif'
    },
    {
        name:'zaijian',
        url:'src/assets/image/web/smilies/zaijian.gif'
    },
    {
        name:'yun',
        url:'src/assets/image/web/smilies/yun.gif'
    },
    {
        name:'youhengheng',
        url:'src/assets/image/web/smilies/youhengheng.gif'
    },
    {
        name:'yiwen',
        url:'src/assets/image/web/smilies/yiwen.gif'
    },
    {
        name:'yinxian',
        url:'src/assets/image/web/smilies/yinxian.gif'
    },
    {
        name:'xu',
        url:'src/assets/image/web/smilies/xu.gif'
    },
    {
        name:'xieyanxiao',
        url:'src/assets/image/web/smilies/xieyanxiao.gif'
    },
    {
        name:'xiaoku',
        url:'src/assets/image/web/smilies/xiaoku.gif'
    },
    {
        name:'xiaojiujie',
        url:'src/assets/image/web/smilies/xiaojiujie.gif'
    },
    {
        name:'xia',
        url:'src/assets/image/web/smilies/xia.gif'
    },
    {
        name:'wunai',
        url:'src/assets/image/web/smilies/wunai.gif'
    },
    {
        name:'wozuimei',
        url:'src/assets/image/web/smilies/wozuimei.gif'
    },
    {
        name:'weixiao',
        url:'src/assets/image/web/smilies/weixiao.gif'
    },
    {
        name:'weiqu',
        url:'src/assets/image/web/smilies/weiqu.gif'
    },
    {
        name:'tuosai',
        url:'src/assets/image/web/smilies/tuosai.gif'
    },
    {
        name:'tu',
        url:'src/assets/image/web/smilies/tu.gif'
    },
    {
        name:'touxiao',
        url:'src/assets/image/web/smilies/touxiao.gif'
    },
    {
        name:'tiaopi',
        url:'src/assets/image/web/smilies/tiaopi.gif'
    },
    {
        name:'shui',
        url:'src/assets/image/web/smilies/shui.gif'
    },
    {
        name:'se',
        url:'src/assets/image/web/smilies/se.gif'
    },
    {
        name:'saorao',
        url:'src/assets/image/web/smilies/saorao.gif'
    },
    {
        name:'qiudale',
        url:'src/assets/image/web/smilies/qiudale.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
    {
        name:'qinqin',
        url:'src/assets/image/web/smilies/qinqin.gif'
    },
//     qiaoda
// piezui
// penxue
// nanguo
// liulei
// liuhan
// lenghan
// leiben
// kun
// kuaikule
// ku
// koubi
// kelian
// keai
// jingya
// jingxi
// jingkong
// jie
// huaixiao
// haqian
// aini
// OK
// qiang
// quantou
// shengli
// woshou
// gouyin
// baoquan
// aixin
// bangbangtang
// xiaoyanger
// xigua
// hexie
// pijiu
// lanqiu
// juhua
// hecai
// haobang
// caidao
// baojin
// chi
// dan"
// kulou
// shuai
// shouqiang
// yangtuo
// youling


]
onMounted(()=>{
    window.addEventListener('click',()=>{
        openMenuActive.value='';
        })
})
const openMenu=(value)=>{
    openMenuActive.value=value;
}
</script>
<style lang="scss">
.comment-signarea {
    background: var(--main-shadow);
}
.badg.badg-lg, .but.padding-lg, .padding-lg {
    padding: .5em 2em;
}
#comments .comt-title {
    width: 90px;
    .comt-avatar .avatar {
        width: 60px;
        height: 60px;
    }
}
#comments #cancel-comment-reply-link, #comments .action-text {
    display: none;
}
#comment {
    margin-bottom: 5px;
}
#comments #cancel-comment-reply-link, #comments .action-text {
    display: none;
}
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 4px;
    box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
}
.dropdown-menu {
    border-color: transparent;
    background: var(--main-bg-color);
    --this-color: var(--main-color);
    color: var(--this-color);
    box-shadow: 0 0 10px 8px var(--main-shadow);
    min-width: 100px;
    opacity: 0;
    transform: translateY(6px);
    transition: .3s;
    display: block;
    margin-top: 6px;
    visibility: hidden;
    list-style: none!important;
    z-index: 992;
}
.dropdown-menu::before, .private-content::before {
    content: " ";
    display: inline-block;
    width: 9px;
    height: 9px;
    background: var(--main-bg-color);
    position: absolute;
    top: 12px;
    transform: rotate(45deg);
    left: -4px;
    border-radius: 2px;
}
.dropup .dropdown-menu::before {
    top: auto;
    bottom: -4px;
    left: 11px;
}
.dropup .dropdown-menu, .navbar-fixed-bottom .dropdown .dropdown-menu {
    top: auto;
    bottom: 100%;
    margin-bottom: 2px;
}
.focus-show:focus~.dropdown-menu, .open>.dropdown-menu {
    visibility: unset;
    opacity: 1;
    transform: translateY(0);
}
.dropdown-smilie {
    width: 260px;
    height: 300px;
    padding: 8px 10px;
    white-space: inherit;
    text-align: center;
    .smilie-icon {
        display: inline-block;
        padding: 3px;
        width: 38px!important;
    }
}
.dropdown-code, .dropdown-image {
    width: 250px;
    padding: 8px 10px;
}
.dropdown-menu .preview img, .modal-upload .preview img {
    max-height: 300px;
    border-radius: 6px;
    -o-object-fit: contain;
    object-fit: contain;
}
</style>