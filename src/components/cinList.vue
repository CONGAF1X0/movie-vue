<template>
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="100"
    >
        <van-cell-group inset v-for="item in list" :key="item" @click="jump">
            <van-cell center :title="item.title" :label="item.address" :value="item.distance" />
        </van-cell-group>
    </van-list>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';

export default {
    props: {
        loading: Boolean,
        finished: Boolean,
        onLoad: Function,
        list: Array,
    },
    setup(props, { emit }) {
        const loading = computed({
            get: () => props.loading,
            set: val => {
                emit('update:loading', val)
            }
        })
        const finished = computed({
            get: () => props.finished,
            set: val => {
                emit('update:finished', val)
            }
        })
        const onLoad = computed({
            get: () => props.onLoad,
            set: val => {
                emit('update:onLoad', val)
            }
        })
        const list = computed({
            get: () => props.list,
            set: val => {
                emit('update:list', val)
            }
        })
        const router = useRouter()
        const jump = () => {
            router.push('/cinemainfo')
        }
        return {
            list,
            loading, finished, onLoad, jump, props
        }
    }
}
</script>

<style scoped>
.van-cell-group {
    margin-top: 8px;
}
</style>