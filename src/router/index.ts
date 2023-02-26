import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import { useUserStore } from '@/stores/useUserStore'
import type { Permission } from '@/stores/useUserStore'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: {
        name: 'mainpage'
      },
      children: [
        {
          path: '/main',
          name: 'mainpage',
          component: () => import('@/views/Mainpage/Index.vue'),
          meta: {
            auth: 'mainpage'
          }
        }
      ]
    },
  ]
})

router.beforeEach((to, from ,next) => {
  const userStore = useUserStore()
  if (to.name === 'login') {
    next()
  } else if (!to.meta.auth || userStore.permission[to.meta.auth as keyof Permission]) {
    next()
  } else {
    next({
      name: 'login'
    })
  }
})

export default router
