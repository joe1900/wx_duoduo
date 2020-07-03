<!--
 * @Description: 热门
 * @Date: 2020-06-29 14:09:01
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-03 10:21:07
--> 
<template>
  <div class="about">
    <van-nav-bar title="热门优惠" class="nav_" />

    <!-- <p @click="info(1)">今日爆款</p>
    <p @click="info(2)">品牌清仓</p>
    <p @click="info(4)">专属商城</p>

    <p @click="info2(4)">限时秒杀</p>
    <p @click="info2(39997)">充值中心</p>
    <p @click="info2(39998)">实时神劵</p>
    <p @click="info2(39996)">百亿补贴</p> -->

    <div class="event_" v-for="(item, index) in images" :key="index" @click="goTo(item)">
      <van-image lazy-load :src="item.img1" />
      <p> 【{{ item.name }}】 </p>
    </div>
    
    <van-divider dashed> 更多优惠正在准备中 ennnn... </van-divider>
    <p> &nbsp; </p>
    <p> &nbsp; </p>
    <p> &nbsp; </p>
    <p> &nbsp; </p>
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
      show: false,
      html: "",
      url: "",
      resource_List: [],
      images: [
        {
          img1: require("../assets/index1.jpg"),
          type: 1,
          name: '今日爆款',
          id: 1
        },
        {
          img1: require("../assets/index7.png"),
          type: 2,
          name: '百亿补贴',
          id: 39996
        },
        {
          img1: require("../assets/index6.jpg"),
          type: 2,
          name: '实时神劵',
          id: 39998
        },
        {
          img1: require("../assets/index2.jpg"),
          type: 1,
          name: '品牌清仓',
          id: 2
        },
        {
          img1: require("../assets/index3.jpg"),
          type: 2,
          name: '限时秒杀',
          id: 4
        },
        {
          img1: require("../assets/index5.jpg"),
          type: 2,
          name: '充值中心',
          id: 39997
        },
        {
          img1: require("../assets/index4.jpg"),
          type: 1,
          name: '我的专属商城 / 个人中心',
          id: 4
        }
      ]
    };
  },
  computed: {},
  mounted: function() {},
  methods: {
    goTo(item){
      if( item.type == 1 ){
        this.info(item.id);
      }
      if( item.type == 2 ){
        this.info2(item.id);
      }
    },
    hotBtn() {
      console.log("hot...");
    },
    // 0, "1.9包邮"；1, "今日爆款"； 2, "品牌清仓"； 4,"PC端专属商城"；不传值为默认商城
    info(id) {
      this.$axios({
        method: "get",
        url: `${this.$apis.pdd_ddk_cms_prom_url_generate}?type=${id}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.url = response.data.cms_promotion_url_generate_response.url_list[0].url;
          window.location.href = this.url;
        })
        .catch(error => {
          this.$toast(JSON.stringify(error));
        });
    },
    info2(id) {
      // resource_url_gen
      // 4-限时秒杀,39997-充值中心, 39998-实时神劵，39996-百亿补贴
      this.$axios({
        method: "get",
        url: `${this.$apis.resource_url_gen}?type=${id}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.url = response.data.resource_url_response.single_url_list.url
          window.location.href = this.url;
        })
        .catch(error => {
          this.$toast(JSON.stringify(error));
        });
    },
    htmlFun(url) {
      this.$axios({
        method: "get",
        url: `${this.$apis.url_html}?url=${url}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.html = response.data;
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
.about {
  height: 100%;
  padding-top: 55px;
  padding-bottom: 60px;
  .nav_ {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .hot_ {
    width: 100%;
  }
  > p {
    margin: 0;
  }
  .html_ {
    height: 100%;
  }
  >.event_{
    display: inline-block;
    width: 50%;
    >.van-image{
      width: 95%;
      margin-left: 2.5%;
      height: 90px;
      margin-top: 0;
      overflow: hidden;
      border-radius: 5px;
      transition: all 0.5s;
    }
    >.van-image:active{
      margin-left: 5%;
    }
    >p{
      margin: 0;
      text-align: right;
      padding-right: 10px;
      position: relative;
      top: -25px;
      line-height: 0px;
      color: #fff;
    }
  }
  >.event_:nth-child(8){
    width: 100%;
  }

  
}
</style>