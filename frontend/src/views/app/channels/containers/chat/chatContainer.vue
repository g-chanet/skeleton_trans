<template>
    <div class="chat-container">
      <ChatChannel v-if="channelId" :channelId="channelId" :key="channelId"/>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ChatChannel from './components/chatChannel.vue'

const route = useRoute()
const channelId = computed( () => route.query.channelId ? route.query.channelId.toString() : undefined )
</script>

<style scoped lang="sass">

.chat-container
  width: 100%

</style>