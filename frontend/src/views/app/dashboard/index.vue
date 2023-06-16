<template>
  <div>{{ msg }}</div>
  <div>{{ result }}</div>
</template>

<script setup lang="ts">
import { useFindMyUserQuery } from '@/graphql/graphql-operations'
import { onMounted, ref } from 'vue'

const msg = ref(``)

const { result } = useFindMyUserQuery()

onMounted(async () => {
  await fetch(`/auth/status`)
    .then(async (response) => (msg.value = await response.json()))
    .catch((err) => (msg.value = err))

  // await new Promise((resolve) => setTimeout(() => resolve(null), 1000))

  // await fetch(`/auth/logout`)
  //   .then(async (response) => (msg.value = await response.json()))
  //   .catch((err) => (msg.value = err))

  // await new Promise((resolve) => setTimeout(() => resolve(null), 1000))

  // await fetch(`/auth/status`)
  //   .then(async (response) => (msg.value = await response.json()))
  //   .catch((err) => (msg.value = err))
})
</script>

<style scoped lang="sass"></style>
