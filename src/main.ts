import 'element-plus/dist/index.css'
import { createApp } from 'vue'

import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import router from './router'
import { createPinia } from 'pinia'

import('@/styles/reset.less')
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')
