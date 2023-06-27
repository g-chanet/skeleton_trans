<template>
  <div class="home-container">
    <div class="actions-container">
      <el-button class="btn-5"><span>Join Matchmaking</span></el-button>
      <el-button class="btn-5"><span>Create Game</span></el-button>
    </div>
    <h1>Parties en Cours</h1>
    <div class="waiting-room">
      <div>Salles en attente de joueurs</div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 5" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
    </div>
    <h1>Dernières Parties</h1>
    <div class="last-game-list">
      <div class="last-game">
      lastGame1
      </div>
      <div class="last-game">
      lastGame2
      </div>
      <div class="last-game">
      lastGame3
      </div>
      <div class="last-game">
      lastGame4
      </div>
      <div class="last-game">
      lastGame5
      </div>
      <div class="last-game">
      lastGame1
      </div>
      <div class="last-game">
      lastGame2
      </div>
      <div class="last-game">
      lastGame3
      </div>
      <div class="last-game">
      lastGame4
      </div>
      <div class="last-game">
      lastGame5
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<!-- const onCreateRoom = () => {
  window.location.href = `/game/lobby`
}

const onJoinMatchmaking = () => {
  window.location.href = `/game/matchmaking`
} -->

<style scoped lang="sass">
.home-container
  width: 100%
  display: flex
  flex-direction: column
  .waiting-room
    display: flex
    gap: 20px
    width: 100%
    div
      background-color: red
      flex: 1
      height: 400px
  .actions-container
    display: flex
    gap: 20px
    width: 100%
    justify-content: space-around
    div
      flex: 1
      height: 80px
  .last-game-list
    display: flex
    flex-direction: column
    gap:20px
    flex:1
    overflow-y: scroll
    .last-game
      min-height: 40px
      background-color: green

.el-carousel__item h3
  color: #475669
  opacity: 0.75
  line-height: 200px
  margin: 0
  text-align: center

.el-carousel__item:nth-child(2n)
  background-color: #99a9bf

.el-carousel__item:nth-child(2n + 1)
  background-color: #d3dce6

.btn-5
  font-family: OutRun
  width: 25%
  height: 100%
  margin: 10px
  color: var(--el-color-primary)
  font-size: 40px
  border-color: transparent
  background: transparent
  .span
    transition: text-shadow 0.3s ease
  &:hover
    span
      text-stroke: 1px rgba(rgb(255, 66, 255), 0.5)
      text-shadow: 0 0 5px rgba(rgb(255, 66, 255), 0.9), 0 0 10px rgba(rgb(255, 66, 255), 0.8), 0 0 20px rgba(rgb(255, 66, 255), 0.7), 0 0 40px rgba(rgb(255, 66, 255), 0.6), 0 0 80px rgba(rgb(255, 66, 255), 0.5), 0 0 120px rgba(rgb(255, 66, 255), 0.4)

</style>
