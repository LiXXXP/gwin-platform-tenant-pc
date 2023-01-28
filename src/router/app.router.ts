import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const appRoutes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/tenant/index'
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403.vue')
  },
  {
    path: '/tenant',
    component: Layout,
    name: 'Tenant',
    redirect: '/tenant/index',
    children: [
      {
        path: 'index',
        name: 'TenantIndex',
        component: () => import('@/views/tenant/index.vue'),
        meta: {
          title: '切换企业',
          requireAuth: true // 需要登录
        }
      },
      {
        path: 'create',
        name: 'TenantCreate',
        component: () => import('@/views/tenant/create.vue'),
        meta: {
          title: '创建新企业',
          requireAuth: true // 需要登录
        }
      },
      {
        path: 'noentry',
        name: 'NoEntry',
        component: () => import('@/views/tenant/no-entry.vue'),
        meta: {
          title: '无法进入企业',
          requireAuth: true // 需要登录
        }
      }
    ]
  }
]

export default appRoutes
