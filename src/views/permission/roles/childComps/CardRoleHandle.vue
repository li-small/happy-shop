<template>
  <div>
    <!-- 编辑角色信息 -->
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-edit"
      @click="editRoleInfo(scope.row.id)"
      >编辑</el-button
    >
    <!-- 删除角色信息 -->
    <el-button
      type="danger"
      size="mini"
      icon="el-icon-delete"
      @click="removeRoleInfo(scope.row.id)"
      >删除</el-button
    >
    <!-- 分配角色权限 -->
    <el-button
      type="warning"
      size="mini"
      icon="el-icon-setting"
      @click="setRoleRights(scope.row)"
      >分配权限</el-button
    >
  </div>
</template>

<script>
import { removeRoles } from 'network/permission'

export default {
  props: {
    scope: {
      type: Object,
    },
  },
  methods: {
    // 监听修改角色信息按钮 CardEditRole中处理事件
    editRoleInfo(id) {
      this.$bus.$emit('editRoleDialogVisible', id)
    },

    // 监听删除角色信息按钮
    removeRoleInfo(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 发起请求删除角色信息
          const { data } = await removeRoles(id)
          if (data.meta.status !== 200)
            return this.$message.error('删除角色失败!')
          this.$message.success('删除角色成功!')
          // 重新获取角色列表数据 重新渲染视图
          this.$bus.$emit('refreshRoleList')
        })
        .catch(() => {
          return
        })
      // then是角色点击了确定按钮
      // catch是角色点击了取消按钮
    },

    // 监听分配角色权限按钮 CardSetRoleRights中处理事件
    setRoleRights(role) {
      this.$bus.$emit('setRoleDialogVisible', role)
    },
  },
}
</script>

<style>
</style>