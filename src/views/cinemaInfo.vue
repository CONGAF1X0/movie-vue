<template>
    <van-nav-bar title="影片详情" left-arrow @click-left="backFunc" />

    <van-cell-group inset>
        <van-cell center title="单元格" label="描述信息">
            <template #title>
                <van-row class="title">仲恺影院</van-row>
            </template>
            <template #label>
                <van-row class="label">白云区钟落潭镇广新路388号</van-row>
            </template>
            <template #value>
                <van-button
                    color="#000"
                    icon="map-marked"
                    type="primary"
                    round
                    plain
                    style="width: 40px; height:40px"
                />
            </template>
        </van-cell>
    </van-cell-group>

    <van-tabs v-model:active="active" animated>
        <van-tab v-for="index in 8" :key="index">
            <template #title>
                <div>
                    <van-image class="actor-img" fit="cover" src="../public/spidey.webp" />
                </div>
            </template>
            <template #default>
                <van-tabs v-model:active="actArr[index]" shrink>
                    <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index">内容 {{ index }}</van-tab>
                </van-tabs>
            </template>
        </van-tab>
    </van-tabs>
</template>

<script>import { ref } from "vue"

export default {
    setup() {
        const actArr = [0, 0, 0, 0, 0, 0, 0, 0]
        const backFunc = () => {
            history.back()
        }
        return {
            active: ref(0), actArr, backFunc
        }
    },

}
</script>

<style scoped>
.van-cell-group {
    margin-top: 1vh;
}
.title {
    font-weight: bolder;
    font-size: 20px;
}
.van-tabs {
    margin-top: 20px;
    --van-tabs-line-height: auto;
}
.van-image {
    width: 130px;
}
</style>