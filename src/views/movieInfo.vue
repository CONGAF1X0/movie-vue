<template>
  <van-nav-bar
    title="影片详情"
    left-arrow
    @click-left="this.$router.go(-1)"
    placeholder
    fixed
  />
  <van-card>
    <template #thumb>
      <van-image
        fit="fill"
        :src="data.cover ? 'https://images.weserv.nl/?url=' + data.cover : ''"
      />
    </template>
    <template #title>
      <van-row class="card-title">{{ data.movie_name }}</van-row>
    </template>
    <template #desc>
      <van-col class="card-desc">
        <!-- <van-row>spiderman</van-row> -->
        <van-row id="card-desc-row">{{ "导演：" + data.director }}</van-row>
        <van-row id="card-desc-row">{{ "类型：" + data.genre }}</van-row>
        <van-row id="card-desc-row">{{ "时长：" + data.runtime }}</van-row>
        <van-row id="card-desc-row">{{
          "上映时间：" + $moment(data.release).format("yyyy-MM-DD")
        }}</van-row>
      </van-col>
    </template>
  </van-card>

  <van-card class="card-height-auto">
    <template #title>
      <van-divider content-position="left">简介</van-divider>
    </template>
    <template #desc>
      <van-row class="jjdesc">{{ data.storyline }}</van-row>
    </template>
  </van-card>

  <van-card class="card-height-auto">
    <template #title>
      <van-divider content-position="left">演员</van-divider>
    </template>
    <template #desc>
      <van-row class="container">
        <van-list class="img-list">
          <div
            class="box"
            v-for="item in data.stars"
            :key="item.actor_id"
            @click="clickActor(item)"
          >
            <van-image
              class="actor-img"
              round
              fit="cover"
              :src="'https://images.weserv.nl/?url=' + item.avatar"
            />
            <div>{{ item.name1 }}</div>
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
      @click="onClickButton()"
    />
  </van-action-bar>
</template>

<script>
import { ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { getMovieInfo } from '@/api/movie'

export default {
  setup () {
    const list = ref([]), data = ref({})
    const route = useRoute(), router = useRouter()
    const getMovie = async (id) => {
      const res = await getMovieInfo(id)
      if (res.code === 200) {
        data.value = res.data
      }
    }
    if (route.params?.id) {
      getMovie(route.params?.id)
    }


    for (let i = 0; i < 10; i++) {
      list.value.push({ a: "a" })
    }
    const onClickButton = () => {
      router.push({ name: 'Session', params: { id: data.value.movie_id, name: data.value.movie_name } })
    }
    const clickActor = (item) => {
      console.log(item)
      router.push({ name: 'Actor', params: { id: item.actor_id } })

    }
    return {
      list, onClickButton, data, clickActor
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