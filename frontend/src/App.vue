

<template>
  <router-view></router-view>
</template>

<script setup lang="ts">

import { onMounted } from 'vue'

onMounted(async () => {
  await fetch(`/auth/status`).then((response) => console.log(response))
})

</script>

<style scoped></style>
