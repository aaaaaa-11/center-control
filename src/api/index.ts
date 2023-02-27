import axios from 'axios'
import config from '../config'
import ls from '../localStore'
axios.defaults.baseURL = config.baseURL
console.log(config.baseURL);

// 请求拦截器
axios.interceptors.request.use(config => {
  // console.log('请求token', window.localStorage.getItem('cc-demo__token'));
  const token = ls.get('token') || ''
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
export default axios
