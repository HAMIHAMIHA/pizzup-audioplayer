<template>
<div>
  <div>欢迎登录</div>
  <div class="loginContent">
    <input type="text" v-model="phone" name="phone" class="phone" placeholder="请输入手机号码">
    <input type="text" v-model="password" name="password" class="password" placeholder="请输入密码">
    <button class="btn" @click="Login"> 登录</button>
  </div>
</div>
</template>

<script>
import {getLoginUser} from "@/request/api/home.js"
export default {
  data(){
    return{
      phone:"13125498760",
      password:"superzsd1"
    }
  },
  methods:{
    Login:async function(){
     let res=await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
    if(res.data.code===200){
      this.$store.commit("updateIsLogin",true)
      this.$store.commit("updateToken",res.data.token)
      let result=await getLoginUser(res.data.account.id)
      this.$store.commmit("updateUser",result)
      this.$router.push("/infoUser")
    }else{
      alert("手机号码或者密码错误")
      this.password=""
    }
    }
  }
}
</script>

<style>

</style>