<template>
  <!-- <el-button @click="socketMoveUp" class="'bite'">MOVE UP</el-button>
  <el-button @click="socketMoveDown" class="'bite'">MOVE DOWN</el-button> -->
  <div class="konva-container">
    <div class="konva" id="konvaRef"/>
  </div>
</template>

<script setup lang="ts">
import { Pong } from './index'
import { onMounted, ref } from 'vue'
import type { Socket } from 'socket.io-client'
import type { PongData } from './index'

const pong = ref<Pong | undefined>(undefined)

const props = defineProps<{
  socket: Socket,
  pongData: PongData
}>()

onMounted(() => {
  pong.value = new Pong(props.socket, props.pongData)
})


// socket.on(`updateGameData`, (gameData) => {

// })


// socket.on(`movePaddleError`, (error) => {
//     console.error(`Move Paddle Error:`, error.message)
// })


// socket.on(`leaveRoomSuccess`, () => {
//     console.log(`Left room successfully`)
// })

// socket.on(`leaveRoomError`, (error) => {
//     console.error(`Leave Room Error:`, error.message)
// })

// // socket.on(`startGame`, (initialGameData) => {
// // })

// socket.on(`updatePaddlePosition`, (position) => {
//   console.log(position)
//   //INGAME
//   pong.value.setPaddlePosition(socket.id, position)
//   //opponent paddle Y = position
// })

</script>

<style scoped lang="sass">

.konva-container
  display: flex
  justify-content: center
  align-items: center
  .konva
    margin-top: 25px
    height: 600px
    width: 800px

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