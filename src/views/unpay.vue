<template>
  <van-nav-bar
    title="未支付"
    left-arrow
    @click-left="this.$router.go(-1)"
    placeholder
    fixed
  />

  <van-cell-group
    inset
    v-for="i in list"
    :key="i.ticker_id"
    @click="selectTicket(i)"
  >
    <van-cell :title="i.movie_name" :value="'x' + i.num" center>
      <template #label>
        <van-row>{{ i.cinema_name }}</van-row>
        <van-row>{{
          $moment(i.start_time).format("YYYY-MM-DD HH:mm")
        }}</van-row>
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
      <van-cell class="tc">
        <template #value>
          <van-image
            fit="fill"
            width="100px"
            :src="
              selected.cover
                ? 'https://images.weserv.nl/?url=' + selected.cover
                : ''
            "
          />
        </template>
        <template #title>
          <div class="tit">
            {{ selected.movie_name }}
          </div>
        </template>
        <template #label>
          <van-row>{{ selected.cinema_name }}</van-row>
          <van-row>{{
            $moment(selected.start_time).format("YYYY-MM-DD HH:mm")
          }}</van-row>
          <van-row>{{ selected.hall_name + selected.seat }}</van-row>
        </template>
      </van-cell>

      <van-cell center>
        <template #title>
          <div style="font-size: 17px; font-weight: 500">
            {{ selected.cinema_name }}
          </div>
        </template>
        <template #label>
          <van-row>{{ selected.district + selected.location }}</van-row>
        </template>
      </van-cell>

      <van-cell center>
        <template #title>
          <div style="font-size: 17px; font-weight: 500">
            应付金额：
            <span>￥{{ selected.num * selected.price }}</span>
          </div>
        </template>
        <template #label>
          <van-row>订单号： {{ selected.ticket_id }}</van-row>
          <van-row
            >创建时间：{{
              $moment(selected.created_time * 1000).format("YYYY-MM-DD HH:mm")
            }}</van-row
          >
          <van-row>手机号：18665726192</van-row>
        </template>
      </van-cell>
      <van-cell center>
        <template #title>
          <div style="font-size: 17px; font-weight: 500">请尽快支付</div>
        </template>
        <template #label>
          <van-row>15分钟内未支付，订单将自动取消</van-row>
          <van-row id="cd" justify="center"
            >待支付，剩余
            <van-count-down :time="time" format="mm:ss" />
          </van-row>
          <div>
            <van-grid :column-num="2" :border="false">
              <van-grid-item icon="paid" text="支付" @click="pay" />
              <van-grid-item icon="close" text="取消" @click="cancel" />
            </van-grid>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </van-popup>
</template>

<script>
import { ref } from 'vue'
import { getTicket, payTicket, cancelTicket } from '@/api/user'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import { Dialog } from 'vant'

export default {
  setup () {
    const router = useRouter(), route = useRoute()
    const userInfo = ref({}), store = useStore()
    userInfo.value = store.getters['user/getUserInfo']
    const list = ref([]), show = ref(false), selected = ref({})
    const getList = async () => {
      const res = await getTicket(0)
      if (res.code == 200) {
        list.value = res.list
        console.log(list.value)
      }
    }
    getList().then(() => {
      for (let i = 0; i < list.value.length; i++) {
        let seatStr = '', seatArr = list.value[i].seat.split(',')
        seatArr.forEach((value) => {
          const [a, b] = value.split('-')
          seatStr += ' ' + a + '排' + b + '座'
        })
        list.value[i]['num'] = seatArr.length
        list.value[i].seat = seatStr
      }
    })
    const time = ref(15 * 1000)

    const selectTicket = (val) => {
      selected.value = val
      const t = new Date().getTime() - selected.value.created_time * 1000
      time.value = 15 * 60 * 1000 - t
      show.value = true
    }
    const pay = () => {
      Toast.loading()
      setTimeout(async () => {
        const res = await payTicket({
          uid: userInfo.value.uid,
          ticket_id: selected.value.ticket_id
        })
        // console.log(res)
        if (res.code !== 200) {
          Toast.clear()
          Toast.fail('支付失败，请确认余额')
          return
        }
        Toast.clear()
        Toast.success()
        setTimeout(() => router.push({ name: 'Mine' }), 500)
      }, 2000)
    }
    const cancel = () => {
      console.log("cancel")
      Dialog.confirm({
        title: '取消订单',
        message:
          '确认将取消并删除该订单',
      })
        .then(() => {
          // on confirm
          Toast.loading()
          setTimeout(async () => {
            const res = await cancelTicket({
              uid: userInfo.value.uid,
              ticket_id: selected.value.ticket_id
            })
            // console.log(res)
            if (res.code !== 200) {
              Toast.clear()
              Toast.fail('取消失败')
              return
            }
            Toast.clear()
            Toast.success()
            setTimeout(() => router.go(0), 500)
          }, 2000)
        })
        .catch(() => {
          // on cancel
        })
    }
    return {
      show, selectTicket, selected,
      list, time, pay, cancel
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

.tit {
  font-size: 22px;
  font-weight: 500;
  width: 60vw;
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
.van-count-down {
  --van-count-down-font-size: 23px;
}
#cd {
  font-size: 23px;
  font-weight: 500;
  color: #000;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>