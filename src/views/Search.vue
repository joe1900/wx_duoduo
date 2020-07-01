<!--
 * @Description: 搜索
 * @Date: 2020-06-30 17:14:41
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-01 18:57:09
--> 

<template>
  <div class="search">
    <van-nav-bar title="搜索最低价" left-text="返回" class="nav_" left-arrow @click-left="onClickLeft" />
    <p style="margin-bottom: 10px;" > <van-icon name="discount" style="position: relative; top: 2px;" /> 搜优惠，搜商品... </p>
    <van-search
      id="top__" 
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

    <template v-for="(item, index) in List_">
      <van-card
        :key="index"
        :title="item.goods_name"
        :thumb="item.goods_thumbnail_url"
        @click="infoFun(item.goods_id)"
      >
        <template #tags>
          <p class="line_tip">已售{{ item.sales_tip }}</p>
          <p>
            <b class="line_price">
              <span>券后￥</span>
              {{ (item.min_group_price-item.coupon_discount)/100 }}
            </b>
            <b class="line_m">￥{{ item.min_group_price/100 }}</b>
            {{ item.promotion_rate/100 }}%
            <van-tag
              type="danger"
              size="medium"
              class="line_discount"
              v-if="item.coupon_discount-0 > 0"
            >
              <van-icon name="coupon" />
              &nbsp;
              {{ (item.coupon_discount/100) | toFixed(2) }}元
            </van-tag>
            <van-tag size="medium" class="line_discount" v-else>无优惠券</van-tag>
          </p>
        </template>
      </van-card>
    </template>

    <van-button plain hairline block type="info" v-if="List_.length > 0" @click="addFun()" > 加载更多商品 </van-button>

    <div class="btnBox">
      <van-button plain type="primary" size="small" v-for="(item, index) in goodsList" :key="index" @click="searchBtn(item.opt_name)"> {{ item.opt_name }} </van-button>
    </div>
    
  </div>
</template>
   
<script>
export default {
  name: "search",
  components: {},
  data() {
    return {
      value: "",
      goodsList: [],
      List_: [],
      page: 1
    };
  },
  computed: {},
  mounted: function() {
    this.info();
  },
  methods: {
    infoFun(goods_id) {
      this.$router.push({
        path: "/ProductDetails",
        query: { goods_id: goods_id }
      });
    },
    /* 加载更多 */ 
    addFun(){
      this.page++;
      this.searchFun();
    },
    /* 搜索 */ 
    searchFun(){
      if( this.value == '' ){ return this.$toast("请输入搜索内容..."); }
      this.$axios({
        method: "get",
        url: `${this.$apis.pdd_ddk_goods_search}?keyword=${this.value}&page=${this.page}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.List_.push(...response.data.goods_search_response.goods_list);
        })
        .catch(error => {});
    },
    info(){
      this.$axios({
        method: "get",
        url: `${this.$apis.pdd_goods_opt_get}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.goodsList = response.data.goods_opt_get_response.goods_opt_list;
        })
        .catch(error => {});
    },
    onClickLeft() {
      this.$router.push({ path: "/", query: {} });
    },
    searchBtn(text){
      this.List_ = [];
      this.page = 1;
      this.value = text;
      document.getElementById('top__').scrollIntoView();
      this.searchFun();
    },
    onSearch() {
      this.List_ = [];
      this.page = 1;
      this.searchFun();
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
  >.btnBox{
    padding: 20px 8px;
    >button{
    margin-right: 5px;
    margin-top: 5px;
  }
  }
    p {
    margin: 0;
    margin-top: 8px;
    .line_m {
      text-decoration: line-through;
      color: #999 !important;
    }
    .line_discount {
      float: right;
    }
    .line_price {
      font-size: 19px;
      margin-right: 10px;
      color: #ee0a24;
      > span {
        font-size: 15px;
      }
    }
  }
  >button{
    width: 96%;
    margin-left: 2%;
    margin-top: 15px;
  }
}
</style>
