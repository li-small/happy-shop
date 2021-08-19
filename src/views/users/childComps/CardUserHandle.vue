<template>
  <div>
    <!-- 编辑用户信息 -->
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-edit"
      @click="editUserInfo(scope.row.id)"
      >编辑</el-button
    >
    <!-- 删除用户信息 -->
    <el-button
      type="danger"
      size="mini"
      icon="el-icon-delete"
      @click="removeUserInfo(scope.row.id)"
      >删除</el-button
    >
    <!-- 分配用户角色 -->
    <el-button
      type="warning"
      size="mini"
      icon="el-icon-setting"
      @click="setUserRole(scope.row)"
      >分配权限</el-button
    >
  </div>
</template>

<script>
import { removeUser } from 'network/user.js'

export default {
  props: {
    scope: {
      type: Object,
    },
  },
  methods: {
    // 监听编辑用户信息按钮 CardEditUser中处理事件
    editUserInfo(id) {
      this.$bus.$emit('editDialogVisible', id)
    },

    // 监听删除用户信息按钮
    removeUserInfo(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 发起请求删除用户信息
          const { data } = await removeUser(id)
          if (data.meta.status !== 200)
            return this.$message.error('删除用户失败!')
          this.$message.success('删除用户成功!')
          // 重新获取用户列表数据 重新渲染视图
          this.$bus.$emit('refreshUserList')
        })
        .catch(() => {
          return
        })
      // then是用户点击了确定按钮
      // catch是用户点击了取消按钮
    },

    // 监听分配用户角色按钮
    setUserRole(user) {
      this.$bus.$emit('setDialogVisible', user)
    },
  },
}
</script>

<style>
</style>