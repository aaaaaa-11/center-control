import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import { useUserStore } from '@/stores/useUserStore'
import type { Permission } from '@/stores/useUserStore'
import ls from '@/localStore'

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
        },
        {
          path: '/datacenter',
          name: 'datacenter',
          component: () => import('@/views/DataCenter/Index.vue'),
          meta: {
            auth: 'datacenter'
          }
        },
        {
          path: '/camera',
          name: 'camera',
          component: () => import('@/views/Camera/Index.vue'),
          meta: {
            auth: 'camera'
          }
        },
        {
          path: '/regionMgt',
          name: 'regionMgt',
          component: () => import('@/views/RegionMgt/Index.vue'),
          meta: {
            auth: 'regionMgt'
          }
        },
        {
          path: '/deviceMgt',
          name: 'deviceMgt',
          component: () => import('@/views/DeviceMgt/Index.vue'),
          meta: {
            auth: 'deviceMgt'
          }
        },
        {
          path: '/accountMgt',
          name: 'accountMgt',
          component: () => import('@/views/AccountMgt/Index.vue'),
          meta: {
            auth: 'accountMgt'
          }
        },
        {
          path: '/roleMgt',
          name: 'roleMgt',
          component: () => import('@/views/RoleMgt/Index.vue'),
          meta: {
            auth: 'roleMgt'
          }
        },
        {
          path: '/log',
          name: 'log',
          component: () => import('@/views/Log/Index.vue'),
          meta: {
            auth: 'log'
          }
        },
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
