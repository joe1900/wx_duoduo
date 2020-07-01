<!--
 * @Description: 
 * @Date: 2020-06-29 14:05:13
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-01 17:20:04
--> 
<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" v-if="tab" @change="changeFu">
      <van-tabbar-item icon="home-o">推荐</van-tabbar-item>
      <van-tabbar-item icon="search">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import router from './router'


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
  mounted: function() {},
  methods: {
    changeFu(){
      // console.log( this.active );
      if( this.active == 0 ){ this.$router.push({ path: "/", query: {} }); }
      if( this.active == 1 ){ this.$router.push({ path: "/about", query: {} }); }
      if( this.active == 2 ){ this.$router.push({ path: "/", query: {} }); }
      if( this.active == 3 ){ this.$router.push({ path: "/", query: {} }); }
      router.beforeEach((to, from, next) => {
        console.log( to.name )
        if( to.name == 'home' || to.name == 'about' ){
          this.tab = true;
        }
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


   

 