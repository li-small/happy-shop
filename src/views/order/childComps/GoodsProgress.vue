<template>
  <el-dialog title="物流进度" :visible.sync="progressDialogVisible" width="50%">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in goodsProgress"
        :key="index"
        :timestamp="activity.time"
      >
        {{ activity.context }}
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<script>
import kuaidi from 'common/kuaidi'
export default {
  data() {
    return {
      // 控制物流进度对话框显示和隐藏
      progressDialogVisible: false,
      // 物流进度信息
      goodsProgress: kuaidi,
    }
  },
  mounted() {
    this.$bus.$on('progressDialogVisible', async () => {
      this.progressDialogVisible = true
    })
  },
}
</script>

<style scoped>
</style>