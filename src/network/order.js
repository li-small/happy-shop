import { request } from './request'

// 请求订单数据
export function getOrderList(info) {
  return request({
    method: "get",
    url: '/orders',
    params: {
      ...info
    }
  })
}

// 请求查看订单详情
export function getOrderDetail(id) {
  return request({
    method: "get",
    url: '/orders/' + id,
  })
}