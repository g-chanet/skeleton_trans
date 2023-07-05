<template>
    <div class="details panel-blur">
      <el-image class="avatar" :url="channel?.avatarUrl" />
      <div>{{ channel?.name }}</div>
      <div>Channel Type: {{ channelType }}</div>
      <div>Channel Owner: {{ channeOwner }}</div>
      <div>Created at: {{ channel?.createdAt }}</div>
      <el-scrollbar class="scroll">Channel Members:
          <p v-for="item in channelMembers" :key="item.id" class="members-scroll">{{ item.username }}</p>
      </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import type { UserPublic } from '@/graphql/graphql-operations'
import { EChannelMemberType } from '@/graphql/graphql-operations'
import { useFindAllChannelMessagesForChannelQuery, useCreateMessageForChannelMutation, useFindChannelQuery, EChannelType, useFindAllChannelMembersForChannelQuery } from '@/graphql/graphql-operations'
import { computed, ref } from 'vue'

const props = defineProps<{
    channelId: string
}>()

const channel = computed(() => { return resultChannel.value?.findChannel})
const channelType = computed(() => {
  if(channel.value?.channelType === EChannelType.Private)
    return `Private`
  if(channel.value?.channelType === EChannelType.Protected)
    return `Protected`
  return `Public`
})
const channeOwner = ref(``)

const channelMembers = computed(() => {
  var output: UserPublic[] = []
  resultMembers.value?.findAllChannelMembersForChannel.forEach((value) => {
    output.push(value.user!)
    if (value.type === EChannelMemberType.Owner)
      channeOwner.value = value.user?.username!
  })
  return output
})

const { result:resultMembers } = useFindAllChannelMembersForChannelQuery({args: {
    channelId: props.channelId
}})

const { result:resultChannel } = useFindChannelQuery({args: { 
    id: props.channelId
  }})

</script>

<style scoped lang="sass">

.details
  height: 100%
  width: 100%
  display: flex
  align-items: center
  justify-content: space-evenly
  overflow: hidden
  flex-direction: column
  background: linear-gradient(var(--el-sun-yellow), var(--el-sun-pink))
  backdrop-filter: blur(10px)
  border-radius: var(--el-border-radius-base)

.avatar
  z-index: 3
  background-image: url('../../src/assets/temp.jpg')
  background-repeat: no-repeat
  width: 50%
  height: 30%
  border-radius: 50%

.scroll
  height: 30%
  width: 90%
.members-scroll
    display: flex
    flex-direction: column
    align-items: center
    min-height: 40px
    text-align: center
    border-radius: 4px
    background: var(--el-color-primary-light-9)
    color: var(--el-color-primary)
    justify-content: center

</style>