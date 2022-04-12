<template>
  <div v-show="popup" :style="{ height: '100%', width: '100%' }">
    <form>
      <van-search
        class="head"
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @blur="onSearch"
        @cancel="onCancel"
      />
    </form>
    <CinList v-model:list="list" style="padding-top: 54px" />
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import CinList from '../components/cinList.vue'
import { useStore } from 'vuex'
import { getCinemaList } from '../api/cinema'

export default {
  components: {
    CinList
  },
  props: {
    popup: Boolean,
    mid: String,
    t: Number,
  },
  setup (props, { emit }) {
    const store = useStore()
    const popup = computed({
      get: () => props.popup,
      set: val => {
        emit('update:popup', val)
      }
    })
    const value = ref('')
    const onCancel = () => {
      emit('update:popup', false)
    }
    const list = ref([])


    const onSearch = async () => {
      if (value.value) {
        let district = store.getters['area/area'][2] ? store.getters['area/area'][2].name : ''
        let position = store.getters['area/position']
        const res = await getCinemaList({
          query: value.value,
          city: store.getters['area/area'][1].name,
          district: district != '全城' ? district : '',
          lng: position[0] != 0 ? position[0] : '',
          lat: position[1] != 0 ? position[1] : '',
          mid: props.mid || '',
          t: props.t || '',
        })
        console.log(res)
        list.value = res.list
      }

      console.log(value.value)
      console.log(props.data)

    }

    return {
      props,
      popup, value, list,
      onSearch,
      onCancel,
    }
  },
}
</script>

<style scoped>
.head {
  position: fixed;
  width: 100%;
  z-index: 3;
}
</style>