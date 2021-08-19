<template>
  <div>
    <!-- 表格 -->
    <el-table :data="tableData" border stripe>
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template v-slot="scope">
          <!-- tag标签 -->
          <el-tag
            v-for="(item, i) in scope.row.attr_vals"
            :key="i"
            closable
            @close="removeHandle(scope.row, i)"
          >
            {{ item }}
          </el-tag>
          <!-- 动态编辑标签 -->
          <el-input
            class="input-new-tag"
            v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="$event.target.blur()"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(scope.row)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column
        :label="text + '名称'"
        prop="attr_name"
      ></el-table-column>
      <el-table-column label="操作" prop="attr_name">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editParams(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeParams(scope.row.attr_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { removeCateParams, editCateParams } from 'network/params'

export default {
  props: {
    tableData: {
      type: Array,
    },
    text: {
      type: String,
    },
  },
  data() {
    return {
      // 控制按钮和文本框的切换显示
      inputVisible: false,
      // 双向绑定文本框输入的内容
      inputValue: '',
    }
  },
  methods: {
    // 监听点击编辑按钮 CateParamsEdit处理事件
    editParams(cateParams) {
      this.$bus.$emit('editParamsDialog', cateParams)
    },
    // 监听点击删除按钮
    removeParams(attrId) {
      this.$confirm(`此操作将永久删除该${this.text}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const { data } = await removeCateParams(
            this.$store.state.cateId,
            attrId
          )
          if (data.meta.status !== 200)
            return this.$message.error(`删除${this.text}失败!`)
          this.$message.success(`删除${this.text}成功!`)
          // 请求刷新视图
          this.$emit('refreshList')
        })
        .catch(() => {
          return
        })
    },
    // 监听动态编辑标签中的文本框 失去焦点触发的事件
    async handleInputConfirm(row) {
      row.inputVisible = false
      console.log('ok')
      // 如果用户输入的是空格 就清空返回
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        return
      }
      // 如果是合法内容
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      const { data } = await editCateParams(
        this.$store.state.cateId,
        row.attr_id,
        row.attr_name,
        row.attr_sel,
        row.attr_vals.join(',')
      )
      if (data.meta.status !== 200)
        return this.$message.error(`添加${this.text}项失败!`)
      this.$message.success(`添加${this.text}项成功!`)
    },
    // 监听动态编辑标签中的点击按钮 展示文本框
    showInput(row) {
      row.inputVisible = true
      // 点击的时候自动获得焦点
      // $nextTick 当页面上元素被重新渲染后 才会指定回调函数中的代码 如果不用$nextTick还是按钮
      this.$nextTick((_) => {
        // 加$refs.input 两者区别就是一个先获取父节点再获取子节点，一个是直接获取子节点。后者减少dom节点消耗
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 监听tag标签上的删除小图标
    async removeHandle(row, i) {
      row.attr_vals.splice(i, 1)
      const { data } = await editCateParams(
        this.$store.state.cateId,
        row.attr_id,
        row.attr_name,
        row.attr_sel,
        row.attr_vals.join(',')
      )
      if (data.meta.status !== 200)
        return this.$message.error(`删除${this.text}项失败!`)
      this.$message.success(`删除${this.text}项成功!`)
    },
  },
}
</script>

<style scoped>
.el-tag {
  margin: 10px;
}

.input-new-tag {
  width: 120px;
}
</style>