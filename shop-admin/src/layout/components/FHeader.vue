<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-2 icon-btn"><Odometer/></el-icon>
      后台管理系统
    </span>

    <el-tooltip content="折叠" placement="bottom" effect="dark">
      <el-icon class="icon-btn">
        <Fold/>
      </el-icon>
    </el-tooltip>

    <el-tooltip content="刷新" placement="bottom" effect="dark">
      <el-icon class="icon-btn" @click="handleRefresh">
        <Refresh/>
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex item-center">
      <el-tooltip content="全屏" placement="bottom" effect="dark">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen"/>
          <Aim v-else/>
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="50" :src="$store.state.user.avatar"/>
          <span>{{ $store.state.user.username }}</span>
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="HLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-drawer
        v-model="drawer"
        title="修改密码"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="drawer = false">取 消</el-button>
        <el-button type="primary"  @click="submitForm()">确 定</el-button>
      </span>
    </el-drawer>


  </div>
</template>

<script setup>
import {showModal, toast} from "@/composables/util";
import {logout, updatePassword} from "@/api/manager";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useFullscreen} from "@vueuse/core";
import {reactive, ref} from "vue";

const router = useRouter()
const store = useStore()
// const {isFullscreen, toggleFullscreen} = useFullscreen(document.documentElement)
const {isFullscreen, enter, exit, toggle} = useFullscreen()
// const { isFullscreen, enter, exit, toggle } = useFullscreen(el)
// 也就是这个是可以传入一个dom元素的，如果不传入的话，就是默认是document.documentElement
// 也就是全屏的意思
// isFullscreen是是否全屏
// enter是进入全屏
// exit是退出全屏
// toggle是切换全屏
const logLogout = () => {
  showModal(
      '确定退出登录吗',
  ).then(res => {

    logout().finally(() => {
      store.dispatch("logout")
      toast('退出成功')
      router.push('/login')
    })

  }).catch(err => {
  })
}


//修改密码抽屉开关
const drawer = ref(false)
//修改密码表单
const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
//修改密码表单验证规则
const rules = {
  oldPassword: [
    {required: true, message: '请输入旧密码', trigger: 'blur'},
  ],
  newPassword: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
  ],
  confirmPassword: [
    {required: true, message: '请再次输入新密码', trigger: 'blur'},
  ],
}
//修改密码提交
const formRef = ref(null)
const btnLoading = ref(false)
const submitForm = () => {

  formRef.value.validate((valid) => {
    if (valid) {
      console.log(form)
      console.log(form.newPassword)
      console.log(form.confirmPassword)
      if (form.newPassword !== form.confirmPassword) {
        toast('两次输入的密码不一致', 'error')
        return
      }
      btnLoading.value = true
      // oldpassword 	admin 	Text 	是 旧密码
      // password 	1234 	Text 	是 新密码
      // repassword 	1234 	Text 	是 确认密码
      updatePassword({
        oldpassword: form.oldPassword,
        password: form.newPassword,
        repassword: form.confirmPassword
      }).then(res => {
        toast('修改成功，请重新登录')
        store.dispatch("logout")
        router.push('/login')
      }).finally(() => {
        drawer.value = false
        btnLoading.value = false
      })
    } else {
      toast('请填写完整信息', 'error')
      return false;
    }
  });
}

//关联下拉框点击
const handleCommand = (command) => {
  switch (command) {
    case 'rePassword':
      rePassword()
      break
    case 'HLogout':
      logLogout()
      break
    default:
      break
  }
}

//刷新
const handleRefresh = () => location.reload()

//修改密码
const rePassword = () => {
  drawer.value = true
}


</script>

<style scoped>
.f-header {
  user-select: none;
  @apply flex items-center
  bg-indigo-700 text-light-50
  fixed top-0 left-0 right-0
  ;
  height: 64px;
}

.logo {
  @apply flex items-center justify-center text-xl font-thin;
  width: 250px;
}

.icon-btn {
  @apply flex items-center justify-center
  cursor-pointer
  hover:bg-indigo-500;
  width: 45px;
  height: 64px;
}

.dropdown {
  @apply flex items-center justify-center
  cursor-pointer
  hover:bg-indigo-500 mx-5;

}

</style>









