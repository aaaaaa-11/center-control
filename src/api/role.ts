import axios from './index'
type RoleListParams = {
  pageNum: number,
  pageSize: number,
  name?: string // 角色名称，模糊查询
}
// 获取角色列表
export const queryRoleList = (params: RoleListParams) => {
  const { pageNum, pageSize, name = '' } = params
  return axios.get('/role/query_role_list', {
    params: { pageNum, pageSize, name }
  })
}
// 增加角色
type RoleItem = {
  parent_id: number,
  title: string,
  id?: number
}
export const createRole = (params: RoleItem) => {
  const { parent_id, title } = params
  return axios.post('/role/create_role', { parent_id, name: title })
}
// 修改角色
export const updateRole = (params: RoleItem) => {
  const { parent_id, title, id } = params
  return axios.post('/role/update_role', { parent_id, name: title, id })
}
// 删除角色
export const deleteRole = (id: number) => {
  return axios.post('/role/delete_role', { id })
}



