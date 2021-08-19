<template>
  <div>
    <img src="~assets/welcome.jpg" alt="" />
    <h1>欢迎来到小猿电商后台管理系统</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
/deep/ .el-main {
  padding: 0;
}
div {
  position: relative;
  height: calc(100vh - 100px);
  img {
    width: 100%;
    height: 100%;
  }
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 400;
    font-size: 40px;
    color: rgba(160, 205, 216);
  }
}
</style>