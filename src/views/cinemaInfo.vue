<template>
    <van-nav-bar title="影院" left-arrow @click-left="backFunc" placeholder fixed />

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

    <van-tabs class="tab1" v-model:active="active" animated>
        <van-tab v-for="index in 8" :key="index">
            <template #title>
                <div>
                    <van-image class="actor-img" fit="cover" src="../public/spidey.webp" />
                </div>
            </template>

            <template #default>
                <van-tabs class="tab2" v-model:active="actArr[index]" shrink>
                    <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index">
                        <template #default>
                            <div class="tab2def">
                                <van-list>
                                    <van-cell-group inset v-for="i in 4" :key="i">
                                        <van-cell center title="单元格" label="描述信息">
                                            <template #title>
                                                <van-row class="title">17:00</van-row>
                                            </template>
                                            <template #label>
                                                <van-row class="label">{{ index }}号厅</van-row>
                                            </template>
                                            <template #value>
                                                <van-row id="pricebox">
                                                    <van-col>￥</van-col>
                                                    <van-col id="price">50.0</van-col>
                                                </van-row>
                                            </template>
                                            <template #right-icon>
                                                <van-button
                                                    id="btbuy"
                                                    round
                                                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                                                    @click="this.$router.push('/seat')"
                                                >购票</van-button>
                                            </template>
                                        </van-cell>
                                    </van-cell-group>

                                </van-list>
                            </div>
                        </template>
                    </van-tab>
                </van-tabs>
            </template>
        </van-tab>
        <template #nav-bottom>
            <div class="navbott">
                <van-row id="tit" justify="center">蜘蛛侠{{ }}：英雄无归</van-row>
                <van-row justify="center">132min | 动作</van-row>
                <van-row justify="center">罗伯特、赵金麦</van-row>
            </div>
        </template>
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
.tab1 {
    margin: 0 auto;
    margin-top: 10px;
    padding-top: 40px;
    --van-tabs-line-height: auto;
    line-height: auto;
    background-color: #fff;
}
.navbott {
    margin-top: 5px;
}
.tab1 #tit {
    line-height: 1.25;
    font-size: 17px;
    font-weight: 500;
    margin: 5px;
    color: black;
}
.tab1 .van-row {
    font-size: 12px;
    color: #999;
}
.tab2def {
    background-color: #f7faf8;
    padding-top: 8px;
    height: 45vh;
    overflow-y: scroll;
}
.tab2def .title {
    font-weight: 500;
    color: black;
    width: 27%;
    line-height: 1.5rem;
    font-size: 19px;
}
.tab2 {
    --van-tabs-line-height: 44px;
}
.van-image {
    width: 25vw;
    height: 36vw;
}
#btbuy {
    width: 54px;
    font-size: 8px;
    --van-button-default-height: 33px;
}
#pricebox {
    font-size: 14px;
    color: #ff5456;
    float: right;
    margin-right: 20px;
}
#pricebox #price {
    margin-left: 5px;
    font-weight: 500;
    font-size: 19px;
}
</style>