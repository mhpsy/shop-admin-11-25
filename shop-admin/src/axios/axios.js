import axios from 'axios'
import {ElNotification} from 'element-plus'
import {getToken} from '@/composables/auth'
import {toast} from '@/composables/util'
import store from "../store";


const instance = axios.create({
  baseURL: '/api'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // getToken() && (config.headers['Authorization'] = getToken())
  const token = getToken();
  // const token = cookies.get('admin-token')
  if (token) {
    // config.headers['Authorization'] = 'Bearer ' + token ruoyi前端实际就是这样处理的
    // config.headers就是在请求头添加东西，这里是在添加token
    config.headers['token'] = token
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 也就是返回的数据直接是response.data.data
  return response.data.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  const msg = error.response.data.msg ? error.response.data.msg : '请求失败'
  //一般情况是要判断code的，这里就不判断了，因为我不知道这个非法token的code是多少
  if (msg === '非法token，请先登录！') {
    store.dispatch("logout").finally(() => location.reload())
  }
  toast(error.response.data.msg || '请求失败', 'error')
  return Promise.reject(error);
});

export default instance
