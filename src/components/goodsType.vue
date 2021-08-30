<template>
  <div>
    <!-- <h1>{{ msg }}</h1> -->
    <van-button v-if="isLogin" @click="entryGoods" type="info"
      >商品录入</van-button
    >
    <!-- 商品分类列表 -->
    <div class="wrapDiv cle">
      <van-tabs @click="onChangeSideBar" v-model="tabActive" animated>
        <van-tab
          v-for="(item, inx) in goodsCategoryData"
          :key="inx"
          :title="item.n"
        >
          <h1>{{ item.d }}</h1>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 提交商品分类 -->
    <div v-if="isEntryGoods" class="goodsEntry cle">
      <div v-for="item in emptyGoodsDomArr">
        <entryGoods
          @pushEntryGoodsInfo="pushEntryGoodsInfo"
          @isEmptyGoods="isEmptyGoodsFn"
        />
      </div>
      <van-button type="warning" @click="addEmptyGoodsInput">+</van-button>
      <van-button type="primary" @click="submitGoodsArr">提交</van-button>
      <van-button type="primary" @click="cancelGoodsInput">取消</van-button>
    </div>
    <!-- 商品大类前景div -->
    <div v-if="isEntryGoodsDivBg" class="entryGoodsDivBg"></div>
    <!-- 侧边竖导航栏 -->
    <div class="sideBarFn">
      <van-sidebar v-model="activeKey" @change="onSidebarChange">
        <van-sidebar-item
          v-for="(item, inx) in goodsCategoryData"
          :key="inx"
          :title="item.n"
        />
      </van-sidebar>
    </div>
    <!-- 根据竖导航栏显示类别下的商品 -->
    <div class="columnData">
      <ul v-for="item in goodsSidebarData" @click="gotoGoodsProduct(item)">
        <li><img :src="item.img" alt="图片" /></li>
        <li>{{ item.name }}</li>
        <li>￥{{ item.price }}</li>
        <li>{{ item.describe }}</li>
      </ul>
    </div>
    <!-- 分页 -->
    <div class="pageChange">
      <van-pagination
        v-model="currentPage"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        mode="simple"
        @change="onPageChange"
      />
    </div>
    <!-- 底部 -->
    <footerBar></footerBar>
  </div>
</template>
<script>
import axios from "axios";
import API_LIST from "@/APIList.config";
import { Notify } from "vant";
import entryGoods from "./entryGoods";
import footerBar from "./footerBar.vue";

export default {
  data() {
    return {
      msg: "商品分类页",
      tabActive: 0, //横向导航栏切换
      activeKey: 0, //竖向导航栏切换
      // 分页
      itemsPerPage: 2, //每页记录数
      totalItems: 0, //总记录数
      currentPage: 1, //当前页
      isEntryGoods: false,
      isLogin: false,
      isEntryGoodsDivBg: false,
      // 接收商品的大对象
      entryGoodsObj: [],
      //空的新商品输入框对象
      emptyGoodsDomArr: [{}],
      // 输入是否填完
      isGoodsInfoWrite: false,
      isNameRepeat: true,
      // 获得商品大类
      goodsCategoryData: "",
      // 竖向栏目商品对象
      goodsSidebarData: [],
    };
  },
  components: { entryGoods, footerBar },
  created() {
    let _obj = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {};
    if (_obj) {
      Notify({
        type: "success",
        message: "欢迎" + _obj.username + "登录",
        duration: "1500",
      });
      // 判断是否是管理员
      if (_obj._id === "608a93fcc202b42cf0d69430") {
        this.isLogin = true;
      }
      // 获取商品大类
      this.getGoodsCategoryFn();
      // 获取竖向商品列表
      this.getGoodsListByCategory("goodsList_a");
      // 获取分页数据
      this.onPageChange();
    }
  },
  methods: {
    entryGoods() {
      this.isEntryGoods = true;
      this.isEntryGoodsDivBg = true;
    },
    // 添加商品到集合
    pushEntryGoodsInfo(_itemEntryGoods) {
      let _is = true;
      for (let i = 0; i < this.entryGoodsObj.length; i++) {
        if (this.entryGoodsObj[i].n === _itemEntryGoods.n) {
          _is = false;
          break;
        }
      }
      if (_is) {
        this.isNameRepeat = false;
        this.entryGoodsObj.push(_itemEntryGoods);
      } else {
        this.$dialog.alert({
          message: "商品重名了",
        });
      }
      this.isGoodsInfoWrite = true;
    },
    isEmptyGoodsFn() {
      this.isGoodsInfoWrite = false;
    },
    // 添加新的空商品输入框
    addEmptyGoodsInput() {
      if (this.isGoodsInfoWrite && !this.isNameRepeat) {
        this.emptyGoodsDomArr.push({});
      } else {
        this.$dialog.alert({
          message: "没有输入完或者重名",
        });
      }
    },
    // 提交商品大类
    submitGoodsArr() {
      // console.log(this.entryGoodsObj);
      axios.post(API_LIST.insertGoods, this.entryGoodsObj).then((_d) => {
        //_d.data._callbackResult.Msg 返回消息
        this.$dialog
          .alert({
            message: _d.data._callbackResult.Msg,
          })
          .then(() => {
            this.isEntryGoods = false;
            this.emptyGoodsDomArr = [{}];
            this.entryGoodsObj = [];
            this.isEntryGoodsDivBg = false;
            this.getGoodsCategoryFn();
          });
      });
    },
    //取消商品录入
    cancelGoodsInput() {
      this.isEntryGoods = false;
      this.isEntryGoodsDivBg = false;
    },
    //获取商品大类
    getGoodsCategoryFn() {
      axios.get(API_LIST.getGoodsCategory).then((_d) => {
        // console.log(_d.data);
        this.goodsCategoryData = _d.data;
      });
    },
    // 竖向导航栏切换事件
    onSidebarChange(_index) {
      // console.log(_index);
      let _c = this.goodsCategoryData[_index].d;
      this.getGoodsListByCategory(_c);
      this.tabActive = _index;
      this.currentPage = 1;
      this.onPageChange();
    },
    // 根据类别获取商品列表
    getGoodsListByCategory(_c) {
      axios
        .get(API_LIST.getGoodsListByCategory, {
          params: {
            _category: _c,
          },
        })
        .then((_d) => {
          // console.log(_d.data);
          let _goodList = _d.data;
          // this.goodsSidebarData = _goodList;
          this.totalItems = _goodList.length;
        });
    },
    //横向改变纵向栏目
    onChangeSideBar(_inx) {
      this.activeKey = _inx;
      this.currentPage = 1;
      this.onPageChange();
    },
    // 页码改变时触发
    onPageChange() {
      // 获取集合名
      let _c = "";
      if (this.goodsCategoryData) {
        _c = this.goodsCategoryData[this.activeKey].d;
      } else {
        _c = "goodsList_a";
      }
      // 跳过的文档数：(currentPage-1)*itemsPerPage每页记录数
      let _startNum = (this.currentPage - 1) * this.itemsPerPage;
      axios
        .get(API_LIST.getPageGoodsList, {
          params: {
            _limit: this.itemsPerPage,
            _startNum: _startNum,
            _c: _c,
          },
        })
        .then((_d) => {
          // console.log(_d.data);
          this.goodsSidebarData = _d.data;
        });
    },
    // 跳转到商品详情页
    gotoGoodsProduct(_item){
      this.$router.push({
        name:'goodsProduct',
        query:{_goodsObjId:_item._id,_goodsCategory:_item.category}
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
  font-size: 14px;
  text-align: center;
  padding: 0;
  margin: 5px 0;
  color: #666;
}
.goodsEntry {
  width: 80%;
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -42%;
  z-index: 112;
  padding: 10px;
  background: #ddd;
  border-radius: 10px;
  border: 1px solid #999;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
}
.goodsCategory {
  clear: both;
  margin: 10px 0;
  height: 50px;
}
.goodsCategory:hover {
  background: #ddd;
}
.goodsCategory li {
  float: left;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.goodsCategory li img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #666;
}
.entryGoodsDivBg {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
  z-index: 111;
  position: absolute;
  top: 0;
  left: 0;
}
.sideBarFn {
  width: 80px;
  position: absolute;
  top: 330px;
  left: 0;
  z-index: 10;
}
.columnData {
  clear: both;
  width: 70%;
  height: 400px;
  background: #eee;
  border-radius: 10px;
  border: 1px solid #666;
  margin: 0 0 0 90px;
}
.columnData ul {
  display: block;
  clear: both;
  overflow: hidden;
  margin: 10px 0;
  background: #ddd;
}
.columnData ul li {
  float: left;
  margin: 5px;
}
.columnData ul li.tip {
  background: #eee;
  padding: 2px;
}
.columnData ul li img {
  width: 50px;
  height: 50px;
}
.pageChange {
  width: 85%;
  float: right;
  clear: both;
}
</style>