<template>
  <div>
    <!-- 面包屑导航 -->
    <break-crumb :text="['商品', '商品']"></break-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加商品分类按钮 -->
      <card-cate-btn></card-cate-btn>
      <!-- 表格 -->
      <cate-tree-table :cateList="cateList"></cate-tree-table>
      <!-- 分页区域 -->
      <card-paging
        :queryInfo="queryInfo"
        :total="total"
        @refreshList="refreshList"
      ></card-paging>
    </el-card>

    <!-- 编辑角色的对话框 -->
    <card-cate-edit></card-cate-edit>
  </div>
</template>

<script>
import BreakCrumb from 'components/content/BreakCrumb'
import CardPaging from 'components/content/CardPaging'
import CardCateBtn from './childComps/CardCateBtn'
import CateTreeTable from './childComps/CateTreeTable'
import CardCateEdit from './childComps/CardCateEdit'
import { getGoodsCate } from 'network/goodsCate'

export default {
  components: {
    BreakCrumb,
    CardPaging,
    CardCateBtn,
    CateTreeTable,
    CardCateEdit,
  },
  data() {
    return {
      // 请求数据需要的参数
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 获取的商品分类的数据
      cateList: [],
      // 获取的商品总数
      total: 0,
    }
  },
  created() {
    // 请求商品分类数据
    this._getGoodsCate()
  },
  mounted() {
    this.$bus.$on('refreshCateList', () => {
      // 重新发起请求 渲染页面
      this._getGoodsCate()
    })
  },
  methods: {
    async _getGoodsCate() {
      const { data } = await getGoodsCate(this.queryInfo)
      if (data.meta.status !== 200)
        return this.$message.error('获取商品分类数据失败!')
      this.cateList = data.data.result
      this.total = data.data.total
    },
    refreshList() {
      // 重新发起请求 渲染页面
      this._getGoodsCate()
    },
  },
}
</script>

<style scoped>
</style>