<template>
  <van-nav-bar
    placeholder
    fixed
    :title="this.$route.params.name || ''"
    left-arrow
    @click-left="this.$router.go(-1)"
  />
  <van-tabs
    v-model:active="active"
    shrink
    style="position: fixed"
    @change="change"
  >
    <van-tab v-for="index in date" :key="index">
      <template #title>{{
        index == date[0]
          ? "今天" + $moment(index).format("MM-DD")
          : $moment(index).format("dddMM-DD")
      }}</template>
    </van-tab>
  </van-tabs>
  <Cinema
    v-model:ntStl="ntStl"
    v-model:navStl="navStl"
    v-model:listStl="listStl"
    v-model:mid="mid"
    v-model:t="t"
    ref="cinRef"
  />
</template>

<script>
import { ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import Cinema from './cinema.vue'
export default {
  components: {
    Cinema,
  },
  setup () {
    const active = ref(0), route = useRoute(), mid = ref(0), t = ref(0)
    const date = ref([new Date().getTime()])
    const cinRef = ref(null)


    for (let i = 1; i < 7; i++) {
      date.value[i] = date.value[0] + 60 * 60 * 24 * 1000 * i
    }
    mid.value = route.params.id
    t.value = date.value[0]
    function change () {
      t.value = date.value[active.value]
      console.log(date.value[active.value])
      cinRef.value.confirmFun()
    }
    return {
      ntStl: "bottom:3px", navStl: "top:90px", listStl: "padding-top:90px",
      active, date, change, mid, t, cinRef
    }
  }
}
</script>

<style scoped>
.van-tabs {
  z-index: 3;
  width: 100%;
}
</style>