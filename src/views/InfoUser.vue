<template>
  <!-- <div class="infoUser">
    <img :src="user.data.profile.avatarurl" alt="" class="profileimg">
    <div class="name"> {{user.data.profile.nickname}}</div>
  </div> -->
  <div class="infoUser">
    <img src="../assets/pss.jpg" alt="" class="profileimg">
    <div class="name">披萨上</div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  computed:{
    ...mapState(["user"])
  },
  mounted(){
    console.log(this.user)
  }
}
</script>

<style lang="less" scoped>
.infoUser{
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around;
  padding-top: 0.5rem;
  .profileimg{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .name{
    font-weight:700;
    font-size:.4rem;
  }
}
</style>