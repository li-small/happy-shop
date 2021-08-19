<template>
  <div>
    <!-- 面包屑导航 -->
    <break-crumb :text="['商品', '添加']"></break-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :space="300"
        :active="Number(currentIndex)"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 表单 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <!-- 左侧tabs栏区域 -->
        <el-tabs
          tab-position="left"
          v-model="currentIndex"
          :before-leave="beforeTabLeave"
        >
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息" name="0">
            <!-- 渲染 -->
            <!-- 商品名称 -->
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <!-- 商品价格 -->
            <el-form-item label="商品价格(元)：" prop="goods_price">
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <!-- 商品数量 -->
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <!-- 商品重量 -->
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" ref="test"></el-input>
            </el-form-item>
            <!-- 商品分类 -->
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="cascaderProps"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品参数 -->
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染 -->
            <el-form-item
              :label="item.attr_name"
              v-for="item in goodsParams"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  border
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  :label="cb"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品属性 -->
          <el-tab-pane label="商品属性" name="2">
            <!-- 渲染 -->
            <el-form-item
              :label="item.attr_name"
              v-for="item in goodsProps"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品图片 -->
          <el-tab-pane label="商品图片" name="3">
            <!-- 渲染 -->
            <el-upload
              class="upload-demo"
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              multiple
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <!-- 商品内容 -->
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <!-- 添加商品按钮 -->
            <el-button type="primary" class="addGoodsBtn" @click="addGoodsClick"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览对话框 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewURL" alt="" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import BreakCrumb from 'components/content/BreakCrumb'
import { getTabData } from 'common/mixin'

import {
  vaildGoodsName,
  vaildGoodsPrice,
  vaildGoodsNumber,
  vaildGoodsWeight,
  vaildGoodsCat,
} from 'common/validator'

export default {
  // 使用混入
  mixins: [getTabData],
  components: {
    BreakCrumb,
  },
  data() {
    return {
      // 当前激活步骤
      currentIndex: '0',
      // 添加表单的数据
      addForm: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        // 级联选择框双向绑定到的id的数组
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: [],
      },
      // 添加表单的规则
      addFormRules: {
        goods_name: vaildGoodsName,
        goods_price: vaildGoodsPrice,
        goods_number: vaildGoodsNumber,
        goods_weight: vaildGoodsWeight,
        goods_cat: vaildGoodsCat,
      },
      // 展示级联选择框的分类数据
      cateList: [],
      // 指定级联选择框的配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        // 看到的
        label: 'cat_name',
        // 选中的
        value: 'cat_id',
        children: 'children',
      },
      // 展示商品参数的的数据
      goodsParams: [],
      // 展示商品属性的数据
      goodsProps: [],
      // 要上传的后台服务器地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 设置图片上传时的请求头 添加token值
      headerObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      // 图片预览地址
      previewURL: '',
      // 图片预览对话框显示与隐藏
      previewVisible: false,
    }
  },
  created() {
    // 请求商品分类数据
    this.getGoodsCateTab()
  },
  methods: {
    // 监听 父级分类选择项发生变化
    handleChange() {
      // 判断如果是否为三级分类
      if (this.addForm.goods_cat.length === 1)
        console.log(this.addForm.goods_cat.length)
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
        this.$message.warning('只能添加三级分类,请重新选择!')
        return
      }
    },
    // tab栏切换前触发
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类!')
        return false
      }
      // 如果条件通过tab允许跳转了 把商品参数和商品属性数据请求过来
      this.getCateParamsTab()
      this.getCatePropsTab()
    },
    // 文件上传成功时触发
    handleSuccess(response) {
      const addObj = { pic: response.data.tmp_path }
      // 添加进pics数组中
      this.addForm.pics.push(addObj)
    },
    // 删除文件时触发
    handleRemove(file) {
      // 获取要删除的文件路径
      const removePath = file.response.data.tmp_path
      // 找到要删除文件的索引
      const removeIndex = this.addForm.pics.findIndex(
        (item) => item.pic === removePath
      )
      // 从pics数组中移除文件
      this.addForm.pics.splice(removeIndex, 1)
      console.log(this.addForm)
    },
    // 点击预览 已经上传的图片
    handlePreview(file) {
      this.previewURL = file.response.data.url
      this.previewVisible = true
    },
    // 监听添加商品按钮
    addGoodsClick() {
      // 预校验
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return this.$message.error('请填写必要的表单项!')
        // 处理添加商品接口需要的参数
        // 处理goods_cat数据 深拷贝一个对象 处理数据用于表单提交
        const newAddForm = JSON.parse(JSON.stringify(this.addForm))
        newAddForm.goods_cat = newAddForm.goods_cat.join(',')
        // 处理attrs数据
        this.goodsParams.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(','),
          }
          newAddForm.attrs.push(newInfo)
        })
        this.goodsProps.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          }
          newAddForm.attrs.push(newInfo)
        })
        // 发起添加商品请求
        this.goodsContentTab(newAddForm)
      })
    },
  },
}
</script>

<style scoped>
.el-checkbox {
  margin: 0 5px 0 0;
}

.previewImg {
  width: 100%;
}

.addGoodsBtn {
  margin-top: 15px;
}
</style>