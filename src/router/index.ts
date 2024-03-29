import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      redirect: {
        name: 'mainpage',
      },
      children: [
        {
          path: '/main',
          name: 'mainpage',
          component: () => import('@/views/Mainpage/Index.vue'),
          meta: {
            auth: 'mainpage',
          },
        },
        {
          path: '/datacenter',
          name: 'datacenter',
          component: () => import('@/views/DataCenter/Index.vue'),
          meta: {
            auth: 'datacenter',
          },
        },
        {
          path: '/camera',
          name: 'camera',
          component: () => import('@/views/Camera/Index.vue'),
          meta: {
            auth: 'camera',
          },
        },
        {
          path: '/regionMgt',
          name: 'regionMgt',
          component: () => import('@/views/RegionMgt/Index.vue'),
          meta: {
            auth: 'regionMgt',
          },
        },
        {
          path: '/deviceMgt',
          name: 'deviceMgt',
          component: () => import('@/views/DeviceMgt/Index.vue'),
          meta: {
            auth: 'deviceMgt',
          },
        },
        {
          path: '/accountMgt',
          name: 'accountMgt',
          component: () => import('@/views/AccountMgt/Index.vue'),
          meta: {
            auth: 'accountMgt',
          },
        },
        {
          path: '/roleMgt',
          name: 'roleMgt',
          component: () => import('@/views/RoleMgt/Index.vue'),
          meta: {
            auth: 'roleMgt',
          },
        },
        {
          path: '/log',
          name: 'log',
          component: () => import('@/views/Log/Index.vue'),
          meta: {
            auth: 'log',
          },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const getRouterAuth = await import('./routerAuth')

  const el = document.getElementById('loading-page')
  if (el) {
    el.style.display = ''
  }

  if (to.name === 'login') {
    next()
  } else if (getRouterAuth.default(to.meta.auth as string | undefined)) {
    next()
  } else {
    next({
      name: 'login',
    })
  }
})
router.afterEach((to, from) => {
  const el = document.getElementById('loading-page')
  if (el) {
    el.style.display = 'none'
  }
})

export default router
