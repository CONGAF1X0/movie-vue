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
        <CinList v-model:list="list" style="padding-top: 54px;" />
    </div>
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
        const onCancel = () => {
            emit('update:popup', false)
        };
        const list = ref(
            [
                { title: "仲恺影院", address: "广新路388号", distance: "2.1km" },
            ]
        )


        const onSearch = (val) => {
            for (let i = 0; i < 10; i++) {
                list.value.push(list.value[0]);
            }
            console.log(value.value)
        };

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