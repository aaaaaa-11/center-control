import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import config from '@/config'
import getRouterAuth from '@/router/routerAuth'

export interface NavItem {
  name: string,
  routeName?: string,
  auth: string,
  link?: string,
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

  const manuList = computed(():NavItem[] => {
    return navData.filter(n => {
      if (n.children?.length) {
        n.children = n.children.filter(c => getRouterAuth(c.auth))
        return n.children?.length
      } else {
        return getRouterAuth(n.auth)
      }
    })
  })
  return {
    manuList,
  }
})
