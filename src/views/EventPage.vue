<!--
 * @Description: 活动详情页 - 承载H5页面
 * @Date: 2020-07-01 11:12:15
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-01 11:26:10
--> 
<template>
  <div class="eventpage">
    <van-nav-bar title="优惠进行中" left-text="返回" class="nav_" left-arrow @click-left="onClickLeft" />
  </div>
</template>
   
<script>
export default {
  name: "eventpage",
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted: function() {
      this.info();
  },
  methods: {
    info() {
      this.$axios({
        method: "get",
        url: `https://mobile.yangkeduo.com/duo_nine_nine.html?pid=10820525_145071056&cpsSign=CM_200701_10820525_145071056_279dbf50972bf4ece9c369e2e75693f4&duoduo_type=2`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          console.log( response );
        })
        .catch(error => {});
    },
    onClickLeft() {
      this.$router.push({ path: "/", query: {  } });
    },
  },
  /* 离开当前组件时 */
  destroyed: function() {}
};
</script>
 
<style lang="less" scoped >
.eventpage {
  padding-top: 45px;
  .nav_ {
    position: fixed;
    top: 0;
    width: 100%;
  }
}
</style>
