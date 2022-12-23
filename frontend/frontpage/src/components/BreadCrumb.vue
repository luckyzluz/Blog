<template>
    <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
</script>
<script>

export default {
    name:'BreadCrumb',
    mounted(){
        console.log('routes=>',this.$route);
    }
}
</script>