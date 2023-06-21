<template>
  <div class="nav-bar-container">
    <div class="top">
    <div class="panel-blur button-container">
      <el-button class="button" text @click="pushHome" :class="{selected: homeIsSelected}">
          <font-awesome-icon icon="gauge"></font-awesome-icon>
      </el-button>
    </div>
    <div class="panel-blur button-container">
      <el-button class="button" text @click="pushMessages" :class="{selected: messagesIsSelected}">
        <font-awesome-icon icon="paper-plane"></font-awesome-icon>
      </el-button>
    </div>
    <div class="panel-blur button-container">
      <el-button class="button" text @click="pushLeaderBoard" :class="{selected: leaderBoardIsSelected}">
        <font-awesome-icon icon="fa-ranking-star"></font-awesome-icon>
      </el-button>
    </div>
    <div class="panel-blur button-container">
      <el-button class="button" text @click="pushProfile" :class="{selected: profileIsSelected}">
        <font-awesome-icon icon="user"></font-awesome-icon>
      </el-button>
    </div>
    </div>
    <div class="bottom">
      <div class="panel-blur button-container">
        <el-button class="button" text @click="disconnected" >
          <font-awesome-icon icon="power-off"></font-awesome-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogoutMutation } from '@/graphql/graphql-operations'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import {computed} from "vue"

const route = useRoute()
const router = useRouter()

const pushHome = () => router.push(`/app/home`)
const pushMessages = () => router.push(`/app/messages`)
const pushLeaderBoard = () => router.push(`/app/leaderboard`)
const pushProfile = () => router.push(`/app/profile`)


const homeIsSelected = computed(() => route.fullPath.startsWith(`/app/home`))
const messagesIsSelected = computed(() =>  route.fullPath.startsWith(`/app/messages`))
const leaderBoardIsSelected = computed(() =>  route.fullPath.startsWith(`/app/leaderboard`))
const profileIsSelected = computed(() => route.fullPath.startsWith(`/app/profile`))

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
  padding-bottom: 20px
  box-sizing: border-box
  justify-content: space-between
  .button-container
    height: 50px
    width: 50px
    border-radius: var(--el-border-radius-base) !important
    .button
      margin: 0
      height: 50px
      width: 50px
      transition: all 0.3s ease
      position: relative
      overflow: hidden
      border-radius: var(--el-border-radius-base) !important
      transition: 128ms color, 128ms box-shadow
    .button:hover
      color: var(--el-color-primary)
    .button.selected
      color: var(--el-color-primary)
      box-shadow: var(--my-box-shadow)
.top
  display: flex
  flex-direction: column
  gap: 20px
.bottom
  display: flex
  flex-direction: column
  gap: 20px
</style>
