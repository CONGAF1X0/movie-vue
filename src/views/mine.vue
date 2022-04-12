<template>
  <van-nav-bar placeholder fixed title="我的" />
  <van-cell-group inset @click="goInfo">
    <van-cell class="topCard">
      <template #value>
        <van-col>
          <van-row justify="center">
            <van-image
              round
              fit="cover"
              width="8rem"
              height="8rem"
              src="../public/lsq.png"
            />
          </van-row>
          <van-row justify="center" id="name">
            <van-col>{{ userInfo.user_name }}</van-col>
            <van-col offset="22">
              <van-icon name="setting-o" />
            </van-col>
          </van-row>
        </van-col>
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group inset>
    <van-cell>
      <van-grid :border="false">
        <van-grid-item
          icon="coupon-o"
          text="电影票"
          @click="this.$router.push('/ticket')"
        />
        <van-grid-item icon="photo-o" text="" />
        <van-grid-item icon="photo-o" text="" />
        <van-grid-item icon="circle" text="登出" @click="logout" />
      </van-grid>
    </van-cell>
  </van-cell-group>

  <van-overlay :show="show">
    <div class="form-box">
      <van-form ref="formRef">
        <van-cell-group inset>
          <div v-show="!isSignup">
            <van-row justify="end">
              <van-col
                @click="switchLoginForm"
                class="fontStl"
                style="margin-top: 10px; margin-right: 10px"
              >
                {{ isAccForm ? "手机验证码登录" : "账号密码登录" }}
              </van-col>
            </van-row>
            <div class="accountForm" v-show="isAccForm">
              <van-field
                v-model="accountForm.username"
                name="accname"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                v-model="accountForm.password"
                type="password"
                name="accpwd"
                label="密码"
                placeholder="密码"
                :rules="[{ validator: pswValidator }]"
              />
            </div>

            <div v-show="!isAccForm">
              <van-field
                v-model="mobileForm.mobile"
                name="mmob"
                type="tel"
                label="手机号"
                placeholder="手机号"
                :rules="[
                  {
                    required: true,
                    message: '请填写正确的手机号',
                    pattern: /^1[3-9]\d{9}$/,
                  },
                ]"
              />
              <van-field
                v-model="mobileForm.captcha"
                type="number"
                name="mcode"
                label="验证码"
                placeholder="验证码"
                :rules="[{ validator: captchaValidator }]"
              >
                <template #button>
                  <van-button
                    class="sendCode"
                    size="small"
                    type="primary"
                    @click="getCode"
                  >
                    <span v-show="!isCount">发送验证码</span>
                    <van-count-down
                      v-show="isCount"
                      ref="countDown"
                      :time="60000"
                      :auto-start="false"
                      format="ss"
                      @finish="onFinish"
                  /></van-button>
                </template>
              </van-field>
            </div>
          </div>
          <div v-show="isSignup" style="margin-top: 29px">
            <van-field
              v-model="signupForm.username"
              name="suname"
              label="用户名"
              placeholder="用户名"
              :rules="[{ validator: checkUsername }]"
            />
            <van-field
              v-model="signupForm.mobile"
              name="sumob"
              type="tel"
              label="手机号"
              placeholder="手机号"
              :rules="[
                {
                  required: true,
                  message: '请填写正确的手机号',
                  pattern: /^1[3-9]\d{9}$/,
                },
              ]"
            />
            <van-field
              v-model="signupForm.captcha"
              type="number"
              name="sucode"
              label="验证码"
              placeholder="验证码"
              :rules="[{ validator: captchaValidator }]"
            >
              <template #button>
                <van-button
                  class="sendCode"
                  size="small"
                  type="primary"
                  @click="getSignupCode"
                >
                  <span v-show="!isCount2">发送验证码</span>
                  <van-count-down
                    v-show="isCount2"
                    ref="countDown2"
                    :time="60000"
                    :auto-start="false"
                    format="ss"
                    @finish="onFinish2"
                /></van-button>
              </template>
            </van-field>
            <van-field
              v-model="signupForm.password"
              type="password"
              name="supwd"
              label="密码"
              placeholder="密码"
              :rules="[{ validator: pswValidator }]"
            />
          </div>

          <div style="margin: 16px">
            <van-row justify="space-between">
              <van-col class="fontStl" @click="isSignup = !isSignup">
                {{ isSignup ? "返回登录" : "注册" }}
              </van-col>
              <van-col>
                <van-button
                  round
                  block
                  type="primary"
                  native-type="submit"
                  @click="onSubmit"
                >
                  {{ isSignup ? "注册" : "登录" }}
                </van-button>
              </van-col>
            </van-row>
          </div>
        </van-cell-group>
      </van-form>
    </div>
  </van-overlay>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAccountExist, getCodeApi, signup } from '@/api/user'
import { Toast } from 'vant'
import { useStore } from 'vuex'

export default {
  setup () {
    const countDown = ref(null), countDown2 = ref(null), formRef = ref(null), store = useStore()
    const router = useRouter(), show = ref(false), isAccForm = ref(true), isSignup = ref(false)
    const accountForm = ref({ username: '', password: '' }),
      mobileForm = ref({ mobile: '', captcha: '' }),
      signupForm = ref({
        username: '', password: '', mobile: '', captcha: ''
      })
    const userInfo = ref({})
    const getInfo = async () => {
      try {
        const res = await store.dispatch('user/getUserInfoAction')
        if (res) {
          userInfo.value = res
          return
        }
      } catch (e) {
        show.value = true
      } finally {
      }
    }
    store.getters['user/getRToken'] ? getInfo() : show.value = true

    const goInfo = () => {
      router.push("/userInfo")
    }
    const switchLoginForm = () => {
      isAccForm.value = !isAccForm.value
    }
    const isCount = ref(false), isCount2 = ref(false)

    const getCode = async () => {
      if (!isCount.value && /^1[3-9]\d{9}$/.test(mobileForm.value.mobile)) {
        const res = await getCodeApi({ mobile: mobileForm.value.mobile, action_type: "login" })
        if (res.code !== 200) {
          Toast.fail('未注册')
          return
        }
        Toast.success("已发送")
        isCount.value = true
        countDown.value.start()
      }
    }
    const getSignupCode = async () => {
      if (!isCount2.value && /^1[3-9]\d{9}$/.test(signupForm.value.mobile)) {
        const res = await getCodeApi({ mobile: signupForm.value.mobile, action_type: "signup" })
        if (res.code !== 200) {
          Toast.fail('未注册')
          return
        }
        Toast.success("已发送")
        isCount2.value = true
        countDown2.value.start()
      }
    }
    const captchaValidator = (val) => { if (val.length != 6) return '请输入正确的验证码' }
    const pswValidator = (val) => { if (val.length < 6 || val.length > 24) return '密码长度为6-24位' }

    const pause = () => {
      countDown.value.pause()
    }
    const reset = () => {
      countDown.value.reset()
    }
    const onFinish = () => {
      isCount.value = false
      countDown.value.reset()
    }
    const onFinish2 = () => {
      isCount2.value = false
      countDown2.value.reset()
    }
    const checkUsername = async () => {
      if (signupForm.value.username.length < 5 || signupForm.value.username.length > 16) {
        return "用户名长度为5-16位"
      } else {
        const res = await isAccountExist({ username: signupForm.value.username })
        if (res.code !== 200) {
          return "该用户名已注册"
        }
      }
    }
    const onSubmit = () => {
      if (isSignup.value) {
        formRef.value.validate(['suname', 'supwd', 'sumob', 'sucode']).then(async () => {
          const res = await signup(signupForm.value)
          if (res.code != 200) {
            Toast.fail(res.msg)
            return
          }
          Toast.success()
          return
        })
      }
      if (isAccForm.value) {
        formRef.value.validate(['accname', 'accpwd']).then(async () => {
          const res = await store.dispatch('user/login', [accountForm.value, false])
          if (res) {
            userInfo.value = res
            show.value = false
            Toast.success()
          }
        })
      } else {
        formRef.value.validate(['mmob', 'mcode']).then(async () => {
          try {
            const res = await store.dispatch('user/login', [mobileForm.value, true])
            if (res) {
              userInfo.value = res
              show.value = false
              Toast.success()
            }
          } catch (e) {
          }
        })
      }
    }

    const logout = () => {
      store.dispatch('user/logout')
      Toast.success()
      show.value = true
    }
    return {
      userInfo, show, isAccForm, switchLoginForm, countDown, onFinish, isCount, getCode, signupForm, mobileForm, accountForm, onSubmit, captchaValidator,
      isSignup, getSignupCode, checkUsername, countDown2, onFinish2, isCount2, pswValidator, formRef, goInfo, logout
    }
  }
}
</script>

<style scoped>
.van-cell-group {
  margin-top: 10px;
}
.topCard {
  padding: 20px;
  background-color: #f7faf8;
}
.topCard #name {
  margin-top: 10px;
  font-size: 19px;
  font-weight: 500;
}
.form-box {
  margin-top: 20vh;
}
.sendCode {
  width: 83px;
}
.van-count-down {
  --van-count-down-text-color: #fff;
}
.fontStl {
  font-size: 14px;
  color: #969799;
}
</style>