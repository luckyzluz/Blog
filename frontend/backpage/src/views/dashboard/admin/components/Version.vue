<template>
  <el-card class="box-card" style="margin-left:8px;">
    <div slot="header" class="clearfix">
      <span>版本信息</span>
      <el-button style="float: right; padding: 3px 0" type="text">检查更新</el-button>
    </div>
    <!-- <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div> -->
    <el-badge value="new">
      <div class="text item">
        当前版本：v1.0.0
      </div>
    </el-badge>
    <div class="text item">
      mysql版本：7.0.00
    </div>
    <div class="text item">
      运行环境：Linux(nginx/1.18.0)
    </div>
    <div class="text item">
      node版本：11.0.0
    </div>
    <div class="text item">
      最大上传限制：50M
    </div>
    <div class="text item">
      服务器IP/端口：www.baidu.com
    </div>
    <div class="text item">
      服务器时间：2022-03-06
    </div>
    <div class="text item">
      联系作者：点击跳转
    </div>
    <div class="text item">
      累计搭建：123656
    </div>
    <div class="text item">
      项目地址：3333
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  components: { PanThumb, Mallki },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" >
.item{
    margin-bottom: 18px;
}
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    ::v-deep .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
