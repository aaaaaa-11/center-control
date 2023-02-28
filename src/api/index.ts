import axios from 'axios'
import config from '../config'
import ls from '../localStore'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
axios.defaults.baseURL = config.baseURL
console.log(config.baseURL);

// 请求拦截器
axios.interceptors.request.use(config => {
  const token = ls.get('token')
  config.headers['Authorization'] = token
  // console.log(config.method)
  // config.headers.AuthorizationToken = token
  // if (config.method === 'post') {
  //   if (!config.data.token) {
  //     config.data.token = token
  //   }
  //   if (!config.data.adminId) {
  //     config.data.adminId = ls.getItem('userid')
  //   }
  // }
  return config
}, error => {
  return Promise.reject(error)
})
// 跳转到登录页面，需要清空url参数和localStorage中的token
export const toLoginPage = () => {
  ls.remove('token')
  console.log('跳login');
  $router.push({
    name: 'login'
  })
}
// 响应拦截器
axios.interceptors.response.use(response => {
  const code = response.data.rescode
  if (code && code - 0 !== 200) {
    switch (code - 0) {
      case 401:
        // message.error('登录过期')
        toLoginPage()
        return Promise.reject(new Error(response.data.msg))
      default:
        // message.error(response.data.msg)
        return response
    }
  } else {
    return response
  }
}, error => {
  // message.error(error.message)
  return Promise.reject(error)
})
export default axios
