import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/route'
import { createI18n } from 'vue-i18n'
import Falang from './langs/Falang'
import Enlang from './langs/Enlang'

const pinia = createPinia()
const app = createApp(App)
const savedLocale = localStorage.getItem('locale') || 'fa-IR'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale, 
  fallbackLocale: 'fa-IR',
  messages: {
    'fa-IR': Falang.messages,
    'en-US': Enlang.messages
}
})

app.use(i18n)
app.use(router)
app.use(pinia)
app.mount('#app')