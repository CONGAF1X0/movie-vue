<template>
  <van-nav-bar title="热映" @click-right="show = true">
    <template #right>
      {{ city }}
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
    <van-card
      v-for="item in list"
      :key="item"
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    />
  </van-list>
  <van-popup v-model:show="show" round :style="{  width: '90%' }">
    <van-area title="选择城市" :columns-num="2" :area-list="areaList" @confirm="confirmFun" @cancel="show=false"/>
  </van-popup>
</template>

<script>
import { ref } from 'vue';
import { areaList } from '@vant/area-data';
export default {
  setup() {
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
    const onClickRight = () => { console.log(city) };
    return {
      city: ref("定位"),
      list,
      onLoad,
      loading,
      finished,
      onClickRight,
      show: ref(false),
      areaList,
      ConfirmResult:ref([]),
    };
  },
};
</script>

<style>
</style>
