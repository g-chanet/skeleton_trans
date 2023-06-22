<template>
  <div class="messages-container">
    <div class="convesations-container">
      <div class="conversations-header"></div>
      <h1>Channels</h1>
      <el-button @click="onCreateChannel">Create </el-button>
      <el-divider style="width: 95%; margin: 2.5%; color: var(--el-color-primary-light-5);"/>
      <div class="convesations-list-container">
        <ItemChannel v-for="channel in result?.findAllChannels" :key="channel.id" :channel="channel" @click="onSelectChannel(channel)"/>
      </div>
    </div>
    <div class="active-conversation-container">
      <h1>userX</h1>
      <div class="active-conversation">
        <div>message</div>
        <div>message</div>
        <div>message</div>
        <div>message</div>
        <div>message</div>
      </div>
    </div>
    <div class="active-conversation-profile-container">
      <div>profile picture</div>
      <div>name</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFindAllChannelsQuery, useCreateChannelMutation, EChannelType, type Channel } from '@/graphql/graphql-operations'
import ItemChannel from "./components/itemChannel.vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const  { result, refetch } = useFindAllChannelsQuery({})

const  { mutate } = useCreateChannelMutation({})

const onCreateChannel = () => {
  mutate({args: { 
    name: `Yolo`, 
    channelType: EChannelType.Public 
  }}).then(() => refetch())
}

const onSelectChannel = ({ id }: Channel) => {
  router.push({ query: { channelId: id }})
}

</script>


<style scoped lang="sass">
.messages-container
  width: 100%
  display: flex
  flex-direction: row
  border-radius:20px

h1
  display: flex
  height: 5%
  align-items: center
  margin-left: 5%

.convesations-container
  background: var(--el-color-primary)
  border-radius: 20px
  width: 100%
  height: inherit

  
.convesations-list-container
  display: flex
  flex-direction: column
.active-conversation-container
  width: 100%
  z-index: 0

.active-conversation-profile-container
  width: 100%
  background: green

</style>

