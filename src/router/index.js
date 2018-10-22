import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path     : '/',
      name     : 'home',
      component: () => import('@/view/home/home')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title     : 'Login - 登录',
        hideInMenu: true
      },
      component: () => import('@/view/login/login')
    },
  ]
})
