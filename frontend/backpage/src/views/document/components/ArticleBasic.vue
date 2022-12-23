<template>
  <div>
    <el-form-item style="margin-bottom: 10px; font-size: 16px;" label-width="90px" label="参数:">
      <el-select v-model="postForm.classname" clearable placeholder="请选择分类">
        <el-option v-for="itclass in ArtParams.classname.options" :key="itclass.value" :label="itclass.label" :value="itclass.value" />
      </el-select>
      <el-select v-model="postForm.imp" clearable placeholder="请选择推荐">
        <el-option v-for="itimp in ArtParams.imp.options" :key="itimp.value" :label="itimp.label" :value="itimp.value" />
      </el-select>
      <el-select v-model="postForm.review" clearable placeholder="请选择状态">
        <el-option v-for="itstatus in ArtParams.review.options" :key="itstatus.value" :label="itstatus.label" :value="itstatus.value" />
      </el-select>
      <el-checkbox v-model="ArtParams.updatetime" style="margin-left: 10px;">更新时间</el-checkbox>
    </el-form-item>
    <el-row>
      <el-col :span="10"><el-form-item style="margin-bottom: 10px;" label-width="90px" label="名称:">
        <el-input v-model="postForm.title" placeholder="请输入名称" />
      </el-form-item></el-col>
      <el-col :span="12"><el-form-item style="margin-bottom: 10px;" label-width="90px" label="副标:">
        <el-input v-model="postForm.sub" placeholder="请输入副标(可省略,多个用,隔开)" />
      </el-form-item></el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item style="margin-bottom: 10px;" label-width="90px" label="拼音:">
          <el-input v-model="postForm.en" placeholder="自动生成拼音" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item style="margin-bottom: 10px;" label-width="90px" label="首字母:">
          <el-input v-model="postForm.letter" placeholder="首字母" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10"><el-form-item style="margin-bottom: 10px;" label-width="90px" label="TAG:">
        <el-input v-model="postForm.tag" placeholder="请输入标签" />
      </el-form-item></el-col>
      <el-col :span="5" style="margin-left: 10px;">
        <el-checkbox v-model="autotag">自动生成</el-checkbox>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10"><el-form-item style="margin-bottom: 10px;" label-width="90px" label="备注:">
        <el-input v-model="postForm.remarks" placeholder="请输入备注" />
      </el-form-item></el-col>
    </el-row>
    <el-row>
      <el-col :span="10"><el-form-item style="margin-bottom: 10px;" label-width="90px" label="关联文章:">
        <el-input v-model="postForm.rel_art" placeholder="请输入ID，多个逗号隔开" />
      </el-form-item></el-col>
      <el-col :span="5" style="margin-left: 10px;">
        <el-button type="primary">查询数据</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10"><el-form-item style="margin-bottom: 10px;" label-width="90px" label="关联视频:">
        <el-input v-model="postForm.rel_vod" placeholder="请输入ID，多个逗号隔开" />
      </el-form-item></el-col>
      <el-col :span="5" style="margin-left: 10px;">
        <el-button type="primary">查询数据</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10"><el-form-item style="margin-bottom: 10px;" label-width="90px" label="图片:">
        <el-input v-model="postForm.pic" placeholder="请输入图片链接" />
      </el-form-item></el-col>
      <el-col :span="5" style="margin-left: 10px;">
        <el-button type="primary">上传图片</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10"><el-form-item style="margin-bottom: 10px;" label-width="90px" label="缩略图:">
        <el-input v-model="postForm.pic_thumb" placeholder="请输入图片链接" />
      </el-form-item></el-col>
      <el-col :span="5" style="margin-left: 10px;">
        <el-button type="primary">上传图片</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10"><el-form-item style="margin-bottom: 10px;" label-width="90px" label="海报图:">
        <el-input v-model="postForm.pic_slide" placeholder="请输入图片链接" />
      </el-form-item></el-col>
      <el-col :span="5" style="margin-left: 10px;">
        <el-button type="primary">上传图片</el-button>
      </el-col>
    </el-row>
    <el-form-item style="margin-bottom: 10px;" label-width="90px" label="截图:">
      <el-button type="primary">上传截图</el-button>
      <el-input v-model="postForm.pic_screenshot" type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="请输入内容" />
      <!-- <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span> -->
    </el-form-item>
    <el-form-item style="margin-bottom: 10px;" label-width="90px" label="简介:">
      <el-input v-model="postForm.blurb" type="textarea" :autosize="{ minRows: 6, maxRows: 66}" placeholder="不填写将自动从第一页详情里获取前100个字" />
      <!-- <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span> -->
    </el-form-item>
    <el-form-item style="margin-bottom: 10px;" label-width="90px" label="内容:">
      <!-- <el-row>
        <el-col :span="5">
          <el-input v-model="content.pagetitle" placeholder="页标题" />
        </el-col>
        <el-col :span="5" style="margin-right: 10px;">
          <el-input v-model="content.pageremarks" placeholder="页备注" />
        </el-col>
        <el-button type="text">清空</el-button>
        <el-button type="text">删除</el-button>
        <el-button type="text">上移</el-button>
        <el-button type="text">下移</el-button>
      </el-row> -->
      <div v-if="deviceType === 'pc'">
        <MarkdownEditorPc ref="editor" :mdtext="mdtext" />
      </div>
      <div v-else-if="deviceType === 'mobile'">
        <MarkdownEditorMobile ref="editor" :mdtext="mdtext" />
      </div>
      <!-- <markdown-editor v-model="postForm.content" :language="language" height="300px" /> -->
      <!-- <Tinymce5 ref="editor" v-model="postForm.content" :height="400" /> -->
    </el-form-item>
  </div>
</template>
<script>
import MarkdownEditorPc from '@/components/vditor/editor/pc'
import MarkdownEditorMobile from '@/components/vditor/editor/mobile'
export default {
  components: { MarkdownEditorPc, MarkdownEditorMobile },
  data() {
    return {
      autotag: true,
      mdtext: '',
      deviceType: 'pc',
      postForm: {},
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
      }
    }
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
    _isMobile() {
      var flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    }
  }
}
</script>
