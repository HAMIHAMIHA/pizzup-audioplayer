<template>
<div class="swipertop">
<van-swipe :autoplay="3000" lazy-render class="swiperTop">
  <van-swipe-item v-for="image in state.images" :key="image">
    <img :src="image.pic" />
  </van-swipe-item>
</van-swipe></div>

</template>

<script>
import {getBanner} from "@/request/api/home" //引入axios请求函数
import {reactive,onMounted} from "vue"
export default {
name:"SwiperTop",
  setup() {
    const state=reactive({
      images :[
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]
    })

onMounted(async ()=>{//异步请求
//   axios.get("http://localhost:3000/banner?type=2")
//   .then((res)=>{
//     state.images=res.data.banners
//   })
//   .catch((error)=>{
//     console.log(error)
//   })
let res=await getBanner();//不用传参
    state.images=res.data.banners
    console.log(res)
})
    return { state };
  },
};

</script>

<style lang="less" scoped>
img{
  width:100%;
  height: 3rem;
}
.swipertop{
  padding:0.2rem;
}
</style>

