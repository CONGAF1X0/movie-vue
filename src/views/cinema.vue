<template>
    <van-nav-bar @click-left="showArea = true" placeholder fixed>
        <template #left>
            <van-icon name="location" color="#000" />
            <van-row gutter="10" style="margin-left:5px">
                <van-col>{{ area[1].name }}</van-col>
                <van-col v-if="area.length == 3 && area[2].name != ''">{{ area[2].name }}</van-col>
                <van-col v-else>全城</van-col>
            </van-row>
        </template>
        <template #right>
            <van-icon name="search" size="18" color="#000" />
        </template>
    </van-nav-bar>

    <van-notice-bar :scrollable="false" background="#fff">
        {{ "我在：" + address }}
        <template #right-icon>
            <van-icon name="replay" @click="getLocation" />
        </template>
    </van-notice-bar>

    <CinList style="margin-top: 30px;" />

    <Area v-model:showArea="showArea" @confirm="confirmFun" />
</template>

<script>
import { ref } from 'vue';
import Area from '../components/area.vue'
import CinList from '../components/cinList.vue'
import { mapState } from "vuex";
import { Toast } from 'vant';

export default {
    components: {
        Area,
        CinList
    },
    computed: mapState({
        area: state => state.area.area,
        address: state => state.area.address
    }),
    setup() {
        return {
            showArea: ref(false),
        }
    },
    methods: {
        confirmFun(result) {
            console.log(result)
        },
        getLocation() {
            if (this.address != "定位中...") {
                this.$store.commit('area/setAddress', "定位中...")
                this.$store.dispatch('area/getLocation')
            }
        }
    }
}
</script>

<style scoped>
.van-notice-bar {
    top: 40px;
    opacity: 0.75;
    z-index: 3;
    --van-notice-bar-font-size: 8px;
    --van-notice-bar-height: 30px;
    --van-notice-bar-text-color: #969799;
    position: fixed;
    width: 90vw;
}
</style>