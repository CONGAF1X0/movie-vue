<template>
    <van-popup v-model:show="popup" :style="{ height: '100%', width: '100vw' }">
        <form>
            <van-search
                class="head"
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @blur="onSearch"
                @cancel="popup = false"
            />
        </form>
        <div class="container">
            <CinList />
        </div>
    </van-popup>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import CinList from '../components/cinList.vue'

export default {
    components: {
        CinList
    },
    props: {
        popup: Boolean,
    },
    setup(props, { emit }) {
        const popup = computed({
            get: () => props.popup,
            set: val => {
                emit('update:popup', val)
            }
        })
        const value = ref('');
        const onSearch = (val) => { console.log(value.value) };
        const onCancel = () => Toast('取消');
        return {
            props,
            popup, value,
            onSearch,
            onCancel,
        }
    },
}
</script>

<style scoped>
.head {
    width: 100%;
    z-index: 3;
    max-height: 7vh;
}
.container {
    overflow-y: scroll;
    max-height: 93vh;
}
</style>