import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const HomeMain = () => import('views/home/childComps/HomeMain')
const User = () => import('views/users/User')
const Rights = () => import('views/permission/rights/Rights')
const Roles = () => import('views/permission/roles/Roles')
const GoodsCate = () => import('views/goods/goodsCate/GoodsCate')
const CateParams = () => import('views/goods/cateParams/CateParams')
const GoodsList = () => import('views/goods/goodsList/GoodsList')
const CardGoodsAdd = () => import('views/goods/goodsList/childComps/CardGoodsAdd')
const Order = () => import('views/order/Order')
const Report = () => import('views/report/Report')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    // 重定向到子路由/main
    redirect: '/main',
    children: [
      {
        path: '/main',
        component: HomeMain
      },
      {
        path: '/users',
        component: User
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: GoodsCate
      },
      {
        path: '/params',
        component: CateParams
      },
      {
        path: '/goods',
        component: GoodsList
      },
      {
        path: '/goods/add',
        component: CardGoodsAdd
      },
      {
        path: '/orders',
        component: Order
      },
      {
        path: '/reports',
        component: Report
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 跳转前调用
router.beforeEach((to, from, next) => {
  // 标题修改
  // document.title = to.matched[0].meta.title

  // to 将要访问的路径
  // from 代表从哪个路径跳转过来
  // next 是一个函数 代表放行
  // next() 放行   next('login') 强制跳转到登录页面

  // 用户访问登录页 直接放行
  if (to.path === '/login') return next()
  // 用户访问特定页面
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token 强制跳转登录页面
  if (!tokenStr) return next('/login')
  // 有token 允许访问特定页面
  next()
})

export default router
