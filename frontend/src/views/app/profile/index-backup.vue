<template>
  <div class="profile-container">
      <div class = "profile-header-container">
        <div class="profile-pic-wrapper">
          <profileProfilePictureComponentVue/>
          <div class="user-info-wrapper">
            <div class="username-and-button-wrapper">
              <h1 class="username-style">Vducoulo</h1>
              <div class="friend-button-wrapper">
                <el-button class="bt">Add Friend</el-button>
              </div>
            </div>
            <text>Player since 2 Months</text>
          </div>
        </div>
        <div class="right-side-profile-details">
          <div class="world-position-wrapper">
            <worldPositionRanker/>
          </div>
          <div class="xp-overlay-wrapper">
            <xpDisplayer/>
          </div>
        </div>
      </div>
      <div class="mainwidow-profile">
        <div class="togglers-buttons-wrapper">
          <el-button class="bt">Profile</el-button>
          <el-button class="bt">Parameters</el-button>
        </div>
          <div class="under-buttons-window">
            <div class="history-graph-wrapper">
              <div class="horizontal-graph-wrapper">
                <div class="single-graph-wrapper">
                  <gameHistoryGraph></gameHistoryGraph>
                </div>
                <div class="single-graph-wrapper">
                  <gameHistoryGraph></gameHistoryGraph>
                </div>
              </div>
              <div class="horizontal-graph-wrapper">
                <div class="single-graph-wrapper">
                  <gameHistoryGraph></gameHistoryGraph>
                </div>
                <div class="single-graph-wrapper">
                  <gameHistoryGraph></gameHistoryGraph>
                </div>
              </div>
            </div>
            <div class="debugdiv">
              <el-carousel direction="vertical" class="carousel-wrapper" type="card" :autoplay="false">
                <el-carousel-item v-for="item in 8" :key="item" class="carousel">
                  <lastGameItem/>
                </el-carousel-item>
              </el-carousel>
            </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import profileProfilePictureComponentVue from "./components/profileProfilePictureComponent.vue"
import aiChunk from "./components/aiChunk.vue"
import xpDisplayer from "./components/xpDisplayer.vue"
import worldPositionRanker from "./components/worldPositionRanker.vue"
import lastGameItem from "./components/lastGameItem.vue"
import gameHistoryGraph from "./components/game-history-graph.vue"
import { computed, ref } from "vue"
import { useRouter } from 'vue-router'
</script>

<style scoped lang="sass">

.under-buttons-window
  display: flex
  flex-direction: row
  justify-content: space-evenly

.carousel-wrapper
  display: flex
  flex-direction: column
  width: 100%
  height: 95%
.carousel
  display: flex
  width: 100%
  height: 50%
  align-items: center
.debugdiv
  width: 40%
  height: 100%
  padding-top: 3%
  display: flex
.profile-container
  width: 100%
  display: flex
  flex-direction: column

.profile-pic-wrapper
  padding-left: 5%
  display: flex

.username-style
  font-size: 30px

.profile-header-container
  padding-top: 2%
  display: flex
  height : 30%
  flex-direction: grid
  width: 100%
  justify-content: space-between

.horizontal-graph-wrapper
  padding-top : 5%
  display: flex
  flex-direction: column
.username-and-button-wrapper
  display: flex
  flex-direction: grid

.friend-button-wrapper
  padding-top: 8%
  padding-left: 5%
.user-info-wrapper
  padding-left: 5%
.right-side-profile-details
  display : flex
  flex-direction: column
  height: 200%
.mainwidow-profile
  display: flex
  height : 70%
  width: 100%
  display: flex
  flex-direction: column
  padding-bottom: 3%
.world-position-wrapper
  display: flex
  flex-direction: grid 
  height : 35%

.xp-overlay-wrapper
  margin-top: 5%
  display: flex
  height: 65%
  width: 100%

.togglers-buttons-wrapper
  padding-left: 5%
.bt
  height: 40px
  width: 200px

.history-graph-wrapper
  width: 30%
  display: flex
  padding-top: 3%
.single-graph-wrapper
  height: 50%
  display: flex
</style>
