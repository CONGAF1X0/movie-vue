import axios from 'axios'
import { showMessage } from "./status"   // 引入状态码文件
import { Toast } from 'vant'  // 引入el 提示框，这个项目里用什么组件库这里引什么
import { getAuthToken, getAuthRToken, setAuthToken, setAuthRToken } from '@/utils/auth'
import router from '@/router'
// 设置接口超时时间
axios.defaults.timeout = import.meta.env.VITE_TIMEOUT

// 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
// @ts-ignore
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

//http request 拦截器
const token = getAuthToken()
axios.interceptors.request.use(
    config => {
        // 配置请求头
        config.headers = {
            //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
            'Content-Type': 'application/json;charset=UTF-8',        // 传参方式json
            'Authorization': getAuthToken()         // 这里自定义配置，这里传的是token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
let isRefreshing = false // 标记是否正在刷新 token
let requests = [] // 存储待重发请求的数组
//http response 拦截器

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const { response } = error
        if (response) {
            // 请求已发出，但是不在2xx的范围
            if (
                response.status === 401 &&
                !error.config.url.includes('/refresh') &&
                !error.config.url.includes('/login')
            ) {
                const { config } = error
                if (!isRefreshing) {
                    isRefreshing = true
                    console.log('refresh')

                    return axios({
                        method: 'POST',
                        url: '/refresh',
                        data: { refresh_token: getAuthRToken() }
                    }).then((res) => {
                        const { access_token, refresh_token } = res.data
                        setAuthToken(access_token)
                        setAuthRToken(refresh_token)
                        config.headers.Authorization = access_token

                        requests.forEach((cb) => cb(access_token))
                        console.log(requests)
                        requests = [] // 重新请求完清空
                        return axios(config)
                    }).catch((err) => {
                        if (err == 'Error: Request failed with status code 401') {
                            console.log('抱歉，您的登录状态已失效，请重新登录！', err)
                            router.push({ name: 'Mine' })
                        }
                        return Promise.reject(err)
                    }).finally(() => {
                        isRefreshing = false
                    })
                } else {
                    // 返回未执行 resolve 的 Promise
                    return new Promise((resolve) => {
                        // 用函数形式将 resolve 存入，等待刷新后再执行
                        requests.push((token) => {
                            config.headers.Authorization = `${token}`
                            resolve(axios(config))
                        })
                    })
                }
            }

            Toast({
                message: showMessage(response.status),// 传入响应码，匹配响应码对应信息
                position: 'top',
            })
        } else {
            Toast({
                message: '网络连接异常，请稍后再试！',
                position: 'top',
            })
        }
        return Promise.reject(error)
    }
)

// 封装 GET POST 请求并导出
export function request (url = '', params = {}, type = 'GET') {
    //设置 url params type 的默认值
    return new Promise((resolve, reject) => {
        let promise
        switch (type.toUpperCase()) {
            case 'POST':
                promise = axios({
                    method: 'POST',
                    url,
                    data: params
                })
                break
            case 'PUT':
                promise = axios({
                    method: 'PUT',
                    url,
                    data: params
                })
                break
            case 'DELETE':
                promise = axios({
                    method: 'DELETE',
                    url,
                    data: params
                })
                break
            default:
                promise = axios({
                    url,
                    params
                })
        }
        // if (type.toUpperCase() === 'GET') {

        // } else if (type.toUpperCase() === 'POST') {

        // }
        //处理返回
        promise.then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
export function AMapReq (url = '', params = {}, type = 'GET') {
    let baseURL = '/amap'
    return new Promise((resolve, reject) => {
        let promise
        if (type.toUpperCase() === 'GET') {
            promise = axios({
                baseURL,
                url,
                params
            })
        } else if (type.toUpperCase() === 'POST') {
            promise = axios({
                baseURL,
                method: 'POST',
                url,
                data: params
            })
        }
        //处理返回
        promise.then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}