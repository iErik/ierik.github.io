import '@styles/index.scss'
import 'lenis/dist/lenis.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import reveal from './directives/reveal'


const app = createApp(App)
app.use(router)
app.use(i18n)
app.directive('reveal', reveal)

app.mount('#app')
