<template>
    <van-nav-bar title="影片详情" left-arrow @click-left="backFunc" />
    <van-card>
        <template #thumb>
            <van-image fit="fill" src="../public/spidey.webp" />
        </template>
        <template #title>
            <van-row class="card-title">蜘蛛侠3：英雄无归</van-row>
        </template>
        <template #desc>
            <van-col class="card-desc">
                <van-row>spiderman</van-row>
                <van-row id="card-desc-row">动作 / 冒险 / 科幻</van-row>
                <van-row id="card-desc-row">144 分钟</van-row>
            </van-col>
        </template>
    </van-card>

    <van-card class="card-height-auto">
        <template #title>
            <van-divider content-position="left">简介</van-divider>
        </template>
        <template #desc>
            <van-row
                class="jjdesc"
            >《蜘蛛侠：英雄无归》是英雄系列三部曲的完结篇，也标志着漫威多元宇宙的正式开启。此次，蜘蛛侠（汤姆·赫兰德 饰）与奇异博士（本尼迪克特·康伯巴奇 饰）继《复联4》后再度联手打响时空混战。蜘蛛侠借助奇异博士操控时空的能力打开了时空通道，引发了前所未见的危机。</van-row>
        </template>
    </van-card>

    <van-card class="card-height-auto">
        <template #title>
            <van-divider content-position="left">演员</van-divider>
        </template>
        <template #desc>
            <van-row class="container">
                <van-list class="img-list">
                    <div class="box" v-for="item in list" :key="item">
                        <van-image class="actor-img" round fit="cover" src="../public/spidey.webp" />
                        <div>莱奥纳多·迪卡普里奥</div>
                    </div>
                </van-list>
            </van-row>
        </template>
    </van-card>

    <van-action-bar>
        <van-action-bar-button
            class="buyBtn"
            color="#7232dd"
            type="danger"
            text="立即购买"
            @click="onClickButton"
        />
    </van-action-bar>
</template>

<script>import { ref } from "vue"

export default {
    setup() {
        const list = ref([])
        for (let i = 0; i < 10; i++) {
            list.value.push({ a: "a" })
        }
        const backFunc = () => {
            history.back()
        }
        return {
            list, backFunc
        }
    }
}
</script>

<style scoped>
.van-card {
    margin: 0 auto;
    width: 95%;
    border-radius: 15px;
    --van-card-background-color: #fff;
    margin-top: 8px;
    --van-card-thumb-size: 115px;
    height: 200px;
    font-size: 3vw;
}
.card-title {
    font-weight: bolder;
    font-size: 5vw;
}
#card-desc-row {
    margin-top: 10px;
}
.card-height-auto {
    height: auto;
}
.van-divider {
    margin-top: 7px;
    margin-bottom: 7px;
    --van-divider-text-color: #000;
    font-size: 4vw;
}
.jjdesc {
    margin-bottom: 7px;
}
.container {
    position: relative;
    overflow-x: scroll;
}
.container::-webkit-scrollbar {
    display: none;
}
.img-list {
    display: flex;
    float: left;
}
.box {
    margin-top: 10px;

    margin-right: 10px;
    text-align: center;
}
.actor-img {
    width: 19vw;
    height: 19vw;
}
.buyBtn {
    margin-left: 50%;
}
</style>