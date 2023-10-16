import { ref } from 'vue'
import { defineStore } from 'pinia'
import ls from '@/localStore'

export const useRoleStore = defineStore('role', () => {
  const userInfo = ref<User>({})
  const permission = ref<Permission>([])

  const clearUserInfo = () => {
    console.log('清空userinfo', ls.get('token'))
    ls.remove('token')
    userInfo.value = {}
    permission.value = []
  }

  return {
    userInfo,
    permission,
    clearUserInfo,
  }
})
