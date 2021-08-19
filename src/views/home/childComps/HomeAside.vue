<template>
  <div id="home-aside">
    <div class="toggle-button" @click="toggleCollapseClick">|||</div>
    <el-menu background-color="#333744" text-color="#fff" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="active">
      <!-- 一级菜单 -->
      <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="'/' + item1.path" v-for="item1 in item.children" :key="item1.id" @click="activeStateClick('/' + item1.path)">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ item1.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getHomeMenu } from 'network/home'

export default {
  data() {
    return {
      // 存储左侧菜单数据
      menuList: [],
      // 图标数据
      iconsObj: {
        125: 'iconfont icon-yonghuguanli',
        103: 'iconfont icon-quanxianguanli',
        101: 'iconfont icon-shangpinguanli',
        102: 'iconfont icon-dingdanguanli',
        145: 'iconfont icon-icon-test',
      },
      // 折叠展开状态
      isCollapse: false,
      // 被激活的链接地址
      active: '',
    }
  },
  created() {
    // 请求左侧菜单数据
    this._getHomeMenu()
    // 获取缓存中被激活的导航地址
    this.active = window.sessionStorage.getItem('activePath')
  },
  methods: {
    async _getHomeMenu() {
      const { data } = await getHomeMenu()
      // 获取失败 弹窗显示错误信息
      if (data.meta.status !== 200) return this.$message.error(data.meta.msg)
      this.menuList = data.data
    },
    // 菜单展开与折叠按钮
    toggleCollapseClick() {
      this.isCollapse = !this.isCollapse
      this.$emit('toggleCollapse', this.isCollapse)
    },
    // 保存链接的激活状态到缓存
    activeStateClick(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.active = activePath
    },
  },
}
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  // 字体间距
  letter-spacing: 0.2em;
  cursor: pointer;
}

.iconfont {
  margin-right: 10px;
}

span {
  font-size: 15px;
}
</style>