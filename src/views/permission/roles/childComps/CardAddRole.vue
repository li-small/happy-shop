<template>
  <el-dialog
    title="添加角色"
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
      <el-form-item label="角色名称：" prop="roleName">
        <el-input v-model="addForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述：" prop="roleDesc">
        <el-input v-model="addForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addRoleClick">添 加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { vaildName, vaildRoleDesc } from 'common/validator'
import { addRoles } from 'network/permission'

export default {
  data() {
    return {
      // 控制对话框的显示和隐藏
      addDialogVisible: false,
      // 添加角色的表单数据
      addForm: {
        roleName: '',
        roleDesc: '',
      },
      // 添加表单的验证规则对象
      addFormRules: {
        roleName: vaildName,
        roleDesc: vaildRoleDesc,
      },
    }
  },
  methods: {
    // 监听添加角色对话框关闭事件
    addDialogClosed() {
      // 离开对话框 重置表单
      this.$refs.addFormRef.resetFields()
    },
    // 点击添加按钮 添加新角色
    addRoleClick() {
      // 先发起预校验
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起添加角色的网络请求
        const { data } = await addRoles(this.addForm)
        if (data.meta.status !== 201)
          return this.$message.error('添加角色失败!')
        this.$message.success('添加角色成功!')
        // 成功后隐藏对话框
        this.addDialogVisible = false
        // 重新获取角色列表数据 重新渲染视图
        this.$bus.$emit('refreshRoleList')
      })
    },
  },
  mounted() {
    // 事件总线监听点击了添加角色按钮
    this.$bus.$on('addRoleClick', () => {
      this.addDialogVisible = true
    })
  },
}
</script>

<style>
</style>