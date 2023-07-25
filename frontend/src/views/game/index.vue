<template>
    <div class="konva-container" id="konvaRef"/>
  </template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { Pong } from './'

onMounted(() => {
const pong = new Pong()
})

</script>

<style scoped lang="sass">

</style> 