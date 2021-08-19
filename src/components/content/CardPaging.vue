<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[1, 5, 10, 15]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    queryInfo: {
      type: Object,
    },
    total: {
      type: Number,
    },
  },
  methods: {
    // 监听页码下拉列表page-sizes 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      // 重新获取用户列表数据
      this.$emit('refreshList')
    },
    // 监听页码值page-size 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // 重新获取用户列表数据
      this.$emit('refreshList')
    },
  },
}
</script>

<style>
</style>