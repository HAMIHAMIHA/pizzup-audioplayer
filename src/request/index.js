import axios from "axios"
let service = axios.create({ //这是一个axios实例, 从原本的axios中抽取出来方便集体修改.
    baseURL: "http://localhost:3000",
    timeout: 1000,
    // headers:{//这里能够添加请求头}
})
export default service