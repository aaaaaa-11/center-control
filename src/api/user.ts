import axios from './index'
type UserListParams = {
  pageNum: number,
  pageSize: number,
  name?: string // 用户名称，模糊查询
}
// 获取用户列表
export const queryUserList = (params: UserListParams) => {
  const { pageNum, pageSize, name = '' } = params
  return axios.get('/user/query_user_list', {
    params: { pageNum, pageSize, name }
  })
}
// 增加用户
type UserItem = {
  parent_id: number,
  title: string,
  id?: number
}
export const createUser = (params: UserItem) => {
  const { parent_id, title } = params
  return axios.post('/user/create_user', { parent_id, name: title })
}
// 修改用户
export const updateUser = (params: UserItem) => {
  const { parent_id, title, id } = params
  return axios.post('/user/update_user', { parent_id, name: title, id })
}
// 删除用户
export const deleteUser = (id: number) => {
  return axios.post('/user/delete_user', { id })
}



