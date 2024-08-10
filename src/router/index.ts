import { createRouter, createWebHashHistory, RouteRecordRaw, } from "vue-router"

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'demo2',
    component: () => import('@/view/Index/index.vue'),
    meta: {
      title: 'demo2',
      hidden: true,
      hiddenTab: true,
    },
  },
  {
    path: '/List',
    name: 'demo1',
    component: () => import('@/view/List/index.vue'),
    meta: {
      title: 'List',
      hidden: true,
      hiddenTab: true,
    }
  },
  {
    path: '/Detail',
    name: 'demo3',
    component: () => import('@/view/Detail/index.vue'),
    meta: {
      title: 'List',
      hidden: true,
      hiddenTab: true,
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0,
  }),
  routes: constantRoutes,
});

export default router;