<!--
 * @Description: 实时热销
 * @Date: 2020-07-04 10:19:33
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-04 14:26:21
--> 

<template>
  <div class="sellwell">
    <van-nav-bar title="实时热销榜" class="nav_"></van-nav-bar>
  </div>
</template>
   
<script>
export default {
  name: "sellwell",
  components: {},
  data() {
    return {
        data:[]
    };
  },
  computed: {},
  activated: function() {
    this.info();
  },
  mounted: function() {},
  methods: {
    info() {
      this.$axios({
        method: "get",
        url: `${this.$apis.goods_list_query}?offset=0&limit=2`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.data = response.data.top_goods_list_get_response.list;
        })
        .catch(error => {
          this.$toast(JSON.stringify(error));
        });
    }
  },
  /* 离开当前组件时 */
  destroyed: function() {}
};
</script>
 
<style lang="less" scoped >
.sellwell {
  padding-top: 45px;
  .nav_ {
    position: fixed;
    top: 0;
    width: 100%;
  }
}
</style>
