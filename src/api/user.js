import { request, AMapReq } from '../utils/http/axios'

// enum Api {
//     Login = '/login',
//     Logout = '/logout',
//     GetUserInfo = '/user/info/get',
//     GetPermCode = '/getPermCode',
//     Refresh = '/refresh',
//     GetMobileCaptcha = '/create_mobile_captcha',
//     LoginByMobileCaptcha = '/login_by_mobile_captcha',
//     Signup = '/signup',
//     IsAccountExist = '/is_account_exist',
// }
const KEY = '3beb329cdf02ebeeb07f3c13836e1054'
export const doLogin = (params) => request('/login', { username: params.username, password: params.password, type: 2 }, 'post')
export const doLogout = () => request('/logout', {}, 'post')

export const loginByMobileCaptcha = (params) => request('/login_by_mobile_captcha', { identity: params.mobile, captcha: params.captcha }, 'post')

export const sendCode = (params) => request('/create_mobile_captcha', { mobile: params.mobile, action_type: params.action_type }, 'post')

export const signup = (params) => request('/signup', params, 'post')

export const regeoApi = (params) => AMapReq('/v3/geocode/regeo?key=' + KEY + '&location=' + params)

export const ipLocation = () => AMapReq('/v3/ip?key=' + KEY)

export const getUserInfo = () => request('/user/info/get')

export const isAccountExist = (params) => request('is_account_exist', params, 'post')

export const getCodeApi = (params) => request('create_mobile_captcha', params, 'post')

export const createTicket = (params) => request('/ticket/create', params, 'post')

export const getTicket = (x) => request('/ticket/list?status=' + x)

export const payTicket = (params) => request('/ticket/pay', params, 'post')

export const cancelTicket = (params) => request('/ticket/cancel', params, 'post')

export const money = () => request('/user/money', {}, 'post')