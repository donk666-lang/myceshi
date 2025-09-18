import { createRouter, createWebHashHistory } from 'vue-router'

// 导入页面组件
import ChatPage from '@/views/ChatPage.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: ChatPage,
    meta: {
      title: 'bitFlyer',
      icon: 'chat'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      title: 'bitFlyer - Login',
      icon: 'login'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 动态设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

export default router
