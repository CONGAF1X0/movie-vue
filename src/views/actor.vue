<template>
  <van-nav-bar
    title="影人详情"
    left-arrow
    @click-left="this.$router.go(-1)"
    placeholder
    fixed
  />
  <van-card>
    <template #title>
      <van-row justify="center">
        <van-image
          fit="cover"
          round
          width="10rem"
          height="10rem"
          :src="'https://images.weserv.nl/?url=' + data.avatar"
        />
      </van-row>
      <van-row class="card-title" justify="center">{{ data.name1 }}</van-row>
    </template>
    <template #desc>
      <van-col class="card-desc">
        <!-- <van-row>spiderman</van-row> -->
        <van-row id="card-desc-row" justify="center">{{ data.name2 }}</van-row>
        <van-row id="card-desc-row" justify="center">{{
          data.birthday
        }}</van-row>
      </van-col>
    </template>
  </van-card>

  <van-card class="card-height-auto">
    <template #title>
      <van-divider>简介</van-divider>
    </template>
    <template #desc>
      <van-row class="jjdesc">{{ data.introduction }}</van-row>
    </template>
  </van-card>
</template>

<script>
import { ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { getActorInfo } from '@/api/movie'

export default {
  setup () {
    const list = ref([]), data = ref({})
    const route = useRoute(), router = useRouter()
    const getInfo = async (id) => {
      const res = await getActorInfo(id)
      if (res.code === 200) {
        data.value = res.data
      }
    }
    if (route.params?.id) {
      getInfo(route.params?.id)
    }


    const onClickButton = () => {
      router.push({ name: 'Session', params: { id: data.value.movie_id, name: data.value.movie_name } })
    }
    return {
      list, onClickButton, data
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
  height: 266px;
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