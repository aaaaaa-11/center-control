import { formatPw } from '@/utils/format'
import axios from './index'
interface UserListParams {
  pageNum: number
  pageSize: number
  name?: string // 用户名称，模糊查询
}
export interface UserItem {
  userId: number
  userName: string
  phone: string
  roleId: number
  roleName: string
  permission: Permission[]
  admin?: boolean
}

type UserListData = {
  list: UserItem[]
  total: number
}

// 获取用户列表
export const queryUserList = (params: UserListParams) => {
  const { pageNum, pageSize, name = '' } = params
  return axios.get<ResponseData<UserListData>>('/user/query_user_list', {
    params: { pageNum, pageSize, name },
  })
}

// 增加用户
export const createUser = (params: Omit<User, 'userId'>) => {
  const { userName, phone, password, roleId } = params
  return axios.post<ResponseData<number>>('/user/create_user', {
    name: userName,
    phone,
    password: password ? formatPw(password) : '',
    role_id: roleId,
  })
}
// 修改用户
export const updateUser = (params: User) => {
  const { userId, userName, phone, password, roleId } = params
  return axios.post<ResponseData<number>>('/user/update_user', {
    id: userId,
    name: userName,
    phone,
    password: password ? formatPw(password) : '',
    role_id: roleId,
  })
}
// 删除用户
export const deleteUser = (userId: number) => {
  return axios.post<ResponseData<null>>('/user/delete_user', { id: userId })
}
