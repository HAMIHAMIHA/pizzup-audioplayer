<template>
<div class="itemMusicT">
  <div class="itemMusicTop">
      <img :src="playlist.coverImgUrl" alt="" class="bgimg">
      <div class="itemLeft">
          <van-icon name="arrow-left" size=".5rem" @click="$router.go(-1)"/>
          <span>歌单</span>
      </div>

      <div class="itemRight">
        <van-icon name="search" size=".5rem"/>
        <van-icon name="wap-nav" size=".5rem"/>
      </div>
  </div>

    <div class="itemmiddl"> 
        <div>
        <img :src="playlist.coverImgUrl" alt="" class="itimg">
        <div class="mldown11">
            <van-icon name="play-circle-o" size="5"/>
        {{changetowan(playlist.playCount)}}
            </div>
        </div>
        <div class="itemmiddl1">
            <div class="itemmiddl12">{{playlist.name}}</div>
            <div>
                <img :src="playlist.creator.avatarUrl" alt="">
            </div>
            <div class="itemmiddl11">{{playlist.description}}</div>
        </div>
    </div>
    <div class="IconList">
        <div class="iconItem">
            <van-icon name="comment-circle-o" size=".6rem"/>
            <span>评论</span>
        </div>
            <div class="iconItem">
            <van-icon name="share-o" size=".6rem"/>
            <span>分享</span>
        </div>
                <div class="iconItem">
            <van-icon name="down" size=".6rem"/>
            <span>下载</span>
        </div>
                <div class="iconItem">
            <van-icon name="passed" size=".6rem"/>
            <span>多选</span>
        </div>
    </div>

</div>
</template>

<script>
export default {
    setup(props){
        if((props.playlist.creator="")){
            props.plalylist.creator=JSON.parse(sessionStorage.getItem().playlist).creator
        }
        function changetowan(x){
    if(x>=10**4){
        x=(x/(10**4)).toFixed(1)
        return `${x}万`
    }
}  return {changetowan};
    },
props:["playlist"],

}

</script>

<style lang="less" scoped>
.itemMusicTop{
    width: 100%;
    height: 1rem;
    display:flex;
    justify-content: space-between;
    align-items:center;
    // padding:.2rem;
    position:relative;
    .bgimg{
        width: 100%;
        height: 9.2rem;
        position:fixed;
        z-index:-1;
        filter:blur(.1rem);
    }
    .itemLeft,.itemRight{
        width: 25%;
        height: 100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin:.2rem;
        color: #fff;
        span{
        font-size: .4rem;
        color: #fff;
        }
    }
}
.itemmiddl{
        width: 100%;
        height: 2rem;
        display:flex;
        padding:.2rem;
        position:relative;
        .mldown11{
        font-size:.20rem;
        color:white;
        position:absolute;
        left: 0.86rem;
        top:0.26rem; 
        }
        img{
            width: 2rem;
            border-radius:  0.2rem;
        }
        .itemmiddl1{
            color:#fff;
            padding-left: .2rem;
            .itemmiddl12{
                width: 100%;
                height: 0.4rem;
                overflow:hidden;
                margin-bottom:0.05rem;
            }
            img{
                width: .5rem;
                border-radius:  0.2rem;
            }
            .itemmiddl11{
                
                font-size:.26rem;
                color:#ddd;
                width:100%;
                height: 1rem;
                // border: solid white;
                // text-overflow: ellipsis;
                overflow: hidden;
                
            }
        }
    }
.IconList{
  color:white;
  width:100%;
  height:1.8rem;
  font-size: .26rem;
  padding:.32rem;
  display:flex;
  justify-content: space-around;
  align-items:center;
  .iconItem{
    width:25%;
    height:100%;
    display:flex;
    padding-top:.28rem;
    flex-direction:column;
    align-items:center;
  }
}
</style>