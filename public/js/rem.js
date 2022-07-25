//该文件实现移动端的适配
//移动端适配函数, 当窗口发生改变的时候实现适配布局.
function reSize() {
    //获得设备宽度, 根据宽度设置rem
    var showWidth = document.documentElement.clientWidth || window.innerWidth
        //宽度一般是按750来设计(苹果手机)
    if (showWidth >= 750) {
        showWidth = 750
    }
    if (showWidth < 320) {
        showWidth = 320
    }
    //750px-->1rem=100px, 375px-->1rem=50px, //rem前的数字代表k倍的根字体大小. 这里的根字体大小是屏幕宽度除以7.5, 即100px
    document.documentElement.style.fontSize = (showWidth / 7.5) + "px" //方便计算
        //设置字体大小, 根屏幕适应.
    document.querySelector("body").style.fontSize = 0.3 + 'rem'
}
reSize()
window.onresize = function() {
    reSize()
}