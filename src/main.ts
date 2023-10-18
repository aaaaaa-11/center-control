import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  FormItem,
  Input,
  InputPassword,
  Menu,
  MenuItem,
  Modal,
  Space,
  Table,
  Tooltip,
  Tree,
  Select,
  SelectOption,
} from 'ant-design-vue'

import 'ant-design-vue/dist/reset.css'
import './assets/less/index.less'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const coms = [
  ConfigProvider,
  Button,
  Modal,
  Menu,
  MenuItem,
  Form,
  FormItem,
  Input,
  InputPassword,
  Tooltip,
  Checkbox,
  Space,
  Tree,
  Table,
  Select,
  SelectOption,
]
coms.forEach((com) => app.use(com))

const hasShow = await import('./vHasShow')

app.directive('hasShow', hasShow.default)

app.mount('#app')
