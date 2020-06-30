<!--
 * @Description: 搜索
 * @Date: 2020-06-30 17:14:41
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-06-30 17:29:48
--> 

<template>
  <div class="search">
    <van-nav-bar title="搜索" left-text="返回" class="nav_" left-arrow @click-left="onClickLeft" />
    <p> <van-icon name="discount" style="position: relative; top: 2px;" /> 搜优惠，搜商品... </p>
    <van-search
      v-model="value"
      background="#4fc08d"
      show-action
      label="商品"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
  </div>
</template>
   
<script>
export default {
  name: "search",
  components: {},
  data() {
    return {
      value: ""
    };
  },
  computed: {},
  mounted: function() {
    this.$toast("提示内容");
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/", query: {} });
    },
    onSearch() {
      this.$toast("提示内容");
    }
  },
  /* 离开当前组件时 */
  destroyed: function() {}
};
</script>
 
<style lang="less" scoped >
.search {
  padding-top: 45px;
  >p{
      padding-left: 10px;
      font-size: 13px;
      color: #999;
  }
  .nav_ {
    position: fixed;
    top: 0;
    width: 100%;
  }
}
</style>
