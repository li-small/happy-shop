<template>
  <el-table :data="orderList" border stripe>
    <!-- 索引 -->
    <el-table-column align="center" label="#" type="index"></el-table-column>
    <!-- 订单编号 -->
    <el-table-column align="center" prop="order_number" label="订单编号"> </el-table-column>
    <!-- 订单价格 -->
    <el-table-column align="center" prop="order_price" label="订单价格" width="80px"> </el-table-column>
    <!-- 是否付款 -->
    <el-table-column align="center" label="是否付款" width="80px">
      <template v-slot="scope">
        <el-tag v-if="scope.row.pay_status === '1'" type="primary">已付款</el-tag>
        <el-tag v-else type="danger">未付款</el-tag>
      </template>
    </el-table-column>
    <!-- 是否发货 -->
    <el-table-column align="center" prop="is_send" label="是否发货" width="80px"> </el-table-column>
    <!-- 下单时间 -->
    <el-table-column align="center" label="下单时间" width="160px">
      <template v-slot="scope">
        {{ (scope.row.create_time * 1000) | dataFormate }}
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column align="center" label="操作" width="160px">
      <template v-slot="scope">
        <!-- 修改 -->
        <el-tooltip effect="dark" content="修改" placement="top-start" :enterable="false">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOrderInfo(scope.row.order_id)"></el-button>
        </el-tooltip>
        <!-- 物流进度 -->
        <el-tooltip effect="dark" content="物流进度" placement="top-start" :enterable="false">
          <el-button type="success" icon="el-icon-location" size="mini" @click="goodsprogress"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Array,
    },
  },
  methods: {
    // 监听修改按钮 CardEditAddress中处理事件
    editOrderInfo(id) {
      this.$bus.$emit('editAddressDialogVisible', id)
    },
    // 监听物流进度按钮 GoodsProgress中处理事件
    goodsprogress() {
      this.$bus.$emit('progressDialogVisible')
    },
  },
}
</script>

<style>
</style>