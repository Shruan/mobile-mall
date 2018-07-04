import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'

// 布局
import Layout from '@/pages/layout'

import Home from '@/pages/home' // 首页
import Register from '@/pages/register' // 首页

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Layout,
      children: [
        {
          path: '/home',
          component: Home,
          name: 'Home',
          meta: {
            title: '个人主页'
          }
        },
        {
          path: '/register',
          component: Register,
          name: 'Register',
          meta: {
            title: '注册页面'
          }
        }
      ]
    }
  ]
})
