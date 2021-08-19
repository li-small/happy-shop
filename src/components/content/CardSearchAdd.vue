<template>
  <div>
    <!-- 输入和添加 -->
    <el-row :gutter="16">
      <!-- 输入框 -->
      <el-col :span="9">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          clearable
          @clear="queryList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="queryList"
          ></el-button>
        </el-input>
      </el-col>
      <!-- 添加按钮 -->
      <el-col :span="4">
        <el-button type="primary" @click="addHandleClick()"
          >添加{{ addText }}</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    queryInfo: {
      type: Object,
    },
    addText: {
      type: String,
    },
  },
  methods: {
    // 监听搜索和清空按钮
    queryList() {
      // 每次从第一页开始搜索
      this.queryInfo.pagenum = 1
      // 重新获取列表数据
      this.$emit('refreshList')
    },
    // 监听添加按钮 弹出对话框
    addHandleClick() {
      if (this.$route.path === '/users') {
        this.$bus.$emit('addClick')
      } else if (this.$route.path === '/goods') {
        this.$router.push('/goods/add')
      }
    },
  },
}
</script>

<style>
</style>