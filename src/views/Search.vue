<!--
 * @Description: 搜索
 * @Date: 2020-06-30 17:14:41
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-04 11:34:51
--> 

<template>
  <div class="search" id="top__">
    <!-- <van-nav-bar title="搜索最低价" class="nav_" @click-left="onClickLeft" /> -->
    <van-search
      class="nav_"
      v-model="value"
      background="#ee0a23"
      show-action
      label="商品"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch" style="color:#fff">
          搜索
          <van-icon name="search" style="position: relative; top: 3px;" />
        </div>
      </template>
    </van-search>

    <van-dropdown-menu active-color="#ee0a24" >
      <van-dropdown-item v-model="merchant_type" :options="option1" @change="onSearch" />
      <van-dropdown-item v-model="sort_type" :options="option2" @change="onSearch" />
    </van-dropdown-menu>

    <p style="margin-bottom: 10px;">
      <van-icon name="discount" style="position: relative; top: 2px;" />搜优惠，搜商品， 意想不到的超低价...
    </p>

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
            <i class="line_m">￥{{ item.min_group_price/100 }}</i>
            <!-- {{ item.promotion_rate/100 }}% -->
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

    <van-divider dashed v-if="List_.length < 30 && List_.length != 0"> 没有更多啦... </van-divider>

    <van-button plain hairline block type="info" v-if="List_.length >= 30" @click="addFun()">加载更多商品</van-button>

    <div class="btnBox">
      <van-button
        plain
        type="default"
        size="small"
        v-for="(item, index) in goodsList"
        :key="index"
        @click="searchBtn(item.opt_name)"
      >{{ item.opt_name }}</van-button>
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
      page: 1,
      sort_type: 9, // 排序类型
      merchant_type: 0, // 店铺类型
      option1: [
        { text: '全部店铺', value: 0 },
        { text: '旗舰店铺', value: 3 },
        { text: '专卖店铺', value: 4 },
        { text: '企业店铺', value: 2 },
        { text: '专营店铺', value: 5 },
        { text: '普通店铺', value: 6 },
        { text: '个人店铺', value: 1 }
      ],
      option2: [
        { text: '综合排序', value: 0 },
        { text: '按热度升序', value: 1 },// 按佣金比率升序
        { text: '按热度降序', value: 2 },// 按佣金比率降序
        { text: '按价格升序', value: 3 },
        { text: '按价格降序', value: 4 },
        { text: '按销量升序', value: 5 },
        { text: '按销量降序', value: 6 },
        { text: '优惠券金额排序升序', value: 7 },
        { text: '优惠券金额排序降序', value: 8 },
        { text: '券后价升序排序', value: 9 },
        { text: '券后价降序排序', value: 10 },
        // { text: '按照加入多多进宝时间升序', value: 11 },
        // { text: '按照加入多多进宝时间降序', value: 12 },
        { text: '按热门升序排序', value: 13 }, // 按佣金金额升序排序
        { text: '按热门降序排序', value: 14 }, // 按佣金金额降序排序
        { text: '店铺描述评分升序', value: 15 },
        { text: '店铺描述评分降序', value: 16 },
        { text: '店铺物流评分升序', value: 17 },
        { text: '店铺物流评分降序', value: 18 },
        { text: '店铺服务评分升序', value: 19 },
        { text: '店铺服务评分降序', value: 20 },
        { text: '描述评分击败同类店铺百分比升序，', value: 27 },
        { text: '描述评分击败同类店铺百分比降序，', value: 28 },
        { text: '物流评分击败同类店铺百分比升序', value: 29 },
        { text: '物流评分击败同类店铺百分比降序', value: 30 },
        { text: '服务评分击败同类店铺百分比升序', value: 31 },
        { text: '服务评分击败同类店铺百分比降序', value: 32 }
      ]
    };
  },
  computed: {},
  activated: function() {
    this.info();
  },
  mounted: function() {
    // this.info();
  },
  methods: {
    onSearchFun(){
      console.log(123000);
    },
    /*  */ 
    infoFun(goods_id) {
      this.$router.push({
        path: "/ProductDetails",
        query: { goods_id: goods_id }
      });
    },
    /* 加载更多 */
    addFun() {
      this.page++;
      this.searchFun();
    },
    /* 搜索 */

    searchFun() {
      if (this.value == "") {
        return this.$toast("请输入搜索内容...");
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      this.$axios({
        method: "get",
        url: `${this.$apis.pdd_ddk_goods_search}?sort_type=${this.sort_type}&merchant_type=${this.merchant_type}&keyword=${this.value}&page=${this.page}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.List_.push(...response.data.goods_search_response.goods_list);
          this.$toast.clear();
        })
        .catch(error => {
          this.$toast(JSON.stringify(error));
        });
    },
    info() {
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
        .catch(error => {
          this.$toast(JSON.stringify(error));
        });
    },
    // onClickLeft() {
    //   this.$router.go(-1);
    // },
    searchBtn(text) {
      this.List_ = [];
      this.page = 1;
      this.value = text;
      document.getElementById("top__").scrollIntoView();
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
  padding-top: 55px;
  > p {
    padding-left: 10px;
    font-size: 13px;
    color: #999;
  }
  .nav_ {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  > .btnBox {
    padding: 20px 8px;
    > button {
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
  > button {
    width: 96%;
    margin-left: 2%;
    margin-top: 15px;
  }
}
</style>
