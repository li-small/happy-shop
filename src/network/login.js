import { request } from './request'

export function getLogin(arg) {
  return request({
    url: '/login',
    params: {
      ...arg
    }
  })
}