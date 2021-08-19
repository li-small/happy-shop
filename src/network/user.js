import { request } from "./request"

// 请求用户列表数据
export function getUser(arg) {
  return request({
    method: 'get',
    url: '/users',
    params: {
      ...arg
    }
  })
}

// 修改用户状态
export function UpdateUser(id, state) {
  return request({
    method: 'put',
    url: '/users/' + id + '/state/' + state
  })
}

// 添加用户
export function addUser(arg) {
  return request({
    method: 'post',
    url: '/users',
    // data是添加到请求体 get请求中不存在data
    data: {
      ...arg
    }
  })
}

// 根据id查询用户信息
export function queryUser(id) {
  return request({
    method: 'get',
    url: '/users/' + id
  })
}

// 修改用户信息
export function editUser(arg) {
  return request({
    method: 'put',
    url: '/users/' + arg.id,
    data: {
      ...arg
    }
  })
}

// 删除用户信息
export function removeUser(id) {
  return request({
    method: 'delete',
    url: '/users/' + id
  })
}

// 分配用户角色
export function setUserRole(userId, roleId) {
  return request({
    method: 'put',
    url: '/users/' + userId + '/role',
    data: {
      id: userId,
      rid: roleId
    }
  })
}