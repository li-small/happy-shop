<template>
  <div>
    <!-- 面包屑导航 -->
    <break-crumb :text="['商品', '商品']"></break-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索和添加区域 -->
      <card-search-add
        :queryInfo="queryInfo"
        @refreshList="refreshList"
        addText="商品"
      ></card-search-add>
      <!-- 展示商品列表区域 -->
      <card-goods-show
        :goodsList="goodsList"
        @refreshList="refreshList"
      ></card-goods-show>
      <!-- 分页区域 -->
      <card-paging
        :queryInfo="queryInfo"
        :total="total"
        @refreshList="refreshList"
      ></card-paging>
    </el-card>

    <!-- 编辑对话框 -->
    <card-goods-edit @refreshList="refreshList"></card-goods-edit>
  </div>
</template>

<script>
import BreakCrumb from 'components/content/BreakCrumb'
import CardSearchAdd from 'components/content/CardSearchAdd'
import CardGoodsShow from './childComps/CardGoodsShow'
import CardPaging from 'components/content/CardPaging'
import CardGoodsEdit from './childComps/CardGoodsEdit'

import { getGoodsList } from 'network/goodsList'
export default {
  components: {
    BreakCrumb,
    CardSearchAdd,
    CardGoodsShow,
    CardPaging,
    CardGoodsEdit,
  },
  data() {
    return {
      // 请求数据所需参数
      queryInfo: {
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 10,
      },
      // 存储商品列表数据
      goodsList: [],
      // 存储商品数量
      total: 0,
    }
  },
  created() {
    // 请求商品列表数据
    this._getGoodsList()
  },
  methods: {
    // 刷新商品列表
    refreshList() {
      this._getGoodsList()
    },
    // 请求数据
    async _getGoodsList() {
      const { data } = await getGoodsList(this.queryInfo)
      if (data.meta.status != 200)
        return this.$message.error('获取商品列表数据失败!')
      this.goodsList = data.data.goods
      this.total = data.data.total
    },
  },
}
</script>

<style>
</style>