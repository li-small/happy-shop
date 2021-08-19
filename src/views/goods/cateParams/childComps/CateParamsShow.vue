<template>
  <div>
    <!-- 警告区域 -->
    <el-alert title="注意:只允许为第三季分类设置相关参数!" type="warning" :closable="false" show-icon> </el-alert>

    <!-- 选择商品分类区域 -->
    <el-row class="cate">
      <el-col>
        <span>选择商品分类:</span>
        <!-- 选择商品分类的级联选择器 -->
        <el-cascader v-model="selectedValue" :options="cateList" :props="cascaderProps" @change="cateChanged" clearable></el-cascader>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <!-- tab页签区域 -->
      <!-- 动态参数列表 -->
      <el-tab-pane label="动态参数" name="many">
        <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addParams">添加参数</el-button>
        <cate-params-table :tableData="manyTableData" text="参数" @refreshList="refreshList"></cate-params-table>
      </el-tab-pane>
      <!-- 静态参数列表 -->
      <el-tab-pane label="静态属性" name="only" :disabled="isBtnDisabled">
        <el-button type="primary" size="mini" @click="addParams">添加属性</el-button>
        <cate-params-table :tableData="onlyTableData" text="属性" @refreshList="refreshList"></cate-params-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加对话框 -->
    <cate-params-add :activeName="activeName" @refreshList="refreshList"></cate-params-add>

    <!-- 编辑对话框 -->
    <cate-params-edit :activeName="activeName" @refreshList="refreshList"></cate-params-edit>
  </div>
</template>

<script>
import { getGoodsCate } from 'network/goodsCate'
import { getCateParamsList } from 'network/params'

import CateParamsTable from './CateParamsTable'
import CateParamsAdd from './CateParamsAdd'
import CateParamsEdit from './CateParamsEdit'

export default {
  components: {
    getGoodsCate,
    CateParamsTable,
    CateParamsAdd,
    CateParamsEdit,
  },
  data() {
    return {
      // 商品分类列表数据
      cateList: [],
      // 指定级联选择框的配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      // 级联选择框双向绑定到的id的数组
      selectedValue: [],
      // 当前被激活的标签
      activeName: 'many',
      // 动态参数的数据
      manyTableData: [],
      // 静态属性的数据
      onlyTableData: [],
    }
  },
  created() {
    // 获取所有的商品分类数据
    this._getGoodsCate()
  },
  methods: {
    async _getGoodsCate() {
      const { data } = await getGoodsCate()
      if (data.meta.status !== 200) return this.$message.error('获取商品分类数据失败!')
      this.cateList = data.data
    },
    // 监听 父级分类选择项发生变化
    cateChanged() {
      // 如果选中的不是三级分类 不做处理
      if (this.selectedValue.length !== 3) {
        if (this.selectedValue.length !== 0) this.$message.warning('只能设置三级分类,请重新选择!')
        this.selectedValue = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }
      this.getCateParamsList()
    },
    // 监听tab页签点击事件
    handleTabClick() {
      this.getCateParamsList()
    },
    // 获取分类参数列表数据
    async getCateParamsList() {
      const { data } = await getCateParamsList(this.cateId, this.activeName)
      console.log(data.data)
      if (data.meta.status !== 200) return this.$message.error('获取参数列表数据失败!')
      data.data.forEach((item) => {
        // 将字符串转换成数组 展开行用到
        item.attr_vals = item.attr_vals.length !== 0 ? item.attr_vals.split(',') : []
        // 避免共用同一个inputVisible和inputValue
        item.inputVisible = false
        item.inputValue = ''
      })
      this.activeName === 'many' ? (this.manyTableData = data.data) : (this.onlyTableData = data.data)
    },
    // 监听添加参数/添加属性按钮 CateParamsAdd处理事件
    addParams() {
      this.$bus.$emit('addParamsDialog')
    },
    // 监听子组件传过来的事件 刷新视图
    refreshList() {
      this.getCateParamsList()
    },
  },
  computed: {
    // 如果没选中三级分类 就禁用添加参数按钮
    isBtnDisabled() {
      return this.selectedValue.length !== 3
    },
    // 当前选中的三级分类的id
    cateId() {
      let id = this.selectedValue.length !== 3 ? '' : this.selectedValue[this.selectedValue.length - 1]
      // 借助vuex管理
      this.$store.commit('seletedId', id)
      return id
    },
  },
}
</script>

<style scoped>
.cate {
  margin: 25px 5px;
}

span {
  margin-right: 10px;
}
</style>