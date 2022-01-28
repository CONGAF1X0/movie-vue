import { areaList } from '@vant/area-data';
import { Toast } from 'vant';

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
}

const getAddress = ({ commit }, lng, lat) => {
    AMap.plugin('AMap.Geocoder', function () {
        var geocoder = new AMap.Geocoder({
        })
        var lnglat = [lng, lat]
        geocoder.getAddress(lnglat, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                console.log(result)
                commit('setAddress', result.regeocode.formattedAddress)
            } else {
                commit('setAddress', "定位失败")
            }
        })
    })
}
const getLocation = ({ commit }) => {
    AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认：true
            timeout: 10000,// 设置定位超时时间，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'//  定位按钮的排放位置,  RB表示右下
        })
        geolocation.getCurrentPosition(function (status, result) {
            if (status == 'complete') {
                commit('setPosition', [result.position.lng, result.position.lat])
                getAddress({ commit }, result.position.lng, result.position.lat)
            } else {
            }
        });
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
    getLocation({ commit }) {
        getLocation({ commit })
    }
}


// mutations
const mutations = {
    setAdcode(state, adcode) {
        state.adcode = adcode
    },
    setArea(state, area) {
        state.area = area
    },
    setCity(state, city) {
        state.area[1].name = city
    },
    setAddress(state, address) {
        state.address = address
    },
    setPosition(state, position) {
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