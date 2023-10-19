import { ref } from 'vue'
import { defineStore } from 'pinia'
import ls from '@/localStore'

export const useUserStore = defineStore('user', () => {
  const visitInfo = ref<number>(0) // 用户访问次数

  const userInfo = ref<User | {}>({})
  const permission = ref<Permission[]>([])

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
    visitInfo,
  }
})
