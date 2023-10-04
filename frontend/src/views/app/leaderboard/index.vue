<template>
  <div class="leaderboard-container">
    <div class="podium">
      <span class="top">TOP CHALLENGERS</span>
      <div class="podium-wrapper">
        <div class="Joueur2 panel-blur" >Joueur 2
          <span class="avatar">
            <el-image style="height: 75%; background-size: cover; background-position: center; aspect-ratio: 1/1; border-radius: 100%;" fit="cover" :src=" userSecond?.avatarUrl"/>
          </span>
          <span class="username">{{ userSecond?.username }}</span>
          <span><font-awesome-icon :icon="['fasr', 'award']" size="2xl" style="color: #bdbdbd;" /></span>
        </div>
        <div class="Joueur1 panel-blur" >Joueur 1
          <span class="avatar">
            <el-image style="height: 75%; background-size: cover; background-position: center; aspect-ratio: 1/1; border-radius: 100%;" fit="cover" :src=" userFirst?.avatarUrl"/>
          </span>
          <span class="username">{{ userFirst?.username }}</span>
          <span><font-awesome-icon :icon="['fasr', 'award']" size="2xl" style="color: #ffd700;" /></span>
        </div>
        <div class="Joueur3 panel-blur" >Joueur 3
          <span class="avatar">
            <el-image style="height: 75%; background-size: cover; background-position: center; aspect-ratio: 1/1; border-radius: 100%;" fit="cover" :src=" userThird?.avatarUrl"/>
          </span>
          <span class="username">{{ userThird?.username }}</span>
          <span><font-awesome-icon :icon="['fasr', 'award']" size="2xl" style="color: #bf8970;" /></span>
        </div>
      </div>
    </div>
    <div class="general-leaderboard">
      <span class="top">LEADERBOARD</span>
        <el-scrollbar class="scroll">
          <div v-for="(item, index) in result?.findLeaderboardUserList" :key="item.id" class="leaderboard-scroll">
            <div>{{ index + 1}}.</div>
            <el-image style="height: 75%; background-size: cover; background-position: center; aspect-ratio: 1/1; border-radius: 100%;" fit="cover" :src=" item.avatarUrl"/>
            <p style="display:flex; width:20%; justify-content: center;">{{ item.username }}</p>
            <p>WINRATE</p>
            <p>ACHIEVEMENTS</p>
          </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useFindLeaderboardUserListQuery } from '@/graphql/graphql-operations'
import { computed } from 'vue'

const { result } = useFindLeaderboardUserListQuery()

const userFirst = computed(() => {
  return result.value?.findLeaderboardUserList.at(0)
})

const userSecond = computed(() => {
  return result.value?.findLeaderboardUserList.at(1)
})

const userThird = computed(() => {
  return result.value?.findLeaderboardUserList.at(2)
})

</script>

<style scoped lang="sass">

.leaderboard-container
  width: 100%
  display: flex
  flex-direction: column

.podium
  height: 50%
  display: flex
  flex-direction: column
  align-items: center
  .podium-wrapper
    height: 100%
    width: 100%
    display: flex
    flex-direction: row
    margin-bottom: -15px
    .Joueur1
      border: (--el-border)
      border-radius: 5%
      display: flex
      align-items: center
      justify-content: space-between
      overflow: hidden
      flex-direction: column
      height: 80%
      width: 100%
      background-color: rgba(0, 0, 0, 0.5)
      backdrop-filter: blur(10px)
      color: var(--el-color-primary)
    .Joueur2
      border: (--el-border)
      border-radius: 5%
      display: flex
      align-items: center
      justify-content: space-between
      overflow: hidden
      flex-direction: column
      margin-top: 2.5%
      height: 80%
      width: 100%
      color: var(--el-color-primary)
    .Joueur3
      border: (--el-border)
      border-radius: 5%
      display: flex
      align-items: center
      justify-content: space-between
      overflow: hidden
      flex-direction: column
      margin-top: 2.5%
      height: 80%
      width: 100%
      color: var(--el-color-primary)

.general-leaderboard
  display: flex
  flex-direction: column
  align-items: center
  height: 50%
  .leaderboard-scroll
    display: flex
    flex-direction: row
    margin-top: 1%
    height: 80px
    border-radius: var(--el-border-radius-base)
    background: var(--el-color-primary-light-9)
    color: var(--el-color-primary)
    align-items: center
    justify-content: space-around

.avatar
  height: 50%
  display: flex

.top
  font-size: 2.5em
  top: 45px
  font-family: "Vaporfuturism", "Helvetica", sans-serif
  color: #FA26F7
  text-transform: uppercase
  letter-spacing: -2px
  margin: 25px
  -webkit-text-stroke-width: 2px
  -webkit-text-stroke-color: #7b0080
.scroll
  height: 100%
  width: 90%
  .leaderboard-scroll
    background-color: rgba(0, 0, 0, 0.5)
    backdrop-filter: blur(10px)
</style>
