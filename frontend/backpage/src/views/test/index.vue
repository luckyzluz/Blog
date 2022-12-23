<template>
  <div>
    <!-- <markdown-editor3 ref="editor" v-model="content" :height="400" /> -->
    <button @click="xxx">11111</button>
    <div v-if="deviceType === 'pc'&&mdtext">
      <Editor ref="editor" :mdtext="mdtext" />
    </div>
    <!--   v-if="mdtext" -->
    <div v-else-if="deviceType === 'mobile'&&mdtext">
      <Editormobile ref="editor" :mdtext="mdtext" />
    </div>
    <!-- <viewer :content="content" /> -->
  </div>
</template>
<script>
import ToastuiEditor from '@/components/vditor/editor/pc'
import ToastuiEditormobile from '@/components/vditor/editor/mobile'
import viewer from '@/components/vditor/viewer/index'
import { fetchMd } from '@/api/test'
// '../../components/ToastuiEditor/index'
export default {
  name: 'Test',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Editor: ToastuiEditor,
    Editormobile: ToastuiEditormobile,
    viewer
    // eslint-disable-next-line vue/no-unused-components
  },
  data() {
    return {
      deviceType: '',
      content: '',
      mdtext: ''
    }
  },
  watch: {
    mdtext(val, newval) {
      console.log(val, newval)
    }
  },
  created() {
    this.getDetails()
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
    async getDetails() {
      fetchMd().then(res => {
        console.log(res)
        this.content = res.md
        this.mdtext = res.md
      })
    },
    xxx() { // this.md
      console.log(this.$refs.editor.contentEditor.getValue().replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/'/g, '\\\'').replace(/\`/g, '\\\`')) // innerText.replace(/[\n\r]/g, '\n').replace(/\s/g, '&nbsp;').replace(/"/g, '\\\"')
    },
    contentx(xx) {
      // console.log('xx', xx.vditor)
    },
    _isMobile() {
      var sUserAgent = navigator.userAgent.toLowerCase()
      var bIsIpad = sUserAgent.match(/ipad/i) === 'ipad'
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os'
      var bIsMidp = sUserAgent.match(/midp/i) === 'midp'
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4'
      var bIsUc = sUserAgent.match(/ucweb/i) === 'ucweb'
      var bIsAndroid = sUserAgent.match(/android/i) === 'android'
      var bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce'
      var bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile'
      // document.writeln('您的浏览设备为：')
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        // document.writeln('phone')
        return true
      } else {
        // document.writeln('pc')
        return false
      }
      // var flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      // console.log('xxxx', flag)
      // return flag
    }
  }
}
</script>

