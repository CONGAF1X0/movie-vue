<template>
  <van-nav-bar
    title="影院"
    left-arrow
    @click-left="backFunc"
    placeholder
    fixed
  />

  <van-cell-group inset>
    <van-cell center class="topcell">
      <template #title>
        <van-row class="title">{{ info.cinema_name }}</van-row>
      </template>
      <template #label>
        <van-row class="single-line label">{{
          info.district + info.location
        }}</van-row>
      </template>
      <template #value>
        <van-button
          color="#000"
          icon="map-marked"
          type="primary"
          round
          plain
          style="width: 40px; height: 40px"
        />
      </template>
    </van-cell>
  </van-cell-group>
  <div v-if="session == null" class="nil">暂无场次</div>

  <van-tabs v-else class="tab1" v-model:active="active" animated>
    <van-tab v-for="item in session" :key="item.movie_id">
      <template #title>
        <div>
          <van-image
            class="actor-img"
            fit="cover"
            :src="'https://images.weserv.nl/?url=' + item.cover"
          />
        </div>
      </template>

      <template #default>
        <van-tabs class="tab2" shrink animated>
          <van-tab
            v-for="index in item.Session"
            :key="index"
            :title="index[0].substring(5)"
          >
            <template #default>
              <div class="tab2def">
                <van-list>
                  <van-cell-group
                    inset
                    v-for="i in index[1]"
                    :key="i.session_id"
                  >
                    <van-cell center>
                      <template #title>
                        <van-row gutter="2">
                          <van-col span="10" class="title">{{
                            $moment(i.start_time).format("HH:mm")
                          }}</van-col>
                          <van-col span="12" class="end">{{
                            $moment(i.end_time).format("HH:mm") + "散场"
                          }}</van-col>
                        </van-row>
                      </template>
                      <template #label>
                        <van-row>{{ i.hall_name }}</van-row>
                      </template>
                      <template #value>
                        <van-row id="pricebox">
                          <van-col>￥</van-col>
                          <van-col id="price">{{ i.price }}</van-col>
                        </van-row>
                      </template>
                      <template #right-icon>
                        <van-button
                          id="btbuy"
                          round
                          color="linear-gradient(to right, #ff6034, #ee0a24)"
                          @click="goSelectSeat(i)"
                          >购票</van-button
                        >
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
        <van-row id="tit" justify="center">
          {{ session[active]?.movie_name }}
        </van-row>
        <van-row justify="center">{{
          session[active]?.runtime + " | " + session[active]?.genre
        }}</van-row>
        <van-row justify="center">{{
          session[active]?.stars || "\xa0"
        }}</van-row>
      </div>
    </template>
  </van-tabs>
</template>

<script>
import { ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { getCinemaInfo, getCinemaSession } from '../api/cinema'
import moment from 'moment'

export default {
  setup () {
    const actArr = [0, 0, 0, 0, 0, 0, 0, 0]
    const route = useRoute(), router = useRouter(), info = ref({}), session = ref([])
    const getCinema = async (id) => {
      const res = await getCinemaInfo(id)
      if (res.code === 200) {
        info.value = res.data
      }
    }
    const getSession = async (id) => {
      const res = await getCinemaSession({ cinema_id: id, t: new Date().getTime() })
      if (res.code === 200) {
        session.value = res.list
        if (session.value != null) {
          for (var i = 0; i < session.value.length; i++) {
            let arr = {}
            for (var j = 0; j < session.value[i].Session.length; j++) {
              var day = moment(session.value[i].Session[j].start_time).format('YYYY-MM-DD')
              if (!arr[day]) {
                arr[day] = []
              }
              arr[day].push(session.value[i].Session[j])
            }
            session.value[i].Session = Object.entries(arr)
          }
        }

      }
    }
    if (route.params?.id) {
      getCinema(route.params?.id)
      getSession(route.params?.id)
    }

    const backFunc = () => {
      history.back()
    }
    const goSelectSeat = (data) => {
      router.push({ name: 'Seat', params: { id: data.session_id } })
    }
    return {
      active: ref(0), actArr, backFunc, info, session, goSelectSeat
    }
  },

}
</script>

<style scoped>
.van-cell-group {
  margin-top: 1vh;
}
.title {
  font-weight: 500;
  font-size: 20px;
}
.topcell :deep() .van-cell__title {
  width: 85%;
}

.single-line {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
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
.nil {
  width: 200px;
  margin: 0 auto;
  text-align: center;
  margin-top: 20px;
  color: #969799;
  font-size: 14px;
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