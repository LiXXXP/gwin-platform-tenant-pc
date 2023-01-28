import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import appRoutes from './app.router'
import { setTitle } from '@/utils/index'
import { getPageTitle } from '@/utils/get-page-title'

const routes: Array<RouteRecordRaw> = [...appRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to: any, from, next) => {
  /* 设置title */
  if (to.meta.title) {
    const title = getPageTitle(to.meta.title)
    setTitle(title)
  }
  next()
})

export default router
