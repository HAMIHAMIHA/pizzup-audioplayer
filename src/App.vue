<template>
<div>  
  <router-view/>
  <FooterMusic v-show="$store.state.isFooterMusic"/>
</div>
</template>

<script>
import FooterMusic from "@/components/item/FooterMusic.vue"
export default {
  components:{
    FooterMusic
  }
}
</script>
<style lang="less">
*{
  margin:0;
  padding: 0;
  box-sizing:border-box; //怪异盒子? 组件就不会撑开全部
}

//iconfont这里有插件
  
</style>