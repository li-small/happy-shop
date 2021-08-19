<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    @close="dialogClosed"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="isOkClick">{{ bottomBtn }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    bottomBtn: {
      type: String,
    },
  },
  data() {
    return {
      // 控制对话框的显示和隐藏
      dialogVisible: false,
    }
  },
  mounted() {
    this.$bus.$on('dialogShow', () => {
      // 显示对话框
      this.dialogVisible = true
    }),
      this.$bus.$on('dialogHidden', () => {
        // 隐藏对话框
        this.dialogVisible = false
      })
  },
  methods: {
    // 监听添加用户对话框关闭事件
    dialogClosed() {
      // 离开对话框 重置表单
      this.$emit('resetForm')
    },
    // 监听底部确定/添加按钮
    isOkClick() {
      this.$emit('isOkClick')
    },
  },
}
</script>

<style>
</style>