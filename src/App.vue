<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <div class="main">
    <!-- <router-view /> -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="includeList">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>


<script>
export default {
  name: 'App',
  data () {
    return {
      includeList: []
    }
  },
  watch: {
    $route (to) {
      //监听路由变化，把配置路由中keepAlive为true的name添加到include动态数组中
      const that = this
      if (to.meta.keepAlive && that.includeList.indexOf(to.name) === -1) {
        that.includeList.push(to.name)
      }
    }
  },
  created () {
    this.$store.dispatch('area/getLocation')
  }

}
</script>
<style>
.main {
  min-height: 100vh;
}
.van-card__content {
  margin-left: 8px;
}
.van-button {
  width: 54px;
  --van-button-default-height: 33px;
}
#app {
  background-color: #f7faf8;
}
.van-dialog {
  --van-dialog-confirm-button-text-color: #1989fa;
}
/* ::-webkit-scrollbar {
  display: none;
} */
</style>
