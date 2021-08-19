<template>
  <div>
    <!-- 面包屑导航 -->
    <break-crumb :text="['权限', '权限']"></break-crumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 列表展示 -->
      <card-list-show :rightsList="rightsList"></card-list-show>
    </el-card>
  </div>
</template>

<script>
import { getRights } from 'network/permission'
import BreakCrumb from 'components/content/BreakCrumb'
import CardListShow from './childComps/CardListShow'

export default {
  data() {
    return {
      // 存储权限列表数据
      rightsList: [],
    }
  },
  components: {
    BreakCrumb,
    CardListShow,
  },
  created() {
    // 请求权限列表数据
    this._getRights()
  },
  methods: {
    async _getRights() {
      const { data } = await getRights()
      if (data.meta.status !== 200)
        return this.$message.error('获取权限列表失败!')
      this.rightsList = data.data
    },
  },
}
</script>

<style>
</style>