<script setup>
import { ref } from 'vue';
</script>

<template>
    <router-view />
    <van-tabbar v-model="active" route placeholder fixed>
        <van-tabbar-item icon="home-o" to="/welcome">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/cinema">影院</van-tabbar-item>
        <van-tabbar-item icon="smile-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    setup() {
        const active = ref(0);
        return { active };
    },
};
</script>

<style>
</style>