import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
// import vike from 'vike/plugin' // vite 的 ssr 中间件 插件
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': './src',
      'src': './src',
      '$assets': './src/assets',
      '$lib': './src/lib',
      '$view': './src/view'
    },
    extensions: ['.ts', '.vue', '.scss', '.json']
  },
  server: {
    // port: 8000,
    proxy: {
      // location.origin后紧跟的一段路径
      '/mockapi': {
        target: 'http://localhost:8001', // 目标服务器的 location.origin
        // changeOrigin 为true, 服务器端接收到的 请求头的host 就为 target 的host
        // changeOrigin false, 服务器端接收到的 请求头的host 就为 前端页面运行的服务器地址的host
        // changeOrigin 无论为true或false, 浏览器的请求头里查看的都是页面运行的服务器的host
        changeOrigin: true, // 默认false, 参考文档 https://blog.csdn.net/Old_Soldier/article/details/127204618
        // 目标服务器的正确地址是 http://localhost:8001/api/xxx..xxx
        rewrite: path => path.replace(/^\/mockapi/, '/api') // 重写成目标服务器需要的正确的请求url
      }
    }
  }
})
