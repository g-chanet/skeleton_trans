<template>
  <el-container class="container-app">
    <el-aside class="aside">
      <NavBar />
    </el-aside>
    <el-container class="center">

      <router-view class="center-main" />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import NavBar from './navBar/index.vue'
</script>

<style scoped lang="sass">
.container-app
  position: relative
  height: 95%
  width: 95%
  background: #b000ff
  border-radius: 20px
  // background: linear-gradient(6deg, rgba(233,172,99,1) 0%, rgba(221,146,111,1) 100%)
  .aside
    width: 80px
  .center
    position: relative
    background: #c700b5
    backdrop-filter: blur(20px)
    border-radius: 20px
  .center-main
      position: relative
      padding: 20px
      
</style>
