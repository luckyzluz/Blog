<template>
  <!-- <div class="box"> -->
  <div class="blogs">
    <h2 class="h_title">
      <span class="icon_more"><a @click="fun" target="_blank">查看更多</a></span
      >最新文章
    </h2>
    <article class="blogs_list" v-for="(item, index) in artslist" :key="index">
      <span class="laid_title_l"></span>
      <div class="block-image feaimg">
        <span class="vodlist_top"
          ><em class="voddate voddate_year">{{item.category.category_name}}</em></span
        >
        <!-- {{item.classname}} -->
        <a
          class="block-fea brightness"
          @click="goartPage(item.art_id)"
          :style="{ backgroundImage: 'url(' +item.art_cover + ')' }"
        >
          <i class="mask"></i>
        </a>
        <div class="entyr-icon"><i class="icon iconfont icon-tupian"></i></div>
      </div>
      <header class="entry-header">
        <span class="entry-title"
          ><a href="#"
            ><span class="badge arc_v6">置顶</span
            >{{item.art_title}}</a
          ></span
        >
      </header>
      <div class="entry-summary ss">
        <p>
          {{item.art_content}}
        </p>
      </div>
      <div class="entry-meta">
         
        <img
          :src="item.author.user_avatar"
          @click="fun"
          class="avatar avatar-140 photo"
          height="25"
          width="25"
        />
        {{item.author.user_name}}
        <span class="separator">/</span>
        <a href="#"> 源码分享</a>
        <span class="separator">/</span>
        <time :datetime="item.art_ctime">{{item.art_ctime}}</time>
        <span class="separator">/</span>
        {{item.view_count}}
        阅读
      </div>
    </article>
    <!-- <article class="blogs_list" v-for="(item, index) in artslist" :key="index">
      <span class="laid_title_l"></span>
      <div class="block-image feaimg">
        <span class="vodlist_top"
          ><em class="voddate voddate_year">源码分享</em></span
        >
        <a
          class="block-fea brightness"
          @click="goartPage(item.art_id)"
          :style="{ backgroundImage: 'url(' + item.art_pic + ')' }"
        >
          <i class="mask"></i>
        </a>
        <div class="entyr-icon"><i class="icon iconfont icon-tupian"></i></div>
      </div>
      <header class="entry-header">
        <span class="entry-title"
          ><a href="#"
            ><span class="badge arc_v6">置顶</span
            >P767A-JD京东三网话费直充系统/移动联通电信话费三网直充/三网话费直充系统</a
          ></span
        >
      </header>
      <div class="entry-summary ss">
        <p>
          全新TP框架2.0版本PHP版本，非分享的java不能用的版本，需要的拿吧，现在还是正常可用的
        </p>
      </div>
      <div class="entry-meta">
        <img
          @click="fun"
          src="https://q1.qlogo.cn/g?b=qq&amp;nk=787490066&amp;src_uin=www.jlwz.cn&amp;s=0"
          class="avatar avatar-140 photo"
          height="25"
          width="25"
        />苏七
        <span class="separator">/</span>
        <a href="http://sxvlcjcn.hk3.20212021.ml/dm/40.html"> 源码分享</a>
        <span class="separator">/</span>
        <time datetime="2021-05-16">2021-05-16</time>
        <span class="separator">/</span>
        258阅读
      </div>
    </article> -->
  </div>
</template>
<script>
// import {getArtsList} from '../../api'
export default {
  data() {
    return {
      artslist: [],
      xx:[
    {
        "id": 40,
        "member_id": 2,
        "title": "P767A-JD京东三网话费直充系统/移动联通电信话费三网直充/三网话费直充系统",
        "litpic": "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
        "description": "全新TP框架2.0版本PHP版本，非分享的java不能用的版本，需要的拿吧，现在还是正常可用的",
        "keywords": "P767A-JD京东三网话费直充系统/移动联通电信话费三网直充/三网话费直充系统",
        "seo_title": "P767A-JD京东三网话费直充系统/移动联通电信话费三网直充/三网话费直充系统",
        "hits": 189,
        "addtime": "2021-05-16",
        "author": {
            "id": 2,
            "username": "jzcustomer",
            "litpic": "https://cdn.jsdelivr.net/gh/luckyzluz/zblogBasics/images/20190806180831.png"
        }
    },
    {
        "id": 41,
        "member_id": 3,
        "title": "P789-5月火凤凰打赏系统/视频打赏/影视知识付费/全新升级版2.0版本/超级防封/服务器打包运营版",
        "litpic": "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
        "description": "界面整洁，ui全新设计 一改以往底层概念，让运营者更安全、更稳定、更方便，带包天包月包年，代理，以及多种支付系统",
        "keywords": "P789-5月火凤凰打赏系统/视频打赏/影视知识付费/全新升级版2.0版本/超级防封/服务器打包运营版",
        "seo_title": "P789-5月火凤凰打赏系统/视频打赏/影视知识付费/全新升级版2.0版本/超级防封/服务器打包运营版",
        "hits": 81,
        "addtime": "2021-05-16",
        "author": {
            "id": 3,
            "username": "苏七",
            "litpic": "https://cdn.jsdelivr.net/gh/luckyzluz/zblogBasics/images/20190806180831.png"
        }
    },
    {
        "id": 42,
        "member_id": 4,
        "title": "P7631-运营版聚合支付系统/第三方四方支付系统/全开源完整无漏自用服务商运营版",
        "litpic": "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
        "description": "请不要拿网上那些泛滥的来比较，这个系统是别人运营专门修复的，全部开源没有任何加密和后门\n\n本系统为服务商运营版，完整无错稳定抗压。系统可以直接对接三方挂牌支付服务...",
        "keywords": "P7631-运营版聚合支付系统/第三方四方支付系统/全开源完整无漏自用服务商运营版",
        "seo_title": "P7631-运营版聚合支付系统/第三方四方支付系统/全开源完整无漏自用服务商运营版",
        "hits": 42,
        "addtime": "2021-05-16",
        "author": {
            "id": 4,
            "username": "0iAi4w",
            "litpic": "https://cdn.jsdelivr.net/gh/luckyzluz/zblogBasics/images/20190806180831.png"
        }
    },
    {
        "id": 43,
        "member_id": 5,
        "title": "P790-全新飞飞cms影视系统/thinkphp框架影视系统/飞飞商业全能版V10.6源码/APP源码/29套模板",
        "litpic": "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
        "description": "全新飞飞cms商业全能版V10.6，源码开源,无加密,无域名限制,无后门（可以二次开发)\n源码包含飞飞cms源码+PC/WAP/APP(H5)+付费系统+微信公众号+分销推广系统+站群系统+29套模板+原生APP源码",
        "keywords": "P790-全新飞飞cms影视系统/thinkphp框架影视系统/飞飞商业全能版V10.6源码/APP源码/29套模板",
        "seo_title": "P790-全新飞飞cms影视系统/thinkphp框架影视系统/飞飞商业全能版V10.6源码/APP源码/29套模板",
        "hits": 71,
        "addtime": "2021-05-16",
        "author": {
            "id": 5,
            "username": "XMpuPk",
            "litpic": "https://cdn.jsdelivr.net/gh/luckyzluz/zblogBasics/images/20190806180831.png"
        }
    },
    {
        "id": 44,
        "member_id": 6,
        "title": "全新直播系统+游戏系统/双后台服务器打包/完整原生安卓IOS双端",
        "litpic": "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
        "description": "这是别人服务器打包，环境扩展截图，截图还算详细 双后台双数据库,前端原生安卓IOS双端，图片是别人截图的，由于源码太大了就没有做具体的测试，需要的拿吧",
        "keywords": "全新直播系统+游戏系统/双后台服务器打包/完整原生安卓IOS双端",
        "seo_title": "全新直播系统+游戏系统/双后台服务器打包/完整原生安卓IOS双端",
        "hits": 3,
        "addtime": "2021-05-17",
        "author": {
            "id": 6,
            "username": "Esu7Uv",
            "litpic": "https://cdn.jsdelivr.net/gh/luckyzluz/zblogBasics/images/20190806180831.png"
        }
    }
]
    };
  },
  components: {
    // Zcontent4,
    // Links
  },
  created() {
    this.$api.getArtsList().then((res) => {
        console.log(res.data);
        this.artslist=res.data.data;
        // console.log(this.artslist[0].articleCover)
      });
  },
  methods: {
    fun() {
      console.log(this.artslist);
      // this.$api.getArtsList().then((res) => {
      //   console.log(res);
      // });
    },
    goartPage(art_id) {
      // this.$router.push({name:"Article",query:{art_id}})
      this.$router.push({ path: "/article/" + art_id });
    },
  },
};
</script>
<style lang="scss">
</style>