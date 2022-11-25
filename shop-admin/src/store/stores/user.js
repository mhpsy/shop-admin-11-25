import {createStore} from "vuex";

const userStore = createStore({
  state () {
    return {
      //用户信息
      user:{}
    }
  },
  mutations: {
    SET_USERINFO(state, user) {
      // 设置用户信息
      state.user = user;
    },
  }
})

export default userStore

