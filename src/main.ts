import { createApp } from 'vue'
import '@/styles/index.less'
import App from './App.vue'
import 'element-plus/dist/index.css'

import ElementPlus from 'element-plus'
import { router } from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')
