/*
 * @Description: 
 * @Date: 2020-06-29 14:05:13
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-06-29 16:53:24
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
