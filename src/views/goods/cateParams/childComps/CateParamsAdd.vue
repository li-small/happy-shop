<template>
  <el-dialog
    :title="'添加' + titleText"
    :visible.sync="addDialogVisible"
    width="50%"
    @close="addDialogClosed"
  >
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="100px"
    >
      <el-form-item :label="titleText + ':'" prop="attr_name">
        <el-input v-model="addForm.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addParamsClick">添 加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { vaildParamsDesc } from 'common/validator'
import { addCateParams } from 'network/params'

export default {
  props: {
    activeName: {
      type: String,
    },
  },
  data() {
    return {
      // 控制对话框的显示和隐藏
      addDialogVisible: false,
      // 添加分类参数的表单数据
      addForm: {
        attr_name: '',
      },
      // 添加表单的验证规则对象
      addFormRules: {
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
    this.$bus.$on('addParamsDialog', () => {
      this.addDialogVisible = true
    })
  },
  methods: {
    // 监听添加用户对话框关闭事件
    addDialogClosed() {
      // 离开对话框 重置表单
      this.$refs.addFormRef.resetFields()
    },
    // 监听底部添加按钮时间
    addParamsClick() {
      // 发起预校验
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起添加分类参数请求
        const { data } = await addCateParams(
          this.$store.state.cateId,
          this.addForm.attr_name,
          this.activeName
        )
        if (data.meta.status !== 201)
          return this.$message.error('添加分类参数失败!')
        this.$message.success('添加分类参数成功!')
        // 请求刷新视图
        this.$emit('refreshList')
        // 关闭对话框
        this.addDialogVisible = false
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