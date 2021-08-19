<template>
  <el-dialog
    title="修改商品"
    :visible.sync="editDialogVisible"
    width="50%"
    @close="editDialogClosed"
  >
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="100px"
    >
      <!-- 商品名 -->
      <el-form-item label="商品名：" prop="goods_name">
        <el-input v-model="editForm.goods_name"></el-input>
      </el-form-item>
      <!-- 价格 -->
      <el-form-item label="价格(元)：" prop="goods_price">
        <el-input v-model="editForm.goods_price"></el-input>
      </el-form-item>
      <!-- 数量 -->
      <el-form-item label="数量：" prop="goods_number">
        <el-input v-model="editForm.goods_number"></el-input>
      </el-form-item>
      <!-- 重量 -->
      <el-form-item label="重量：" prop="goods_weight">
        <el-input v-model="editForm.goods_weight" ref="test"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editGoodsClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  vaildGoodsName,
  vaildGoodsPrice,
  vaildGoodsNumber,
  vaildGoodsWeight,
} from 'common/validator'
import { editGoodsList } from 'network/goodsList'
export default {
  data() {
    return {
      // 控制对话框的显示和隐藏
      editDialogVisible: false,
      // 查询的商品信息数据
      editForm: {
        goods_id: 0,
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_cat: '1',
      },
      // 修改表单的验证规则对象
      editFormRules: {
        goods_name: vaildGoodsName,
        goods_price: vaildGoodsPrice,
        goods_number: vaildGoodsNumber,
        goods_weight: vaildGoodsWeight,
      },
    }
  },
  mounted() {
    // 事件总线监听点击了编辑按钮
    this.$bus.$on('editGoodsDialogVisible', (goods) => {
      this.editForm.goods_id = goods.goods_id
      this.editForm.goods_name = goods.goods_name
      this.editForm.goods_price = goods.goods_price
      this.editForm.goods_number = goods.goods_number
      this.editForm.goods_weight = goods.goods_weight
      // 弹出对话框
      this.editDialogVisible = true
    })
  },
  methods: {
    // 监听对话框关闭 重置表单信息
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 监听点击确认按钮
    editGoodsClick() {
      // 先发起预校验
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        const { data } = await editGoodsList(this.editForm)
        if (data.meta.status !== 200)
          return this.$message.error('修改商品信息失败!')
        this.$message.success('修改商品信息成功!')
        this.$emit('refreshList')
        // 隐藏对话框
        this.editDialogVisible = false
      })
    },
  },
}
</script>

<style>
</style>