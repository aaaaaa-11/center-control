import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import config from '@/config'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()

export interface NavItem {
  name: string
  routeName?: string
  auth: string
  link?: string
  showChildren?: boolean
  children?: Array<NavItem>
}
const navData: NavItem[] = JSON.parse(JSON.stringify(config.navList))
navData.map((n) => {
  if (n.children) {
    n.showChildren = false
  }
})
export const useNavStore = defineStore('nav', () => {
  const manuList = computed((): NavItem[] => {
    return navData.filter((n) => {
      if (n.children?.length) {
        n.children = n.children.filter(
          (c) => !c.auth || userStore.permission.includes(`${c.auth}:view`)
        )
        return n.children?.length
      } else {
        return !n.auth || userStore.permission.includes(`${n.auth}:view`)
      }
    })
  })
  return {
    manuList,
  }
})
