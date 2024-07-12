import { createApp } from 'vue'
import Store from '@/store'
import I18n from '@/locales'
import ThemeChalk from '@/theme-chalk'
import Icons from '@/icons'
import Router from '@/router'
import App from '@/App.vue'

const app = createApp(App)
app.use(Store)
    .use(I18n)
    .use(ThemeChalk)
    .use(Icons)
    .use(Router)
    .mount('#app')