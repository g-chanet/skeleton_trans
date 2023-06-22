<template>
  <div class="profile-container">
    <h1>PROFILE</h1>
  <div class="resume-wrapper">
    <div class="avatar">AVATAR</div>
    <div class="pseudo">PSEUDO</div>
  </div>
  <div class="info">
    <div class="graphs-wrapper">
     <div class="graph">GRAPH 1</div>
     <div class="graph">GRAPH 2</div>
     <div class="graph">GRAPH 3</div>
      <div class="graph">GRAPH 4</div>
    </div>
    <el-scrollbar class="scroll">
     <p v-for="item in 10" :key="item" class="history-scroll">{{ item }}</p>
    </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
  display: flex
  flex-direction: row
  background: var(--el-color-primary-light-3)
  .graphs-wrapper
    height: 100%
    width: 60%
    display: flex
    flex-direction: column
    align-items: left
    background: green
  .history-scroll
    height: 100%
    width: 40%
    display: flex
    flex-direction: column
    min-height: 80px
    text-align: center
    border-radius: 4px
    background: var(--el-color-primary-light-9)
    color: var(--el-color-primary)
    justify-content: center
</style>
