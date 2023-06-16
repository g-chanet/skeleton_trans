<template>
  <div class="nav-bar-container">
    <div class="top">
      <el-button class="button" text @click="pushHome">
        <font-awesome-icon icon="gauge"
      /></el-button>
      <el-button class="button" text @click="pushMessages">
        <font-awesome-icon icon="paper-plane"
      /></el-button>
      <el-button class="button" text @click="pushLeaderBoard">
        <font-awesome-icon icon="user"
      /></el-button>
    </div>
    <div class="bottom">
      <el-button class="button" text @click="disconnected">
        <font-awesome-icon icon="power-off"
      /></el-button>
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
</style>
