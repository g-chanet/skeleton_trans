<template>
  <div @mousemove="onMousemove">
    GAME
    {{ pos }}
  </div>
</template>

<script setup lang="ts">
import { socket } from "@/services/socketIo"
import { onMounted, onUnmounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useFindMyUserQuery } from "@/graphql/graphql-operations"

const route = useRoute()
const gameId = route.params.gameId?.toString() || 42

const { refetch, result } = useFindMyUserQuery()

onMounted(() => {
  socket.emit(`join_room`, gameId)
})

onUnmounted(() => {
  socket.emit(`leave_room`)
})

const pos = ref(0)
socket.on(`update_room`, (position: number) => {
  pos.value = position
})

// const send = (e: MouseEvent) => {
//   socket.emit(`update_room`, e.clientY)
// }

const sendQuery = () => {
  refetch()
}

const onMousemove = (event: MouseEvent) => {
  console.log(`Test update_room`, event.clientX)
  socket.emit(`update_room`, event.clientX)
}

</script>

<style scoped lang="sass">

</style>