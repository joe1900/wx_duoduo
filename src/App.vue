<!--
 * @Description: 
 * @Date: 2020-06-29 14:05:13
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-04 10:44:43
--> 
<template>
  <div id="app">
    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>
    <van-tabbar v-model="active" v-if="tab" @change="changeFu">
      <van-tabbar-item icon="shop-collect-o" to="/">推荐</van-tabbar-item>
      <van-tabbar-item icon="flower-o" to="/Search">筛选</van-tabbar-item>
      <van-tabbar-item icon="fire-o" to="/sellwell">热销</van-tabbar-item>
      <van-tabbar-item icon="gift-card" to="/about">活动</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import router from './router';
export default {
  name: "",
  components: {},
  data() {
    return {
      active: 0,
      tab: true
    };
  },
  computed: {},
  mounted: function() {
    if( window.location.href.indexOf('about') !== -1 ){ this.active = 2 }
  },
  methods: {
    changeFu(){
      
      // if( this.active == 0 ){ this.$router.push({ path: "/", query: {} }); }
      // if( this.active == 1 ){ this.$router.push({ path: "/Search", query: {} }); }
      // if( this.active == 2 ){ this.$router.push({ path: "/about", query: {} }); }

      router.beforeEach((to, from, next) => {
        if( to.name == 'home' || to.name == 'Search' || to.name == 'sellwell' || to.name == 'about' )
          this.tab = true;
        else
          this.tab = false;
        next();
      });
    }
  },
  /* 离开当前组件时 */
  destroyed: function() {}
};
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  padding-bottom: 50px;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>


   

 