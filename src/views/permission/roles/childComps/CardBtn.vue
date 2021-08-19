<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="addRoleClick">添加角色</el-button>

    <!-- 添加角色的对话框 -->
    <card-add-role></card-add-role>
  </div>
</template>

<script>
import CardAddRole from './CardAddRole'
export default {
  components: {
    CardAddRole,
  },
  methods: {
    // 监听添加按钮 弹出对话框 CardAddRole处理事件
    addRoleClick() {
      this.$bus.$emit('addRoleClick')
    },
  },
}
</script>

<style>
</style>