<template>
  <div>
    <!-- 面包屑导航 -->
    <break-crumb :text="['权限', '角色']"></break-crumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加按钮 -->
      <card-btn></card-btn>
      <!-- 角色列表显示区域 -->
      <card-role-show :rolesList="rolesList"></card-role-show>
    </el-card>

    <!-- 编辑角色的对话框 -->
    <card-edit-role></card-edit-role>

    <!-- 分配权限的对话框 -->
    <card-set-role-rights></card-set-role-rights>
  </div>
</template>

<script>
import BreakCrumb from 'components/content/BreakCrumb'

import { getRoles } from 'network/permission'

import CardRoleShow from './childComps/CardRoleShow'
import CardBtn from './childComps/CardBtn'
import CardEditRole from './childComps/CardEditRole'
import CardSetRoleRights from './childComps/CardSetRoleRights'

export default {
  data() {
    return {
      // 存储角色列表数据
      rolesList: [],
    }
  },
  components: {
    BreakCrumb,
    CardRoleShow,
    CardBtn,
    CardEditRole,
    CardSetRoleRights,
  },
  created() {
    this._getRoles()
  },
  methods: {
    async _getRoles() {
      const { data } = await getRoles()
      if (data.meta.status !== 200)
        return this.$message.error('获取角色列表失败!')
      this.rolesList = data.data
    },
  },
  mounted() {
    // 刷新角色列表
    this.$bus.$on('refreshRoleList', () => {
      this._getRoles()
    })
  },
}
</script>

<style>
</style>