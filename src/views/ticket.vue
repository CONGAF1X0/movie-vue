<template>
    <van-nav-bar title="电影票" left-arrow @click-left="this.$router.go(-1)" placeholder fixed />

    <van-cell-group inset v-for="i in 4" :key="i" @click="show = true">
        <van-cell title="movie name" value="x2" center>
            <template #label>
                <van-row>仲恺影院</van-row>
                <van-row>2022-2-10 15:00</van-row>
            </template>
        </van-cell>
    </van-cell-group>

    <van-popup
        v-model:show="show"
        closeable
        position="bottom"
        :style="{ height: '100%', '--van-popup-background-color': '#313337' }"
    >
        <van-cell-group inset class="tcell van-hairline--surround">
            <van-cell value="x2" center>
                <template #title>
                    <div style="font-size:18px;font-weight:500">罗小黑战记</div>
                </template>
                <template #label>
                    <van-row>广州飞扬影城-天河城店</van-row>
                    <van-row>2019-09-13 17:45</van-row>
                    <van-row>4号厅 6排03座 6排04座</van-row>
                </template>
            </van-cell>

            <van-cell center>
                <template #title>
                    <div style="font-size:16px;font-weight:500">取电影票</div>
                </template>
                <template #label>
                    <van-row justify="center">广州飞扬影城-天河城店</van-row>
                    <van-row justify="center">2张电影票</van-row>
                    <van-row justify="center" id="tnum" class="van-hairline--surround">
                        <span style="font-size:12px">取票号：</span>
                        20182131432100000000
                    </van-row>
                </template>
            </van-cell>

            <van-cell center>
                <template #title>
                    <div style="font-size:17px;font-weight:500">广州飞扬影城-天河城店</div>
                </template>
                <template #label>
                    <van-row>天河区天河路208号天河城广场内部西北塔楼四楼</van-row>
                </template>
            </van-cell>

            <van-cell center>
                <template #title>
                    <div style="font-size:17px;font-weight:500">
                        实付金额：
                        <span>￥85.8</span>
                    </div>
                </template>
                <template #label>
                    <van-row>订单号：555233223817578496</van-row>
                    <van-row>购买时间：2019-09-13 17:00</van-row>
                    <van-row>手机号：18665726192</van-row>
                </template>
            </van-cell>
            <van-cell center>
                <template #title>
                    <div style="font-size:17px;font-weight:500">观影须知</div>
                </template>
                <template #label>
                    <van-row>1.提前到达影院现场，找到自动取票机，打印纸质电影票，完成取票。</van-row>
                    <van-row>2.如果现场自动去票机无法打印电影票，请联系影院工作人员处理。</van-row>
                    <van-row>3.凭打印好的纸质电影票，检票入场观影。</van-row>
                </template>
            </van-cell>
        </van-cell-group>
    </van-popup>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {

        return {
            show: ref(false)
        }
    }
}
</script>

<style scoped>
.van-cell-group {
    margin-top: 8px;
}
.tcell {
    margin-top: 54px;
}
.tcell .van-cell {
    padding-top: 20px;
    padding-bottom: 20px;
}
#tnum {
    padding: 10px;
    width: 80%;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>