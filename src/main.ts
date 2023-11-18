import { createSSRApp, createApp } from 'vue'
// import {renderToString} from 'vue/server-renderer'
// import './style.css'
import './assets/style/index.scss'
import App from './App.vue'
import router from './router'

// const app = createSSRApp(App)
// renderToString(app).then(html => {
//   debugger
//   document.getElementById('app')!.innerHTML = html
// })

createApp(App).use(router).mount('#app')
