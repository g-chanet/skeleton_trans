import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import ViewLogin from "../views/auth/login.vue"
import ViewSignIn from "../views/auth/signin.vue"
import ViewHome from "../views/home/home.vue"
import { useAuthStore } from '@/stores/auth'


const routes: Array<RouteRecordRaw> = [
    {
      path: `/login`,
      component: ViewLogin
    },
    {
      path: `/signup`,
      component: ViewSignIn
    },
    {
      path: `/`,
      component: ViewHome
    }
  ]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  if (from.path === `/login` && to.path === `/signup`) return true

  else if (to.path !== `/login` && !authStore.isConnected) return `/login`

  else if ((to.path === `/login` || to.path === `/signup`) && authStore.isConnected) return `/home`
})

export { router }