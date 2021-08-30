import Vue from 'vue'
import Router from 'vue-router'
import proShopCart from '@/components/proShopCart'
import register from '@/components/register'
import userLogin from '@/components/userLogin'
import goodsType from '@/components/goodsType'
import goodsProduct from '@/components/goodsProduct'
import cart from '@/components/cart'
import accountCenter from '@/components/accountCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'proShopCart',
      component: proShopCart
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: userLogin
    },
    {
      path: '/goodsType',
      name: 'goodsType',
      component: goodsType
    },
    {
      path: '/goodsProduct',
      name: 'goodsProduct',
      component: goodsProduct
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/accountCenter',
      name: 'accountCenter',
      component: accountCenter
    }
  ]
})
