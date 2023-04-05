import { createRouter, createWebHistory } from 'vue-router'
import TestView from '../views/test/index.vue'
import HomeView from '../views/home/index.vue'
import GameView from '../views/game/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game/:gameId',
      name: 'game',
      component: GameView
    },
    {
      path: '/test',
      name: 'game',
      component: TestView
    },
  ]
})

export default router
