<template>
  <van-nav-bar
    left-arrow
    placeholder
    fixed
    title="个人信息"
    @click-left="this.$router.go(-1)"
  />

  <van-cell-group>
    <van-cell title="头像" center>
      <template #value>
        <van-image
          round
          fit="cover"
          width="3rem"
          height="3rem"
          src="../public/lsq.png"
        />
      </template>
    </van-cell>
    <van-cell title="用户名" :value="userInfo.user_name || 'username'" />
    <van-cell title="手机号" :value="userInfo.mobile || 'mobile'" />
    <van-cell title="性别" :value="userInfo.gender" />
    <van-cell title="生日" :value="userInfo.birthday" />
  </van-cell-group>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const userInfo = ref({}), store = useStore()
    userInfo.value = store.getters['user/getUserInfo']
    console.log(userInfo.value)
    return { userInfo }
  }
}
</script>

<style>
</style>