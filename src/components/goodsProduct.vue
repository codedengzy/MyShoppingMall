<template>
  <div>
    <van-nav-bar
      :title="msg"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="goodsImgWrap">
      <img :src="goodsImgUrl" alt="图片" />
    </div>
    <p>{{ goodsTitle }},{{ goodsDescribe }},￥{{ goodsPrice }}</p>
    <!-- Sku -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      @add-cart="onAddCartFn"
      @sku-selected="switchProductType"
    />
    <!-- footer导航 -->
    <van-goods-action>
      <van-goods-action-icon @click="helpBtn" icon="chat-o" text="客服" />
      <van-goods-action-icon
        @click="gotoCart"
        icon="cart-o"
        :badge="cartGoodsCount"
        text="购物车"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="goShopCart"
      />
    </van-goods-action>
  </div>
</template>
<script>
import axios from "axios";
import API_LIST from "@/APIList.config";
import footerBar from "./footerBar";

export default {
  name: "goodsProduct",
  data() {
    return {
      msg: "商品详情页",
      // 商品详情
      goodsTitle: "",
      goodsImgUrl: "",
      goodsDescribe: "",
      goodsPrice: "",
      show: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "产品规格", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                imgUrl: "https://img01.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "https://img01.yzcdn.cn/1p.jpg", // 用于预览显示的规格类目图片
              },
              {
                id: "2",
                name: "蓝色",
                imgUrl: "https://img01.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img01.yzcdn.cn/2p.jpg",
              },
            ],
            largeImageMode: true, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
            price: "", // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: "", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        picture: "",
      },
      goodsId: "",
      //统计购物车商品数量
      cartGoodsCount: 0,
    };
  },
  components: { footerBar },
  created() {
    // console.log(this.$route.query._goodsObjId+'/'+this.$route.query._goodsCategory);
    let _id = this.$route.query._goodsObjId;
    let _category = this.$route.query._goodsCategory;
    this.getGoodsInfoById(_id, _category);
    // 读取本地储存的localStorage.shoppingCartData
    let _data = localStorage.shoppingCartData
      ? JSON.parse(localStorage.shoppingCartData)
      : [];
    // console.log(_data);
    // localStorage.removeItem('shoppingCartData');
    this.totalGoodsCount();
  },
  methods: {
    //   返回首页
    goBack() {
      this.$router.go(-1);
    },
    // 立即购买
    goShopCart() {
      this.show = true;
    },
    // 获取商品详情
    getGoodsInfoById(_id, _category) {
      axios
        .get(API_LIST.getGoodsInfoById, {
          params: {
            _goodsId: _id,
            _goodsCategory: _category,
          },
        })
        .then((_d) => {
          let _goods = _d.data;
          this.goodsTitle = _goods.name;
          this.goodsImgUrl = _goods.img;
          this.goodsDescribe = _goods.describe;
          this.goodsPrice = _goods.price;
          // Sku弹出
          this.sku.price = _goods.price;
          this.goods.picture = _goods.img;
          this.goodsId = _goods._id;
        });
    },
    // 添加到购物车
    onAddCartFn(_d) {
      // console.log(_d);
      // 是否有相同商品
      let _isTrue = false;
      let _tempObj = {
        _id: _d.goodsId,
        _price: this.goodsPrice,
        _selectedNum: _d.selectedNum,
        _goodsName: this.goodsTitle,
        _img: this.goodsImgUrl,
      };
      let _cartData = localStorage.shoppingCartData
        ? JSON.parse(localStorage.shoppingCartData)
        : [];
      for (let i = 0; i < _cartData.length; i++) {
        if (_cartData[i]._id === _tempObj._id) {
          _cartData[i]._selectedNum += _tempObj._selectedNum;
          _isTrue = true;
          break;
        }
      }
      if (!_isTrue) {
        _cartData.push(_tempObj);
      }
      // console.log(_tempObj);
      localStorage.shoppingCartData = JSON.stringify(_cartData);
      this.$dialog
        .alert({
          message: "加入购物车成功！",
        })
        .then(() => {
          this.show = false;
          this.totalGoodsCount();
        });
    },
    switchProductType() {
      this.sku.list[0].price = this.sku.price * 100;
    },
    // 跳转到购物车
    gotoCart() {
      this.$router.push({ path: "/cart" });
    },
    // 统计当前购物车的商品数量
    totalGoodsCount() {
      let _temp = localStorage.shoppingCartData
        ? JSON.parse(localStorage.shoppingCartData)
        : [];
        let _n=0;
        for (let i = 0; i < _temp.length; i++) {
          _n+=_temp[i]._selectedNum;
        }
        this.cartGoodsCount=_n;
    },
    // 客服
    helpBtn(){
      this.$dialog.alert({
        message:'客服忙~请稍后'
      });
    },
  },
};
</script>
<style scoped>
.goodsImgWrap {
  width: 100%;
  height: 350px;
  overflow: hidden;
  margin: 0 auto;
}
.goodsImgWrap img {
  width: 100%;
  height: 350px;
}
</style>