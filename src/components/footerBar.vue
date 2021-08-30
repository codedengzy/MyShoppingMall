<template>
  <div>
    <van-tabbar v-model="tabbarActive" @change="switchColumnFn">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o">{{userCenterTxt}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import axios from "axios";
import API_LIST from "@/APIList.config";

export default {
  data() {
    return {
      msg: "footerBar的组件",
      // footer标签组
      tabbarActive: 0,
      userCenterTxt:''
    };
  },
  created(){
    // this.isLoginState();
    
    if (localStorage.userInfo) {
      this.userCenterTxt='我的';
    }else{
      this.userCenterTxt='未登录';
    }
  },
  mounted() {
    this.tabbarActive = Number(localStorage.getItem("inxState"));
  },
  methods: {
    switchColumnFn() {
      // console.log(this.tabbarActive);
      let _inx = this.tabbarActive;
      switch (_inx) {
        case 0:
          this.$router.push({ path: "/" }, () => {
            localStorage.setItem("inxState", 0);
          });
          break;
        case 1:
          this.$router.push({ path: "/goodsType" }, () => {
            localStorage.setItem("inxState", 1);
          });
          break;
        case 2:
          this.$router.push({ path: "/cart" }, () => {
            localStorage.setItem("inxState", 2);
          });
          break;
        case 3:
          this.isLoginState();
          break;
      }
    },
    // 判断登录状态
    isLoginState() {
      let _route = "";
      if (localStorage.userInfo) {
        _route = "/accountCenter";
      } else {
        _route = "/userLogin";
      }
      this.$router.push({ path: _route }, () => {
        localStorage.setItem("inxState", 3);
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
</style>