<!--
 * @Description: 推荐商品详情
 * @Date: 2020-06-30 16:44:45
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-03 11:28:48
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
      <p> <van-icon name="fire" color="#ee0a24" /> {{ data.goods_name }} </p>
      <p class="line_tip" style="width: 100%;font-size: 14px;">已售{{ data.sales_tip }}</p>
      <p style="width: 100%;margin-top: 3px;">
        <b class="line_price" style="font-size: 25px;">
          <span>券后￥</span>
          {{ (data.min_group_price-data.coupon_discount)/100 }}
        </b>
        <i class="line_m">原价￥{{ data.min_group_price/100 }}</i>
        <van-tag type="danger" size="medium" class="line_discount">
          <van-icon name="coupon" />
          &nbsp;
          {{ (data.coupon_discount/100) | toFixed(2) }}元
        </van-tag>
      </p>
    </van-grid>

    <div class="coupon_" @click="subFun">
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

        <div class="coupon__">
      <p>
        <span style="color:#666"> 店铺名：</span> {{ data.mall_name }}  
        <!-- 店铺类型，1-个人，2-企业，3-旗舰店，4-专卖店，5-专营店，6-普通店（未传为全部） -->
        <van-tag round type="primary" v-if="data.merchant_type == 2"> 企业店 </van-tag>
        <van-tag round type="primary" v-else-if="data.merchant_type == 3"> &nbsp; 旗舰店 &nbsp; </van-tag>
        <van-tag round type="primary" v-else-if="data.merchant_type == 4"> &nbsp; 专卖店 &nbsp; </van-tag>
        <van-tag round type="primary" v-else-if="data.merchant_type == 5"> &nbsp; 专营店 &nbsp; </van-tag>
        <van-tag round type="primary" v-else-if="data.merchant_type == 6"> &nbsp; 普通店 &nbsp; </van-tag>
        <van-tag round type="primary" v-else-if="data.merchant_type == 1"> &nbsp; 个人店 &nbsp; </van-tag>
      </p>
      <p> <span style="color:#666">服务分：</span> {{ data.serv_txt }} <van-icon v-if="data.serv_txt=='高' || data.serv_txt=='中'" name="ascending" style="position: relative; top: 2px;" /></p>
      <p> <span style="color:#666">物流分：</span> {{ data.lgst_txt }} <van-icon v-if="data.lgst_txt=='高' || data.lgst_txt=='中'" name="ascending" style="position: relative; top: 2px;" /></p>
      <p> <span style="color:#666">描述分：</span> {{ data.desc_txt }} <van-icon v-if="data.desc_txt=='高' || data.desc_txt=='中'" name="ascending" style="position: relative; top: 2px;" /></p>
      <p>
        <!-- 服务标签: 4-送货入户并安装,5-送货入户,6-电子发票,9-坏果包赔,11-闪电退款,12-24小时发货,13-48小时发货,
          17-顺丰包邮,18-只换不修,1可定制化,29-预约配送,1000001-正品发票,1000002-送货入户并安装 -->
        <template v-for="(item, index) in data.service_tags">
          <van-tag round type="danger" :key="index" v-if="item == 4"> 送货入户并安装 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 5"> 送货入户 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 6"> 电子发票 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 9"> 坏果包赔 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 11"> 闪电退款 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 12"> 24小时发货 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 13"> 48小时发货 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 17"> 顺丰包邮 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 18"> 只换不修 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 1"> 可定制化 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 29"> 预约配送 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 1000001"> 正品发票 </van-tag>
          <van-tag round type="danger" :key="index" v-else-if="item == 1000002"> 送货入户并安装 </van-tag>
        </template>
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
            <i class="line_m">￥{{ item.min_group_price/100 }}</i>
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

    <van-submit-bar :price="data.min_group_price-data.coupon_discount" label="劵后：" button-text="立即领劵" @submit="subFun" >
      <template #tip>
        你的朋友可能也需要,立即 
        <Copy :content="`${data.goods_name} \n 【券后包邮价￥${(data.min_group_price-data.coupon_discount)/100}元】 \n ${url}`" @copyCallback="onClickEditAddress" style="display: inline-block;">
          <span style="color: #1989fa;" > <van-icon name="orders-o" style="position: relative; top: 2px;" /> 点击分享 </span>
        </Copy> 
      </template>
    </van-submit-bar>
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
      list: [],
      url: ''
    };
  },
  computed: {},
  activated() {
    this.info();
  },
  mounted: function() {
    // this.info();
  },
  methods: {
    /* 分享 */ 
    onClickEditAddress(){
      this.$toast("Hi~ o(*￣▽￣*)ブ \n 已经复制到-剪切板，快去微信粘贴吧！");
    },
    subFun(){
      window.location.href = this.url;
    },
    qrcodeFun() {
      this.$axios({
        method: "get",
        url: `${this.$apis.promotion_url_generate}?goods_id=${this.$route.query.goods_id}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.url = response.data.goods_promotion_url_generate_response.goods_promotion_url_list[0].short_url;
        })
        .catch(error => {
          this.$toast(JSON.stringify(error));
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    infoFun(goods_id){
      this.$router.push({ path: "/ProductDetails", query: { goods_id: goods_id } });
    },
    info() {
      this.$axios({
        method: "get",
        url: `${this.$apis.goods_list_detail}?goods_id=${this.$route.query.goods_id}`,
        data: {}
      })
        .then(response => {
          if (response.status !== 200) {
            return;
          }
          this.data = response.data.goods_detail_response.goods_details[0];
          this.onLoad();
          this.qrcodeFun();
        })
        .catch(error => {
          this.$toast(JSON.stringify(error));
        });
    },
    onLoad() {
      this.$axios({
        method: "get",
        url: `${this.$apis.goods_recommend}?limit=${50}&offset=${0}&type=${3}&goods_id=${
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
  .coupon__{
    background-color: #f5f5f5;
    padding: 10px 13px;
    font-size: 14px;
    >p{
      margin: 0;
    }
    >p:nth-child(5){
      >span{
        margin-right: 5px;
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