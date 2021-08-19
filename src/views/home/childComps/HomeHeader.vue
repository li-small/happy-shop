<template>
  <div id="home-header">
    <div>
      <img src="~assets/yuan.png" alt="" />
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    // 退出按钮
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
#home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
  img {
    width: 61px;
    height: 56px;
    margin-right: 15px;
    border-radius: 50%;
    background-color: #eee;
    box-shadow: 0 0 6px #eee;
  }
}
</style>