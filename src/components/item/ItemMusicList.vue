<template>
<div class="itemMusicList">
  <div class="itemListTop">
    <div class="listLeft">
       <van-icon name="play-circle-o" size="30"/>
       <span class="spanbofang">
         播放全部
         <span>
           (共{{itemList.length}}首)
         </span>
       </span>
    </div>
    <div class="listRight">
      <div class="listRight1">
      <van-icon name="plus" />
      <span>收藏({{subscribedCount}})</span>
      </div>
    </div>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item,i) in itemList" :key="i">
      <div class="itemLeft" @click="playMusic(i)">
        <span class="leftSpan">{{i+1}}</span>
        <div class="leftdiv">
      <p>{{item.name}}</p>
      <span v-for="(item1,index) in item.ar" :key="index">
        {{item1.name}}
      </span>
    </div>
  </div>
  <div class="itemRight">
<van-icon class="van-icon1" name="tv-o" size="30" v-if="item.mv !=0"/>
<van-icon name="wap-nav" size="30"/>
  </div>
  </div>
</div>
</div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
setup(props){
console.log("收到的播放列表数据",props)
},
props:['itemList','subscribedCount'],
methods:{
  playMusic:function(i){
  this.updatePlayList(this.itemList)
  this.updatePlayListIndex(i)
},
...mapMutations(["updatePlayList","updatePlayListIndex"])
},
}
</script>

<style lang="less" scoped>
.itemMusicList{
  width:100%;
  height: 100%;
  background-color: #fff;
  padding:0.1rem 0.2rem;
  border-top-left-radius:0.4rem;
  border-top-right-radius:0.4rem;
  .itemListTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content:space-between;
    align-items:center;
    .listLeft{
      width: 4rem;
      height: 100%;
      display: flex;
      font-size:0.32rem;
      align-items: center;
      .spanbofang{
        padding-left:.2rem;
        font-weight:900;
        span{
        font-weight:500;
          font-size:0.3rem;
          color:#aaa;
        }
      }
    }
    .listRight{
      // width: 2.4rem;
      height: 100%;
      .listRight1{
      height: 100%;
      font-size:0.3rem;
      font-weight:500;
      align-items:center;
      display: flex;
      color:white;
      justify-content:space-around;
      background-color: red;
      border-radius: 0.5rem;
      padding:0 .3rem;
      }
    }
  }
  .itemList{
    .item{
    width: 100%;
    height: 100%;
    padding:.2rem 0;
    display:flex;
    justify-content:space-between;
    .itemLeft{
      width: 5rem;
      display: flex;
      align-items: center;
      font-size:.3rem;
      padding-left:.2rem;
      .leftdiv{
        padding-left:.4rem;
        p{
          font-size:.3rem;
          font-weight: 900;
        }
        span{
          font-size:.26rem;
          color:#ccc;
        }
      }
    }
    .itemRight{
      color:#aaa;
      .van-icon1{
        padding-right:.2rem;
      }
    }
    }
  }
}

</style>