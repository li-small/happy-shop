import { request } from './request'

// 请求商品分类列表数据
export function getGoodsCate(queryInfo) {
  return request({
    method: 'get',
    url: '/categories',
    params: {
      ...queryInfo
    }
  })
}

// 添加商品分类数据
export function addGoodsCate(addInfo) {
  return request({
    method: 'post',
    url: '/categories',
    data: {
      ...addInfo
    }
  })
}

// 根据id查询商品分类数据
export function queryGoodsCate(id) {
  return request({
    method: 'get',
    url: '/categories/' + id,
  })
}

// 编辑商品分类数据
export function editGoodsCate(editInfo) {
  return request({
    method: 'put',
    url: '/categories/' + editInfo.cat_id,
    data: {
      ...editInfo
    }
  })
}

// 删除商品分类数据
export function removeGoodsCate(id) {
  return request({
    method: 'delete',
    url: '/categories/' + id,
  })
}