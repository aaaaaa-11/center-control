import axios from './index'

export interface UserInfo extends User {
  createTime: string
  token: string
  permission: Permission[]
}

interface VCode {
  verify_code: string
  uuid: string
}

type LoginParams = AccountParams | PhoneParams

export const userLogin = (params: LoginParams) => {
  const { username, password, uuid, verify_code, phone } = params
  return axios.post<ResponseData<UserInfo>>('/user_center/login', {
    username,
    password,
    uuid,
    verify_code,
    phone,
  })
}

export const queryUserInfo = () => {
  return axios.post<ResponseData<UserInfo>>('/user_center/query_user_info')
}

export const sendVerifycode = (params: { phone: string }) => {
  return axios.post<ResponseData<VCode>>('/user_center/send_verify_code', {
    phone: params.phone,
  })
}
