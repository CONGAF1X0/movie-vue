<template>
  <div v-show="!popup">
    <van-nav-bar
      @click-left="showArea = true"
      @click-right="popup = true"
      placeholder
      :style="navStl"
    >
      <template #left>
        <van-icon name="location" color="#000" />
        <van-row gutter="10" style="margin-left: 5px">
          <van-col>{{ area[1].name }}</van-col>
          <van-col v-if="area.length == 3 && area[2].name != ''">
            {{ area[2].name }}
          </van-col>
          <van-col v-else>全城</van-col>
        </van-row>
      </template>
      <template #right>
        <van-icon name="search" size="18" color="#000" />
      </template>
    </van-nav-bar>
    <CinList
      :style="listStl"
      v-model:list="list"
      v-model:loading="loading"
      v-model:onLoad="onLoad"
      v-model:finished="finished"
    />
    <van-notice-bar :scrollable="false" background="#fff" :style="ntStl">
      {{ "我在：" + address }}
      <template #right-icon>
        <van-icon name="replay" @click="getLocation" />
      </template>
    </van-notice-bar>
  </div>

  <Area v-model:showArea="showArea" @confirm="confirmFun" />
  <Search v-model:popup="popup" @back="back" v-model:mid="mid" v-model:t="t" />
</template>

<script>
import { ref } from 'vue'
import Area from '../components/area.vue'
import CinList from '../components/cinList.vue'
import Search from '../components/search.vue'
import { mapState, useStore } from "vuex"
import { Toast } from 'vant'
import { getCinemaList } from '../api/cinema'
import { cinemaData, cinSessData } from './data'

export default {
  components: {
    Area,
    CinList,
    Search
  },
  props: { ntStl: String, navStl: String, listStl: String, mid: String, t: Number, },
  computed: mapState({
    area: state => state.area.area,
    address: state => state.area.address
  }),
  setup (props) {
    const { list, finished, page, city, district, mid } = props.mid ? cinSessData : cinemaData
    const loading = ref(false)
    const store = useStore()
    const popup = ref(false)
    const back = () => {
      popup.value = false
    }

    if (city.value !== store.getters['area/area'][1].name || (store.getters['area/area'][2] && store.getters['area/area'][2].name !== district.value) || props.mid) {
      list.value = []
      page.value = 1
      finished.value = false
    }
    const onLoad = () => {
      setTimeout(async () => {
        city.value = store.getters['area/area'][1].name
        district.value = store.getters['area/area'][2] ? store.getters['area/area'][2].name : ''
        let position = store.getters['area/position']
        const res = await getCinemaList({
          city: city.value,
          district: district.value != '全城' ? district.value : '',
          lng: position[0] != 0 ? position[0] : '',
          lat: position[1] != 0 ? position[1] : '',
          mid: props.mid || '',
          t: props.t || '',
          page: page.value,
          page_size: 10,
        })
        console.log(res)
        list.value.push(...res.list)
        page.value++
        loading.value = false
        if (props.mid) {
          mid.value = props.mid
        }
        if (list.value.length >= res.pager.total) {
          finished.value = true
        }
      }, 500)

    }
    const confirmFun = (result) => {
      console.log(result)
      list.value = []
      page.value = 1
      finished.value = false

      loading.value = true
      onLoad()
    }

    return {
      showArea: ref(false), popup, back, list, onLoad, loading, finished, confirmFun, mid: props.mid, t: props.t,
    }
  },
  methods: {

    getLocation () {
      if (this.address != "定位中...") {
        this.$store.commit('area/setAddress', "定位中...")
        this.$store.dispatch('area/getLocation')
      }
    }
  }
}
</script>

<style scoped>
.van-nav-bar {
  position: fixed;
  width: 100vw;
  top: 0px;
}

.van-notice-bar {
  position: fixed;
  width: 95vw;
  opacity: 0.75;
  z-index: 3;
  --van-notice-bar-font-size: 8px;
  --van-notice-bar-height: 30px;
  --van-notice-bar-text-color: #969799;
  bottom: 46px;
}
.van-list {
  padding-top: 46px;
}

.van-cell-group {
  margin-top: 8px;
}
</style>