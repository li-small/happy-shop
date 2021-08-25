import axios from 'axios'
// 导入NProgress包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(config) {
  const instance1 = axios.create({
    baseURL: 'http://timemeetyou.com:8889/api/private/v1',
    timeout: 2000
  })

  // 后期优化
  // 在request拦截器中 展示进度条 NProgress.start()
  // 在response拦截器中 隐藏进度条 NProgress.done()

  // 拦截器
  instance1.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  })

  instance1.interceptors.response.use(config => {
    NProgress.done()
    return config
  })
  return instance1(config)
}