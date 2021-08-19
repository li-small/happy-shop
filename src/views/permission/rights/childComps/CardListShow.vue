<template>
  <el-table :data="rightsList" border stripe>
    <!-- 序号 -->
    <el-table-column align="center" type="index" label="#"></el-table-column>
    <!-- 权限名称 -->
    <el-table-column
      align="center"
      prop="authName"
      label="权限名称"
    ></el-table-column>
    <!-- 路径 -->
    <el-table-column align="center" prop="path" label="路径"></el-table-column>
    <!-- 权限等级 -->
    <el-table-column align="center" prop="level" label="权限等级">
      <template v-slot="scope">
        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
        <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
        <el-tag type="warning" v-else>三级</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    rightsList: {
      type: Array,
    },
  },
}
</script>

<style>
</style>