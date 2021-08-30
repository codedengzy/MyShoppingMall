<template>
  <div>
    <van-nav-bar
      :title="msg"
      left-text="返回"
      right-text="退出登录"
      left-arrow
      @click-left="goBack"
      @click-right="logoutFn"
    />
    <div class="userImgDiv">
      <p>欢迎{{ userInfo.username }}登录！</p>
      <!-- discribe拼写错误 更正describe -->
      <p>{{ userInfo.discribe }}</p>
    </div>
    <footerBar />
  </div>
</template>
<script>
import axios from "axios";
import API_LIST from "@/APIList.config";
import footerBar from "./footerBar";

export default {
  name: "accountCenter",
  data() {
    return {
      msg: "用户中心",
      userInfo: "",
    };
  },
  created() {
    this.userInfo = localStorage.userInfo
      ? JSON.parse(localStorage.userInfo)
      : "";
  },
  components: { footerBar },
  methods: {
    //   返回首页
    goBack() {
      this.$router.push({ path: "/" }, () => {
        localStorage.setItem("inxState", 0);
      });
    },
    // 退出登录
    logoutFn() {
      localStorage.removeItem("userInfo");
      this.$dialog
        .alert({
          message: "成功退出登录",
        })
        .then(() => {
          this.$router.push({ path: "/" }, () => {
            localStorage.setItem("inxState", 0);
          });
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
.wrapDiv {
  width: 90%;
  overflow: hidden;
  border: 1px solid #666;
  background: #eee;
  border-radius: 10px;
  margin: 10px auto;
}
.userImgDiv {
  width: 100px;
  height: 200px;
  float: left;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  margin: 10px;
}
.userImgDiv img {
  position: absolute;
  top: 0;
  left: -20px;
  width: 260px;
}
.userInfoDiv {
  font-size: 14px;
  float: left;
  text-align: left;
}
.wrapDiv {
  width: 90%;
  overflow: hidden;
  border: 1px solid #666;
  background: #eee;
  border-radius: 10px;
  margin: 10px auto;
}
</style>