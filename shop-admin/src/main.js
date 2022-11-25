import {createApp} from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'virtual:windi.css'

// import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)

//引入permission ，里面是路由守卫
import './permission'
//引入全局加载条
import 'nprogress/nprogress.css'



app.mount('#app')
