<template>
    <!-- 文章页面 -->
    <ul class="breadcrumb">
        <li>
            <a href="/">
                <i class="iconfont icon-mapmarker"></i>首页
            </a>
        </li>
        <li>
            <a :href="'/'+data.category.en">{{ data.category?data.category.name:'未分类' }}</a>
        </li>
        <li v-if="data.category.subcategory&&JSON.stringify(data.category.subcategory)!=='{}'">
            <a :href="'/'+data.category.en+'/'+data.category.subcategory.en">{{ data.category.subcategory.name }}</a>
        </li>
        <li>正文</li>
    </ul>
    <!-- 文章正文 -->
    <article class="article main-bg theme-box box-body radius main-shadow">
        <div class="article-header theme-box clearfix relative">
            <div class="article-title">
                <a :href="'article/'+data.id">
                    {{ data.title }}
                    <span>[{{ data.sub }}]</span>
                </a>
            </div>
            <div class="article-avatar">
                <div class="user-info flex ac article-avatar">
                    <a :href="'author/'+data.author.id">
                        <span class="avatar-img">
                            <img class="avatar" :src="data.author.img" :alt="data.author.name+'的头像'">
                            <img class="avatar-badge" :src="'src/assets/image/vip-'+data.author.level+'.svg'" alt="推广会员">
                        </span>
                    </a>
                    <div class="user-right flex flex1 ac jsb">
                        <div class="flex1">
                            <span class="flex ac flex1">
                                <a class="text-ellipsis " :href="'author/'+data.author.id">{{ data.author.name }}</a>
                                <el-tooltip
                                    class="box-span"
                                    effect="dark"
                                    content="网站官方成员"
                                    placement="top"
                                    v-if="data.author.identity=='admin'"
                                >
                                    <span class="user-auth-icon" style="margin-left: 3px;">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-a-authenticate3x"></use>
                                        </svg>
                                    </span>
                                </el-tooltip>
                                <el-tooltip
                                    class="box-span"
                                    effect="dark"
                                    content="备受瞩目"
                                    placement="top"
                                >
                                    <img class="img-icon medal-icon" :src="'src/assets/image/web/medal/medal-'+data.author.level+'.svg'" alt="徽章-备受瞩目" style="margin-left: 3px;">
                                </el-tooltip>
                                <el-tooltip
                                    class="box-span"
                                    effect="dark"
                                    :content="'LV'+data.author.level"
                                    placement="top"
                                >
                                    <img class="img-icon" :src="'src/assets/image/user-level-'+data.author.level+'.png'" :alt="'等级-LV'+data.author.level" style="margin-left: 3px;">
                                </el-tooltip>
                            </span>
                            <div class=" muted-2-color text-ellipsis">
                                <el-tooltip
                                    class="box-span"
                                    effect="dark"
                                    content="2021年12月30日 13:12发布"
                                    placement="bottom"
                                >
                                    <span>{{ data.time }}个月前更新</span>
                                </el-tooltip>
                            </div>
                        </div>
                        <div class="flex0 user-action">
                            <a class="but c-red" style="margin-left: 10px;">
                                <span>
                                    <i class="iconfont icon-hearto" style="margin-right: 3px;"></i>关注
                                </span>
                            </a>
                            <a class="but c-blue" style="margin-left: 6px;">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-sixin"></use>
                                </svg>私信
                            </a>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <i class="line-form-line"></i>
                    <div class="flex ac single-metabox abs-right">
                        <div class="post-metas">
                            <el-tooltip
                                class="box-span"
                                effect="dark"
                                content="去评论"
                                placement="top"
                            >
                                <span class="meta-comm">
                                    <a href="javascript:(scrollTo('#comments',-50));" data-original-title="">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-xiaoxi1"></use>
                                        </svg>41
                                    </a>
                                </span>
                            </el-tooltip>
                            <span class="meta-view">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yuedu"></use>
                                </svg>9281
                            </span>
                            <span class="meta-like">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-zan"></use>
                                </svg>101
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="article-content">
            <div  v-html="ooppq"  @click="operateCode($event)" class="theme-box lz-posts-content">
            </div>
            <!--v-highlight <div class="theme-box lz-posts-content">
                <p>使用WordPress建站，那么第三方登录肯定是必不可少的，子比主题支持丰富的社交帐号登录，当然少不了现在最常用的微信登录了，但是大家都知道，使用微信公众号登录需要认证的服务号，认证需要花费300元每年，而部分站长并没有服务号的需求，所以这个功能就不能使用了！</p>
                <p>但是！现在子比主题已支持订阅号、未认证的公众号进行扫码登录了！</p>
                <h2 id="wznav_0">效果预览</h2>
                <p>首先我看一下微信公众号的登录页面预览：</p>
                <figure class="lz-block-image size-full">
                    <img alt="图片[1]-" width="1236" height="878" src="https://mimg.127.net/vip/newindex/img/bg/vip188/bg1.jpg" sizes="(max-width: 1236px) 100vw, 1236px">
                </figure>
                <div class="lz-block-quote">
                    <div class="quote_q" style="--quote-color:#fb2121">
                        <i class="iconfont icon-quoteleft"></i>
                        <p>此功能需升级zibll子比主题至V6.8及以上版本</p>
                    </div>
                </div>
                <p><strong>功能简介：</strong></p>
                <ul>
                    <li>订阅号以及未认证的公众号接口权限缺少很多，我们通过公众号获取验证码的方式进行登录接入</li>
                    <li>用户登录流程为：点击微信登录，扫码关注公众号，公众号会自动回复一个验证码，用户输入验证码登录</li>
                    <li>已经关注的用户可以发送”登录“，重新获取验证码进行登录</li>
                    <li>发送的关键词以及自动回复模板都支持自定义</li>
                </ul>
                <h2 id="wznav_1">接入教程</h2>
                <p>接下来我们就一步一步的开始接入教程，首先我们整理一下，大致为以下流程：</p>
                <ol>
                    <li>申请并开通微信公众号，<span style="color:#f85722" class="has-inline-color">无需认证，订阅号也可以</span></li>
                    <li>获取AppID和AppSecret并填入主题设置</li>
                    <li><strong>添加微信公众号IP白名单</strong></li>
                    <li><strong>设置微信公众号的服务器URL配置</strong></li>
                </ol>
                <p>申请微信公众号以及认证百度已经有很多教程了，按照流程一步一步来就行了，这里就不在阐述了。</p>
                <p>接下来针对已经申请并认证成功的微信公众号做详细的接入教程。</p>
                <p><span style="color:#08B89A;background:undefined">如果您有已经认证的服务号需要接入，请查看以下教程：</span></p>
                <div class="lz-block-postsbox">
                    <div class="article-postsbox relative-h radius">
                        <div class="abs-blur-bg">
                            <img src="https://mimg.127.net/vip/newindex/img/bg/vip188/bg1.jpg" alt="Zi" class="fit-cover radius no-imgbox">
                        </div>
                        <div class="posts-mini posts-span relative">
                            <div class="mr10">
                                <div class="item-thumbnail">
                                    <a href="https://www.zibll.com/2206.html">
                                        <img src="https://mimg.127.net/vip/newindex/img/bg/vip188/bg1.jpg" alt="Zi" class="fit-cover radius no-imgbox">
                                    </a>
                                </div>
                            </div>
                            <div class="posts-mini-con flex xx flex1 jsb">
                                <div class="item-heading text-ellipsis-2 main-color">
                                    <a class="main-color" href="https://www.zibll.com/2206.html">Zibll子比主题-第三方登录-接入微信公众号扫码登录图文教程</a>
                                </div>
                                <div class="item-meta muted-2-color flex jsb ac">
                                    <span class="meta-author flex ac">
                                        <a href="https://www.zibll.com/author/1">
                                            <span class="avatar-mini">
                                                <img alt="老糖的头像-" src="src/assets/image/avatar-default.png" class="avatar">
                                                <img class="avatar-badge" src="src/assets/image/vip-1.svg" title="" alt="推广会员">
                                            </span>
                                        </a>
                                        <span title="2021-06-29 14:11:07">2年前</span>
                                    </span>
                                    <div class="meta-right">
                                        <span class="meta-comm">
                                            <el-tooltip
                                                class="box-item"
                                                effect="dark"
                                                content="去评论"
                                                placement="top"
                                            >
                                                <a title="" href="https://www.zibll.com/2206.html#comments">
                                                    <svg class="icon" aria-hidden="true">
                                                        <use xlink:href="#icon-comment"></use>
                                                    </svg>23
                                                </a>
                                            </el-tooltip>
                                        </span>
                                        <span class="meta-view">
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-yuedu"></use>
                                            </svg>1.3W+
                                        </span>
                                        <span class="meta-like">
                                            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-zan"></use>
                                            </svg>43
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 id="wznav_2">获取AppID和AppSecret</h3>
                <p>登录<a rel="noreferrer noopener" aria-label="微信公众号平台（在新窗口打开）" href="https://www.zibll.com/?golink=aHR0cHM6Ly9tcC53ZWl4aW4ucXEuY29t" target="_blank">微信公众号平台</a>，进入<span style="color:#1F91F3;background:undefined">设置与开发-&gt;开发-&gt;基本配置</span></p>
                <p>1.获取AppID和AppSecret并填入<span style="color:#1F91F3;background:undefined">主题设置-&gt;用户&amp;互动-&gt;社交登录-&gt;微信登录(公众号模式)</span></p>
                <p>2.点击配置<span style="color:#1F91F3;background:undefined">IP白名单</span>，将网站服务器的IP地址加入到白名单</p>
                <div class="lz-block-image">
                    <figure class="aligncenter size-large is-resized">
                        <img alt="图片[2]-WordPress接入未认证微信公众号订阅号使用微信扫码登录教程-Wordpress主题模板-zibll子比主题" decoding="async" src="https://mimg.127.net/vip/newindex/img/bg/vip188/bg1.jpg" class="lz-image-2210" width="500" sizes="(max-width: 1706px) 100vw, 1706px">
                    </figure>
                </div>
                <h3 id="wznav_3">微信公众号的服务器URL配置</h3>
                <p>首先进入<span style="color:#1F91F3;background:undefined">主题设置-&gt;用户&amp;互动-&gt;社交登录-&gt;微信登录(公众号模式)</span>：复制<code>服务器接口URL</code>，并设置一个Token并保存！<br>然后进入<span style="color:#1F91F3;background:undefined">公众号平台-&gt;设置与开发-&gt;开发-&gt;基本配置-&gt;服务器配置</span>：点击修改，填写复制的<code>接口URL</code>以及Token<br>保存成功之后，记得点击<span style="color:#1F91F3;background:undefined">启用</span></p>
                <p>注意事项：</p>
                <ul><li>token可以随意填写，主题设置和微信平台保持一致即可</li><li>必须先设置主题设置的token并保存，然后再去微信公众号平台提交服务器配置，顺序反了则会失败</li><li>消息加解密方式必须选择<span style="color:#fb2121;background:undefined">明文模式</span></li><li>提交成功之后记得启用服务器配置</li></ul>
                <h2 id="wznav_4">其他配置</h2>
                <p>最后我们还需要上传我们公众号的二维码，同时根据需要设置验证码回复模板即可</p>
                <hr class="lz-block-separator is-style-dots">
                <div class="lz-block-buttons radius">
                    <span class="an_1 but jb-blue">
                        <a href="https://www.zibll.com/zibll_word/user-function">查看更多登录教程</a>
                    </span>
                </div>
            </div> -->
            <!-- 版权 -->
            <div class="muted-3-color" style="font-size: .9em;">
                <div>
                    <span>©</span> 版权声明
                </div>
                <div class="posts-copyright">
                    分享是一种美德，转载请保留原链接
                </div>
            </div>
            <!-- end -->
            <div class="text-center theme-box muted-3-color box-body separator" style="font-size: .9em;">
                THE END
            </div>
            <!-- 文章标签 -->
            <div class="theme-box article-tags">
                <a class="but ml6 radius c-blue" title="查看更多分类文章" href="https://www.zibll.com/zibll_word/user-function">
                    <i class="iconfont icon-folder" aria-hidden="true"></i>用户功能
                </a>
                <br>
                <a href="https://www.zibll.com/tag/%e7%ac%ac%e4%b8%89%e6%96%b9%e7%99%bb%e5%bd%95" title="查看此标签更多文章" class="but ml6 radius"># 第三方登录</a>
                <a href="https://www.zibll.com/tag/%e5%be%ae%e4%bf%a1%e7%99%bb%e5%bd%95" title="查看此标签更多文章" class="but ml6 radius"># 微信登录</a>
                <a href="https://www.zibll.com/tag/%e5%be%ae%e4%bf%a1%e5%85%ac%e4%bc%97%e5%8f%b7" title="查看此标签更多文章" class="but ml6 radius"># 微信公众号</a><a href="https://www.zibll.com/tag/%e7%a4%be%e4%ba%a4%e8%b4%a6%e5%8f%b7%e7%99%bb%e5%bd%95" title="查看此标签更多文章" class="but ml6 radius"># 社交账号登录</a>
            </div>
        </div>
        <div class="text-center muted-3-color box-body" style="font-size: .9em;">文章不错？点个赞呗</div>
        <Interact />
    </article>
    <fuserInfo />
    <farticleNav />
    <frelatedCon />
    <Comments />
</template>
<script setup>
import {ref,computed,onMounted} from 'vue'
import Interact from 'c/article/interact.vue'
import fuserInfo from 'c/article/fuserInfo.vue'
import farticleNav from 'c/article/farticleNav.vue'
import frelatedCon from 'c/article/frelatedCon.vue'
import Comments from 'c/article/comments.vue'
import  {marked}  from 'marked'
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/dracula.css' //样式
let data={
    id:'12365',
    title:'第三方登录-网站接入未认证的微信公众号或订阅号扫码登录教程',
    sub:'V6.8新功能',
    author:{
        id:1,
        name:'老糖',
        identity:'admin',
        img:'src/assets/image/avatar-default.png',
        level:1
    },
    time:'5',
    category:{
        name:'主题文档',
        en:'lz_word',
        subcategory:{
            name:'用户功能',
            en:'user_func',
        }
    }
}
let cont= ref("## 1.测试标题\n### 1.1测试标题\n你好你好你好啊\n### 1.2测试标题\n你好你好你好啊\n```javascript\nfunction $initHighlight(block, cls) {\ntry {\n  if (cls.search(/\/bno\/-highlight\/b/) != -1)\nreturn process(block, true, 0x0F) +\n` class='${cls}''`;\n} catch (e) {\n/* handle exception */\n}\nfor (var i = 0 / 2; i < classes.length; i++) {\nif (checkCondition(classes[i]) === undefined)\nconsole.log('undefined');\n}\nreturn (\n<div>\n<web-component>{block}</web-component>\n</div>\n)\n}\nexport  $initHighlight;\n```\n## 2.测试标题\n### 2.1测试标题\n```javascript\nvar xx={\nxx:123,\ngg:6369\n}\n```\n#### 2.11你好\n你好你好你好啊\n#### 2.12你好\n**你好**你好你好啊\n")
onMounted(()=>{
    console.log(toTree(getCatalog()))
})

const operateCode=(e)=>{
    // console.log(e.target) // .parentElement.nextElementSibling
    if(Array.from(e.target.classList).includes('expand')){
        if(Array.from(e.target.classList).includes('closed')){
            e.target.classList.remove('closed');
            e.target.parentElement.nextElementSibling.style="display:block;"
        }else{
            e.target.classList.add('closed');
            e.target.parentElement.nextElementSibling.style="display:none;"
        }
    }else if(Array.from(e.target.classList).includes('copy-button')){
        if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
            .writeText(e.target.parentElement.nextElementSibling.querySelector('.code pre').innerText)
            .then(() => {
                ElNotification.success({
                    title: '温馨提示：',
                    message: '代码复制成功',
                    showClose: false,
                })
            })
            .catch(() => {
                ElNotification.success({
                    title: '温馨提示：',
                    message: '代码复制失败',
                    showClose: false,
                })
            })
    }else {
        // 创建text area
        const textArea = document.createElement('textarea');
        textArea.value = e.target.parentElement.nextElementSibling.querySelector('.code pre').innerText;
        // 使text area不在viewport，同时设置不可见
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        return new Promise((resolve, reject) => {
            // 执行复制命令并移除文本框
            document.execCommand('copy') ? resolve() : reject(new Error('出错了'))
            textArea.remove()
        }).then(
            () => {
                ElNotification.success({
                    title: '温馨提示：',
                    message: '代码复制成功',
                    showClose: false,
                })
            },
            () => {
                ElNotification.success({
                    title: '温馨提示：',
                    message: '代码复制失败',
                    showClose: false,
                })
            }
        )
    }}
}

class MyRenderer extends marked.Renderer {
  code(code, language) {
    const validLang=!!(language && hljs.getLanguage(language));
    let codeStr=`<figure class="highlight ${language}"><div class="highlight-tools mac_style"><i class="iconfont icon-arrowdown expand"></i><div class="code-lang">${language}</div><div class="copy-notice"></div><i class="iconfont icon-paper copy-button"></i></div><table><tbody><tr>`;
        let lineNum=`<td class="gutter"><pre>`;
        let codestr=`<td class="code"><pre>`;
            let codess=code.split("\n");
    for(let i=0;i<codess.length;i++){
        lineNum+=`<span class="line">${i+1}</span><br />`
        codestr+=`<span class="line">${validLang?hljs.highlight(codess[i].replace(/</g,"&lt;").replace(/>/g,"&gt;"),{language,ignoreIllegals: true,tabReplace: '  ',useBR: true}).value:codess[i].replace(/</g,"&lt;").replace(/>/g,"&gt;")}</span><br />`
    }
    // ${validLang?hljs.highlight(language,codess[i].replace(/</g,"&lt;").replace(/>/g,"&gt;")).value:codess[i].replace(/</g,"&lt;").replace(/>/g,"&gt;")}
    lineNum+='</pre></td>';
    codestr+=`</pre></td>`
    codeStr+=lineNum;
    codeStr+=codestr;
    codeStr+='</tr></tbody></table></figure>';
    
    return codeStr;
    
  }
}
const renderer = new MyRenderer()
marked.setOptions({
  renderer: renderer, // 这是必填项
  gfm: true,	// 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
	// 高亮的语法规范
//   highlight: (code, lang) =>{console.log(code); return hljs.highlight(code, { language: lang }).value;},
})
let ooppq = computed(()=>{
    return marked(cont.value);
})
const getCatalog=()=>{
    // const h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    let xx=document.querySelector('.lz-posts-content').querySelectorAll("h1,h2,h3,h4,h5,h6");
    // console.log(xx[0].innerText)
    let hEles = []
    xx.forEach((v,i)=>{
        // console.log(v.nodeName.slice(-1));
        hEles.push({hLevel:v.nodeName.slice(-1),title:v.innerText});
    })
    // console.log(hEles)
    return hEles;
}
const toTree=(flatArr)=>{
    var tree = [];
  var copyArr = flatArr.map(function (item) { return item; });

  // 根据指定级别查找该级别的子孙级，并删除掉已经查找到的子孙级
  var getChildrenByLevel = function (currentLevelItem, arr, level) {
    // 这里做一个判断，不存在一级标题，则直接返回
    if(!currentLevelItem){
      return;
    }
    // 将level值转成负数，再进行比较
    var minusCurrentLevel = -currentLevelItem.hLevel;
    var children = []; // 一级标题下的子集
    for(var i = 0; i < arr.length; i++){
      var levelItem = arr[i];
      if(-levelItem.hLevel < minusCurrentLevel){ // 将小于hlevelnum的标题插入数组
        children.push(levelItem);
      }else { // 只找那些子孙级（同级或上一级放过）
        break;
      }
    }
    // 从数组中删除已经找到的那些子孙级，以免影响到其他子孙级的查找
    if(children.length > 0){
        // 因为我们是按照顺序获取的文档节点，所以按顺序删
      arr.splice(0, children.length);
    }
    return children;
  }

  var getTree = function (result, arr, level) {
    // 首先将数组第一位移除掉，并添加到结果集中
    var currentItem = arr.shift();
    currentItem.level = level; // 设置当前层级
    result.push(currentItem); // 插入数组
    // console.log('arr',arr)
    // 开始循环目标数组
    while (arr.length > 0){
        // 这里做一个判断，不存在一级标题，则直接返回
      if(!currentItem){
        return;
      }
      // 根据当前级别获取它的子孙级
      var children = getChildrenByLevel(currentItem, arr, level);
      // 如果当前级别没有子孙级则开始下一个
      if(children.length == 0){
        currentItem = arr.shift();  //删除当前级别数据
        currentItem.level = level;  // 设置级别
        if(currentItem){
          result.push(currentItem); // 数据存在插入结果集
        }
        continue; // 跳过当次循环,就不会执行下面的空数组赋值了
      }
    //   console.log('33223',children)
      currentItem.children = [];
      // 查找到的子孙级继续查找子孙级
      getTree(currentItem.children, children, level + 1);
    }
  }
  getTree(tree, copyArr, 1);

  return tree;
}
const toTree1=(flatArr)=>{
    var resultArr = []; // 结果集数组
    var stack = []; // 栈数组
    flatArr.forEach((levelItem, index) => {
      levelItem.children = [];
      if (resultArr.length == 0) { // 第一次循环时没有任何内容，则默认将第一个元素入栈
        levelItem.parentCollector = resultArr; // 存储父级

        stack.push(levelItem);
        resultArr.push(levelItem);
      } else {
        let lastestLeveInStack = stack[stack.length - 1]; // 获取栈顶的元素，即最近如入栈的元素

        if (lastestLeveInStack.hLevel < levelItem.hLevel) { // 遇到子级节点
          levelItem.parentCollector = lastestLeveInStack.children;

          stack.push(levelItem);
          lastestLeveInStack.children.push(levelItem);
        } else if (lastestLeveInStack.hLevel == levelItem.hLevel) {// 遇到同级节点
          levelItem.parentCollector = lastestLeveInStack.parentCollector;

          stack.push(levelItem); // 将当前元素入栈
          lastestLeveInStack.parentCollector.push(levelItem);
        } else {
          let lastestLeveParentCollector = lastestLeveInStack.parentCollector;
          let lastestLeveParentIndex = stack.findIndex(function (leveItem) {
            return leveItem.children === lastestLeveParentCollector;
          });

          if (lastestLeveParentIndex > -1) {
            // 栈顶节点的父级节点
            let lastestLeveParent = stack[lastestLeveParentIndex];

            if (lastestLeveParent.level < levelItem.level) { // 当前节点为栈顶节点父节点的子级
              levelItem.parentCollector = lastestLeveParent.children;

              lastestLeveParent.children.push(levelItem);
              stack.push(levelItem);
              return;
            }

            // 移除栈顶节点父级节点及其以后的所有节点
            stack.splice(lastestLeveParentIndex);

            if (stack.length == 0) { // 如果栈空了则该节点为顶层节点
              levelItem.parentCollector = resultArr;

              stack.push(levelItem);
              resultArr.push(levelItem);
              return;
            }

            lastestLeveInStack = stack[stack.length - 1];
            lastestLeveParent = lastestLeveInStack.parentCollector;

            if (lastestLeveInStack.level < levelItem.level) { // 当前节点为栈顶节点的子节点
              levelItem.parentCollector = lastestLeveInStack.children;
              stack.push(levelItem);
              lastestLeveInStack.children.push(levelItem);
            } else { // 当前节点为栈顶节点的兄弟节点
              let lastestLeveParentCollector = lastestLeveInStack.parentCollector;
              let collector = stack.find(function (leveItem) {
                return leveItem.children === lastestLeveParentCollector;
              });
              // 如果栈顶节点的父级节点的级别比当前节点级别大，则继续往上查找
              while (collector && collector.level >= levelItem.level) {
                lastestLeveParentCollector = collector.parentCollector;
                collector = stack.find(function (leveItem) {
                  return leveItem.children === lastestLeveParentCollector;
                });
              }
              if (!collector) {
                levelItem.parentCollector = resultArr;
                stack.push(levelItem);
                resultArr.push(levelItem);
              } else {
                levelItem.parentCollector = collector.children;
                collector.children.push(levelItem);
                stack.push(levelItem);
              }
            }
          } else {
            console.log('kkkkkkkkkkkkkkk');
          }
        }
      }
    });
    // 移除元素的parentCollector属性
    flatArr.forEach(levelItem => {
      if (levelItem.parentCollector) {
        delete levelItem.parentCollector;
      }
      if (levelItem.children.length == 0) {
        delete levelItem.children;
      }
    });
    return resultArr;
}
</script>
<style lang="scss">
figure.highlight .highlight-tools.mac_style {
    .expand {
        right: 0;
        ~ .copy-button {
            right: 2.1em;
        }
    }
    .code-lang {
        left: 75px;
    }
    &:after {
        position: absolute;
        left: 14px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #fc625d;
        -webkit-box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
        box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
        content: ' ';
    }
}
.lz-posts-content{
    figure.highlight {
        box-shadow: 0 5px 10px 0 rgb(255 255 255 / 40%);
        position: relative;
        border-radius: 10px;
        table {
            display: block;
            overflow: auto;
            border: none;
            td {
                padding: 0;
                border: none;
                &:first-child{
                    user-select: none;
                }
            }
        }
        pre {
            margin: 0;
            padding: 8px 0;
            border: none;
        }
        pre,  code {
            font-size: 14px;
            font-family: consolas, Menlo, "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", sans-serif !important;
        }
        .gutter pre {
            padding-right: 10px;
            padding-left: 10px;
            background-color: var(--hlnumber-bg);
            color: var(--hlnumber-color);
            text-align: right;
        }
    }
    pre, figure.highlight {
        overflow: auto;
        margin: 0 0 1rem;
        padding: 0;
        background: var(--hl-bg);
        color: var(--hl-color);
        line-height: 1.6;
    }
    .highlight-tools {
        position: relative;
        display: -webkit-box;
        display: -moz-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: box;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        -o-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        overflow: hidden;
        min-height: 1.2rem;
        height: 2.15em;
        background: var(--hltools-bg);
        color: var(--hltools-color);
        font-size: 14px;
        i{
            font-weight: 900;
        }
        .expand{
            position: absolute;
            padding: 0.4rem 0.7rem;
            cursor: pointer;
            -webkit-transition: -webkit-transform 0.3s;
            -moz-transition: -moz-transform 0.3s;
            -o-transition: -o-transform 0.3s;
            -ms-transition: -ms-transform 0.3s;
            transition: transform 0.3s;
            &.closed {
                -webkit-transition: all 0.3s;
                -moz-transition: all 0.3s;
                -o-transition: all 0.3s;
                -ms-transition: all 0.3s;
                transition: all 0.3s;
                -webkit-transform: rotate(
            -90deg) !important;
                -moz-transform: rotate(-90deg) !important;
                -o-transform: rotate(-90deg) !important;
                -ms-transform: rotate(-90deg) !important;
                transform: rotate(
            -90deg) !important;
            }
            &+ .code-lang {
                left: 1.7rem;
            }
        }
        .code-lang {
            position: absolute;
            left: 0.7rem;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 1.15em;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .copy-notice {
            position: absolute;
            right: 1.7rem;
            opacity: 0;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
            filter: alpha(opacity=0);
            -webkit-transition: opacity 0.4s;
            -moz-transition: opacity 0.4s;
            -o-transition: opacity 0.4s;
            -ms-transition: opacity 0.4s;
            transition: opacity 0.4s;
        }
        .copy-button {
            position: absolute;
            right: 0.7rem;
            cursor: pointer;
            -webkit-transition: color 0.2s;
            -moz-transition: color 0.2s;
            -o-transition: color 0.2s;
            -ms-transition: color 0.2s;
            transition: color 0.2s;
        }
    }
}
.breadcrumb {
    background: 0 0;
    padding: 0 8px;
    opacity: .6;
    margin-bottom: 12px;
    border-radius: 4px;
    &>li{
        display: inline-block;
        &+li:before {
            content: "/\00a0";
            color: #ccc;
            padding: 0 0 0 6px;
            opacity: .6;
        }
    }
}
.article {
    padding: 0 30px;
    overflow: hidden;
    .user-right{
        margin-left: 10px;
    }
    .post-actions {
        padding-bottom: 15px;
    }
    .action {
        width: 80px;
        padding: 10px 0;
        display: inline-block;
        opacity: .7;
        vertical-align: top;
        .icon {
            font-size: 24px;
            width: 100%;
            margin: 5px 0;
        }
        span {
            opacity: .7;
            font-size: .9em;
            &:nth-of-type(2){
                margin-left: 2px;
            }
        }
        &:hover {
            color: inherit;
            opacity: 1;
        }
    }
}
.article-header .article-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--key-color);
    line-height: 1.4;
    &>a:hover {
        color: inherit;
    }
}
.article-header .article-avatar, .article-header .article-title {
    margin-top: 15px;
}
.avatar-badge, .swiper-slide img.avatar-badge {
    width: calc(var(--this-size)/ 2.5);
    height: calc(var(--this-size)/ 2.5);
    max-width: 25px;
    max-height: 25px;
    min-width: 10px;
    min-height: 10px;
    position: absolute;
    right: -1px;
    bottom: -1px;
    overflow: hidden;
}
.article-header .article-avatar .relative {
    margin-top: 20px;
}
.single-metabox {
    .post-metas {
        background: var(--body-bg-color);
        right: 0;
        padding: 2px 6px;
        border-radius: 100px;
        color: var(--meta-color);
    }
    .post-metas span {
        margin: 0 6px;
        a {
            color: inherit;
        }
    }
}
.lz-posts-content {
    line-height: 2;
    font-size: 16px;
    min-height: 90px;
    p {
        margin-bottom: 20px;
        word-wrap: break-word;
    }
    h2 {
        font-size: 18px;
    }
    h3 {
        font-size: 16px;
    }
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: auto;
    }
    ul {
        list-style: disc;
    }
    ol {
        list-style: decimal;
    }
    li {
        margin-bottom: 10px;
    }
    .aligncenter {
        display: table;
        margin: auto;
    }
    code:not([class]) {
        color: #ff3c98;
        background-color: rgba(253,153,153,.2);
        margin: 2px;
    }
}
.lz-posts-content h1, .lz-posts-content h2, .lz-posts-content h3, .lz-posts-content h4, .lz-posts-content h5 {
    margin: 20px 0;
    font-weight: 700;
}
.tab-nav-theme li:before, .title-h-center:before, .title-h-left:before, .title-theme:before, .lz-posts-content>h1.has-text-align-center:before, .lz-posts-content>h1.lz-block-heading:before, .lz-posts-content>h1:not([class]):before, .lz-posts-content>h2.has-text-align-center:before, .lz-posts-content>h2.lz-block-heading:before, .lz-posts-content>h2:not([class]):before, .lz-posts-content>h3.has-text-align-center:before, .lz-posts-content>h3.lz-block-heading:before, .lz-posts-content>h3:not([class]):before, .lz-posts-content>h4.has-text-align-center:before, .lz-posts-content>h4.lz-block-heading:before, .lz-posts-content>h4:not([class]):before, .zib-widget>h3:before {
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
.tab-nav-theme li:before, .title-h-center:before, .title-h-left:before, .lz-posts-content>h1.has-text-align-center:before, .lz-posts-content>h1.lz-block-heading:before, .lz-posts-content>h1:not([class]):before, .lz-posts-content>h2.has-text-align-center:before, .lz-posts-content>h2.lz-block-heading:before, .lz-posts-content>h2:not([class]):before, .lz-posts-content>h3.has-text-align-center:before, .lz-posts-content>h3.lz-block-heading:before, .lz-posts-content>h3:not([class]):before, .lz-posts-content>h4.has-text-align-center:before, .lz-posts-content>h4.lz-block-heading:before, .lz-posts-content>h4:not([class]):before, .zib-widget>h3:before {
    width: 40px;
    height: 3px;
    top: auto;
    left: 0;
    bottom: 3px;
    transition: .4s;
}
.tab-nav-theme li, .title-h-center, .title-h-left, .lz-posts-content>h1.has-text-align-center, .lz-posts-content>h1.lz-block-heading, .lz-posts-content>h1:not([class]), .lz-posts-content>h2.has-text-align-center, .lz-posts-content>h2.lz-block-heading, .lz-posts-content>h2:not([class]), .lz-posts-content>h3.has-text-align-center, .lz-posts-content>h3.lz-block-heading, .lz-posts-content>h3:not([class]), .lz-posts-content>h4.has-text-align-center, .lz-posts-content>h4.lz-block-heading, .lz-posts-content>h4:not([class]), .zib-widget>h3 {
    position: relative;
    padding-bottom: 8px;
}
.lz-posts-content>h3.has-text-align-center:before, .lz-posts-content>h3:not([class]):before, .lz-posts-content>h4.has-text-align-center:before, .lz-posts-content>h4:not([class]):before {
    width: 25px!important;
    height: 2px!important;
}
.post-dplayer, .lz-block-gallery, .lz-block-image {
    margin-bottom: 20px;
}
.lz-block-image {
    img {
        height: auto;
        max-width: 100%;
        vertical-align: bottom;
    }
    &:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}
.quote_q {
    padding: 1.2em;
    margin: 10px 0 20px 0;
    position: relative;
    --quote-color: var(--main-color);
    color: var(--quote-color);
    &::before {
        content: "";
        border-radius: 6px;
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: .04;
        right: 0;
        background: var(--quote-color);
        top: 0;
    }
    .iconfont {
        font-size: 1.2em;
        margin-right: .5em;
        position: absolute;
        color: var(--quote-color);
        opacity: .6;
    }
    &>div, &>p {
        position: relative;
        margin: 0;
        padding-left: 2em;
        opacity: .6;
        position: relative;
    }
}
.lz-posts-content ol:not(.blocks-gallery-grid), .lz-posts-content ul:not(.blocks-gallery-grid) {
    margin: 10px 0 20px 15px;
    padding-left: 15px;
}
.article-postsbox {
    line-height: 1.6;
    overflow: hidden;
    font-size: 14px;
    max-width: 550px;
    margin: auto;
    margin-bottom: 20px;
    box-shadow: none;
    .fit-cover {
        height: 100%;
    }
    .posts-mini {
        width: 100%!important;
        margin: 0!important;
        background: var(--muted-border-color);
        position: relative;
        &>div:first-child{
            margin-right: 10px;
        }
        .item-thumbnail {
            width: 96px;
            height: 0;
            padding-bottom: var(--posts-list-scale);
            position: relative;
            overflow: hidden;
            border-radius: var(--main-radius);
            img {
                border-radius: 4px;
            }
        }
        .item-meta {
            font-size: 12px;
            a {
                color: inherit;
            }
            &>span,.meta-right>span {
                margin-right: 8px;
                font-size: 13px;
            }
            .meta-right span:last-child {
                margin-right: 0;
            }
        }
    }
}
.posts-item {
    padding: 20px;
    margin: 15px 0;
    background: var(--main-bg-color);
    overflow: hidden;
    transition: .2s;
    box-shadow: 0 0 10px var(--main-shadow);
    border-radius: var(--main-radius);
    .item-heading {
        margin-top: 0;
        margin-bottom: 5px;
        font-size: 18px;
        line-height: 1.4em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
        max-height: 2.8em;
        &>a {
            color: var(--key-color);
        }
    }  
}
.posts-span.card .span-heading, .posts-mini-con .span-heading {
    font-size: 14px;
}
.posts-mini {
    padding: 10px;
    display: inline-flex;
    width: 50%;
    .meta-author>span{
        margin-left: 6px;
    }
    .avatar-mini {
        transform: translateY(-1px);
    }
}
.abs-blur-bg {
    position: absolute;
    left: -50px;
    top: -50px;
    width: calc(100% + 100px);
    height: calc(100% + 100px);
    -webkit-filter: blur(30px);
    filter: blur(30px);
}
.article-postsbox .abs-blur-bg, .author-minicard .abs-blur-bg {
    opacity: .15;
}
.lz-block-separator {
    border: 1px solid;
    border-right: none;
    border-left: none;
    &.is-style-dots {
        background: none!important;
        border: none;
        text-align: center;
        line-height: 1;
        height: auto;
        &:before {
            content: "···";
            color: currentColor;
            font-size: 1.5em;
            letter-spacing: 2em;
            padding-left: 2em;
            font-family: serif;
        }
    }
}
.lz-block-buttons {
    margin-bottom: 20px;
    --main-radius:100px;
    &.radius{
        border-radius: 50px;
    }
    .but {
        margin: .4em;
        display: inline-block;
        padding: 6px 18px;
    }
}
.article-content .article-tags a {
    font-size: 12px;
    margin: 3px;
}

</style>