<template>
  <div class="profile-container">
    <div class="resume-wrapper">
      <div class="avatar">
        <profileProfilePictureComponentVue>
          
        </profileProfilePictureComponentVue>
      </div>
      <div class="pseudo">SETTINGS...../OR/.....ADD AS A FRIEND + CHAT + CHALLENGE</div>
    </div>
    <div class="info">
      <div class="graphs">
        <div class="graphs-wrapper1">
          <div class="graph">WINRATE</div>
          <div class="graph">NB DE WIN/LOSE</div>
        </div>
        <div class="graphs-wrapper2">
          <div class="graph">PLACE AU LEADERBOARD</div>
          <div class="graph">ALED</div>
        </div>
      </div>
      <el-scrollbar class="scroll">
        <p v-for="item in 10" :key="item" class="history-scroll">{{ item }}</p>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import profileProfilePictureComponentVue from "./components/profileProfilePictureComponent.vue"
import { computed, ref } from "vue"
import { useRouter } from 'vue-router'
</script>

<style scoped lang="sass">

.profile-container
  width: 100%
  display: flex
  flex-direction: column

.resume-wrapper
  height: 50%
  display: flex
  flex-direction: column
  align-items: center
  background: var(--el-color-primary-light-5)
  .avatar
    display: flex
    align-items: center
    justify-content: center
    background: red
    height: 70%
    width: 100%
  .pseudo
    display: flex
    align-items: center
    justify-content: center
    background: blue
    height: 30%
    width: 100%

.info
  height: 50%
  width: 100%
  display: flex
  flex-direction: row
  background: transparent
  gap: 20px
.graphs
  height: 100%
  width: 60%
  display: flex
  flex-direction: row
  background: var(--el-color-primary-light-3)
  .graphs-wrapper1
    height: 100%
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-evenly
    background: green
  .graphs-wrapper2
    height: 100%
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-evenly
    background: green

.history-scroll
  display: flex
  flex-direction: column
  align-items: center
  min-height: 80px
  text-align: center
  border-radius: 4px
  background: var(--el-color-primary-light-9)
  color: var(--el-color-primary)
  justify-content: center
  top: 0
  left: 0
.scroll
  height: 100%
  width: 40%
</style>
