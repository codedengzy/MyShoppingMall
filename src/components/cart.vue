<template>
  <div>
    <van-nav-bar
      :title="msg"
      left-text="返回"
      right-text="清空购物车"
      left-arrow
      @click-left="goBack"
      @click-right="cartEmptyFn"
    />
    <div class="goodsDiv" v-for="item in shopCartList">
      <label>
        <img :src="item._img" alt="图片" />
      </label>
      <h2>{{ item._goodsName }}，￥{{ item._price }}</h2>
      <van-stepper
        v-model="item['_selectedNum']"
        :async-change="true"
        @plus="addBtnFn"
        @minus="minusBtnFn"
      />
    </div>
    <!-- 当购物车为空时的提示 -->
    <p v-if="showEmptyWords" class="emptyCartWords">什么都没有了~</p>
    <van-submit-bar
      :price="allGoodsPrice"
      :button-text="submitText"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: "cart",
  data() {
    return {
      msg: "购物车",
      cartArr: "",
      allGoodsNum: 0,
      allGoodsPrice: 0,
      submitText: "",
      //   是否显示空提示
      showEmptyWords: false,
    };
  },
  created() {
    this.cartArr = localStorage.shoppingCartData
      ? JSON.parse(localStorage.shoppingCartData)
      : [];
    //   判断购物车是否为空
    if (this.cartArr.length === 0) {
      this.showEmptyWords = true;
    }
    // console.log(this.cartArr);
    this.allGoodsNumFn();
    this.allGoodsPriceFn();
    this.submitText = "结账" + "(" + this.allGoodsNum + ")";
    // 映射事件
    this.addToVuex(this.cartArr);
  },
  computed:{
    ...mapGetters(['shopCartList'])
  },
  methods: {
    // 映射事件
    ...mapActions(['addToVuex']),
    //   返回首页
    goBack() {
      this.$router.push({ path: "/" }, () => {
        localStorage.setItem("inxState", 0);
      });
    },
    addBtnFn() {
      this.allGoodsNumFn();
      this.allGoodsPriceFn();
      this.submitText = "结账" + "(" + this.allGoodsNum + ")";
    },
    minusBtnFn() {
      this.allGoodsNumFn();
      this.allGoodsPriceFn();
      this.submitText = "结账" + "(" + this.allGoodsNum + ")";
    },
    // 计算所有商品数量
    allGoodsNumFn() {
      this.allGoodsNum = 0;
      for (let i = 0; i < this.cartArr.length; i++) {
        this.allGoodsNum += this.cartArr[i]._selectedNum;
      }
    },
    // 计算总价
    allGoodsPriceFn() {
      this.allGoodsPrice = 0;
      for (let i = 0; i < this.cartArr.length; i++) {
        this.allGoodsPrice +=
          this.cartArr[i]._price * this.cartArr[i]._selectedNum * 100;
      }
    },
    // 清空购物车
    cartEmptyFn() {
      this.$dialog
        .confirm({
          message: "确认清空购物车",
        })
        .then(() => {
          this.cartArr = localStorage.removeItem("shoppingCartData");
          this.allGoodsNum = 0;
          this.allGoodsPrice = 0;
          this.submitText = "去结账";
          //   显示购物车空提示
          this.showEmptyWords = true;
        })
        .catch(() => {
          // on cancel
          return false;
        });
    },
    // 提交订单
    onSubmit() {
      this.$dialog
        .alert({
          message:
            "一共" +
            this.allGoodsNum +
            "个商品，总共" +
            this.allGoodsPrice +
            "元",
        })
        .then(() => {
          this.$toast("支付成功！");
        });
    },
  },
};
</script>
<style scoped>
.pr {
  position: relative;
}
.pa {
  position: absolute;
}
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
h2.title {
  font-size: 20px;
  text-align: center;
}
.cle:after {
  content: ".";
  overflow: hidden;
  visibility: hidden;
  height: 0;
  display: block;
  clear: both;
}
.goodsDiv {
  width: 95%;
  margin: 5px auto;
  clear: both;
}
.goodsDiv label {
  float: left;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 5px;
}
.goodsDiv label img {
  width: 100px;
  height: 100px;
}
.goodsDiv h2 {
  font-size: 22px;
}
.emptyCartWords {
  color: rgb(109, 105, 105);
  font-size: 22px;
}
</style>