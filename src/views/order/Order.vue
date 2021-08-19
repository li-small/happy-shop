<template>
  <div>
    <!-- 面包屑导航区域 -->
    <break-crumb :text="['订单', '订单']"></break-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <el-row>
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchOrder"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 展示订单列表区域 -->
      <card-order-show :orderList="orderList"></card-order-show>
      <!-- 分页区域 -->
      <card-paging :queryInfo="queryInfo" :total="total" @refreshList="refreshList"></card-paging>
    </el-card>

    <!-- 修改地址的对话框 -->
    <card-edit-address></card-edit-address>

    <!-- 物流进度的对话框 -->
    <goods-progress></goods-progress>
  </div>
</template>

<script>
import BreakCrumb from 'components/content/BreakCrumb'
import CardSearchAdd from 'components/content/CardSearchAdd'
import CardOrderShow from './childComps/CardOrderShow'
import CardPaging from 'components/content/CardPaging'
import CardEditAddress from './childComps/CardEditAddress'
import GoodsProgress from './childComps/GoodsProgress'

import { getOrderList } from 'network/order'

export default {
  components: {
    BreakCrumb,
    CardSearchAdd,
    CardOrderShow,
    CardPaging,
    CardEditAddress,
    GoodsProgress,
  },
  data() {
    return {
      // 请求订单数据需要的参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      // 获取的订单数据
      orderList: [],
      // 存储订单数量
      total: 0,
    }
  },
  created() {
    // 请求订单数据
    this._getOrderList()
  },
  methods: {
    async _getOrderList() {
      const { data } = await getOrderList(this.queryInfo)
      if (data.meta.status !== 200) return this.$message.error('获取订单数据失败!')
      this.orderList = data.data.goods
      this.total = data.data.total
    },
    // 监听搜索
    searchOrder() {},
    // 请求数据刷新视图
    refreshList() {
      this._getOrderList()
    },
  },
}
</script>

<style>
</style>