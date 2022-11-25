import {createStore} from "vuex";
import {login, getInfo} from "../api/manager";
import {setToken, removeToken} from "../composables/auth";

const store = createStore({
  state() {
    return {
      //用户信息
      user: {}
    }
  },
  mutations: {
    SET_USERINFO(state, user) {
      // 设置用户信息
      state.user = user;
    },
  },
  actions: {
    //登录
    login({commit}, {username, password}) {
      return new Promise((resolve, reject) => {
        login(username, password).then(res => {
          //登录成功后，把token存储到本地
          setToken(res.token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    //获取当前用户信息
    getInfo({commit}) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          commit('SET_USERINFO', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    //退出登录
    logout({commit}) {
      removeToken()
      commit('SET_USERINFO', {})
    }
  }
})

export default store

