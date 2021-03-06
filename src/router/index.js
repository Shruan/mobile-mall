import Vue from 'vue'
import Router from 'vue-router'

// 布局
import Layout from '@/pages/layout'

import Login from '@/pages/Login' // 登录
import Home from '@/pages/home' // 首页
import Register from '@/pages/register' // 注册
import Goods from '@/pages/goods' // 商品详情页
import CategoryList from '@/pages/categoryList' // 商品类别
import Cart from '@/pages/cart' // 商品类别
import Member from '@/pages/member' // 商品类别

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
      path: '/register',
      component: Register,
      name: 'Register',
      meta: {
        title: '注册页面'
      }
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
          path: '/CategoryList',
          component: CategoryList,
          name: 'CategoryList',
          meta: {
            title: '商品类别'
          }
        },
        {
          path: '/Cart',
          component: Cart,
          name: 'Cart',
          meta: {
            title: '商品详情'
          }
        },
        {
          path: '/Member',
          component: Member,
          name: 'Member',
          meta: {
            title: '个人中心'
          }
        }
      ]
    },
    {
      path: '/Goods',
      component: Goods,
      name: 'Goods',
      props: (route) => ({ goodsId: route.query.goodsId }),
      meta: {
        title: '商品详情'
      }
    }
  ]
})
