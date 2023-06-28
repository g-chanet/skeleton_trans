<template>
  <div class="channel-item-container">
    <el-image style="width: 42px; height: 100%;  border-radius: 100%; margin-right: 2%;" :src="props.channel.avatarUrl"></el-image>
      <div class="channel-description">
        <div class="channel-name">
          {{channel.name}}
        </div>
        {{ channel.channelType }}
      </div>
  </div>
</template>

<script setup lang="ts">
import type { Channel } from '@/graphql/graphql-operations'

 const props = defineProps<{
  channel: Channel
}>()

</script>

<style scoped lang="sass">
.channel-item-container
  padding: 10px
  height: 42px
  display: flex
  align-items: center
  margin: 10px
  border-radius: 20px
  &:hover
    background-color: rgba(0, 0, 0, 0.3)
    backdrop-filter: blur(10px)
    

.channel-description
  display: flex
  flex-direction: column

.channel-name
  font-weight: bold
</style>