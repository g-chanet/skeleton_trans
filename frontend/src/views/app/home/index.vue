<template>
  <div class="home-container">
  
    <h1 style="margin-top:0">Parties en cours</h1>
    <div class="resume-current-game-container">
      <div>partie1</div>
      <div>partie2</div>
      <div>partie3</div>
    </div>
    <h1>Actions</h1>
    <div class="actions-container">
      <div>
        Create game
      </div>
      <div>
        Join matchmeking
      </div>
    </div>
    <h1>Derniers parties</h1>
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

<style scoped lang="sass">
.home-container
  width: 100%
  display: flex
  flex-direction: column
  .resume-current-game-container
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
    div
      background-color: blue
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

</style>
