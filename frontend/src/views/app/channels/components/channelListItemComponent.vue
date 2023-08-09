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
import { useOnDeleteChannelSubscription, type Channel } from '@/graphql/graphql-operations'
import { cacheDelete } from '@/utils/cacheUtils'

 const props = defineProps<{
  channel: Channel
}>()

useOnDeleteChannelSubscription({ args: {id: props.channel.id}}).onResult(({data}) => cacheDelete(data?.onDeleteChannel))

</script>

<style scoped lang="sass">
.channel-item-container
  padding: 10px
  height: 42px
  display: flex
  align-items: center
  margin: 10px
  border-radius: var(--el-border-radius-base)
  &:hover
    background-image: linear-gradient(315deg, hsl(320deg 88% 71%) 1%, hsl(329deg 100% 72%) 43%, hsl(336deg 100% 72%) 50%, hsl(345deg 100% 72%) 51%, hsl(356deg 100% 73%) 51%, hsl(7deg 100% 72%) 49%, hsl(18deg 100% 68%) 49%, hsl(26deg 100% 64%) 50%, hsl(33deg 100% 61%) 57%, hsl(39deg 97% 57%) 99%)
    

.channel-description
  display: flex
  flex-direction: column

.channel-name
  font-weight: bold
</style>