<template>
  <el-container class="container-app">
    <el-aside class="aside">
      <NavBar />
    </el-aside>
    <el-container class="center">
      <div class="center-background" />

      <router-view class="center-main" />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import NavBar from './navBar/index.vue'
</script>

<style scoped lang="sass">
.container-app
  height: 100%
  width: 100
  // background: rgb(233,172,99)
  // background: linear-gradient(6deg, rgba(233,172,99,1) 0%, rgba(221,146,111,1) 100%)
  .aside
    width: 80px
  .center
    position: relative
    .center-background
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgb(255,255,255,0.1)
      // background: linear-gradient(90deg,  rgba(28,28,30,0.9) 24%, rgba(64,69,73,1) 99%)
      border-top-left-radius: 20px
      border-bottom-left-radius: 20px
      backdrop-filter: blur(20px)
    .center-main
      position: relative
      padding: 20px
</style>
