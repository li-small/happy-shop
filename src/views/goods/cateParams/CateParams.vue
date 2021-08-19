<template>
  <div>
    <!-- 面包屑导航 -->
    <break-crumb :text="['商品', '参数']"></break-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <cate-params-show></cate-params-show>
    </el-card>
  </div>
</template>

<script>
import BreakCrumb from 'components/content/BreakCrumb'
import CateParamsShow from './childComps/CateParamsShow'

export default {
  components: {
    BreakCrumb,
    CateParamsShow,
  },
}
</script>

<style>
</style>