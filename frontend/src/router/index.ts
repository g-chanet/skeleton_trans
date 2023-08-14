import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import ViewLogin from "../views/auth/login/login.vue"
import ViewSignIn from "../views/auth/signin/signin.vue"

import ViewApp from "../views/app/index.vue"
import ViewHome from "../views/app/home/index.vue"
import ViewMessages from "../views/app/channels/index.vue"
import ViewLeaderboard from "../views/app/leaderboard/index.vue"
import ViewProfile from "../views/app/profile/index.vue"
import ViewGameLocal from "../views/game/local/index.vue"
import ViewGameOnline from "../views/game/online/index.vue"

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
        path: `channel`,
        component: ViewMessages
      },
      {
        path: `leaderboard`,
        component: ViewLeaderboard
      },
      {
        path: `profile`,
        component: ViewProfile
      },
      {
        path: `game/local`,
        component: ViewGameLocal
      },
      {
        path: `game/online/:roomId`,
        component: ViewGameOnline
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
  },
  { path: `/:pathMatch(.*)*`, component: ViewApp }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }