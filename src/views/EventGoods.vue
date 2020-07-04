<!--
 * @Description: 活动商品列表
 * @Date: 2020-07-01 11:37:34
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-04 10:14:22
--> 
<template>
  <div class="EventGoods">
    <van-nav-bar
      :title="data.name"
      left-text="返回"
      class="nav_"
      left-arrow
      @click-left="onClickLeft"
    />
    <img v-lazy="data.image_url" v-if="data.image_url != ''" />
    <template v-for="(item, index) in goodsList">
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
    <van-divider dashed> 我是有底线 de .</van-divider>
  </div>
</template>
   
<script>
export default {
  name: "EventGoods",
  components: {},
  data() {
    return {
      data: {
        goods_num: 0,
        id: 0,
        image_url: "",
        name: "加载中..",
        type: 1
      },
      goodsList: []
    };
  },
  computed: {},
  activated() {
    this.data = this.$route.query.data;
    this.info();
  },
  mounted: function() {},
  methods: {
    infoFun(goods_id) {
      this.$router.push({
        path: "/ProductDetails",
        query: { goods_id: goods_id }
      });
    },
    info() {
      this.$axios({
        method: "get",
        url: `${this.$apis.pdd_ddk_theme_goods_search}?theme_id=${this.data.id}`,
        data: {}
      })
        .then(response => {
          this.$toast.clear();
          if (response.status !== 200) {
            return;
          }
          this.goodsList = response.data.theme_list_get_response.goods_list;
        })
        .catch(error => {
          this.$toast.clear();
          this.$toast(JSON.stringify(error));
        });
    },
    onClickLeft() {
      this.$router.push({ path: "/", query: {} });
    }
  },
  /* 离开当前组件时 */
  destroyed: function() {}
};
</script>
 
<style lang="less" scoped >
.EventGoods {
    padding-top: 45px;
  .nav_ {
    position: fixed;
    top: 0;
    width: 100%;
  }
  > img {
    width: 100%;
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
}
</style>