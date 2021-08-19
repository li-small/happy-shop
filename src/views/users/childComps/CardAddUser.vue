<template>
  <el-dialog
    title="添加用户"
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
      <el-form-item label="姓名：" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="addForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机：" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUserClick">添 加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  vaildName,
  vaildPassword,
  vaildEmail,
  vaildMobile,
} from 'common/validator'

import { addUser } from 'network/user.js'

export default {
  data() {
    return {
      // 控制对话框的显示和隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: vaildName,
        password: vaildPassword,
        email: vaildEmail,
        mobile: vaildMobile,
      },
    }
  },
  methods: {
    // 点击添加按钮 添加新用户
    addUserClick() {
      // 先发起预校验
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起添加用户的网络请求
        const { data } = await addUser(this.addForm)
        if (data.meta.status !== 201)
          return this.$message.error('添加用户失败!')
        this.$message.success('添加用户成功!')
        // 成功后隐藏对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据 重新渲染视图
        this.$bus.$emit('refreshUserList')
      })
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed() {
      // 离开对话框 重置表单
      this.$refs.addFormRef.resetFields()
    },
  },
  mounted() {
    // 事件总线监听点击了添加按钮
    this.$bus.$on('addClick', () => {
      this.addDialogVisible = true
    })
  },
}
</script>

<style scoped>
.el-form-item {
  padding-right: 50px;
}
</style>