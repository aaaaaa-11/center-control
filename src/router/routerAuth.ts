import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()

export default function getRouterAuth (auth?: string) {
  return !auth || userStore.permission.includes(`${auth}:view`)
}