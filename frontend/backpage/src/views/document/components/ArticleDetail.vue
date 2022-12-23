<template>
  <div class="createPost-container" style="overflow-x: auto;">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <CommentDropdown v-model="postForm.comment_disabled" />
        <!-- <PlatformDropdown v-model="postForm.platforms" /> -->
        <!-- <SourceUrlDropdown v-model="postForm.source_uri" /> -->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          草稿
        </el-button>
      </sticky>
      <el-tabs v-model="activeName" style="margin: 8px" type="border-card">
        <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
          <keep-alive>
            <component :is="item.component" />
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
// import Tinymce5 from '@/components/Tinymce5'
import MarkdownEditorPc from '@/components/vditor/editor/pc'
import MarkdownEditorMobile from '@/components/vditor/editor/mobile'
import ArticleBasic from '@/views/document/components/ArticleBasic'
import ArticleExpand from '@/views/document/components/ArticleExpand.vue'
// MarkdownEditor'
// import Upload from '@/components/Upload/SingleImage3'
// import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
// import Warning from './Warning'
import { CommentDropdown } from './Dropdown' // PlatformDropdown, SourceUrlDropdown

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  en: '', // 拼音
  sub: '', // 副标
  letter: '', // 首字母
  tag: '', // 标签
  remarks: '', // 备注
  rel_art: '', // 关联文章
  rel_vod: '', // 关联视频
  pic: '', // 图片
  pic_thumb: '', // 缩略图
  pic_slide: '', // 海报图
  pic_screenshot: '', // 截图
  blurb: '', // 简介
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0,
  classname: '',
  review: 'reviewed'
}
//, Warning
export default {
  name: 'ArticleDetail', //  MDinput,, PlatformDropdown, SourceUrlDropdownTinymce5, Upload,
  components: { MarkdownEditorPc, MarkdownEditorMobile, Sticky, CommentDropdown, ArticleBasic, ArticleExpand },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  // rule.field +
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        // this.$message({
        //   message: '为必传项',
        //   type: 'error'
        // })
        callback(new Error('请填写必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      mdtext: '',
      deviceType: 'pc',
      html: '',
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      },
      ArtParams: {
        classname: {
          options: [{
            value: 'class1',
            label: '分类一'
          }, {
            value: 'class2',
            label: '分类二'
          }],
          value: ''
        },
        imp: {
          options: [{
            value: 'imp1',
            label: '推荐一'
          }, {
            value: 'imp2',
            label: '推荐二'
          }],
          value: ''
        },
        review: {
          options: [{
            value: 'reviewed',
            label: '已审核'
          }, {
            value: 'unreviewed',
            label: '未审核'
          }],
          value: ''
        },
        lock: '',
        updatetime: true
      },
      autotag: true,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      content: {
        pagetitle: '',
        pageremarks: ''
      },
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {},
      tabMapOptions: [
        { label: '基本信息', key: 'basic', component: 'ArticleBasic' },
        { label: '拓展信息', key: 'expand', component: 'ArticleExpand' }
      ],
      activeName: 'basic'
    }
  },
  computed: {
    language() {
      return this.languageTypeList['zh']
    },
    contentShortLength() {
      return this.postForm.content_short.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    if (this._isMobile()) {
      // alert('手机端')
      this.deviceType = 'mobile'
    } else {
      // alert('pc端')
      this.deviceType = 'pc'
    }
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    },
    _isMobile() {
      var flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    // padding: 0px 45px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
