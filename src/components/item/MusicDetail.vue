<template>
<img :src="musicList.al.picUrl" alt="" class="bgimg">
  <div class="root">
      <div class="detailTop">
          <div class="detailTopLeft"> 
              <van-icon name="arrow-left" size=".6rem" @click="backHome"/>
              <div class="detailTopLeft1">
                  <Vue3Marquee>
                    {{musicList.al.name}}
                </Vue3Marquee>
                  <span v-for="item in musicList.ar" :key="item">
                      {{item.name}}
                  </span>
                  <van-icon name="arrow" size=".1rem"/>
              </div>
          </div>
          <div class="detailTopRight"> 
              <van-icon name="share-o" size=".6rem"/>
          </div>
      </div>
 
    <div class="detailContent" v-show="!isLyricShow">
        <img src="@/assets/needle1.png" alt="" class="img1" :class="{img1active:!isbtnShow}">
        <img src="@/assets/circle1.png" alt="" class="img2" @click="isLyricShow=true">
        <img :src="musicList.al.picUrl" alt="" class="img3" :class="{img3active:!isbtnShow,img3paused:isbtnShow}">
    </div>

    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow=false">
    <p v-for="item in lyric" :key="item" :class="{active:(currentTime*1000>=item.time && currentTime*1000<item.pre)}">
        {{item.lrc}}
    </p>
      </div>
      <div class="detailFooter">
          <div class="top">
              <van-icon name="like-o" size="0.5rem" @click="alertgd"/>
              <van-icon name="down" size="0.5rem"  @click="alertgd"/>
              <van-icon name="smile-o" size="0.5rem" @click="alertgd"/>
              <van-icon name="comment-circle-o" size="0.5rem" @click="alertgd"/>
              <van-icon name="link-o" size="0.5rem" @click="alertgd"/>
          </div>
          <div class="middle">
              <input type="range" class="range1" min="0" :max="duration" v-model="currentTime" step="0.03"/>
          </div>
          <div class="top">
              <van-icon name="exchange" size="0.5rem" @click="alertgd"/>
              <van-icon name="minus" size="0.5rem" @click="goPlay(-1)"/>
              <van-icon name="play-circle-o" size="1rem" v-if="isbtnShow" @click="play"/>
              <van-icon name="pause-circle-o" size="1rem" v-else @click="play"/>
              <van-icon name="plus" size="0.5rem" @click="goPlay(1)"/>
              <van-icon name="descending" size="0.5rem" @click="alertgd"/>
          </div>
      </div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import {mapMutations,mapState} from "vuex"
export default {
    data(){
        return{
            isLyricShow:false
        }
    },
    computed:{
        ...mapState([
            "lyricList",
            "currentTime",
            "playListIndex",
            "playList",
            "duration"
            ]),
        lyric:function(){
            let arr;
            if(this.lyricList.lyric){
                arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                    let min=item.slice(1,3);
                    let sec=item.slice(4,6);
                    let mill=item.slice(7,10);
                    let lrc=item.slice(11,item.length);
                    let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
                    if(isNaN(Number(mill))){
                        mill=item.slice(7,9);
                        lrc=item.slice(10,item.length)
                        time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
                    }
                    // console.log(min,sec,Number(mill),lrc)
                    return{min,sec,mill,lrc,time}
                })
                arr.forEach((item,i)=>{
                    if(i===arr.length-1 || isNaN(arr[i+1].time)){
                        item.pre=100000
                    }else(
                        item.pre=arr[i+1].time
                    )
                })
            }
            // console.log("歌词详情",arr)
            return(arr)
        }
    },
    mounted(){
        // console.log("弹出层",this.musicList)
        // console.log("歌词详情",this.lyricList.lyric)
        console.log("处理的歌词",this.lyric)
        this.addDuration()
    },
    props:["musicList","play","isbtnShow","addDuration"],
    components: {
    Vue3Marquee,
    },
    methods:{
        ...mapMutations(["updateDetailShow","updatePlayListIndex"]),
        backHome:function(){
            this.isLyricShow=false;
            this.updateDetailShow()
        },
        goPlay:function(num){
            
            let index=this.playListIndex+num
            if(index<0){
                index=this.playList.length-1
            }else if(index==this.playList.length){
                index=0
            }
            this.updatePlayListIndex(index)
        },
        alertgd:function(){
            alert("点击转盘显示歌词/上一首/下一首/播放和暂停音乐")
        }

    },
    watch:{
        currentTime:function(newValue){
            let p=document.querySelector(".active");
            console.log("这是p",[p]);
            if(p){
            if(p.offsetTop>300){
                this.$refs.musicLyric.scrollTop=p.offsetTop-260;
            }
            }
            if(newValue===this.duration){
                if(this.playListIndex===this.playList.length-1){
                    this.updatePlayListIndex(0);
                    this.play()
                }else{
                    this.updatePlayListIndex(this.playListIndex+1);
                }
            }
        }
    },
}
</script>
 
<style lang="less" scoped>

.bgimg{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index:-100;
    filter:blur(.5rem);
}
.root{
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
.detailTop{
    color:white;
    width: 100%;
    height: 1.5rem;
    display: flex;
    justify-content: space-between;
    .detailTopLeft{
        width: 60%;
        height: 1.5rem;
        align-items: center;
        display:flex;
        padding-left:.2rem;
        .detailTopLeft1{
            padding-left:.2rem;
            .van-icon{
                color:#aaa;
                padding-left:.1rem;
            }
            span{
                font-size:.2rem;
                color:#aaa;
            }
        }
    }
    .detailTopRight{
        height: 1.5rem;
        display:flex;
        align-items: center;
        padding-right:.2rem;
    }
}
.detailContent{
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position:relative;
   .img1{
       width: 2rem;
       height: 3.2rem;
       position:absolute;
       left:45%;
       transform-origin:0 0;
       transform:rotate(-12deg);
       transition: all 1s;
       z-index: 2;
   }
   .img1active{
       transform:rotate(1.5deg);
   }
   .img2{
       width: 5rem;
       height: 5rem;
       position:absolute;
       z-index: 1;
       bottom:2rem;
   }
   .img3{
       width: 3.2rem;
       height: 3.2rem;
       position:absolute;
       border-radius: 50%;
       bottom:2.84rem;
       z-index: 0;
       animation: rotate_ar 10s linear infinite;
   }
   .img3active{ 
       animation-play-state:running;
   }
   .img3paused{
       animation-play-state:paused;
   }
   @keyframes rotate_ar{
       0%{
           transform:rotateZ(0deg);
       }
       100%{
           transform:rotateZ(360deg);
       }
   }
}
.musicLyric{
    width: 100%;
    height: 8.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    // position:relative;
    color: #ccc;
    overflow: hidden scroll;
    font-size: 0.3rem;
    line-height:1rem;
    .active{
        color:#fff;
        font-size:.5rem;
    }
}
.detailFooter{
        padding-bottom: .2rem;
        height: 2.8rem;
        display:flex;
        flex-direction: column;
        justify-content:space-between;
    .top{
        color:white;
        height: 1rem;
        width: 100%;
        display:flex;
        align-items: center;
        justify-content: space-around;
    }
}
.detailFooter{
    .range1{
        width: 100%;
        height: 0.06rem;
    }
}
}
</style>