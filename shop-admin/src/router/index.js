import {createRouter, createWebHashHistory} from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import Admin from '@/layout/admin.vue'

import Index from '@/pages/index.vue'
import NotFound from '@/pages/404.vue'
import Login from '@/pages/login.vue'

const routes = [
  {
    path: '/',
    component: Admin,
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
          title: '后台首页'
        }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
