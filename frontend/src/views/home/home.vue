<template>
  <div class="full">
    <el-container>
      <el-aside width="200px">
		<img class="logo" src="../../assets/translogo_whitesvg.svg">
	  </el-aside>
      <el-container>
        <el-header class="top-menu">Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
  <script setup lang="ts">

  </script>
  
  <style scoped lang="sass">
.full
  height: 100%
  width: 100%
  position: fixed
  top: 0
  left: 0
  display: flex
  background-color: #141d2b
  .top-menu
      height: 5%
      width: 100%
      background-color: black

  .logo
    width: 150px
    align-self: center
  </style>