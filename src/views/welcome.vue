<template>
    <van-nav-bar title="热映" @click-right="showArea = true" placeholder fixed>
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
      <div class="cardcon" v-for="item in list" :key="item">
        <van-card thumb="https://img.yzcdn.cn/vant/ipad.jpeg" @click="clickCard">
          <template #title>
            <van-row class="card-title">蜘蛛侠3：英雄无归</van-row>
          </template>
          <template #desc>
            <van-col class="card-desc">
              <van-row span="8">导演：</van-row>
              <van-row span="8">主演：汤姆赫兰德|赞达雅</van-row>
            </van-col>
          </template>
          <template #price>
            <van-row class="rating">9.9</van-row>
          </template>
        </van-card>
        <div class="rightbox">
          <van-button color="#7232dd" plain size="small" round @click="clickBuy">购票</van-button>
        </div>
      </div>
    </van-list>

    <Area v-model:showArea="showArea" v-model:num="num" @confirm="confirmFun" />
</template>

<script>
import { ref } from 'vue';
import Area from '../components/area.vue'
import { mapState } from "vuex";
import { useRouter } from 'vue-router';

export default {
  components: {
    Area
  },
  computed: mapState({
    area: state => state.area.area
  }),
  setup() {
    const router = useRouter()
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

    const clickCard = () => {
      router.push("/movieinfo")
    }
    const clickBuy = () => {
      router.push("/session")
    }
    return {
      list,
      onLoad, clickCard, clickBuy,
      loading,
      finished,
      showArea: ref(false),
      num: 2
    };
  },
  methods: {
    confirmFun(result) {
      console.log(result)
    }
  }
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
}
.rightbox {
  position: absolute;
  right: 8%;
  margin-top:45px
}
.card-desc {
  margin-top: 7px;
  color: #999;
}
.card-title {
  font-size: 16px;
}
.rating {
  font-size: 15px;
  color: #ff9900;
}
</style>
