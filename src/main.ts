import '@/assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import {i18n} from "@/locale";

const app = createApp(App)

app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(i18n)

app.mount('#app')
