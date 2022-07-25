<template>
  <div class="IconList">
      <div class="iconItem">
          <van-icon name="fire-o" size="1rem"/>
          <span>每日推荐</span>
      </div>
        <div class="iconItem">
          <van-icon name="music-o" size="1rem"/>
          <span>私人FM</span>
      </div>
            <div class="iconItem">
          <van-icon name="label-o" size="1rem"/>
          <span>歌单</span>
      </div>
            <div class="iconItem">
          <van-icon name="bar-chart-o" size="1rem"/>
          <span>排行榜</span>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.IconList{
  width:100%;
  height:2rem;
  display:flex;
  justify-content: space-around;
  align-items:center;
  .iconItem{
    width:25%;
    height:100%;
  display:flex;
    flex-direction:column;
    align-items:center;
  }
}
</style>