import { getPhoneLogin } from '@/request/api/home';
import { getMusicLyric } from '@/request/api/item';
import { createStore } from 'vuex';
export default createStore({
    state: { //存储数据
        playList: [{
            al: {
                id: 19057,
                name: "Ultimate",
                pic: 102254581395221,
                picUrl: "https://p2.music.126.net/cmvsHFnVKXO409hZdrbacA==/102254581395221.jpg",
            },
            name: "沉默是金",
            id: 188204,
            ar: [{
                name: "这是默认歌曲",
            }]
        }],
        currentTime: 0,
        playListIndex: 0,
        isbtnShow: true,
        detailShow: false,
        lyricList: {}, //歌词
        duration: 0, //歌曲总时长
        isLogin: true, //判断是否登录
        isFooterMusic: true, //判断底部组件是否需要显示
        token: "",
        user: {}, //用户信息
    },
    getters: {},
    mutations: { //全局方法
        updateIsbtnShow: function(state, value) {
            state.isbtnShow = value
        },
        pushPlayList: function(state, value) {
            state.playList.push(value)
        },
        updatePlayList: function(state, value) {
            state.playList = value;
            console.log("播放", state.playList)
        },
        updatePlayListIndex: function(state, value) {
            state.playListIndex = value
        },
        updateDetailShow: function(state) {
            state.detailShow = !state.detailShow
        },
        updateLyricList: function(state, value) {
            state.lyricList = value
        },
        updateCurrentTime: function(state, value) {
            console.log("进行的时间:", state.currentTime)
            state.currentTime = value
        },
        updateDuration: function(state, value) {
            state.duration = value
        },
        updateIsLogin: function(state, value) {
            state.isLogin = true;
        },
        updateToken: function(state, value) {
            state.token = value
            localStorage.setItem("token", state.token)
        },
        updateUser: function(state, value) {
            state.user = value
        }

    },
    actions: { //异步请求
        getLyric: async function(context, value) {
            let res = await getMusicLyric(value)
                // console.log("歌词", res)
            context.commit("updateLyricList", res.data.lrc)
        },
        getLogin: async function(context, value) {
            let res = await getPhoneLogin(value);
            console.log(res)
            return res;
        }
    },
    modules: {}
})