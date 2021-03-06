<template>
  <van-nav-bar
    title="电影票"
    left-arrow
    @click-left="this.$router.go(-1)"
    placeholder
    fixed
  />
  <van-cell-group
    inset
    v-for="i in list"
    :key="i.ticker_id"
    @click="celectTicket(i)"
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
      <van-tag v-if="isDel" plain type="primary" class="tag">已放映</van-tag>

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
          <div style="font-size: 16px; font-weight: 500">取电影票</div>
        </template>
        <template #label>
          <van-row justify="center"></van-row>
          <van-row justify="center">{{ selected.num }}张电影票</van-row>
          <van-row justify="center" id="tnum" class="van-hairline--surround">
            <del v-if="isDel">
              <span style="font-size: 12px">取票码：</span>
              {{ selected.ticket_id }}
            </del>
            <div v-else>
              <span style="font-size: 12px">取票码：</span>
              {{ selected.ticket_id }}
            </div>
          </van-row>
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
            实付金额：
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
          <div style="font-size: 17px; font-weight: 500">观影须知</div>
        </template>
        <template #label>
          <van-row
            >1.提前到达影院现场，找到自动取票机，打印纸质电影票，完成取票。</van-row
          >
          <van-row
            >2.如果现场自动去票机无法打印电影票，请联系影院工作人员处理。</van-row
          >
          <van-row>3.凭打印好的纸质电影票，检票入场观影。</van-row>
          <van-row>4.已放映或放映前2小时无法退票。</van-row>
          <div>
            <van-grid :column-num="1" :border="false" direction="horizontal">
              <van-grid-item
                icon="cash-back-record"
                text="退票"
                @click="refund"
              />
            </van-grid>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </van-popup>
</template>

<script>
import { ref } from 'vue'
import { getTicket, cancelTicket } from '@/api/user'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'
import { useStore } from 'vuex'

export default {
  setup () {
    const userInfo = ref({}), store = useStore()
    userInfo.value = store.getters['user/getUserInfo']
    const router = useRouter()
    const list = ref([]), show = ref(false), selected = ref({})
    const getList = async () => {
      const res = await getTicket(1)
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
    const minT = 7200 * 1000
    const isDel = ref(false)
    const celectTicket = (val) => {
      selected.value = val
      var now = new Date().getTime()
      isDel.value = false
      if (now - selected.value.start_time > 0) {
        isDel.value = true
      }
      show.value = true
    }

    const refund = () => {
      console.log('refund')
      const t = selected.value.start_time - new Date().getTime()
      if (t < minT) {
        Toast.fail('已放映或放映前2小时无法退票')
        return
      }
      Dialog.confirm({
        title: '退票',
        message:
          '确认将删除该订单，并返还支付金额',
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
      show, celectTicket, selected,
      list, refund, isDel
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
.van-grid :deep() .van-grid-item__content {
  padding-bottom: 0;
}
.tag {
  position: absolute;
  right: 5vw;
  top: 25vh;
  opacity: 0.2;
  font-size: 50px;
  border: 2px solid;
  z-index: 5;
  height: 150px;
  width: 150px;
  border-radius: 100%;
  transform: rotateZ(15deg);
}
</style>