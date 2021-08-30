<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      :title="msg"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <!-- 登陆信息 -->
    <van-field
      v-model="username"
      required
      clearable
      :error-message="unameErr"
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="password"
      type="password"
      required
      clearable
      :error-message="pwdErr"
      label="密码"
      placeholder="请输入密码"
    />
    <van-button @click="userLoginFn" type="primary">登录</van-button>
    <van-button @click="registBtn" type="info">注册</van-button>
    <!-- 底部 -->
    <footerBar></footerBar>
  </div>
</template>
<script>
import axios from "axios";
import API_LIST from "@/APIList.config";
import { Notify } from "vant";
import footerBar from "./footerBar";

export default {
  name: "register",
  data() {
    return {
      msg: "登录页面",
      // 字段属性
      username: "",
      password: "",
      //错误信息
      unameErr: "",
      pwdErr: "",
    };
  },
  components:{footerBar},
  methods: {
    goBack() {
      this.$router.push({ path: "/" }, () => {
        localStorage.setItem("inxState", 0);
      });
    },
    userLoginFn() {
      let _loginObj = {
        username: this.username,
        password: this.password,
      };
      //用户名密码空判断
      this.unameErr = "";
      this.pwdErr = "";
      if (this.username === "") {
        this.unameErr = "用户名不能为空";
      } else if (this.password === "") {
        this.pwdErr = "密码不能为空";
      } else {
        this.userLoginPost(_loginObj);
      }
    },
    //登录请求
    userLoginPost(_loginObj) {
      axios.post(API_LIST.user_login_post, _loginObj).then((_d) => {
        var _resultObj = _d.data._callbackResult;
        // console.log(_resultObj);
        if (_resultObj.Code == "-1") {
          this.unameErr = _resultObj.Msg;
        } else if (_resultObj.Code == "-2") {
          this.pwdErr = _resultObj.Msg;
        } else if (_resultObj.Code == "1") {
          //登录成功并跳转到首页
          localStorage.userInfo = JSON.stringify(_resultObj.Result);
          this.$router.push({ path: "/" }, () => {
            localStorage.setItem("inxState", 0);
          });
        }
      });
    },
    registBtn() {
      this.$router.push({ path: "/register" },() => {
        localStorage.setItem("inxState", 3);
      });
    },
  },
};
</script>
