<template>
  <el-dialog
    title="修改分类"
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
      <el-form-item label="分类名称:" prop="cat_name">
        <el-input v-model="editForm.cat_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editCateClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editGoodsCate } from 'network/goodsCate'
import { vaildName } from 'common/validator'

export default {
  data() {
    return {
      // 控制对话框的显示和隐藏
      editDialogVisible: false,
      // 查询的商品分类信息数据
      editForm: {
        cat_id: '',
        cat_name: '',
      },
      // 修改表单的验证规则对象
      editFormRules: {
        cat_name: vaildName,
      },
    }
  },
  mounted() {
    this.$bus.$on('editCateDialogVisible', async (cate) => {
      this.editForm.cat_id = cate.cat_id
      this.editForm.cat_name = cate.cat_name
      this.editDialogVisible = true
    })
  },
  methods: {
    // 监听对话框关闭 重置表单信息
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击确认按钮 编辑商品分类
    editCateClick() {
      // 先发起预校验
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        const { data } = await editGoodsCate(this.editForm)
        if (data.meta.status != 200)
          return this.$message.error('修改商品分类失败!')
        this.$message.success('修改商品分类成功!')
        // 重新获取商品分类列表数据 重新渲染视图
        this.$bus.$emit('refreshCateList')
        // 成功后隐藏对话框
        this.editDialogVisible = false
      })
    },
  },
}
</script>

<style>
</style>