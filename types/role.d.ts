/* 角色相关类型 */

interface Role {
  roleId: number
  roleName: string
  permission: Permission[]
  admin?: boolean
}
