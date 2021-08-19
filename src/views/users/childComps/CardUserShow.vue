<template>
  <el-table :data="userList" border stripe>
    <!-- 序号 -->
    <el-table-column align="center" type="index" label="#"></el-table-column>
    <!-- 姓名 -->
    <el-table-column align="center" prop="username" label="姓名"></el-table-column>
    <!-- 邮箱 -->
    <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
    <!-- 电话 -->
    <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
    <!-- 角色 -->
    <el-table-column align="center" prop="role_name" label="角色"></el-table-column>
    <!-- 状态 -->
    <el-table-column align="center" label="状态">
      <template v-slot="scope">
        <!-- row是个element内置的属性 scope.row相当于当前行的数据对象 -->
        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column label="操作" align="center" width="300px">
      <template v-slot="scope">
        <card-user-handle :scope="scope"></card-user-handle>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { UpdateUser } from 'network/user.js'
import CardUserHandle from './CardUserHandle'

export default {
  props: {
    userList: {
      type: Array,
    },
  },
  components: {
    CardUserHandle,
  },
  methods: {
    // 监听switch开头的改变
    async userStateChanged(userState) {
      const { data } = await UpdateUser(userState.id, userState.mg_state)
      if (data.meta.status !== 200) {
        userState.mg_state = !userState.mg_state
        return this.$message.error('更新用户状态失败!')
      }
      this.$message.success('更新用户状态成功!')
    },
  },
}
</script>

<style>
</style>