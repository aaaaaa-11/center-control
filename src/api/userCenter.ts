import axios from './index'

type LoginParams = AccountParams | PhoneParams
export const userLogin = (params: LoginParams) => {
  const { username, password, uuid, verify_code, phone } = params
  return axios.post('/user_center/login', {
    username,
    password,
    uuid,
    verify_code,
    phone
  })
}

export const queryUserInfo = () => {
  return axios.post('/user_center/query_user_info')
}

export const sendVerifycode = (params: { phone: string }) => {
  return axios.post('/user_center/send_verify_code', {
    phone: params.phone
  })
}
