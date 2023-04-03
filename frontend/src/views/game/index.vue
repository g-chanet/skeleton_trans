<template>
  <div>
    GAME
    {{ gameId }}
  </div>
  <button @click="send"> TEST SOCKET </button>
  <button @click="sendQuery"> TEST QUERY </button>
  {{ result?.findMyUser }}
</template>

<script setup lang="ts">
import { socket } from "@/services/socketIo"
import { onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import { useFindMyUserQuery } from "@/graphql/graphql-operations"

const route = useRoute()
const gameId = route.params.gameId?.toString() || 42

const { refetch, result } = useFindMyUserQuery()

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

const sendQuery = () => {
  refetch()
}

</script>

<style scoped lang="sass">

</style>