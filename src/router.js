/*
 * @Description: 
 * @Date: 2020-06-29 14:09:01
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-03 09:47:53
 */ 
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        keepAlive: true
      }
    },
    // 热门
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    // 商品详情
    {
      path: '/ProductDetails',
      name: 'ProductDetails',
      component: () => import('./views/ProductDetails.vue')
    },
    // 推荐商品详情
    {
      path: '/ProductInfo',
      name: 'ProductInfo',
      component: () => import('./views/ProductInfo.vue')
    },
    // 搜索组件
    {
      path: '/Search',
      name: 'Search',
      component: () => import('./views/Search.vue')
    },
    // 承载H5页面
    {
      path: '/EventPage',
      name: 'EventPage',
      component: () => import('./views/EventPage.vue')
    },
    // 活动商品列表
    {
      path: '/EventGoods',
      name: 'EventGoods',
      component: () => import('./views/EventGoods.vue')
    },
    
  ]
})
