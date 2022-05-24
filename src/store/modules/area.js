import { areaList } from '@vant/area-data'
import { Toast } from 'vant'
import { regeoApi, ipLocation } from '@/api/user'
// initial state
const state = () => ({
    adcode: '',
    area: [
        {
            code: '0',
            name: '定位',
        },
        {
            code: '0',
            name: '定位',
        },
        {
            code: '0',
            name: '全城',
        },
    ],
    address: '定位中...',
    position: [0, 0],
    areaList
})

// getters
const getters = {
    adcode: state => state.adcode,
    area: state => state.area,
    position: state => state.position,
}

const getAddress = async ({ commit }, lng, lat) => {
    const res = await regeoApi(lng + ',' + lat)
    console.log(res)
    if (res.info === 'OK') {
        commit('setAddress', res.regeocode.formatted_address)
    } else {
        commit('setAddress', "定位失败")
    }
    // AMap.plugin('AMap.Geocoder', function () {
    //     var geocoder = new AMap.Geocoder({
    //     })
    //     var lnglat = [lng, lat]
    //     geocoder.getAddress(lnglat, function (status, result) {
    //         if (status === 'complete' && result.info === 'OK') {
    //             console.log(result)
    //             commit('setAddress', result.regeocode.formattedAddress)
    //         } else {
    //             commit('setAddress', "定位失败")
    //         }
    //     })
    // })
}


const getLocation = ({ commit }) => {
    AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
            timeout: 10000,// 设置定位超时时间，默认：无穷大
        })
        geolocation.getCurrentPosition(function (status, result) {
            console.log(result)
            if (status == 'complete') {
                commit('setPosition', [result.position.lng, result.position.lat])
                getAddress({ commit }, result.position.lng, result.position.lat)
            } else {
            }
        })
        geolocation.getCityInfo(function (status, result) {
            if (status == 'complete') {
                commit('setCity', result.city)
                commit('setAdcode', result.adcode)
            }
        })
    })
}
// actions
const actions = {
    getLocation ({ commit }) {
        getLocation({ commit })
    },
    async ipLoc ({ commit }) {
        const res = await ipLocation()
        if (res.info === 'OK') {
            commit('setCity', res.city)
        } else {
        }
    }
}


// mutations
const mutations = {
    setAdcode (state, adcode) {
        state.adcode = adcode
    },
    setArea (state, area) {
        state.area = area
    },
    setCity (state, city) {
        state.area[1].name = city
    },
    setAddress (state, address) {
        state.address = address
    },
    setPosition (state, position) {
        state.position = position
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}