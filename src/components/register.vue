<template>
    <div>
        <!-- 头部 -->
        <van-nav-bar
            :title=msg
            left-text="返回"
            left-arrow
            @click-left="backIndexFn" 
        />
        <!-- 注册信息 -->
        <van-field
            v-model="username"
            required
            clearable
            ref="field"
            :error-message=unameErr
            @blur="checkNameExistence"
            label="用户名"
            placeholder="请输入用户名"
        />
         <!--  -->
        <van-field
            v-model="password"
            type="password"
            required
            clearable
            :error-message=pwdErr
            label="密码"
            placeholder="请输入密码"
        />
        <van-field
            v-model="password2"
            type="password"
            required
            clearable
            :error-message=pwdErr2
            label="再次输入密码"
            placeholder="再次输入密码"
        />
        <van-field
            v-model="discribe"
            rows="2"
            autosize
            label="个性签名"
            type="textarea"
            maxlength="50"
            show-word-limit
            placeholder="请输入个性签名"
        />
        <van-button @click="registerBtn" type="primary">立即注册</van-button>
        <van-button @click="registerReset" type="warning">重置</van-button>
        <!-- 底部 -->
        <footerBar></footerBar>
    </div>
</template>
<script>
import axios from 'axios'
import API_LIST from '@/APIList.config'
import {Notify} from 'vant'
import footerBar from "./footerBar";

export default{
    name:'register',
    data(){
        return{
            msg:'注册页面',
            // 字段属性
            username:'',
            password:'',
            password2:'',
            discribe:'',
            //错误信息
            unameErr:'',
            pwdErr:'',
            pwdErr2:''
        }
    },
    components:{footerBar},
    methods:{
        backIndexFn(){
            this.$router.go(-1);
        },
        //注册
        registerBtn(){
            this.unameErr='';
            this.pwdErr='';
            this.pwdErr2='';
            let _registerObj={
                username:this.username,
                password:this.password,
                password2:this.password2,
                discribe:this.discribe
            }
            // console.log(_registerObj);
            if(_registerObj.username===''){
                this.unameErr='用户名不能为空'
            }else if(_registerObj.password===''){
                this.pwdErr='密码不能为空'
            }else if(_registerObj.password2===''){
                this.pwdErr2='再次输入的密码不能为空'
            }else if(_registerObj.password!==_registerObj.password2){
                this.pwdErr2='两次输入密码不一致'
            }else{
                this.registerPost(_registerObj);
            }
        },
        //注册
        registerPost(_registerObj){
            axios.post(API_LIST.register_post,_registerObj)
            .then(_d=>{
                Notify({ 
                    type: 'success', 
                    message: _d.data._callbackResult.Msg,
                    duration:'2000',
                    onOpened:()=>{
                        setTimeout(()=>{
                            this.$router.push({path:'/'});
                        },2000)
                    } });
            });
        },
        //重置
        registerReset(){
            this.username='';
            this.password='';
            this.password2='';
            this.discribe=''
        },
        //校验重名
        checkNameExistence(){
            let _nameObj={
                username:this.username
                };
            axios.post(API_LIST.check_name_existence,
            _nameObj)
            .then(_d=>{
                //返回对象
                let _backObj= _d.data._callbackResult;
                if (_backObj.Code=='1') {
                    this.unameErr=_backObj.Msg;
                    this.$refs.field.focus();
                }
            })
        }
    }
}
</script>
