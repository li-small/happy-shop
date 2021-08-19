<template>
  <el-dialog
    :title="'编辑' + titleText"
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
      <el-form-item :label="titleText + ':'" prop="attr_name">
        <el-input v-model="editForm.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editParamsClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { vaildParamsDesc } from 'common/validator'
import { editCateParams } from 'network/params'

export default {
  props: {
    activeName: {
      type: String,
    },
  },
  data() {
    return {
      // 控制对话框的显示和隐藏
      editDialogVisible: false,
      // 编辑分类参数的表单数据
      editForm: {
        attr_name: '',
      },
      // 编辑表单的验证规则对象
      editFormRules: {
        attr_name: vaildParamsDesc,
      },
    }
  },
  computed: {
    // 动态计算标题的文本
    titleText() {
      return this.activeName === 'many' ? '动态参数' : '静态属性'
    },
  },
  mounted() {
    this.$bus.$on('editParamsDialog', (cateParams) => {
      this.editForm.attr_id = cateParams.attr_id
      this.editForm.attr_name = cateParams.attr_name
      // 显示对话框
      this.editDialogVisible = true
    })
  },
  methods: {
    // 监听编辑用户对话框关闭事件
    editDialogClosed() {
      // 离开对话框 重置表单
      this.$refs.editFormRef.resetFields()
    },
    // 监听底部确定按钮时间
    editParamsClick() {
      // 发起预校验
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        const { data } = await editCateParams(
          this.$store.state.cateId,
          this.editForm.attr_id,
          this.editForm.attr_name,
          this.activeName
        )
        if (data.meta.status !== 200)
          return this.$message.error('编辑分类参数失败!')
        this.$message.success('编辑分类参数成功!')
        // 请求刷新视图
        this.$emit('refreshList')
        // 关闭对话框
        this.editDialogVisible = false
      })
    },
  },
}
</script>

<style scoped>
.el-form-item {
  padding-right: 50px;
}
</style>