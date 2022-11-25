// import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      //相当于把__dirname也就是当前路径拼接上src
      "@": path.resolve(__dirname, "src")
    }
  },
  //这是vue官方默认的
  // resolve: {
  //    // alias: {
  //     //   '@': fileURLToPath(new URL('./src', import.meta.url))
  //     // },
  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

})
