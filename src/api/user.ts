import { formatPw } from '@/utils/format'
import axios from './index'
type UserListParams = {
  pageNum: number
  pageSize: number
  name?: string // 用户名称，模糊查询
}
// 获取用户列表
export const queryUserList = (params: UserListParams) => {
  const { pageNum, pageSize, name = '' } = params
  return axios.get('/user/query_user_list', {
    params: { pageNum, pageSize, name },
  })
}
// 增加用户
export const createUser = (params: User) => {
  const { userName, phone, password, roleId } = params
  return axios.post('/user/create_user', {
    name: userName,
    phone,
    password: password ? formatPw(password) : '',
    role_id: roleId,
  })
}
// 修改用户
export const updateUser = (params: User) => {
  const { userId, userName, phone, password, roleId } = params
  return axios.post('/user/update_user', {
    id: userId,
    name: userName,
    phone,
    password: password ? formatPw(password) : '',
    role_id: roleId,
  })
}
// 删除用户
export const deleteUser = (userId: number) => {
  return axios.post('/user/delete_user', { id: userId })
}
