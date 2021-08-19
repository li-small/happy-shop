import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'assets/css/global.css'
import axios from "axios"
import TreeTable from 'vue-table-with-tree-grid'
import store from './store'
/* 富文本编辑器 */
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 全局挂载格式化时间
Vue.filter('dataFormate', function (timeVal) {
  let time = new Date(timeVal)
  let y = time.getFullYear()
  let m = (time.getMonth() + 1 + '').padStart(2, '0')
  let d = (time.getDate() + '').padStart(2, '0')
  let h = (time.getHours() + '').padStart(2, '0')
  let mm = (time.getMinutes() + '').padStart(2, '0')
  let s = (time.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${mm}:${s}`
})

Vue.component('tree-table', TreeTable)

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 全部导入element.js
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI);

// 全局挂载axios
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
// Vue.prototype.$http = axios