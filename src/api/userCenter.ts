import axios from './index'

type LoginParams = {
  phone: string;
  uuid: string;
  verify_code: string;
  username?: undefined;
  password?: undefined;
} | {
  username: string;
  password: string;
  phone?: undefined;
  uuid?: undefined;
  verify_code?: undefined;
}
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
