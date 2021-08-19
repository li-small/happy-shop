<template>
  <el-table :data="goodsList" border stripe>
    <!-- 序号 -->
    <el-table-column align="center" type="index" label="#"> </el-table-column>
    <!-- 商品名称 -->
    <el-table-column
      align="center"
      prop="goods_name"
      label="商品名称"
    ></el-table-column>
    <!-- 商品价格 -->
    <el-table-column
      align="center"
      prop="goods_price"
      label="商品价格(元)"
      width="115px"
    ></el-table-column>
    <!-- 商品重量 -->
    <el-table-column
      align="center"
      prop="goods_weight"
      label="商品重量"
      width="80px"
    ></el-table-column>
    <!-- 创建时间 -->
    <el-table-column align="center" label="创建时间" width="200px">
      <template v-slot="scope">
        {{ (scope.row.add_time * 1000) | dataFormate }}
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column label="操作" align="center" width="140px">
      <template v-slot="scope">
        <!-- 编辑商品列表信息 -->
        <!-- 编辑 -->
        <el-tooltip
          effect="dark"
          content="编辑"
          placement="top-end"
          :enterable="false"
        >
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editGoodsInfo(scope.row)"
          ></el-button>
        </el-tooltip>
        <!-- 删除 -->
        <el-tooltip
          effect="dark"
          content="删除"
          placement="top-end"
          :enterable="false"
        >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeGoodsInfo(scope.row.goods_id)"
          ></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { removeGoodsList } from 'network/goodsList'

export default {
  props: {
    goodsList: {
      type: Array,
    },
  },
  methods: {
    // 监听编辑按钮 CardGoodsEdit处理
    editGoodsInfo(goodsInfo) {
      this.$bus.$emit('editGoodsDialogVisible', goodsInfo)
    },
    // 监听删除按钮
    removeGoodsInfo(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const { data } = await removeGoodsList(id)
          if (data.meta.status !== 200)
            return this.$message.error('删除商品失败!')
          this.$message.success('删除商品成功!')
          // 重新获取商品列表数据 重新渲染视图
          this.$emit('refreshList')
        })
        .catch(() => {
          return
        })
    },
  },
}
</script>

<style scoped>
</style>