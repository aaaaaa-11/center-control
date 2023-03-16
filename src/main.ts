import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import AntdV from 'ant-design-vue'

import 'ant-design-vue/dist/antd.less'
import './assets/less/clear.css'
import './assets/less/index.less'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(AntdV)

app.mount('#app')
