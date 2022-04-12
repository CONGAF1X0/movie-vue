<template>
  <van-nav-bar
    title="热映"
    @click-right="showArea = true"
    placeholder
    fixed
    @click="test"
  >
    <template #right>
      {{ area[1].name }}
      <van-icon name="arrow-down" />
    </template>
  </van-nav-bar>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    offset="100"
  >
    <div class="cardcon" v-for="item in hotList" :key="item">
      <van-card
        :thumb="'https://images.weserv.nl/?url=' + item.cover"
        @click="clickCard(item.movie_id)"
      >
        <template #thumb>
          <van-image
            fit="fill"
            :src="'https://images.weserv.nl/?url=' + item.cover"
          />
        </template>
        <template #title>
          <van-row class="card-title">{{ item.movie_name }}</van-row>
        </template>
        <template #desc>
          <van-col class="card-desc">
            <van-row span="8">导演：{{ item.director }}</van-row>
            <van-row span="8" class="single-line"
              >主演：{{ item.stars }}</van-row
            >
          </van-col>
        </template>
        <template #price>
          <van-row class="rating">{{ item.rating }}</van-row>
        </template>
      </van-card>
      <div class="rightbox">
        <van-button
          color="#7232dd"
          plain
          size="small"
          round
          @click="clickBuy(item)"
          >购票</van-button
        >
      </div>
    </div>
  </van-list>

  <Area v-model:showArea="showArea" v-model:num="num" @confirm="confirmFun" />
</template>

<script>
import { ref } from 'vue'
import Area from '../components/area.vue'
import { mapState, useStore } from "vuex"
import { useRouter } from 'vue-router'
import { getHotMovieList } from '@/api/movie'
import { ipLocation } from '@/api/user'
import { hotData } from './data'

export default {
  components: {
    Area
  },
  computed: mapState({
    area: state => state.area.area
  }),
  setup () {
    const router = useRouter()
    const { hotList, finished, page, city } = hotData
    const loading = ref(false)
    const store = useStore()
    let time = 600
    // if (store.getters['area/area'][1].name == '定位') {
    //   time = 500
    // }
    if (city.value !== store.getters['area/area'][1].name) {
      hotList.value = []
      page.value = 1
      finished.value = false
    }
    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      setTimeout(async () => {
        const res = await getHotMovieList({
          city: store.getters['area/area'][1].name,
          page: page.value,
          page_size: 10,
        })
        city.value = store.getters['area/area'][1].name
        console.log(res)
        hotList.value.push(...res.list)
        page.value++
        loading.value = false
        if (hotList.value.length >= res.pager.total) {
          finished.value = true
        }
      }, time)

      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     list.value.push(list.value.length + 1)
      //   }

      //   // 加载状态结束
      //   loading.value = false

      //   // 数据全部加载完成
      //   if (list.value.length >= 40) {
      //     finished.value = true
      //   }
      // }, 1000)
    }

    const clickCard = (id) => {
      router.push({ name: "MovieInfo", params: { id } })
    }
    const clickBuy = (item) => {
      router.push({ name: 'Session', params: { id: item.movie_id, name: item.movie_name } })
    }
    const confirmFun = async (result) => {
      console.log(result)
      hotList.value = []
      page.value = 1
      finished.value = false

      loading.value = true
      onLoad()
    }
    const test = () => {
      // doLogin({ usernam: '11' })
      // regeoApi
    }
    return {
      hotList,
      onLoad, clickCard, clickBuy,
      loading,
      finished,
      showArea: ref(false),
      num: 2,
      test,
      confirmFun
    }
  },

};
</script>

<style scoped>
.main {
  background-color: #f7faf8;
}
.cardcon {
  width: 95%;
  display: flex;
  margin: 0 auto;
}
.van-card {
  width: 100%;
  border-radius: 15px;
  --van-card-background-color: #fff;
  margin-top: 8px;
  height: 146px;
}
.rightbox {
  position: absolute;
  right: 8%;
  margin-top: 67px;
}
.card-desc {
  margin-top: 7px;
  color: #999;
  width: 70%;
}
.single-line {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-title {
  font-size: 16px;
}
.rating {
  font-size: 15px;
  color: #ff9900;
}
</style>
