import { request } from './request'

// 请求权限列表数据(list结构)
export function getRights() {
  return request({
    method: 'get',
    url: '/rights/list',
  })
}

// 请求权限列表数据(tree结构)
export function getRightsTree() {
  return request({
    method: 'get',
    url: '/rights/tree',
  })
}

// 请求角色列表数据
export function getRoles() {
  return request({
    method: 'get',
    url: '/roles'
  })
}

// 添加角色数据
export function addRoles(arg) {
  return request({
    method: 'post',
    url: '/roles',
    data: {
      ...arg
    }
  })
}

// 根据id查询角色数据
export function queryRoles(id) {
  return request({
    method: 'get',
    url: '/roles/' + id
  })
}

// 编辑提交角色数据
export function editRoles(arg) {
  return request({
    method: 'put',
    url: '/roles/' + arg.roleId,
    data: {
      ...arg
    }
  })
}

// 删除角色数据
export function removeRoles(id) {
  return request({
    method: 'delete',
    url: '/roles/' + id
  })
}

// 删除角色指定权限
export function removeRights(roleId, rightsId) {
  return request({
    method: 'delete',
    url: '/roles/' + roleId + '/rights/' + rightsId,
  })
}

// 角色授权
export function setRights(roleId, rids) {
  return request({
    method: 'post',
    url: '/roles/' + roleId + '/rights',
    data: {
      roleId,
      rids
    }
  })
}
