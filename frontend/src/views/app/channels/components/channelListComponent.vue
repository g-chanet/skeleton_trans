<template>
    <el-scrollbar class="list-channel" max-height="v-bind($props.height)">
        <ItemChannel v-for="channel in channels" :key="channel.id" :channel="channel" @click="$props.onSelectChannel(channel, '')" />
    </el-scrollbar>
</template>
  
<script setup lang="ts">
import type { Channel } from '@/graphql/graphql-operations'
import ItemChannel from "./channelListItemComponent.vue"

defineProps<{
channels?: Channel[],
onSelectChannel(channel: Channel, value: string):void,
height: String
}>()

</script>

<style scoped lang="sass">

.list-channel
  //border-radius: var(--el-border-radius-base)
  background: linear-gradient(var(--el-sun-pink), var(--el-sun-pink-dark-2))

</style>