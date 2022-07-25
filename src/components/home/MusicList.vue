<template>
  <div class="musiclist">
      <div class="mlup">
          <div class="title">发现好歌单</div>
          <div class="more">查看更多</div>
     </div>
     <div class="mldown">
        <van-swipe :loop="false" :width="150" class="mldown1" :show-indicators="false">
            <van-swipe-item v-for="image in state.musicList" :key="image">
            <router-link :to="{path:'/itemMusic',query:{id:image.id}}">
                <img :src="image.picUrl" />
                <div class="mldown11">
            <van-icon name="play-circle-o" size="5"/>
            {{changetowan(image.playCount)}}</div>
            <div class="mldown2">{{image.name}}</div>
            </router-link>
            </van-swipe-item>
        </van-swipe>
     </div>
  </div>
</template>

<script>
import {reactive,onMounted} from "vue"
import {getMusicList} from "@/request/api/home"
export default {
setup(){
const state=reactive({
    musicList:[]
})
onMounted(async ()=>{//异步请求
let res=await getMusicList();//不用传参
    state.musicList=res.data.result
    console.log("MusicList",res)
})
function changetowan(x){
    if(x>=10**4){
        x=(x/(10**4)).toFixed(1)
        return `${x}万`
    }
}
    return { state ,changetowan};
}

}
</script>

<style lang="less" scoped>
.musiclist{
width: 100%;
height: 5rem;
padding:0.2rem;
.mlup{
    width: 100%;
    height: 0.6rem;
    display:flex;
    justify-content: space-between;
    margin-bottom:0.2rem;
    .title{
        font-size:0.4rem;
        font-weight:900;

    }
    .more{
        border:.0625rem solid #ccc;
        text-align:center;
        line-height:0.6rem;
        padding:0 0.2rem;
        border-radius:  0.4rem;
    }
}
.mldown1{
    width: 100%;
    padding:0.2rem;
    padding-left:0rem;
    img{
    width: 2.8rem;
    border-radius:  0.4rem;
}
    .mldown2{
    width: 2.7rem;
    color:black;
    }
    .mldown11{
        color:white;
        position:absolute;
        left:1.04rem;
        top:.02rem; 
    }
}
}

</style>