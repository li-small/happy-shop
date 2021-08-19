<template>
  <el-table :data="rolesList" border stripe>
    <!-- 展开 -->
    <el-table-column type="expand">
      <template v-slot="scope">
        <card-role-expand :scope="scope"></card-role-expand>
      </template>
    </el-table-column>
    <!-- 索引 -->
    <el-table-column align="center" type="index" label="#"></el-table-column>
    <!-- 角色名称 -->
    <el-table-column
      align="center"
      label="角色名称"
      prop="roleName"
    ></el-table-column>
    <!-- 角色描述 -->
    <el-table-column
      align="center"
      label="角色描述"
      prop="roleDesc"
    ></el-table-column>
    <!-- 操作 -->
    <el-table-column align="center" label="操作" width="380px">
      <template v-slot="scope">
        <card-role-handle :scope="scope"></card-role-handle>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import CardRoleHandle from './CardRoleHandle'
import CardRoleExpand from './CardRoleExpand.vue'

export default {
  props: {
    rolesList: {
      type: Array,
    },
  },
  components: {
    CardRoleHandle,
    CardRoleExpand,
  },
}
</script>

<style>
</style>