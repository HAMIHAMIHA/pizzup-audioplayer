<template>
  <div class="root">
      <div class="searchTop">
          <van-icon name="arrow-left" size=".6rem" @click="$router.go(-1)"/>
          <input type="text" placeholder="搜索歌曲" v-model="searchKey" @keydown.enter="enterKey">
      </div>
    <div class="searchHistory">
        <p class="searchSpan">历史记录</p>
        <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">
            {{item}}
        </span>
        <van-icon name="delete" size=".5rem" @click="delHistory"/>
        <div class="itemList">
            <div class="item" v-for="(item,i) in searchList" :key="i">
                <div class="itemLeft" @click="updataIndex(item)">
                    <span class="leftSpan">{{i+1}}</span>
                    <div class="leftdiv">
                        <p>{{item.name}}</p>
                        <span v-for="(item1,index) in item.artists" :key="index">
                        {{item1.name}}
                        </span>
                    </div>
                </div>
                <div class="itemRight">
                    <van-icon class="van-icon1" name="tv-o" size="30" v-if="item.mvid !=0"/>
                    <van-icon name="wap-nav" size="30"/>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {getSearchMusic} from "@/request/api/home.js"
export default {
    data(){
        return{
            keyWorldList:[],
            searchKey:"",
            searchList:[]
        }
    },
    mounted(){
        this.keyWorldList=JSON.parse(localStorage.getItem("keyWorldList"))?JSON.parse(localStorage.getItem("keyWorldList")):[]
    },
    methods:{
        enterKey:async function(){
            if(this.searchKey!==""&&this.searchKey!==" "){
            this.keyWorldList.unshift(this.searchKey);
            //去重
            this.keyWorldList=[...new Set(this.keyWorldList)];
            //固定长度
            if(this.keyWorldList.length>10){
                this.keyWorldList.splice(this.keyWorldList.length-1,1)
            }
            localStorage.setItem("keyWorldList",JSON.stringify(this.keyWorldList))
            let res=await getSearchMusic(this.searchKey);
            this.searchList=res.data.result.songs;
            this.searchKey="";
            }
        },
        delHistory:function(){
            localStorage.removeItem("keyWorldList");
            this.keyWorldList=[]
        },
        searchHistory:async function(item){
            let res=await getSearchMusic(item)
            console.log(res);
            this.searchList=res.data.result.songs;
        },
        updataIndex:function(item){
            item.al=item.album
            item.al.picUrl=item.album.artist.img1v1Url
            this.$store.commit("pushPlayList",item)
            this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
        }
    }
}
</script>

<style lang="less" scoped>
.searchTop{
    width: 100%;
    height: 1rem;
    padding: 0 .2rem;
    display: flex;
    align-items:center;
    input{
        margin-left:.2rem;
        border:none;
        border-bottom:1px solid #999;
        width: 80%;
        padding:.1rem;
    }
}
.searchHistory{
    width: 100%;
    padding: .2rem;
    position:relative;
    .searchSpan{
        font-weight: 700;
    }
    .spanKey{
        padding: .05rem .2rem;
        background-color: #bbb;
        border-radius:.4rem;
        margin:.1rem .2rem;
    display:inline-block;
    }
    .van-icon{
        position:absolute;
        right:.2rem;
    } 
    .itemList{
        padding:.1rem;
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
        padding-right:.6rem;
      }
    }
    }
  }
}
</style>