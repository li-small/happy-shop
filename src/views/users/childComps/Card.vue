<template>
  <div id="card">
    <!-- 主体 -->
    <el-card>
      <!-- 搜索和添加区域 -->
      <card-search-add :queryInfo="queryInfo" @refreshList="refreshList" addText="用户"></card-search-add>
      <!-- 显示用户区域 -->
      <card-user-show :userList="userList"></card-user-show>
      <!-- 分页区域 -->
      <card-paging :queryInfo="queryInfo" :total="total" @refreshList="refreshList"></card-paging>
    </el-card>

    <!-- 添加用户的对话框 -->
    <card-add-user @refreshUserList="refreshList"></card-add-user>

    <!-- 编辑用户的对话框 -->
    <card-edit-user @refreshUserList="refreshList"></card-edit-user>

    <!-- 分配用户角色的对话框 -->
    <card-set-user-role @refreshUserList="refreshList"></card-set-user-role>
  </div>
</template>

<script>
import CardSearchAdd from 'components/content/CardSearchAdd'
import CardUserShow from './CardUserShow'
import CardPaging from 'components/content/CardPaging'
import CardAddUser from './CardAddUser'
import CardEditUser from './CardEditUser'
import CardSetUserRole from './CardSetUserRole'

import { getUser } from 'network/user.js'

export default {
  components: {
    CardSearchAdd,
    CardUserShow,
    CardPaging,
    CardAddUser,
    CardEditUser,
    CardSetUserRole,
  },
  data() {
    return {
      // 请求数据所需参数
      queryInfo: {
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 10,
      },
      // 存储用户列表数据
      userList: [],
      // 存储用户数量
      total: 0,
    }
  },
  created() {
    // 请求用户列表数据
    this._getUser()
  },
  mounted() {
    this.$bus.$on('refreshUserList', () => {
      this._getUser()
    })
  },
  methods: {
    async _getUser() {
      const { data } = await getUser(this.queryInfo)
      if (data.meta.status !== 200) return this.$message.error('获取用户列表失败!')
      this.userList = data.data.users
      this.total = data.data.total
    },
    // 刷新用户列表
    refreshList() {
      this._getUser()
    },
  },
}
</script>

<style>
</style>