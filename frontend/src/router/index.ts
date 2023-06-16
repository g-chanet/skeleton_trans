import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import ViewLogin from "../views/auth/login.vue"
import ViewSignIn from "../views/auth/signin.vue"
import ViewDashboard from "../views/app/dashboard/index.vue"

const routes: Array<RouteRecordRaw> = [
    {
      path: `/login`,
      component: ViewLogin
    },
    {
      path: `/singin`,
      component: ViewSignIn
    },
    {
      path: `/dashboard`,
      component: ViewDashboard
    }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  next()
})

export { router }