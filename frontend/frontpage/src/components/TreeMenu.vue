<template>
  <template v-for="menu in userMenu" :key="menu._id"> 
      <el-sub-menu v-if="menu.children && menu.children.length>0 && menu.children[0].menuType == 1" :index="menu.path">
    <template #title>
      <el-icon><Setting /></el-icon>
      <span>{{menu.menuName}}</span>
    </template>
    <tree-menu :userMenu="menu.children"/>
      </el-sub-menu>
      <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path" :key="menu._id">{{menu.menuName}}</el-menu-item>
  </template>
  <!-- <el-sub-menu index="2">
    <template #title>
      <el-icon><Setting /></el-icon>
      <span>系统管理</span>
    </template>
    <el-menu-item background-color="#1f2d3d" index="2-1">用户管理</el-menu-item>
    <el-menu-item index="2-2">文章管理</el-menu-item>
    <el-menu-item index="2-2">菜单管理</el-menu-item>
  </el-sub-menu>
  <el-sub-menu index="3">
    <template #title>
      <el-icon><Setting /></el-icon>
      <span>审批管理</span>
    </template>
    <el-menu-item index="3-1">休假申请</el-menu-item>
    <el-menu-item index="3-2">待我审批</el-menu-item>
  </el-sub-menu> -->
</template>
<script>
export default {
  name: "TreeMenu",
  props: {
    userMenu: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>