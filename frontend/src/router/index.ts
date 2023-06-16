import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import ViewLogin from "../views/auth/login/login.vue"
import ViewSignIn from "../views/auth/signin/signin.vue"

import ViewApp from "../views/app/index.vue"
import ViewHome from "../views/app/home/index.vue"
import ViewMessages from "../views/app/messages/index.vue"
import ViewLeaderboard from "../views/app/leaderboard/index.vue"


const routes: Array<RouteRecordRaw> = [
    {
      path: `/app`,
      component: ViewApp,
      children: [
        {
          path: `home`,
          component: ViewHome
        },
        {
          path: `messages`,
          component: ViewMessages
        },
        {
          path: `leaderboard`,
          component: ViewLeaderboard
        }
      ]
    },
    {
      path: `/login`,
      component: ViewLogin
    },
    {
      path: `/signup`,
      component: ViewSignIn
    }
  ]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // if (from.path === `/login` && to.path === `/signup`) return true

  // else if (to.path !== `/login` && !authStore.isConnected) return `/login`

  // else if ((to.path === `/login` || to.path === `/signup`) && authStore.isConnected) return `/home`
})

export { router }