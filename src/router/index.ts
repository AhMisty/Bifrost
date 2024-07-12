import { createRouter, createWebHistory } from 'vue-router'
import np from '@/progress'
import XlViewIndex from '@/view/index'
import XlViewHome from '@/view/home'

export const navRoutes = [
  "home",
  "bifrost",
  "atlas",
  "piazza",
  "setting",
]
export const keepAliveRoutes = [
  XlViewIndex.name as string,
  XlViewHome.name as string,
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      meta: {
      },
      component: XlViewIndex,
    },
    {
      path: "/home",
      name: "home",
      meta: {
      },
      component: XlViewHome,
    },
    {
      path: "/bifrost",
      name: "bifrost",
      meta: {
      },
      component: XlViewIndex,
    },
    {
      path: "/atlas",
      name: "atlas",
      meta: {
      },
      component: XlViewIndex,
    },
    {
      path: "/piazza",
      name: "piazza",
      meta: {
      },
      component: XlViewIndex,
    },
    {
      path: "/setting",
      name: "setting",
      meta: {
      },
      component: XlViewIndex,
    },
  ],
})

router.beforeEach(() => {
  np.start()
})

router.afterEach(() => {
  np.done()
})

export default router