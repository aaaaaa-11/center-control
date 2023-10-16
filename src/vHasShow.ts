import type { Directive } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()

const vHasShow: Directive<HTMLElement, string> = (el, bindings) => {
  // 要求admin权限 或者 没有按钮权限，不显示该元素
  if (
    (bindings.arg === 'admin' && !userStore.userInfo.admin) ||
    !userStore.permission.includes(bindings.value)
  ) {
    el.style.display = 'none'
  }
}

export default vHasShow
