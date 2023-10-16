import axios from './index'
type RoleListParams = {
  pageNum: number
  pageSize: number
  name?: string // 角色名称，模糊查询
}
// 获取权限列表
export const queryPermissionList = () => {
  return axios.get('/permission/query_permission_list')
}
// 获取角色列表
export const queryRoleList = (params: RoleListParams) => {
  const { pageNum, pageSize, name = '' } = params
  return axios.get('/role/query_role_list', {
    params: { pageNum, pageSize, name },
  })
}
// 增加角色
type RoleItem = Omit<Role, 'roleId'>
export const createRole = (params: RoleItem) => {
  const { roleName, permission } = params
  return axios.post('/role/create_role', { name: roleName, permission })
}
// 修改角色
export const updateRole = (params: Role) => {
  const { roleId, roleName, permission } = params
  return axios.post('/role/update_role', {
    id: roleId,
    name: roleName,
    permission,
  })
}
// 删除角色
export const deleteRole = (roleId: number) => {
  return axios.post('/role/delete_role', { id: roleId })
}
