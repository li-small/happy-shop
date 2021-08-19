<template>
  <el-dialog
    title="添加分类"
    :visible.sync="addDialogVisible"
    width="50%"
    @closed="addDialogClosed"
  >
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="100px"
    >
      <!-- 分类名称 -->
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="addForm.cat_name"></el-input>
      </el-form-item>
      <!-- 父级分类 -->
      <el-form-item label="父级分类：">
        <el-cascader
          v-model="selectedValue"
          :options="parentCateList"
          :props="cascaderProps"
          @change="parentCateChanged"
          clearable
        ></el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addCateClick">添 加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { vaildName } from 'common/validator'
import { getGoodsCate, addGoodsCate } from 'network/goodsCate'

export default {
  data() {
    return {
      // 控制对话框的显示和隐藏
      addDialogVisible: false,
      // 添加分类的表单数据
      addForm: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0,
      },
      // 添加分类的表单验证规则
      addFormRules: {
        cat_name: vaildName,
      },
      // 展示的父级分类数据
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      // 双向绑定 选中的父级分类的id的数组
      selectedValue: [],
    }
  },
  mounted() {
    // 事件总线监听了 添加分类按钮
    this.$bus.$on('addGoodsClick', async () => {
      // 获取父级分类数据
      const { data } = await getGoodsCate({ type: 2 })
      if (data.meta.status !== 200)
        return this.$message.error('获取父级分类数据失败!')
      this.parentCateList = data.data

      // 显示对话框
      this.addDialogVisible = true
    })
  },
  methods: {
    // 监听 父级分类选择项发生变化
    parentCateChanged() {
      // 判断添加什么级别分类
      if (this.selectedValue.length > 0) {
        this.addForm.cat_pid = this.selectedValue[this.selectedValue.length - 1]
        this.addForm.cat_level = this.selectedValue.length
      } else {
        this.addForm.cat_pid = 0
        this.addForm.cat_level = 0
      }
    },
    // 监听底部的添加按钮
    addCateClick() {
      // 先发起预校验
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起添加商品分类请求
        const { data } = await addGoodsCate(this.addForm)
        if (data.meta.status != 201)
          return this.$message.error('添加商品分类失败!')
        this.$message.success('添加商品分类成功!')

        // 重新发起请求 渲染页面
        this.$bus.$emit('refreshCateList')
        // 关闭对话框
        this.addDialogVisible = false
      })
    },
    // 监听关闭对话框
    addDialogClosed() {
      // 离开对话框 重置表单数据
      this.$refs.addFormRef.resetFields()
      this.selectedValue = []
      this.addForm.cat_pid = 0
      this.addForm.cat_level = 0
    },
  },
}
</script>

<style scoped>
</style>