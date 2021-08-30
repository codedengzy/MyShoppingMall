<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      show-action
      placeholder="可以搜索aaa bbb ccc"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="sliderDiv">
      <van-swipe-item v-for="(image, index) in swipeImages" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- <div style="display: none">
      <div class="warpDiv">
        <input
          type="text"
          class="leftDiv"
          ref="inputRef"
          placeholder="请输入"
        />
        <div class="rightDiv">{{ txt_data }}</div>
      </div>
      <van-button @click="sendFn" type="danger">发送</van-button>
      <van-button @click="getFn" type="danger">获取</van-button>
    </div> -->
    <!-- 商品列表 -->
    <!-- <div style="height: 550px; overflow-y: scroll">
      <div v-for="itemObj in goodsListObj" class="wrapDiv cle goodsList">
        <h1 class="goodsTitle">{{ itemObj.n }}</h1>
        <li
          v-for="goods in itemObj.goodsList_aa"
          @click="goodsProductFn(goods)"
        >
          <label><img :src="goods.img" alt="图片" /></label>
          {{ goods.name }} / ￥{{ goods.price }}
        </li>

        <li
          v-for="goods in itemObj.goodsList_bb"
          @click="goodsProductFn(goods)"
        >
          <label><img :src="goods.img" alt="图片" /></label>
          {{ goods.name }} / ￥{{ goods.price }}
        </li>

        <li
          v-for="goods in itemObj.goodsList_cc"
          @click="goodsProductFn(goods)"
        >
          <label><img :src="goods.img" alt="图片" /></label>
          {{ goods.name }} / ￥{{ goods.price }}
        </li>

        <li
          v-for="goods in itemObj.goodsList_dd"
          @click="goodsProductFn(goods)"
        >
          <label><img :src="goods.img" alt="图片" /></label>
          {{ goods.name }} / ￥{{ goods.price }}
        </li>
      </div>
    </div> -->
    <van-tabs
      sticky
      v-for="(itemObj, inx) in goodsListObj"
      :key="inx"
      class="wrapDiv cle goodsList"
    >
      <van-tab :title="itemObj.n">
        <li
          v-for="goods in itemObj.goodsList_aa"
          @click="goodsProductFn(goods)"
        >
          <label><img :src="goods.img" alt="图片" /></label>
          {{ goods.name }} / ￥{{ goods.price }}
        </li>

        <li
          v-for="goods in itemObj.goodsList_bb"
          @click="goodsProductFn(goods)"
        >
          <label><img :src="goods.img" alt="图片" /></label>
          {{ goods.name }} / ￥{{ goods.price }}
        </li>

        <li
          v-for="goods in itemObj.goodsList_cc"
          @click="goodsProductFn(goods)"
        >
          <label><img :src="goods.img" alt="图片" /></label>
          {{ goods.name }} / ￥{{ goods.price }}
        </li>

        <li
          v-for="goods in itemObj.goodsList_dd"
          @click="goodsProductFn(goods)"
        >
          <label><img :src="goods.img" alt="图片" /></label>
          {{ goods.name }} / ￥{{ goods.price }}
        </li>
      </van-tab>
    </van-tabs>
    <!-- 底部 -->
    <footerBar />
  </div>
</template>

<script>
import axios from "axios";
import API_LIST from "@/APIList.config";
import { Notify } from "vant";
import footerBar from "./footerBar";

export default {
  name: "proShopCart",
  data() {
    return {
      msg: "首页",
      txt_data: "",
      swipeImages: "",
      // 商品展示数据
      goodsListObj: "",
      // header标签组
      tabActive: 0,
      isLogin: true,
      searchValue: "",
    };
  },
  components: { footerBar },
  created() {
    if (localStorage.userInfo) {
      let _obj = JSON.parse(localStorage.userInfo);
      Notify({
        type: "success",
        message: "欢迎" + _obj.username + "登录",
        duration: "1500",
      });
      this.msg = "欢迎" + _obj.username + "登录首页 ";
      this.isLogin = false;
    }
    this.getGoodsCategoryFn();
    this.getSwipeImages();
  },
  methods: {
    // 搜索
    onSearch() {
      // console.log(this.searchValue);
      axios
        .get(API_LIST.node_a, {
          params: {
            txtVal: this.searchValue,
          },
        })
        .then(() => {
          this.getFn();
        });
    },
    // sendFn() {
    //   let _val = this.$refs.inputRef.value;
    //   axios.get(API_LIST.node_a, {
    //     params: {
    //       txtVal: _val,
    //     },
    //   });
    // },
    getFn() {
      axios.get(API_LIST.node_b).then((_d) => {
        // console.log(_d.data);
        this.txt_data = _d.data[0].name;
        this.$notify(this.txt_data);
      });
    },
    // 获取轮播图
    getSwipeImages() {
      axios.get(API_LIST.getSwipeImages).then((_d) => {
        // console.log(_d.data);
        this.swipeImages = _d.data.urls;
      });
    },
    //获取商品类别和类别下的商品
    getGoodsCategoryFn() {
      axios.get(API_LIST.getGoodsCategory).then((_d) => {
        // console.table(_d.data);
        this.goodsListObj = _d.data;
      });
    },
    // 获取商品详情
    goodsProductFn(_self) {
      this.$router.push({
        name: "goodsProduct",
        query: { _goodsObjId: _self._id, _goodsCategory: _self.category },
      });
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.cle:after {
  content: ".";
  overflow: hidden;
  visibility: hidden;
  height: 0;
  display: block;
  clear: both;
}
.wrapDiv {
  width: 80%;
  overflow: hidden;
  border: 1px solid #666;
  background: #eee;
  border-radius: 10px;
  margin: 10px auto;
}
.wrapDiv p.tip {
  font-size: 22px;
  text-align: center;
  padding: 0;
  margin: 5px 0;
  color: #666;
}
.leftDiv {
  float: left;
  width: 60%;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #999;
  padding: 10px;
  line-height: 30px;
  text-align: center;
  font-size: 22px;
}
.rightDiv {
  float: right;
  width: 20%;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #999;
  padding: 10px;
  line-height: 30px;
  text-align: center;
  font-size: 22px;
}
.sliderDiv {
  width: 80%;
  margin: 10px auto;
}
.sliderDiv img {
  width: 100%;
  height: 188px;
}
.goodsList {
}
.goodsList li {
  float: left;
  width: 49%;
  overflow: hidden;
  margin: 0 0 10px 0;
}
.goodsList li label {
  width: 100px;
  height: 115px;
  display: block;
  overflow: hidden;
  margin: 0 auto;
  padding: 0;
  text-align: center;
  position: relative;
  border: 1px solid #666;
}
.goodsList li img {
  height: 100%;
  position: absolute;
  top: -5px;
  left: 0;
  clear: both;
  display: block;
  margin: 5px auto;
  padding: 0;
}
.goodsList h1.goodsTitle {
  clear: both;
  margin: 5px auto;
  font-size: 22px;
  border-radius: 5px;
  background: #5d5d5d;
  width: 50%;
  color: #fff;
  padding: 3px 0;
}
.sliderDiv {
  width: 90%;
  margin: 10px auto;
}
.sliderDiv img {
  width: 100%;
  height: 188px;
}
</style>
