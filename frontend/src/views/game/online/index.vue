<template>
  <PongDisplay v-if="pongData" :socket="socket" :pong-data="pongData" />
</template>

<script setup lang="ts">
import { io } from 'socket.io-client'
import { onMounted, ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import PongDisplay from "./game.vue"
import { ElMessage } from 'element-plus'
import type { PongData } from './index'

const route = useRoute()
const socket = io(`http://localhost:5173`)
const pongData = ref<undefined | PongData>()
const roomId = `${route.params.roomId}`

onMounted(() => {
  socket.emit(`joinRoom`, roomId)
})

onUnmounted(() => {
  socket.emit(`leaveRoom`)
})

socket.on(`joinRoomSuccess`, (data: PongData) => {
  ElMessage({
    message: `Joined room successfully: ${data}`,
    type: `success`,
  })
  pongData.value = data
})

socket.on(`playerReady`, (player: string) => {
  ElMessage({
    message: `${player} is Ready to play!`,
    type: `success`,
  })
})

socket.on(`joinRoomError`, (error) => {
  ElMessage({
    message: `Join Room Error: ${error.message}`,
    type: `warning`,
  })
  pongData.value = undefined
})

</script>

<style scoped lang="sass">

.konva-container
  display: flex
  justify-content: center
  align-items: center
  margin-top: 25px
  height: 90%
  width: 95%

.button
    margin: 0
    height: 50px
    width: 50px
    transition: all 0.3s ease
    position: relative
    overflow: hidden
    border-radius: var(--el-border-radius-base) !important
    transition: 128ms color, 128ms box-shadow
    z-index: 1000 !important

.el-button
  z-index: 1000
</style> 