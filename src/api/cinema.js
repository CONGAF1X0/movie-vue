import { request } from '../utils/http/axios'

export const getCinemaList = (params) => request('/cinema/list', params)

export const getCinemaInfo = (params) => request('/cinema/get/' + params)

export const getCinemaSession = (params) => request('/cinema/session/list', params)

export const getSession = (params) => request('/cinema/session/get/' + params)

export const getSoldSeat = (params) => request('/cinema/seat/sold', params)