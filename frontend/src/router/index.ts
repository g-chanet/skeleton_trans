import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import ViewLogin from "../views/auth/login.vue"
import ViewSignIn from "../views/auth/signin.vue"
import ViewHome from "../views/home/home.vue"


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
      path: `/home`,
      component: ViewHome
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