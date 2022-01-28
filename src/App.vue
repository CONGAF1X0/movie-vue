<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <div class="main">
    <router-view />
  </div>
</template>


<script>
export default {
  created() {
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
</style>
