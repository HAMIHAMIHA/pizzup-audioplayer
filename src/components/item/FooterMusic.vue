<template>
<div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
        <img :src="playList[playListIndex].al.picUrl" alt="">
        <div class="footerLeft1">
            <p>{{playList[playListIndex].name}}</p>
            <span>横滑切换上下首</span>
        </div>
    </div>
    <div class="footerRight">
        <van-icon name="play-circle-o" @click="playaudio" size="30" v-if="isbtnShow"/>
        <van-icon name="pause-circle-o" @click="playaudio" size="30" v-else/>
        <van-icon name="wap-nav" size="30"/>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%',width:'100%' }" >
      <MusicDetail 
      :musicList="playList[playListIndex]" 
      :play="playaudio" 
      :isbtnShow="isbtnShow"
      :addDuration="addDuration"
      />
    </van-popup>
</div>
</template>

<script>
import MusicDetail from "@/components/item/MusicDetail.vue"
import {mapState,mapMutations} from "vuex"
// import {ref} from "vue"
export default {
    data(){
        return{
            interVal:0
        }
    },
    computed:{
        ...mapState(["playList","playListIndex","isbtnShow","detailShow"])
    },
    methods:{
        ...mapMutations([
        "updateIsbtnShow",
        "updateDetailShow",
        "updateCurrentTime",
        "updateDuration"
        ]),
         playaudio:function(){
            if(this.$refs.audio.paused){
                 this.$refs.audio.play();
                this.updateIsbtnShow(false)
                this.updateTime() //播放调用函数进行传值
            }else{
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
                clearInterval(this.interVal)//暂停清除定时器
            }
        },
        updateTime:function(){
            this.interVal=setInterval(()=>{
                this.updateCurrentTime(this.$refs.audio.currentTime)
            },1000)
        },
        addDuration:function(){
            this.interVal=setInterval(()=>{
                this.updateDuration(this.$refs.audio.duration)
            },1000)
        }
    },
    watch:{
        playListIndex:function(){//监听如果下标发生了变化,就自动播放音乐.
            this.$refs.audio.autoplay=true;
            if(this.$refs.audio.paused){ //若果音乐是暂停状态, 则将图标换成正在播放也就是暂停按钮.
                this.updateIsbtnShow(false)
            }
        },
        playList:function(){
            this.$refs.audio.autoplay=true;
            this.updateIsbtnShow(false);
        }
    },
    updated(){
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id);
        this.addDuration();
    },   
    mounted(){
         this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
        //  this.updateTime()
    },
    // setup(){
    //     const audio=ref(null)
    //     function playaudio(){
    //         //判断音乐是否播放
    //         if(audio.value.paused){
    //             audio.value.play()
    //             store.mutations.updateIsbtnShow(false)
    //         }else{
    //             audio.value.pause()
    //            store.mutations.updateIsbtnShow(true)
    //         }
    //     }
    //     return {audio,playaudio}
    // },
    components:{
        MusicDetail
    }
}
</script>

<style lang="less" scoped>
.FooterMusic{
width: 100%;
height: 1.4rem;
background-color: #fff;
position:fixed;
border-top:.02rem solid #999;
bottom:0;
display:flex;
justify-content: space-between;
align-items: center;
.footerLeft{
    height: 100%;
    width: 75%;
    display:flex;
    align-items:center;
    padding-left:.2rem;
    
    img{
        width: .8rem;
        height: .8rem;
        border-radius:0.2rem;
    }
    .footerLeft1{
        padding-left:.2rem;
        p{
            font-weight:800;
        }
        span{
            font-size:.26rem;
        }
    }
}
.footerRight{
    .van-icon{
        padding-right :.2rem;
    }
}
}
</style>