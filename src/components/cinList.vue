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
import { ref } from "vue";
import { useRouter } from 'vue-router';

export default {
    setup() {
        const loading = ref(false);
        const router = useRouter()
        const finished = ref(false);
        const list = ref(
            [
                { title: "仲恺影院", address: "广新路388号", distance: "2.1km" },
            ]
        )

        const onLoad = () => {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    list.value.push(list.value[0]);
                }

                // 加载状态结束
                loading.value = false;

                // 数据全部加载完成
                if (list.value.length >= 40) {
                    finished.value = true;
                }
            }, 1000);
        };
        const jump = () => {
            router.push('/cinemainfo')
        }
        return {
            list,
            loading, finished, onLoad, jump
        }
    }
}
</script>

<style scoped>
.van-cell-group {
    margin-top: 8px;
}
</style>