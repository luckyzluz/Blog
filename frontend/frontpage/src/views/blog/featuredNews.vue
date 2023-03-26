<template>
        <!-- featured_news -->
    <div class="featured_news">
      <div class="featured_nav">
        <h2 class="h_title">精选文章</h2>
        <ul id="tab">
          <!-- class="tab-current" -->
          <li
            v-for="(item, index) in searts.class"
            :key="index"
            @click="addtabClass(index,$event)"
            :class="{ 'tab-current': index === searts_current }"
          >
            <a href="javascript:" ref="show_artvalue">{{ item }}</a>
          </li>
        </ul>
      </div>
      <div class="clear"></div>
      <div id="tab-content" ref="tab-content">
        <section class="tab-box" >
          <ul class="f_news_list">
            <li v-for="(item,index) in news_list" :key="index" :class="index==0?'f_news_pic':'f_news_li'">
            <a @click="goartPage(item.art_id)"   target="_blank"><i><img class="brightness"
                :src="item.art_pic"
                :alt="item.art_name"
            /> </i>
            <div class="f_news_pic_box" v-show="index==0">
              <a @click="goartPage(item.art_id)"  target="_blank" class="f_news_tag"
                >待定哈</a
              >
              <h3 class="f_news_title">
                <a @click="goartPage(item.art_id)"  target="_blank">{{item.art_name}}</a>
              </h3>
              <p class="f_news_info"><span>{{item.art_time}}</span><span>{{item.art_view}}</span></p>
            </div>
            <p v-show="index!==0">{{item.art_name}}</p>
                <span v-show="index!==0">{{item.art_time}}</span>
            </a>
          </li>
          </ul>
        </section>
      </div>
    </div>
</template>
<script>
export default {
  components: {

  },
  data() {
    return {
      news_list:[],
      searts_current: 0,
      searts: {
        class: ["程序人生", "Web前端", "网站建设"],
        artslist: {
          "程序人生": [
            {
              art_category: "面试题",
              art_id: "105",
              art_name: "你应该了解的25个JS技巧",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
            {
              art_category: "面试题",
              art_id: "105",
              art_name: "你应该了解的25个JS技巧",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
            {
              art_category: "面试题",
              art_id: "105",
              art_name: "你应该了解的25个JS技巧",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
            {
              art_category: "面试题",
              art_id: "105",
              art_name: "你应该了解的25个JS技巧",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            }
          ],
          "Web前端": [
            {
              art_category: "面试题",
              art_id: "104",
              art_name: "关于三次握手与四次挥手",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
            {
              art_category: "面试题",
              art_id: "104",
              art_name: "关于三次握手与四次挥手",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
            {
              art_category: "面试题",
              art_id: "104",
              art_name: "关于三次握手与四次挥手",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
            {
              art_category: "面试题",
              art_id: "104",
              art_name: "关于三次握手与四次挥手",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
          ],
          "网站建设": [
            {
              art_category: "面试题",
              art_id: "103",
              art_name: "加载本地文件出现跨域解决方案",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
            {
              art_category: "面试题",
              art_id: "103",
              art_name: "加载本地文件出现跨域解决方案",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
            {
              art_category: "面试题",
              art_id: "103",
              art_name: "加载本地文件出现跨域解决方案",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
            {
              art_category: "面试题",
              art_id: "103",
              art_name: "加载本地文件出现跨域解决方案",
              art_time: "2021-10-3",
              art_type: "转载",
              art_view: "0",
              art_pic:
                "https://img10.360buyimg.com/ddimg/jfs/t1/143288/2/21391/983197/617ea6edEc6a2cb8f/74e8c851f2e8d3da.jpg",
            },
          ],
        },
      },
      seshowlist:[],
    };
  },
  mounted: function(){
    this.news_list = this.searts.artslist["程序人生"];
  },
  created(){
    this.seshowlist=this.searts.artslist["程序人生"]
    // console.log(this.searts.artslist["程序人生"]);
  },
  methods: {
    addtabClass: function (index,event) {
      this.searts_current = index;
      this.news_list=this.searts.artslist[event.currentTarget.firstElementChild.innerHTML];
      // this.news_list=this.$refs.show_artvalue.innerHTML
      // console.log(this.$refs.show_artvalue.$el.innerHTML);
    },
    goartPage(art_id){
// this.$router.push({name:"Article",query:{art_id}})
this.$router.push({path:"/article/"+art_id})
          }
  },
};
</script>
<style>
</style>