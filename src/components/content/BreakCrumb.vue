<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ text[0] }}管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ text[1] }}列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: Array,
    },
  },
}
</script>

<style>
</style>