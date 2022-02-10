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
        <CinList :style="listStl" />
        <van-notice-bar :scrollable="false" background="#fff" :style="ntStl">
            {{ "我在：" + address }}
            <template #right-icon>
                <van-icon name="replay" @click="getLocation" />
            </template>
        </van-notice-bar>
    </div>

    <Area v-model:showArea="showArea" @confirm="confirmFun" />
    <Search v-model:popup="popup" @back="back" />
</template>

<script>
import { ref } from 'vue';
import Area from '../components/area.vue'
import CinList from '../components/cinList.vue'
import Search from '../components/search.vue'
import { mapState } from "vuex";
import { Toast } from 'vant';

export default {
    components: {
        Area,
        CinList,
        Search
    },
    props: { ntStl: String, navStl: String, listStl: String },
    computed: mapState({
        area: state => state.area.area,
        address: state => state.area.address
    }),
    setup() {
        const popup = ref(false)
        const back = () => {
            popup.value = false
        }
        return {
            showArea: ref(false), popup, back
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
.van-nav-bar {
    position: fixed;
    width: 100vw;
    top: 0px;
}

.van-notice-bar {
    position: fixed;
    width: 90vw;
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
</style>