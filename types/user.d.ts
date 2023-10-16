/* 用户相关类型 */

// 账号参数类型
interface AccountParams {
  phone: string
  uuid: string
  verify_code: string
  username?: undefined
  password?: undefined
}

// 手机号参数类型
interface PhoneParams {
  username: string
  password: string
  phone?: undefined
  uuid?: undefined
  verify_code?: undefined
}

interface User {
  admin?: boolean
  userId?: number
  userName?: string
  roleId?: number
  phone?: string
  roleName?: string
}

type Permission = string[]
