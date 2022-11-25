//引入自己创建的axios实例
import axios from "../axios/axios.js";

//登录
export function login(username, password) {
  return axios.post("/admin/login", {
    username,
    password
  })
}

//获取当前用户信息
export function getInfo() {
  //因为已经在请求头里面加上了token，所以这里不需要传token
  return axios.post("/admin/getinfo")
}

//退出登录
export function logout() {
  //因为已经在请求头里面加上了token，所以这里不需要传token
  return axios.post("/admin/logout")
}

//更改密码
export function updatePassword(data) {
  return axios.post("/admin/updatepassword", data)
}

//获取管理员列表
export function getManagerList(params) {
  return axios.get("/admin/list", {params})
}


