/*
 * @Description: apis
 * @Date: 2020-07-01 18:34:05
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-07-04 11:22:46
 */

let location_ = 'http://10.0.2.49:3000';

export default {
    URL: {
        /**
         * @desc 多多客获取爆款排行商品接口 - get
        * 3000000次/3600秒
        * @parameter limit = 每页数据数量
        * @parameter offset = 第几页数据
         **/
        goods_list_query: `${location_}/goods_list_query`,
        /**
         * @desc 多多进宝商品详情查询
        * 接口总限流频次：27875次/10秒
        * @parameter goods_id = id
         **/
        goods_list_detail: `${location_}/goods_list_detail`,
        /**
         * @desc 获取商品基本信息接口
        * 接口总限流频次：3000000次/3600秒
        * @parameter goods_id = id
         **/
        goods_basic_info: `${location_}/goods_basic_info`,
        /**
         * @desc 多多进宝商品推荐API
        * 0-1.9包邮, 
        * 1-今日爆款, 
        * 2-品牌清仓,
        * 3-相似商品推荐,
        * 4-猜你喜欢,
        * 5-实时热销,
        * 6-实时收益,
        * 7-今日畅销,
        * 8-高佣榜单，
        * 默认1
        * @parameter limit = 每页数据数量
        * @parameter offset = 第几页数据
        * @parameter type = 商品列表类型
         **/
        goods_recommend: `${location_}/goods_recommend`,
        /**
         * @desc 生成商城-频道推广链接
         * @para goods_id = 商品id
         **/
        prom_url_generate: `${location_}/prom_url_generate`,
        /**
         * @desc 多多客生成单品推广小程序二维码url
         * @para goods_id = 商品id
         **/
        promotion_url_generate: `${location_}/promotion_url_generate`,
        /**
         * @desc 多多客生成转盘抽免单url
         * @para 
         **/
        lottery_url_gen: `${location_}/lottery_url_gen`,
        /**
         * @desc 生成多多进宝频道推广
         * @para type 4-限时秒杀,39997-充值中心, 39998-神劵，39996-百亿补贴
         **/
        resource_url_gen: `${location_}/resource_url_gen`,
        /**
         * @desc 生成营销工具推广链接  - 无权限
         * @para type -1-活动列表，0-默认红包，2–新人红包，3-刮刮卡，4-转盘 ，5-员工内购，6-购物车，7-大促会场
         **/
        rp_prom_url_generate: `${location_}/rp_prom_url_generate`,
        /**
         * @desc 多多进宝主题列表查询
         * @para 
         **/
        pdd_ddk_theme_list_get: `${location_}/pdd_ddk_theme_list_get`,
        /**
         * @desc 多多进宝主题商品列表查询
         * @para 
         **/
        pdd_ddk_theme_goods_search: `${location_}/pdd_ddk_theme_goods_search`,
        /**
         * @desc 生成商城-频道推广链接
         * @parameter type =  0, "1.9包邮"；1, "今日爆款"； 2, "品牌清仓"； 4,"PC端专属商城"；不传值为默认商城
         **/
        pdd_ddk_cms_prom_url_generate: `${location_}/pdd_ddk_cms_prom_url_generate`,
        /**
         * @desc 查询商品标签列表
         * @para 
         **/
        pdd_goods_opt_get: `${location_}/pdd_goods_opt_get`,
        /**
         * @desc 多多进宝商品查询
          * @parameter keyword = 搜索关键词
        * sort_type 
        * 排序方式:
        * 0-综合排序;
        * 1-按佣金比率升序;
        * 2-按佣金比例降序;
        * 3-按价格升序;
        * 4-按价格降序;
        * 5-按销量升序;
        * 6-按销量降序;
        * 7-优惠券金额排序升序;
        * 8-优惠券金额排序降序;
        * 9-券后价升序排序;
        * 10-券后价降序排序;
        * 11-按照加入多多进宝时间升序;
        * 12-按照加入多多进宝时间降序;
        * 13-按佣金金额升序排序;
        * 14-按佣金金额降序排序;
        * 15-店铺描述评分升序;
        * 16-店铺描述评分降序;
        * 17-店铺物流评分升序;
        * 18-店铺物流评分降序;
        * 19-店铺服务评分升序;
        * 20-店铺服务评分降序;
        * 27-描述评分击败同类店铺百分比升序，
        * 28-描述评分击败同类店铺百分比降序，
        * 29-物流评分击败同类店铺百分比升序，
        * 30-物流评分击败同类店铺百分比降序，
        * 31-服务评分击败同类店铺百分比升序，
        * 32-服务评分击败同类店铺百分比降序
         **/
        pdd_ddk_goods_search: `${location_}/pdd_ddk_goods_search`,
        /**
         * @desc 根据URL获取html文本
         * @para 
         **/
        url_html: `${location_}/url_html`

    }
}