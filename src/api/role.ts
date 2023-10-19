import axios from './index'
interface RoleListParams {
  pageNum: number
  pageSize: number
  name?: string // 角色名称，模糊查询
}

export interface RoleItem {
  roleId: number
  roleName: string
  permission: Permission[]
  admin?: boolean
}

type RoleListData = {
  list: RoleItem[]
  total: number
}

type PermissionListData = {
  label: string
  value: string
}
// 获取权限列表
export const queryPermissionList = () => {
  return axios.get<ResponseData<PermissionListData[]>>(
    '/permission/query_permission_list'
  )
}

// 获取角色列表
export const queryRoleList = (params: RoleListParams) => {
  const { pageNum, pageSize, name = '' } = params
  return axios.get<ResponseData<RoleListData>>('/role/query_role_list', {
    params: { pageNum, pageSize, name },
  })
}

// 增加角色
type AddRoleItem = Omit<Role, 'roleId'>
export const createRole = (params: AddRoleItem) => {
  const { roleName, permission } = params
  return axios.post<ResponseData<number>>('/role/create_role', {
    name: roleName,
    permission,
  })
}
// 修改角色
export const updateRole = (params: Role) => {
  const { roleId, roleName, permission } = params
  return axios.post<ResponseData<number>>('/role/update_role', {
    id: roleId,
    name: roleName,
    permission,
  })
}
// 删除角色
export const deleteRole = (roleId: number) => {
  return axios.post<ResponseData<null>>('/role/delete_role', { id: roleId })
}
