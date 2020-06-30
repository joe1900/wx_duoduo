<!--
 * @Description: 
 * @Date: 2020-06-29 14:09:01
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-06-30 18:19:36
 :price="item.coupon_remain_quantity"
 :desc="item.goods_desc"
--> 
<template>
  <div class="home">
    <van-nav-bar :title="productList[active].desc" class="nav_" @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" @change="activeFun" swipeable>
      <van-tab v-for="(item, index) in productList" :key="index" :title="item.desc">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <template v-for="(item, index) in list">
            <van-card
              :key="index"
              :title="item.goods_name"
              :thumb="item.goods_thumbnail_url"
              @click="info(item.goods_id)"
            >
              <template #tags>
                <p class="line_tip">已售{{ item.sales_tip }}</p>
                <p>
                  <b class="line_price">
                    <span>券后￥</span>
                    {{ (item.min_group_price-item.coupon_discount)/100 }}
                  </b>
                  <b class="line_m">￥{{ item.min_group_price/100 }}</b>
                  <van-tag type="danger" size="medium" class="line_discount">
                    <van-icon name="coupon" />
                    &nbsp;
                    {{ (item.coupon_discount/100) | toFixed(2) }}元
                  </van-tag>
                </p>
              </template>
            </van-card>
          </template>
        </van-list>
      </van-tab>
    </van-tabs>

   
  </div>
</template>
   
<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      productList: [
        { type: 0, desc: "1.9包邮" },
        { type: 1, desc: "今日爆款" },
        { type: 2, desc: "品牌清仓" },
        { type: 4, desc: "猜你喜欢" },
        { type: 5, desc: "实时热销" },
        { type: 6, desc: "实时收益" },
        { type: 7, desc: "今日畅销" },
        { type: 8, desc: "高佣榜单" }
      ],
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 0
    };
  },
  computed: {},
  mounted: function() {
    // this.info();
  },
  methods: {
    onClickRight() {
      this.$router.push({
        path: "/Search",
        query: {}
      });
    },
    info(goods_id) {
      this.$router.push({
        path: "/ProductDetails",
        query: { goods_id: goods_id }
      });
    },
    onLoad() {
      this.$axios({
        method: "get",
        url: `http://10.0.2.49:3000/goods_recommend?limit=${20}&offset=${
          this.page
        }&type=${this.active >= 3 ? this.active + 1 : this.active}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.list.push(...response.data.goods_basic_detail_response.list);
          this.loading = false;

          if (response.data.goods_basic_detail_response.list.length == 0) {
            this.finished = true;
          }
          this.page++;
        })
        .catch(error => {});
    },
    activeFun(e) {
      this.list = [];
      this.page = 0;
      this.onLoad();
    }
  },
  /* 离开当前组件时 */
  destroyed: function() {}
};
</script>
 
<style lang="less" scoped >
.home {
  padding-top: 45px;
  .nav_ {
    position: fixed;
    top: 0;
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
  .line_tip {
    color: #999;
  }

}
</style>
