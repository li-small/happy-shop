<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <home-header></home-header>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <home-aside @toggleCollapse="toggleCollapseHandle"></home-aside>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeader from 'views/home/childComps/HomeHeader'
import HomeAside from 'views/home/childComps/HomeAside'

export default {
  data() {
    return {
      // 折叠展开状态
      isCollapse: false,
    }
  },
  components: {
    HomeHeader,
    HomeAside,
  },
  methods: {
    // 处理左侧菜单传过来的值
    toggleCollapseHandle(i) {
      this.isCollapse = i
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  padding-left: 8px;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}
</style>