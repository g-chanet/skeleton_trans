<template>
  <div class="page-container">
    <el-container class="container-app" :class="{ 'mobile-layout': isMobile }">
      <el-aside class="aside" v-if="!isMobile">
        <NavBar/>
      </el-aside>
      <el-container class="center" :class="{ 'full-width': isMobile }">
        <div class="center-background panel-blur" v-if="!isMobile"/>
        <router-view class="center-main" />
      </el-container>
      <el-aside class="aside-mobile" v-if="isMobile">
        <NavBarMobile/>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavBar from './navBar/index.vue'
import NavBarMobile from './navBarMobile/index.vue'
import { ref, onMounted, watch } from 'vue'

const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

watch(isMobile, () => {
  document.body.style.overflow = 'hidden'
  setTimeout(() => {
    document.body.style.overflow = 'auto'
  }, 0)
})
</script>

<style scoped lang="sass">
.page-container
  height: 100%
  overflow-y: auto
  padding: 0px 0px 0px 0px
  border-radius: var(--el-border-radius-base)
  .container-app
    height: 100%
    padding: 0px 0px 0px 0px 
    border-radius: var(--el-border-radius-base)
    overflow-y: auto
    display: flex
    flex-direction: row
    .aside
      width: 80px
    .aside-mobile
      margin: 0 auto
      width: 100%
      position: absolute
      left: 37%
      transform: translateX(-50%, -50%)
    .center
      position: relative
      margin-right: 40px
      .center-background
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        border-radius: var(--el-border-radius-base)
      .center-main
        position: relative
      &.full-width
        flex: 1
        padding: 0px
        align-items: flex-start
        margin-right: 0px

        &.mobile-layout
          flex-direction: column
</style>
