// axios 的配置文件
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const instance = axios.create({
    // 设置超时时间
    timeout: 60000,
    // 设置请求的基础 api
    baseURL: import.meta.env.VITE_BASE_URL,
    // 设置响应格式
    responseType: 'json',
    // 设置请求头的格式
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 配置请求的请求拦截器
instance.interceptors.request.use(config => {
    // 在请求发送之前做一些事情
    // 这里的 config 就是请求的配置信息
    // 例如：给请求添加 token
    return config
})

// 配置请求的响应拦截器
instance.interceptors.response.use(
    res => {
        // 将响应的数据返回，返回对应的 data 即可
        return res.data
    },
    err => {
        // 错误处理
        console.log('发生了错误,报错信息是：', err)
        // 也可以将错误信息alert
        let message = ''
        const code = err.response.status
        switch (code) {
            case 401:
                message = '未授权，请登录'
                break
            case 403:
                message = '拒绝访问'
                break
            case 404:
                message = '请求错误,未找到该资源'
                break
            case 500:
                message = '服务器端出错'
                break
            default:
                message = '连接错误'
                break
        }
        ElMessage({
            type: 'error',
            message
        })
        // 这里需要返回一个 Promise.reject(err) 用于后续的错误处理
        return Promise.reject(err)
    }
)

export default instance
