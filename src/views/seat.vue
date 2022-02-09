<template>
    <van-nav-bar left-arrow placeholder fixed title="seat" @click-left="backFunc" />

    <van-steps :active="active">
        <van-step>选择影片场次</van-step>
        <van-step>选择座位</van-step>
        <van-step>付款</van-step>
        <van-step>完成</van-step>
    </van-steps>
    <!-- select seat -->
    <div v-show="active == 1">
        <van-checkbox-group v-model="checked" max="5">
            <van-row justify="center" v-for="x in row" :key="x" gutter="10">
                <van-col v-for="y in col" :key="y">
                    <van-checkbox
                        :name="x + y"
                        v-if="soldArr.includes(x + y)"
                        disabled
                        icon-size="30px"
                    >
                        <template #icon>
                            <img class="img-icon" :src="sold" />
                        </template>
                    </van-checkbox>
                    <van-checkbox :name="x + y" v-else icon-size="30px">
                        <template #icon="props">
                            <img class="img-icon" :src="props.checked ? selected : selectable" />
                        </template>
                    </van-checkbox>
                </van-col>
            </van-row>
        </van-checkbox-group>

        <van-cell-group>
            <van-cell title="单元格" value="内容" center>
                <template #title>
                    <van-row>movie name</van-row>
                    <van-row>session info</van-row>
                </template>
            </van-cell>
            <van-cell v-show="checked.length > 0" class="tagcontainer">
                <template #value>
                    <div class="taglist">
                        <div
                            class="tag"
                            v-for="item in checked"
                            :key="item"
                            @click="tagClick(item)"
                        >
                            <van-row justify="space-between" align="center">
                                <van-col style="padding-left: 8px; font-size:12px;">
                                    <van-row>{{ item.split('-')[0] + "排" + item.split('-')[1] + "座" }}</van-row>
                                    <van-row id="price">￥{{ price }}</van-row>
                                </van-col>
                                <van-col style="padding-right: 5px;">
                                    <van-icon name="cross" size="12" />
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
        <van-action-bar>
            <van-action-bar-button type="danger" v-if="checked.length == 0" disabled>请先选座</van-action-bar-button>
            <van-action-bar-button
                type="danger"
                @click="confirmSeatFunc"
                v-else
            >{{ (price * checked.length).toFixed(2) }}元 确认选座</van-action-bar-button>
        </van-action-bar>
    </div>

    <!-- step2 -->
    <div v-show="active == 2">
        <van-card>
            <template #thumb>
                <van-image fit="fill" src="../public/spidey.webp" />
            </template>
            <template #title>
                <van-row class="card-title">蜘蛛侠3：英雄无归</van-row>
            </template>
            <template #desc>
                <van-col class="card-desc">
                    <van-row id="card-desc-row">共{{ checked.length }}张</van-row>
                    <van-row id="card-desc-row">02-01 18:00~20:49</van-row>
                    <van-row id="card-desc-row">
                        <span id="sp">2号厅</span>
                        <span
                            id="sp"
                            v-for="i in checked"
                            :key="i"
                        >{{ i.split('-')[0] + "排" + i.split('-')[1] + "座" }}</span>
                    </van-row>
                    <van-row id="card-desc-row">仲恺影院</van-row>
                    <van-row id="card-desc-row">白云区钟落潭镇广新路388号</van-row>
                </van-col>
            </template>
        </van-card>

        <van-submit-bar
            :price="price * checked.length * 100"
            button-text="确认付款"
            @submit="onSubmit"
        />
    </div>

    <!-- step3 -->
    <div v-show="active == 3"></div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
    setup() {
        let checked = ref([]), active = ref(1), router = useRouter()
        let price = 38.88, moviename = 'movie name', sessioninfo = 'sessioninfo'
        const soldArr = ['1-3', '1-4', '2-3']

        const row = [], col = []
        for (let i = 0; i < 9; i++) {
            row.push(i + 1 + '-')
            col.push(i + 1)
        }
        const confirmSeatFunc = () => {
            active.value = 2
        }
        const tagClick = (item) => {
            let i = checked.value.indexOf(item)
            checked.value.splice(i, 1)
        }
        const backFunc = () => {
            if (active.value == 2) {
                active.value--
            } else {
                router.go(-1)
            }
        }
        const onSubmit = () => {
            active.value = 3
        }
        return {
            row,
            col, confirmSeatFunc, tagClick, price, active, backFunc, onSubmit,
            checked, soldArr,
            selectable: '../public/selectable.png',
            selected: '../public/selected.png',
            sold: '../public/sold.png',
        }
    }
}
</script>

<style scoped>
.img-icon {
}
.tagcontainer >>> .van-cell__value {
    overflow-x: scroll;
}
.tagcontainer >>> .van-cell__value::-webkit-scrollbar {
    display: none;
}
.taglist {
    display: flex;
    float: left;
}
.tag {
    height: 48px;
    width: 88px;
    border-radius: 7px;
    margin-right: 10px;
    text-align: left;
    border: solid #ebedf0 1px;
}
#price {
    color: red;
}
.van-cell-group {
    position: fixed;
    bottom: 50px;
    width: 100%;
}
.van-checkbox-group .van-row {
    margin-bottom: 10px;
    height: 30px;
}
.van-checkbox-group {
    margin-top: 30px;
}

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
.van-card >>> .van-card__content {
    height: 170px;
}

.card-title {
    font-weight: bolder;
    font-size: 5vw;
}
#card-desc-row {
    margin-top: 6px;
}
.card-desc {
    color: grey;
}
#sp {
    margin-right: 5px;
}
</style>