<template>
  <van-nav-bar
    left-arrow
    placeholder
    fixed
    title="购票"
    @click-left="backFunc"
    z-index="1000"
  />

  <van-steps :active="active">
    <van-step>选择影片场次</van-step>
    <van-step>选择座位</van-step>
    <van-step>付款</van-step>
    <van-step>完成</van-step>
  </van-steps>
  <!-- select seat -->
  <div v-show="active == 1" class="seat">
    <van-checkbox-group
      v-model="checked"
      max="5"
      :style="{ 'min-width': minWidth, 'margin-bottom': '200px' }"
    >
      <van-row justify="center" class="pinmu">屏幕中央</van-row>
      <van-row justify="center" v-for="x in row" :key="x" gutter="10">
        <van-col v-for="y in col" :key="y">
          <van-checkbox
            :name="x + y"
            v-if="soldArr != null && soldArr.includes(x + y)"
            disabled
            icon-size="30px"
          >
            <template #icon>
              <img class="img-icon" :src="sold" />
            </template>
          </van-checkbox>
          <van-checkbox :name="x + y" v-else icon-size="30px">
            <template #icon="props">
              <img
                class="img-icon"
                :src="props.checked ? selected : selectable"
              />
            </template>
          </van-checkbox>
        </van-col>
      </van-row>
    </van-checkbox-group>

    <van-cell-group>
      <van-cell center>
        <template #title>
          <van-row>{{ data.movie_name || "" }}</van-row>
          <van-row>{{
            $moment(data.start_time).format("MM月DD日 HH:mm-") +
            $moment(data.end_time).format("HH:mm")
          }}</van-row>
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
                <van-col style="padding-left: 8px; font-size: 12px">
                  <van-row>{{
                    item.split("-")[0] + "排" + item.split("-")[1] + "座"
                  }}</van-row>
                  <van-row id="price">￥{{ price }}</van-row>
                </van-col>
                <van-col style="padding-right: 5px">
                  <van-icon name="cross" size="12" />
                </van-col>
              </van-row>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-action-bar>
      <van-action-bar-button type="danger" v-if="checked.length == 0" disabled
        >请先选座</van-action-bar-button
      >
      <van-action-bar-button type="danger" @click="confirmSeatFunc" v-else
        >{{ (price * checked.length).toFixed(2) }}元
        确认选座</van-action-bar-button
      >
    </van-action-bar>
  </div>

  <!-- step2 -->
  <div v-show="active == 2">
    <van-card>
      <template #thumb>
        <van-image
          fit="cover"
          :src="'https://images.weserv.nl/?url=' + data.cover"
        />
      </template>
      <template #title>
        <van-row class="card-title">{{ data.movie_name }}</van-row>
      </template>
      <template #desc>
        <van-col class="card-desc">
          <van-row id="card-desc-row">共{{ checked.length }}张</van-row>
          <van-row id="card-desc-row">
            {{
              $moment(data.start_time).format("MM-DD HH:mm~") +
              $moment(data.end_time).format("HH:mm")
            }}</van-row
          >
          <van-row id="card-desc-row">
            <span id="sp">{{ data.hall_name }}</span>
            <span id="sp" v-for="i in checked" :key="i">{{
              i.split("-")[0] + "排" + i.split("-")[1] + "座"
            }}</span>
          </van-row>
          <van-row id="card-desc-row">{{ data.cinema_name }}</van-row>
          <van-row id="card-desc-row">{{
            data.district + data.location
          }}</van-row>
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
import { useRouter, useRoute } from 'vue-router'
import { getSession, getSoldSeat } from '@/api/cinema'
import { createTicket } from '@/api/user'
import { useStore } from 'vuex'
import { Toast } from 'vant'

export default {
  setup () {
    let checked = ref([]), active = ref(1), router = useRouter(), route = useRoute(), store = useStore()
    const soldArr = ref([]), data = ref({}), price = ref(0)
    const row = [], col = []
    let minWidth = ref(0)
    const getSess = async () => {
      const res = await getSession(route.params?.id)
      if (res.code == 200) {
        data.value = res.data
        console.log(data.value)
      }
    }
    const soldSeat = async () => {
      const res = await getSoldSeat({ sid: route.params?.id })
      if (res.code == 200) {
        soldArr.value = res.data
        console.log(res)
      }
    }
    getSess().then(() => {
      price.value = data.value.price
      let [rl, cl] = data.value.capacity.split("x")
      for (let i = 0; i < rl; i++) {
        row.push(i + 1 + '-')
      }
      for (let i = 0; i < cl; i++) {
        col.push(i + 1)
      }
      minWidth.value = 40 * col.length + 'px'
    })
    soldSeat()


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
        router.back()
      }
    }
    const onSubmit = () => {
      Toast.loading()
      setTimeout(async () => {
        const res = await createTicket({ session_id: parseInt(route.params.id), uid: store.getters['user/getUserInfo'].uid, seat: checked.value.join(',') })
        // console.log(res)
        if (res.code !== 201) {
          Toast.clear()
          Toast.fail('购买失败，请重新选座')
          router.go('0')
          return
        }
        Toast.clear()
        Toast.success()
        active.value = 3

        setTimeout(() => router.push({ name: 'Mine' }), 2000)
      }, 2000)
      // console.log(checked.value.join(','))
      // console.log(store.getters['user/getUserInfo'].uid, route.params.id)
      // active.value = 3
    }

    return {
      row,
      col, confirmSeatFunc, tagClick, active, backFunc, onSubmit,
      checked, soldArr,
      selectable: '../public/selectable.png',
      selected: '../public/selected.png',
      sold: '../public/sold.png',
      minWidth,
      data, price
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
.pinmu {
  color: #969799;
}
.seat {
  text-align: center;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
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
  border: solid #f7faf8 1px;
  background-color: #f7faf8;
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
  font-weight: 500;
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