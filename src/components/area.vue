<template>
    <van-popup v-model:show="showArea" round :style="{ width: '90%' }" overlay>
        <van-area
            title="选择城市"
            :value="adcode"
            :area-list="areaList"
            :columns-num="num"
            :columns-placeholder="[, , '全城']"
            @confirm="confirm"
            @cancel="showArea = false"
        />
    </van-popup>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore, mapState } from 'vuex'

export default {
    computed: mapState({
        adcode: state => state.area.adcode,
        area: state => state.area.area,
        address: state => state.area.address,
        position: state => state.area.position,
        areaList: state => state.area.areaList
    }),
    props: {
        showArea: Boolean,
        num: Number
    },
    setup(props, { emit }) {
        const store = useStore()
        const showArea = computed({
            get: () => props.showArea,
            set: val => {
                emit('update:showArea', val)
            }
        })
        const num = computed({
            get: () => props.num,
            set: val => {
                emit('update:num', val)
            }
        })

        const confirm = (result) => {
            store.commit('area/setAdcode', result[result.length - 1].code)
            store.commit('area/setArea', result)
            emit('update:showArea', false)
            emit('confirm', result)
        }
        return {
            props,
            confirm,
            showArea,
            num
        }
    },
    methods: {
    }
}
</script>

<style>
</style>