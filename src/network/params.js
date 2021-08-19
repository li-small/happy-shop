import { request } from './request'

// 请求分类参数列表数据
export function getCateParamsList(id, sel) {
  return request({
    method: 'get',
    url: '/categories/' + id + '/attributes',
    params: {
      sel
    }
  })
}

// 添加分类参数数据
export function addCateParams(id, attr_name, attr_sel) {
  return request({
    method: 'post',
    url: '/categories/' + id + '/attributes',
    data: {
      attr_name,
      attr_sel
    }
  })
}

// 编辑分类参数数据
export function editCateParams(id, attrId, attr_name, attr_sel, attr_vals) {
  return request({
    method: 'put',
    url: '/categories/' + id + '/attributes/' + attrId,
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

// 删除分类参数数据
export function removeCateParams(id, attrId) {
  return request({
    method: 'delete',
    url: '/categories/' + id + '/attributes/' + attrId,
  })
}