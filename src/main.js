/*
 * @Description: 
 * @Date: 2020-06-29 14:05:13
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-01 18:49:40
 */ 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
Vue.use(Lazyload);

import axios from 'axios';
Vue.prototype.$axios = axios;

import Apis from './Apis.js'
Vue.prototype.$apis = Apis.URL;
// 复制功能组件
import Copy from 'vue-to-copy'
// 注册组件库
Vue.use(Copy);

import * as filters from './filter.js';
// 全局全部过滤器
Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]); });

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
