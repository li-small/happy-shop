<template>
  <el-dialog title="分配角色" :visible.sync="setRoledialogVisible" width="50%">
    <div>
      <p>当前的用户：{{ currentUser.username }}</p>
      <p>当前的角色：{{ currentUser.role_name }}</p>
      <p>
        分配新角色：
        <el-select v-model="selectId" placeholder="请分配角色">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="setRoledialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="setUserRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoles } from 'network/permission'
import { setUserRole } from 'network/user'

export default {
  data() {
    return {
      // 控制对话框的显示和隐藏
      setRoledialogVisible: false,
      // 当前用户对象
      currentUser: {},
      // 所有角色的数据
      roleList: [],
      // :value对应的值是v-model绑定的值 将选中的值双向绑定到data中 所以这里是选择的id值
      selectId: '',
    }
  },
  mounted() {
    this.$bus.$on('setDialogVisible', async (user) => {
      // 请求角色数据
      const { data } = await getRoles()
      if (data.meta.status !== 200)
        return this.$message.error('获取权限数据失败!')
      this.roleList = data.data
      this.currentUser = user
      // 显示对话框
      this.setRoledialogVisible = true
    })
  },
  methods: {
    // 监听点击确定按钮
    async setUserRole() {
      if (!this.selectId) return this.$message.error('角色还没分配哦!')
      if (this.currentUser.id === 500) {
        // 隐藏对话框
        this.setRoledialogVisible = false
        return this.$message.warning('管理员不能分配!')
      }
      const { data } = await setUserRole(this.currentUser.id, this.selectId)
      if (data.meta.status !== 200) return this.$message.error('分配角色失败!')
      this.$message.success('分配角色成功!')
      // 重置值
      this.selectId = ''

      // 隐藏对话框
      this.setRoledialogVisible = false
      // 刷新用户列表
      this.$bus.$emit('refreshUserList', () => {
        this._getUser()
      })
    },
  },
}
</script>

<style>
</style>