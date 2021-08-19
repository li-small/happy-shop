<template>
  <el-dialog
    title="分配权限"
    :visible.sync="setRightsdialogVisible"
    width="50%"
  >
    <!-- 树形控件 -->
    <el-tree
      :data="rightsList"
      :props="treeProps"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="threeRightsId"
      ref="tree"
    ></el-tree>

    <span slot="footer" class="dialog-footer">
      <el-button @click="setRightsdialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="allotRights">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRightsTree, setRights } from 'network/permission'

export default {
  data() {
    return {
      // 控制对话框的显示和隐藏
      setRightsdialogVisible: false,
      // 所有权限的数据
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children',
      },
      // 当前分配权限的对象
      Currentrole: {},
      // 当前对象所有三级权限的id
      threeRightsId: [],
    }
  },
  mounted() {
    // 事件总线监听点击了分配权限按钮
    this.$bus.$on('setRoleDialogVisible', async (role) => {
      // 发起请求获取所有权限数据
      const { data } = await getRightsTree()
      if (data.meta.status !== 200)
        return this.$message.error('获取权限数据失败!')
      this.rightsList = data.data

      this.Currentrole = role

      // 获取三级权限的id
      // 每次获取前都要清空一下之前获取保存的id
      this.threeRightsId = []
      this.getThreeRightsId(this.Currentrole, this.threeRightsId)

      // 显示对话框
      this.setRightsdialogVisible = true
    })
  },
  methods: {
    // 递归获取当前对象所有三级权限的id
    getThreeRightsId(node, newNode) {
      if (!node.children) {
        return newNode.push(node.id)
      }
      // 递归
      node.children.forEach((item) => this.getThreeRightsId(item, newNode))
    },

    // 监听确定按钮 为角色分配权限
    async allotRights() {
      // 获取所有选中节点和半选中节点的 key
      const keys = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys(),
      ]
      const keysStr = keys.join(',')
      // 发起请求
      const { data } = await setRights(this.Currentrole.id, keysStr)
      if (data.meta.status !== 200) return this.$message.error('分配权限失败!')
      this.$message.success('分配权限成功!')
      // 成功后隐藏对话框
      this.setRightsdialogVisible = false
      // 重新赋值 渲染页面
      this.$bus.$emit('refreshRoleList')
    },
  },
}
</script>

<style>
</style>