<template>
    <el-scrollbar>
        <ItemChannel v-for="channelMember in channelMembers" :key="channelMember.channel.id" :channel="channelMember.channel" @click="onSelectChannel(channelMember.channel)" />
    </el-scrollbar>
</template>
  
<script setup lang="ts">
import type { Channel, ChannelMember } from '@/graphql/graphql-operations'
import ItemChannel from "./itemChannel.vue"
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
channelMembers?: ChannelMember[]
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