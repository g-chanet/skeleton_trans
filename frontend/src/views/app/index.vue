<template>
  <el-container class="container-app">
    <el-aside class="aside">
      <NavBar />
    </el-aside>
    <el-container class="center">
      <div class="center-background panel-blur" />

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
  padding: 20px 0px 20px 0px 
  border-radius: 20px
  margin:2.5%
  // background: linear-gradient(6deg, rgba(233,172,99,1) 0%, rgba(221,146,111,1) 100%)
  .aside
    width: 80px
  .center
    position: relative
    margin-right: 20px
    .center-background
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      border-radius: 20px
    .center-main
      position: relative
      padding: 20px
      
</style>
