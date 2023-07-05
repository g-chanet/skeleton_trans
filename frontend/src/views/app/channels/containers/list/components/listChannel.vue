<template>
    <el-scrollbar>
        <ItemChannel v-for="channel in channels" :key="channel.id" :channel="channel" @click="onSelectChannel(channel)" />
    </el-scrollbar>
</template>
  
<script setup lang="ts">
import type { Channel } from '@/graphql/graphql-operations'
import ItemChannel from "./itemChannel.vue"
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
channels?: Channel[]
}>()

const onSelectChannel = ({ id }: Channel) => {
  router.replace({ query: { channelId: id }})
}

</script>

<style scoped lang="sass">

.ItemChannel
  &:checked
    background: red

</style>