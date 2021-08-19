<template>
  <div>
    <!-- 面包屑导航区域 -->
    <break-crumb :text="['用户', '用户']"></break-crumb>
    <!-- 卡片视图区域 -->
    <card></card>
  </div>
</template>

<script>
import BreakCrumb from 'components/content/BreakCrumb'
import Card from './childComps/Card'

export default {
  components: {
    BreakCrumb,
    Card,
  },
}
</script>

<style lang="less" scoped>
</style>