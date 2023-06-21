<template>
  <div class="leaderboard-container">
    <div class="podium">
      <h1>PODIUM</h1>
      <div class="podium-wrapper">
        <div class="Joueur2" >Joueur 2</div>
        <div class="Joueur1" >Joueur 1</div>
        <div class="Joueur3" >Joueur 3</div>
      </div>
    </div>
    <div class="general-leaderboard">
        <h1>LEADERBOARD</h1>
        <el-scrollbar class="scroll">
          <p v-for="item in 20" :key="item" class="leaderboard-scroll">{{ item }}</p>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">

.leaderboard-container
  width: 100%
  display: flex
  flex-direction: column
  align-items:center

.podium
  height: 50%
  display: flex
  flex-direction: column
  align-items: center
  background: var(--el-color-primary-light-5)
  .podium-wrapper
    height: 100%
    width: 100%
    display: flex
    flex-direction: row
    .Joueur1
      display: flex
      align-items: center
      justify-content: center
      background: red
      height: 80%
      width: 100%
    .Joueur2
      margin-top: 2.5%
      display: flex
      align-items: center
      justify-content: center
      background: green
      height: 80%
      width: 75%
    .Joueur3
      margin-top: 2.5%
      display: flex
      align-items: center
      justify-content: center
      background: blue
      height: 80%
      width: 75%

.general-leaderboard
  display: flex
  flex-direction: column
  align-items: center
  background: var(--el-color-primary-light-7)
  height: 50%
  .leaderboard-scroll
    display: flex
    flex-direction: column
    align-items: center
    min-height: 80px
    text-align: center
    border-radius: 4px
    background: var(--el-color-primary-light-9)
    color: var(--el-color-primary)
    justify-content: center
.scroll
  height: 100%
  width: 90%
</style>
