import { request } from './request'

// 请求商品列表数据
export function getGoodsList(queryInfo) {
  return request({
    method: 'get',
    url: '/goods',
    params: {
      ...queryInfo
    }
  })
}

// 删除商品数据
export function removeGoodsList(id) {
  return request({
    method: 'delete',
    url: '/goods/' + id
  })
}

// 编辑商品数据
export function editGoodsList(arg) {
  return request({
    method: 'put',
    url: '/goods/' + arg.goods_id,
    data: {
      ...arg
    }
  })
}

// 添加商品数据
export function addGoods(goodsInfo) {
  return request({
    method: 'post',
    url: '/goods',
    data: {
      ...goodsInfo
    }
  })
}