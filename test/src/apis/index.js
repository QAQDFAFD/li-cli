import { request } from './request'

/**
 * @description: 用于用户的注册
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.password
 * @return {Prommise}
 */
const register = async params => {
    const { username, password } = params
    const result = await request({
        url: '/user/register',
        method: 'POST',
        data: {
            username,
            password
        }
    })
    return result
}

/**
 * @description: 用于用户的登录
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.password
 * @return {Prommise}
 */
const login = async params => {
    const { username, password } = params
    const result = await request({
        url: '/user/login',
        method: 'POST',
        data: {
            username,
            password
        }
    })
    // 封装统一的请求头
    // axios.defaults.headers.common.Authorization = userInfo.token
    return result
}

const getUserInfo = async params => {
    const { username } = params
    const result = await request({
        url: `/user/getUserInfo?username=${username}`,
        method: 'GET'
    })
    return result
}

export { register, login, getUserInfo }
