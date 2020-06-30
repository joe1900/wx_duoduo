<!--
 * @Description: 商品详情
 * @Date: 2020-06-29 15:54:39
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-06-30 17:09:22
--> 
<template>
  <div class="ProductDetails">
    <van-nav-bar title="商品详情" left-text="返回" class="nav_" left-arrow @click-left="onClickLeft" />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in data.goods_gallery_urls" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <!-- <van-tag mark type="danger">&nbsp; 拼 &nbsp;</van-tag> -->
    <van-grid style="padding: 10px 16px;">
      {{ data.goods_name }}
      <p class="line_tip" style="width: 100%;font-size: 14px;">已售{{ data.sales_tip }}</p>
      <p style="width: 100%;margin-top: 3px;">
        <b class="line_price" style="font-size: 25px;">
          <span>券后￥</span>
          {{ (data.min_group_price-data.coupon_discount)/100 }}
        </b>
        <span class="line_m">原价￥{{ data.min_group_price/100 }}</span>
        <van-tag type="danger" size="medium" class="line_discount">
          <van-icon name="coupon" />
          &nbsp;
          {{ (data.coupon_discount/100) | toFixed(2) }}元
        </van-tag>
      </p>
    </van-grid>

    <div class="coupon_" @click="qrcodeFun">
      <div>
        <p> 优惠券 （无限制） </p>
        <p> 
            <van-icon name="underway-o" style="position: relative; top: 2px;" />
            {{ data.coupon_start_time | time(4) }}
            -
            {{ data.coupon_end_time | time(4) }}

            <span>
                <span>￥</span>
                {{ (data.coupon_discount/100) | toFixed(2) }}
            </span>
        </p>
      </div>
      <p>
        <span></span>
        <span></span>
        立即领劵 
        <van-icon name="cash-back-record" style="position: relative; top: 2px;" />
      </p>
    </div>

    <p class="desc__">{{ data.goods_desc }}</p>

    <van-image v-for="(image, index) in data.goods_gallery_urls" :key="index" lazy-load :src="image" />

    <van-divider dashed> 优惠商品推荐... </van-divider>

    <template v-for="(item, index) in list">
      <van-card
        :key="index"
        :title="item.goods_name"
        :thumb="item.goods_image_url"
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
            <van-tag type="danger" size="medium" class="line_discount">
              <van-icon name="coupon" />
              &nbsp;
              {{ (item.coupon_discount/100) | toFixed(2) }}元
            </van-tag>
          </p>
        </template>
      </van-card>
    </template>
    <p class="desc_">没有更多了</p>

    <van-submit-bar :price="data.min_group_price-data.coupon_discount" label="劵后：" button-text="立即领劵" @submit="qrcodeFun" />
  </div>
</template>
   
<script>
export default {
  name: "ProductDetails",
  components: {},
  data() {
    return {
      data: {
        goods_gallery_urls: []
      },
      list: []
    };
  },
  computed: {},
  mounted: function() {
    // console.log(this.$route.query.goods_id);
    this.info();
  },
  methods: {
    qrcodeFun() {
      this.$axios({
        method: "get",
        url: `http://10.0.2.49:3000/promotion_url_generate?goods_id=${this.$route.query.goods_id}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          window.location.href =
            response.data.goods_promotion_url_generate_response.goods_promotion_url_list[0].url;
        })
        .catch(error => {});
    },
    onClickLeft() {
      this.$router.push({ path: "/", query: {  } });
    },
    infoFun(goods_id){
      this.$router.push({ path: "/ProductInfo", query: { goods_id: goods_id } });
    },
    info() {
      this.$axios({
        method: "get",
        url: `http://10.0.2.49:3000/goods_list_detail?goods_id=${this.$route.query.goods_id}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.data = response.data.goods_detail_response.goods_details[0];
        //   console.log(this.data.goods_gallery_urls);
          this.onLoad();
        })
        .catch(error => {});
    },
    onLoad() {
      this.$axios({
        method: "get",
        url: `http://10.0.2.49:3000/goods_recommend?limit=${50}&offset=${0}&type=${3}&goods_id=${
          this.$route.query.goods_id
        }`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.list = response.data.goods_basic_detail_response.list;
        })
        .catch(error => {});
    }
  },
  /* 离开当前组件时 */
  destroyed: function() {}
};
</script>
 
<style lang="less" scoped >
.ProductDetails {
  img {
    width: 100%;
  }
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
  .desc_ {
    text-align: center;
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .coupon_ {
    height: 100px;
    width: 95%;
    margin-left: 2.5%;
    background-color: #C5CAE9;
    margin-top: 5px;
    margin-bottom: 15px;
    //   border: dashed 2px chocolate;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    > div {
      height: 61px;
      >p:nth-child(1){
          padding-left: 25px;
          font-size: 18px;
      }
      >p:nth-child(2){
          text-align: left;
          font-size: 12px;
          color: #666;
          padding-left: 10px;
          padding-right: 20px;
        >span{
            float: right;
            font-size: 25px;
            color: #ee0a24;
                margin-top: -10px;

            span{
                font-size: 14px;
            }
        }
      }
    }
    > p:active {
        background-color: #C5CAE9;
    }
    > p {
      margin: 0;
      line-height: 30px;
      height: 30px;
      background-color: #FFCDD2;
      text-align: center;
      border-top: dashed 1px #fff;
      font-size: 12px;
      > span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: #fff;
        border-radius: 50%;
      }
      > span:nth-child(1) {
        float: left;
        position: relative;
        left: -6px;
        top: -6px;
      }
      > span:nth-child(2) {
        float: right;
        position: relative;
        right: -6px;
        top: -6px;
      }
    }
  }
  .desc__ {
    padding: 10px 10px;
    text-align: left;
    font-size: 13px;
  }
}
</style>