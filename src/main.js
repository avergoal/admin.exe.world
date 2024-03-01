import { createApp } from 'vue'
import { createPinia } from 'pinia'
import instance from '@/utils/axios'
import './assets/css/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$axios = instance

const pinia = createPinia()
pinia.use(({ store }) => {
    store.$axios = app.config.globalProperties.$axios
})
app.use(pinia)
app.use(router)

app.mount('#app')
