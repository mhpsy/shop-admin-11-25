<template>
  <div>
    <el-row class="login-container">
      <el-col :lg="16" :md="12" class="left">
        <h1 class="left-title">欢迎光临</h1>
        <p class="left-sub-title">Vue3 + Element Plus + windiCss + Vite</p>
      </el-col>
      <el-col :lg="8" :md="12" class="right">
        <h2 class="right-title">欢迎回来</h2>
        <div class="right-login">
          <span class="right-login-line"></span>
          <span>账号密码登录</span>
          <span class="right-login-line"></span>
        </div>

        <el-form ref="loginFormRef"
                 :model="loginForm"
                 :rules="loginFormRules"
                 class="w-[250px]"
        >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username"
                      placeholder="请输入用户名"
            >
              <template #prefix>
                <el-icon>
                  <User></User>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password"
                      placeholder="请输入密码"
                      show-password
                      prefix-icon="Lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button round color="#626aef" class="w-[250px]"
                       :loading="loadingLogin"
                       type="primary"
                       @click="submit">登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted, onBeforeUnmount} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {toast} from "@/composables/util";


const loginForm = reactive({
  username: "",
  password: ""
})

const loadingLogin = ref(false)

const loginFormRules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ]
}

const loginFormRef = ref(null)

// 获取路由 实例
const router = useRouter()
// 获取vuex实例
const store = useStore()
const submit = () => {
  loginFormRef.value.validate((vaild) => {
    if (vaild) {
      loadingLogin.value = true
      store.dispatch('login', loginForm).then(res => {
        toast('登录成功')
        router.push('/')
      }).finally(() => {
        loadingLogin.value = false
      })
      // login(loginForm.username, loginForm.password).then(res => {
      //   // console.log(res)
      //   toast('登录成功')
      // // 设置token
      // setToken(res.token)
      //获取用户的相关信息
      // getInfo().then(res => {
      //   // console.log(res)
      //   // cookie.set('admin-info', res)
      //   store.commit('SET_USERINFO', res)
      //   // 跳转到首页
      //   router.push('/')
      // })
      // })
    }
  })
}

const onkeydown = (e) => {
  if (e.keyCode === 13) {
    submit()
  }
}
//添加回车事件
onMounted(() => {
  document.addEventListener('keydown', onkeydown)
})
//移除回车事件
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onkeydown)
})


</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;
}

.left {
  @apply flex items-center justify-center flex-col
}

.left-title, .left-sub-title {
  @apply text-4xl text-white font-bold mt-4;
}

.left-sub-title {
  @apply text-2xl;
}


.right {
  @apply bg-light-50 flex items-center justify-center flex-col;
}

.right-title {
  @apply text-2xl text-gray-500 font-bold mt-4;
}

.right-login {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2
}

.right-login-line {
  @apply h-[1px] w-16 bg-gray-200;
}


</style>
