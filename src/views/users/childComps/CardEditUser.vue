<template>
  <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="editForm.email" placeholder="用户暂未填写邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input v-model="editForm.mobile" placeholder="用户暂未填写手机号"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUserClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { queryUser, editUser } from 'network/user.js'

import { vaildEmail, vaildMobile } from 'common/validator'

export default {
  data() {
    return {
      // 控制对话框的显示和隐藏
      editDialogVisible: false,
      // 查询的用户信息数据
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        email: vaildEmail,
        mobile: vaildMobile,
      },
    }
  },
  mounted() {
    // 事件总线监听点击了修改按钮
    this.$bus.$on('editDialogVisible', async (id) => {
      // 弹出对话框
      this.editDialogVisible = true
      // 请求数据
      const { data } = await queryUser(id)
      if (data.meta.status !== 200) {
        userState.mg_state = !userState.mg_state
        return this.$message.error('查询用户信息失败!')
      }
      this.editForm = data.data
    })
  },
  methods: {
    // 监听对话框关闭 重置表单信息
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击确认按钮 修改用户
    editUserClick() {
      // 先发起预校验
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改用户的网络请求
        const { data } = await editUser(this.editForm)
        if (data.data.status !== 200) this.$message.error('更新用户失败!')
        this.$message.success('更新用户成功!')
        // 成功后隐藏对话框
        this.editDialogVisible = false
        // 重新获取用户列表数据 重新渲染视图
        this.$emit('refreshUserList')
      })
    },
  },
}
</script>

<style>
</style>