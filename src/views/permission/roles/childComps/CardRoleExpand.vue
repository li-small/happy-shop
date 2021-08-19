<template>
  <div>
    <el-row
      v-for="(itemX, indexX) in scope.row.children"
      :key="itemX.id"
      :class="['bb', indexX === 0 ? 'bt' : '']"
    >
      <!-- 渲染一级权限 -->
      <el-col :span="5">
        <el-tag closable @close="removeRoleRights(scope.row, itemX.id)">{{
          itemX.authName
        }}</el-tag>
        <i class="el-icon-caret-right"></i>
      </el-col>
      <!-- 渲染二三级权限 -->
      <el-col :span="19">
        <el-row
          v-for="(itemY, indexY) in itemX.children"
          :key="itemY.id"
          :class="[indexY === 0 ? '' : 'bt']"
        >
          <!-- 二级权限 -->
          <el-col :span="6">
            <el-tag
              type="success"
              closable
              @close="removeRoleRights(scope.row, itemY.id)"
              >{{ itemY.authName }}</el-tag
            >
            <i class="el-icon-caret-right"></i>
          </el-col>
          <!-- 三级权限 -->
          <el-col :span="18">
            <el-tag
              type="warning"
              v-for="itemZ in itemY.children"
              :key="itemZ.id"
              closable
              @close="removeRoleRights(scope.row, itemZ.id)"
            >
              {{ itemZ.authName }}
            </el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { removeRights } from 'network/permission'

export default {
  props: {
    scope: {
      type: Object,
    },
  },
  methods: {
    // 监听点击删除权限按钮
    removeRoleRights(role, rightsId) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 发起请求删除权限信息
          const { data } = await removeRights(role.id, rightsId)
          if (data.meta.status !== 200)
            return this.$message.error('删除权限失败!')
          this.$message.success('删除权限成功!')

          // 重新赋值 渲染页面
          role.children = data.data
        })
        .catch(() => {
          return
        })
      // then是权限点击了确定按钮
      // catch是权限点击了取消按钮
    },
  },
}
</script>

<style>
.el-row {
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 7px;
}

.bb {
  border-bottom: 1px solid #eee;
}

.bt {
  border-top: 1px solid #eee;
}
</style>