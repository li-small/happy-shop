<template>
  <el-dialog
    title="修改角色"
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
      <el-form-item label="角色名称:" prop="roleName">
        <el-input v-model="editForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述:" prop="roleDesc">
        <el-input v-model="editForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editRoleClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { queryRoles, editRoles } from 'network/permission'

import { vaildName, vaildRoleDesc } from 'common/validator'

export default {
  data() {
    return {
      // 控制对话框的显示和隐藏
      editDialogVisible: false,
      // 查询的角色信息数据
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        roleName: vaildName,
        roleDesc: vaildRoleDesc,
      },
    }
  },
  methods: {
    // 监听对话框关闭 重置表单信息
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击确认按钮 修改角色
    editRoleClick() {
      // 先发起预校验
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改角色的网络请求
        const { data } = await editRoles(this.editForm)
        if (data.data.status !== 200) this.$message.error('更新角色失败!')
        this.$message.success('更新角色成功!')
        // 重新获取角色列表数据 重新渲染视图
        this.$bus.$emit('refreshRoleList')
        // 成功后隐藏对话框
        this.editDialogVisible = false
      })
    },
  },
  mounted() {
    // 事件总线监听点击了修改按钮
    this.$bus.$on('editRoleDialogVisible', async (id) => {
      // 弹出对话框
      this.editDialogVisible = true
      // 请求数据
      const { data } = await queryRoles(id)
      if (data.meta.status !== 200) {
        userState.mg_state = !userState.mg_state
        return this.$message.error('查询角色信息失败!')
      }
      this.editForm = data.data
    })
  },
}
</script>

<style>
</style>