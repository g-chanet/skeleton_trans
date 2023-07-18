<template>
    <div class="chat-container">
      <ChannelChat v-if="channelId" :channelId="channelId" :key="channelId" />
    </div>
    <el-divider direction="vertical" style="margin-top:6%; height: 75%;"/>
    <div class="details-container">
        <ChannelDetails v-if="channelId" :channelId="channelId" :key="channelId" />
    </div>
</template>

<script setup lang="ts">
import ChannelChat from './channelChatComponent.vue'
import ChannelDetails from './channelDetailsComponents.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const channelId = computed( () => route.query.channelId ? route.query.channelId.toString() : undefined )

</script>

<style scoped lang="sass">

.chat-container
  width: 100%

.details-container
  width: 75%
  border-radius: var(--el-border-radius-base)

</style>