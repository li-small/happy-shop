<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="addGoodsClick">添加分类</el-button>

    <!-- 添加商品分类的对话框 -->
    <card-cate-add></card-cate-add>
  </div>
</template>

<script>
import CardCateAdd from './CardCateAdd'

export default {
  components: {
    CardCateAdd,
  },
  methods: {
    // 监听添加按钮 弹出对话框 CardAddRole处理事件
    addGoodsClick() {
      this.$bus.$emit('addGoodsClick')
    },
  },
}
</script>

<style>
</style>