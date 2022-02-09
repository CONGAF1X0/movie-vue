<template>
    <van-nav-bar placeholder fixed title="movie name" left-arrow @click-left="this.$router.go(-1)" />
    <van-tabs v-model:active="active" shrink style="position: fixed;">
        <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index"></van-tab>
    </van-tabs>
    <Cinema v-model:ntStl="ntStl" v-model:navStl="navStl" v-model:listStl="listStl" />
</template>

<script>
import { ref } from '@vue/reactivity'
import Cinema from './cinema.vue'
export default {
    components: {
        Cinema,
    },
    setup() {
        return {
            ntStl: "bottom:3px", navStl: "top:90px", listStl: "padding-top:90px",
            active: ref(),
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