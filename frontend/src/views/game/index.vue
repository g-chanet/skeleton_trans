<template>
  <div>
    GAME
    {{ gameId }}
  </div>
  <button @click="send"> BT </button>
</template>

<script setup lang="ts">
import { socket } from "@/services/socketIo"
import { onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const gameId = route.params.gameId?.toString() || 42

onMounted(() => {
  socket.emit(`join_room`, gameId)
})

onUnmounted(() => {
  socket.emit(`leave_room`, gameId)
})

socket.on(`update_room`, () => {
  console.log(`OnUpdateRoom`)
})

const send = () => {
  socket.emit(`update_room`, 84)
}

</script>

<style scoped lang="sass">

</style>