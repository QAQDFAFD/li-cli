// 封装所有的网络请求的基本样式
import instance from './axios'
const request = async p => {
    // 从参数中获取 axios 参数，并且写上默认值
    const { url, method = 'GET', header = '', data = '', params = '' } = p
    // 发起网络请求
    try {
        const res = await instance({
            url,
            // 请求方式的处理 -> 将所有的请求方式转为大写
            method: method.toUpperCase(),
            // GET 请求的参数
            params,
            // POST 请求的参数
            data,
            header
        })
        return res
    } catch (err) {
        console.log('发生了错误,报错信息是：', err)
    }
}

export default request
