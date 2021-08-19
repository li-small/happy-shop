<template>
  <tree-table
    :data="cateList"
    :columns="columns"
    :selection-type="false"
    :expand-type="false"
    show-index
    index-text="#"
    border
    :show-row-hover="false"
    class="tree"
  >
    <!-- 是否有效 自定义列 -->
    <template slot="isok" slot-scope="scope">
      <i
        class="el-icon-success"
        v-if="!scope.row.cat_deleted"
        style="color: lightgreen"
      ></i>
      <i class="el-icon-error" v-else style="color: lightgreen"></i>
    </template>
    <!-- 排序 自定义列 -->
    <template slot="sort" slot-scope="scope">
      <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
      <el-tag v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
      <el-tag v-else type="warning">三级</el-tag>
    </template>
    <!-- 操作 -->
    <template slot="operation" slot-scope="scope">
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="editCateClick(scope.row)"
        >编辑</el-button
      >
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="removeCateClick(scope.row.cat_id)"
        >删除</el-button
      >
    </template>
  </tree-table>
</template>

<script>
import { removeGoodsCate } from 'network/goodsCate'

export default {
  props: {
    cateList: {
      type: Array,
    },
  },
  data() {
    return {
      // 为tree-table指定 列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          // 自定义列模板
          type: 'template',
          // 当前这一列使用的模板名称
          template: 'isok',
        },
        {
          label: '排序',
          // 自定义列模板
          type: 'template',
          // 当前这一列使用的模板名称
          template: 'sort',
        },
        {
          label: '操作',
          // 自定义列模板
          type: 'template',
          // 当前这一列使用的模板名称
          template: 'operation',
        },
      ],
    }
  },
  methods: {
    // 监听编辑信息按钮 CateCardEdit中处理事件
    editCateClick(cate) {
      this.$bus.$emit('editCateDialogVisible', cate)
    },
    // 监听删除信息按钮
    removeCateClick(id) {
      this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const { data } = await removeGoodsCate(id)
          if (data.meta.status !== 200)
            return this.$message.error('删除商品分类失败!')
          this.$message.success('删除商品分类成功!')
          // 重新渲染视图
          this.$bus.$emit('refreshCateList')
        })
        .catch(() => {
          return
        })
      // then是角色点击了确定按钮
      // catch是角色点击了取消按钮
    },
  },
}
</script>

<style scoped>
.tree {
  margin-top: 15px;
  font-size: 14px;
}
i {
  font-size: 20px;
}
</style>