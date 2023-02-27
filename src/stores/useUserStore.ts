import { ref } from 'vue'
import { defineStore } from 'pinia'
import ls from '@/localStore';

type User = {
  userId?: number;
  userName?: string;
  roleId?: number;
  phone?: string;
  roleName?: string;
}

export const enum PermissionHooks {
  HOME = 'home',
  CAMERA = 'camera',
  DATACENTER = 'datacenter',
}
export type Permission = {
  [PermissionHooks.HOME]?: Number,
  [PermissionHooks.CAMERA]?: Number,
  [PermissionHooks.DATACENTER]?: Number,
}
export const useUserStore = defineStore('user', () => {

  const visitInfo = ref<number>(0)

  const userInfo = ref<User>({})
  const permission = ref<Permission>({})

  const clearUserInfo = () => {
    console.log('清空userinfo');
    ls.remove('token')
    window.localStorage.removeItem('cc-demo__token')
    userInfo.value = {}
    permission.value = {}
  }

  return {
    userInfo,
    permission,
    clearUserInfo,
    visitInfo
  }
})
