<template>
  <el-dialog title="修改地址" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
      <el-form-item label="省市区/县：" prop="address1">
        <el-cascader v-model="editForm.address1" :options="cityData" :props="cascaderProps"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址：" prop="address2">
        <el-input v-model="editForm.address2"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editOrderClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { vaildAddress1, vaildAddress2 } from 'common/validator'
import citydata from 'common/citydata'
import { getOrderDetail } from 'network/order'

export default {
  props: {
    orderList: {
      type: Array,
    },
  },
  data() {
    return {
      // 控制修改对话框的显示与隐藏
      editDialogVisible: false,
      editForm: {
        address1: [],
        address2: '',
      },
      editFormRules: {
        address1: vaildAddress1,
        address2: vaildAddress2,
      },
      // 省市区县数据
      cityData: citydata,
      // 指定级联选择框的配置对象
      cascaderProps: {
        expandTrigger: 'hover',
      },
    }
  },
  mounted() {
    this.$bus.$on('editAddressDialogVisible', async (id) => {
      const { data } = await getOrderDetail(id)
      if (data.meta.status !== 200) return this.$message.error('获取订单详情失败!')
      this.editForm.address2 = data.data.consignee_addr
      // 显示对话框
      this.editDialogVisible = true
    })
  },
  methods: {
    // 监听底部确定按钮
    editOrderClick() {
      // 发起预校验
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return
        // 发起修改地址请求
        this.$message.success('暂时还没有修改地址的接口!')
        this.editDialogVisible = false
      })
    },
    // 监听对话框关闭 重置表单
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
  },
}
</script>

<style>
</style>