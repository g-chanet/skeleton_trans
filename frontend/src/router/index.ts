import { createRouter, createWebHistory } from 'vue-router'

import ViewLogin from "@/views/auth/login.vue"
import ViewSignIn from "@/views/auth/signin.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/auth`,
      children : [
        {
          path: `/auth/login`,
          component: ViewLogin
        },
        {
          path: `/auth/singin`,
          component: ViewSignIn
        }
      ]
    },
    
  ]
})

export default router



//auth/login
