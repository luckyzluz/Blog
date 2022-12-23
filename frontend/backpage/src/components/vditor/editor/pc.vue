<template>
  <!-- PC端vditor编辑 -->
  <div>
    <button @click="cccc">33333</button>
    <div id="vditor" name="description" />
  </div>
</template>
<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import options from './options'
import toolbar from './toolbar'
import upload from './upload'
export default {
  props: {
    mdtext: {
      type: String,
      default: function() {
        return 'loading...'
        // 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    }
  },
  data() {
    return {
      contentEditor: ''
      // ,
      // content: '# hello,Vditor+Vue!'
    }
  },
  watch: {
    // mdtext(val, newval) {
    //   if (newval) {
    //     console.log('1111')
    //     this.content()
    //     this.vditorInit(this.mdtext)
    //   }
    // }
  },
  mounted() {
    this.vditorInit(this.mdtext)
  },
  methods: {
    cccc() {
      console.log(this.mdtext)
    },
    // 初始化
    vditorInit(mdtext) {
      this.contentEditor = new Vditor('vditor', {
        ...options,
        ...toolbar,
        ...upload,
        after: () => { // 编辑器异步渲染完成后的回调方法
          this.contentEditor.setValue(mdtext)
        },
        input: () => { // 输入后触发
        },
        focus: () => { // 聚焦后触发
        },
        blur: () => { // 失焦后触发
        },
        esc: () => { // esc 按下后触发
        },
        ctrlEnter: () => { // ctrl+enter 按下后触发
        },
        select: () => { // 编辑器中选中文字后触发
        },
        tab: () => { // tab 键操作字符串，支持 \t 及任意字符串
        }
      })
    },
    xx() {
      console.log(this._isMobile() === null)
      // console.log(this.contentEditor.exportJSON())
    },
    content(e) {
      // this.$emit('content', this.contentEditor)
    },
    _isMobile() {
      var flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      console.log('xxxx', flag)
      return flag
    }
  }
}
</script>
<style scoped>
.vditor--fullscreen{
  top: 84px;
}
</style>
