import router from './router'
import {getToken} from "./composables/auth";
import {toast, showFullLoading, hideFullLoading} from "./composables/util";
import store from "./store/index";

//全局前置守卫
router.beforeEach(async (to, from, next) => {
  //to:要去的路由
  //from:来自哪个路由
  //next:放行
  // console.log(to)
  // console.log(from)
  // console.log(next)
  showFullLoading()

  const token = getToken()
  if (!token && to.path !== '/login') {
    //如果没有token,并且不是去登录页，就跳转到登录页
    toast('请先登录', 'error')
    next('/login')
  }

  if (token && to.path === '/login') {
    //如果有token,并且去登录页，就跳转到首页
    toast('您已登录', 'error')
    next({path: from.path || '/'})
  }


  //如果用户登录了就自动获取用户信息，并存储vuex
  if (token) {
    await store.dispatch("getInfo")
  }

  let title = (to.meta.title ? to.meta.title : '') + '-后台管理系统'
  document.title = title


  next()


  // //如果要去的路由不是登录页，判断是否登录
  // //如果登录了，直接放行
  // //如果没有登录，跳转到登录页
  // const token = getToken()
  // if (token && to.path !== '/login') {
  //   //如果有token并且不是去login，直接放行
  //   next()
  //   // if (to.path === '/login') {
  //   //   //如果已经登录了，又去登录页，直接跳转到来的地方或者首页
  //   //   toast('您已经登录了', 'warning')
  //   //   next({path: from.path || '/'})
  //   // }
  //   // next()
  // } else if (to.path === '/login') {
  //   toast('请先登录', 'warning')
  //   next('/login')
  // }
})


//全局后置守卫
router.afterEach((to, from) => {
  //to:要去的路由
  //from:来自哪个路由
  hideFullLoading()
})
