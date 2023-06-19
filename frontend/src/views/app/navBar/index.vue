<template>
  <div class="nav-bar-container">
    <div class="top">
      <el-button class="button" text @click="pushHome">
        <span class="button-text">
          <font-awesome-icon icon="gauge"></font-awesome-icon>
        </span>
      </el-button>
      <el-button class="button" text @click="pushMessages">
        <font-awesome-icon icon="paper-plane"></font-awesome-icon>
      </el-button>
      <el-button class="button" text @click="pushLeaderBoard">
        <font-awesome-icon icon="fa-ranking-star"></font-awesome-icon>
      </el-button>
      <el-button class="button" text @click="pushProfile">
        <font-awesome-icon icon="user"></font-awesome-icon>
      </el-button>
    </div>
    <div class="bottom">
      <el-button class="button" text @click="disconnected">
        <font-awesome-icon icon="power-off"></font-awesome-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogoutMutation } from '@/graphql/graphql-operations'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const pushHome = () => router.push(`/app/home`)
const pushMessages = () => router.push(`/app/messages`)
const pushLeaderBoard = () => router.push(`/app/leaderboard`)
const pushProfile = () => router.push(`/app/profile`)

const { mutate } = useLogoutMutation()
const disconnected = async () => {
  mutate().then(() => {
    router.replace(`/login`)
  })
}
</script>

<style scoped lang="sass">
.nav-bar-container
    height: 100%
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 20px
    padding-bottom :20px
    box-sizing: border-box
    justify-content: space-between
.top
    display: flex
    flex-direction: column
    gap: 20px
.bottom
    display: flex
    flex-direction: column
    gap: 20px
.button
  margin: 0
  height: 40px
  width: 40px
  transition: all 0.3s ease
  position: relative
  overflow: hidden
  border-radius: 50%

.button::before,
.button:hover::before
  content: ""
  position: absolute
  width: calc(100% + 8px)
  height: calc(100% + 8px)
  top: -4px
  left: -4px
  box-sizing: border-box
  border: 4px solid transparent
  border-radius: 50%
  pointer-events: none
  transition: all 0.3s
  z-index: -1
  opacity: 0

.button:hover::before
  opacity: 1
  border-color: #00ff00
  box-shadow: 0 0 30px #00ff00, 0 0 60px #00ff00
  animation: neon-snake-animation 1.5s infinite

@keyframes neon-snake-animation
  0%
    transform: translate(0, 0)
    box-shadow: 0 0 30px #00ff00, 0 0 60px #00ff00
  50%
    transform: translate(8px, 8px)
    box-shadow: 0 0 30px #00ff00, 0 0 60px #00ff00
  100%
    transform: translate(0, 0)
    box-shadow: 0 0 30px #00ff00, 0 0 60px #00ff00
</style>