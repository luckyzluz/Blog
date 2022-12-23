<template>
  <div id="vditorPreview" class="vditor-reset" />
</template>
<script>
import { fetchMd } from '@/api/test'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import options from './options'
export default {
  props: {
    content: {
      type: String,
      default: function() {
        return 'loading...'
        // 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    }
  },
  data() {
    return {
      content: ''
      // ,
      // content: 'loading...'
    }
  },
  created() {
    this.getDetails()
  },
  mounted() {
    this.renderMarkdown(this.content)
  },
  methods: {
    async getDetails() {
      fetchMd().then(res => {
        console.log(res)
        this.content = res.md
      })
    },
    renderMarkdown(md) {
      // 开始渲染
      const previewElement = document.getElementById('vditorPreview')
      Vditor.preview(previewElement,
        md, {
          ...options
        }
      )
      previewElement.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
          Vditor.previewImage(event.target)
        }
      })
    }
  }
}
</script>