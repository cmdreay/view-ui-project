import request from '../utils/axios'
/**
 * @description - 用户登录
 * @param {*} data 
 */
export function login(data) {
    return request({
        url: '/user/login',
        data,
        method: 'POST'
    })
}
/**
 * @description - 获取用户基本信息
 */
export function getUserInfo() {
    return request({
        url: '/user/getUserInfo',
        method: 'POST'
    })
}
/**
 * @description - 用户每日签到
 */
export function userSignIn() {
    return request({
        url: '/user/signin',
        method: 'POST'
    })
}