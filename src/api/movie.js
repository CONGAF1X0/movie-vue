import { request } from '../utils/http/axios'


// export const doLogin = (params) => request('/login', { username: params.username, password: params.password, action_type: 2 }, 'post')

export const getHotMovieList = (params) => request('/movie/hot', params)

export const getMovieInfo = (params) => request('/movie/get/' + params)

export const getActorInfo = (params) => request('/actor/get/' + params)