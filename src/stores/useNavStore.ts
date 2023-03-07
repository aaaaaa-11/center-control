import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore, type Permission } from './useUserStore'
import config from '@/config'

export type NavItem = {
  name: string,
  routeName?: string,
  link?: string,
  auth: string,
  showChildren?: boolean,
  children?: Array<NavItem>
}
const navData: NavItem[] = JSON.parse(JSON.stringify(config.navList))
navData.map(n => {
  if (n.children) {
    n.showChildren = false
  }
})
export const useNavStore = defineStore('nav', () => {
  const { permission } = useUserStore()

  const manuList = computed(():NavItem[] => {
    return navData.filter(n => {
      if (n.children?.length) {
        n.children = n.children.filter(c => !c.auth || permission[c.auth as keyof Permission])
        return n.children?.length
      } else {
        return !n.auth || permission[n.auth as keyof Permission]
      }
    })
  })
  return {
    manuList,
  }
})
