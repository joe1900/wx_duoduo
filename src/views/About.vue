<!--
 * @Description: 热门
 * @Date: 2020-06-29 14:09:01
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-06-30 18:19:25
--> 
<template>
  <div class="about">
    热门...
     <!-- 活动弹出框 -->
    <van-dialog v-model="show" title="标题" @confirm="hotBtn" show-cancel-button>
      <img class="hot_" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
    </van-dialog>
  </div>
</template>
   
<script>
export default {
  name: "about",
  components: {},
  data() {
    return {
      show: true
    };
  },
  computed: {},
  mounted: function() {},
  methods: {
    hotBtn() {
      console.log("hot...");
    }
  },
  /* 离开当前组件时 */
  destroyed: function() {}
};
</script>
 
<style lang="less" scoped >
.about {

  .hot_{
    width: 100%;
  }
}
</style>