<template>
  <div class="leaderboard-container">
    <div class="podium">
      <span class="top">TOP CHALLENGERS</span>
      <div class="podium-wrapper">
        <div class="Joueur2 panel-blur" >Joueur 2
          <span class="avatar"></span>
          <span class="username">USERNAME</span>
          <span><font-awesome-icon :icon="['fasr', 'award']" size="2xl" style="color: #bdbdbd;" /></span>
        </div>
        <div class="Joueur1 panel-blur" >Joueur 1
          <span class="avatar"></span>
          <span class="username">USERNAME</span>
          <span><font-awesome-icon :icon="['fasr', 'award']" size="2xl" style="color: #ffd700;" /></span>
        </div>
        <div class="Joueur3 panel-blur" >Joueur 3
          <span class="avatar"></span>
          <span class="username">USERNAME</span>
          <span><font-awesome-icon :icon="['fasr', 'award']" size="2xl" style="color: #bf8970;" /></span>
        </div>
      </div>
    </div>
    <div class="general-leaderboard">
      <span class="top">LEADERBOARD</span>
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

.general-leaderboard
  display: flex
  flex-direction: column
  align-items: center
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

.avatar
  background-image: url('../../src/assets/temp.jpg')
  background-repeat: no-repeat
  width: 35%
  height: 50%
  border-radius: 0%

.top
  padding-bottom: 1%
  z-index: 2
  left: 8%
  position: relative
  font-family: "Vaporfuturism", "Helvetica", sans-serif
  letter-spacing: -9px
  transform: rotate(-4deg) skew(-3deg) translateX(-50%) scaleX(1.4)
  background: linear-gradient(to bottom, #18191a 32%, #157be6 40%, #ffffff 52%, #18191a 56%, #157be6 85%, #ffffff, rgba(222,0,255,1) 0%, rgba(94,214,249,1) 100%)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  -webkit-text-stroke-width: 1px
  -webkit-text-stroke-color: #FFF
  font-size: 4em
.scroll
  height: 100%
  width: 90%
  .leaderboard-scroll
    background-color: rgba(0, 0, 0, 0.5)
    backdrop-filter: blur(10px)
</style>
