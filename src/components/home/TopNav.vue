<template>
  <div class="topNav">
    <div class="topLeft">
      <van-icon name="wap-nav" size=".56rem"/>
    </div>        
    <div class="topCenter">
            <span @click="$router.push('/infoUser')">我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
    <div class="topRight">
       <van-icon name="search" size=".56rem" @click="$router.push('/search')"/>
    </div>  
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.topNav{
    width:100%;
    height:1.2rem;
    padding:.2rem;
    display:flex;
    justify-content:space-between;
    align-items: center;
    .topCenter{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content:space-around;
        align-items: center;
        font-size:.4rem;
        .active{
            font-weight:900;
        }
    }
}
</style>