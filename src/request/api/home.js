import service from "../index"

export function getBanner() {
    return service({ //把service数据和之前的实例进行拼接, 并返回数据.
        method: "get",
        url: "/banner?type=2"
    })

}
//获取发现好歌单
export function getMusicList() {
    return service({
        method: "get",
        url: "/personalized?limit=10"
    })
}
//搜索
export function getSearchMusic(data) {
    return service({
        method: "GET",
        url: `/search?keywords=${data}`
    })
}
//登录
export function getPhoneLogin(data) {
    return service({
        method: "GET",
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
//获取用户详情
export function getLoginUser(data) {
    return service({
        method: "GET",
        url: `/user/detail?uid=${data}`
    })
}