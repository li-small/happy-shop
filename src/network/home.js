import { request } from './request'

export function getHomeMenu() {
  return request({
    url: '/menus'
  })
}