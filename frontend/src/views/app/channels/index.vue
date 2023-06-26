<template>
  <div class="channels-view-container">
    <div class="channels-container">
      <div class="channels-container-header">
        <h1 class="top">Channels</h1>
        <el-button @click="dialogVisible = true"><el-icon><Plus /></el-icon></el-button>
        
        <el-dialog
          v-model="dialogVisible"
          title="Join Channel"
          width="50%"
          style="border-radius: 20px;"
          close-on-press-escape
        >
          <div class="dialog-body">
            <div class="create-channel-side">
              <h1 class="dialog-header">Create channel:</h1>
              <el-input placeholder="Channel name" v-model="channelName"/>
              <el-radio-group v-model="radioValue">
                <el-radio label="Public" />
                <el-radio label="Protected" />
              </el-radio-group>
              <el-input v-if="radioValue === 'Protected'" type="password" placeholder="Channel password" v-model="channelPassword"/>
              <div class="dialog-button"><el-button @click="onCreateChannel">Create</el-button></div>
            </div>
            <el-divider direction="vertical" style="height: auto;"></el-divider>
            <div class="public-channel-side">
              <h1 class="dialog-header">Public channels:</h1>
              <el-scrollbar max-height="300px">
                <ItemChannel v-for="channel in publicChannels?.findAllPublicChannels" :key="channel.id" :channel="channel" @click="onSelectChannel(channel)"/>
            </el-scrollbar>
              <div class="dialog-button"><el-button>Join</el-button></div>
            </div>
          </div>
        </el-dialog>
      </div>
      <ListChannel class="list-channel" :channelMembers="resultChannels?.findAllChannelMembersForUser" />
    </div>
    <div class="active-conversation-container">
      <ChatChannel v-if="channelId" :channelId="channelId" :key="channelId"/>
    </div>
    <div class="active-conversation-profile-container panel-blur">
      <el-image class="avatar"></el-image>
      <div>name</div>
      <div>Channel Type: X</div>
      <div>Channel Owner: XXX</div>
      <div>Created at: XXX</div>
      <el-scrollbar class="scroll">Channel Members:
          <p v-for="item in 2" :key="item" class="members-scroll">{{ item }}</p>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFindMyUserQuery, useFindAllChannelMembersForUserQuery, useCreateChannelMutation, useCreateMemberForChannelMutation, EChannelType, EChannelMemberType, useFindAllPublicChannelsQuery, type ChannelMember, type Channel } from '@/graphql/graphql-operations'
import ListChannel from "./components/listChannel.vue"
import ItemChannel from "./components/itemChannel.vue"
import ChatChannel from "./components/chatChannel.vue"
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const dialogVisible = ref(false)
const channelName = ref(``)
const channelPassword = ref(``)
const radioValue = ref(`Public`)

const router = useRouter()
const route = useRoute()

const { result:myUser } = useFindMyUserQuery()
const { result:resultChannels, refetch:refetchChannels } = useFindAllChannelMembersForUserQuery({args: {
  userId: myUser.value?.findMyUser.id!
}})
const { result:publicChannels } = useFindAllPublicChannelsQuery()
const { mutate:mutateChannel } = useCreateChannelMutation({})
const { mutate:mutateChannelMember } = useCreateMemberForChannelMutation({})

const channelId = computed( () => route.query.channelId ? route.query.channelId.toString() : undefined )

const onCreateChannel = () => {
  mutateChannel({args: { 
    name: channelName.value, 
    channelType: radioValue.value === `Public` ? EChannelType.Public : EChannelType.Protected
  }}).then((args) => mutateChannelMember({args: {
    channelId: args?.data?.createChannel.id!,
    type: EChannelMemberType.Owner,
  }})).then((args) => {
    router.replace({ query: { channelId: args?.data?.createMemberForChannel.channelId }})
  }).then(() => refetchChannels())
  dialogVisible.value = false
}

const onSelectChannel = (channel: Channel) => {
  mutateChannelMember({ args: {
    channelId: channel.id,
    type: EChannelMemberType.Default,
  }}).then((args) => {
    router.replace({ query: { channelId: args?.data?.createMemberForChannel.channelId }})
  }).then(() => refetchChannels())
  dialogVisible.value = false
}

</script>


<style scoped lang="sass">
.channels-view-container
  width: 100%
  display: flex
  flex-direction: row
  border-radius:20px

.list-channel
  background: var(--el-color-primary)
  border-radius: 20px
  
.channels-container
  overflow: hidden
  display: flex
  flex-direction: column
  background: var(--el-color-primary-light-5)
  border-radius: 20px
  width: 75%

.channels-container-header
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: center
.active-conversation-container
  width: 100%

.dialog-header
    display: flex
    align-items: center
    justify-content: center

  
.dialog-body
  display: flex
  flex-direction: row

.create-channel-side
  display: flex
  flex-direction: column
  width: 100%

.dialog-button
  display: flex
  justify-content: flex-end
  margin-top: 5%

.public-channel-side
  display: flex
  flex-direction: column
  width: 100%

.el-radio-group
  display: flex
  justify-content: space-evenly
  margin-top: 5%

.active-conversation-profile-container
  height: 100%
  width: 75%
  border: (--el-border)
  border-radius: 20px
  display: flex
  align-items: center
  justify-content: space-evenly
  overflow: hidden
  flex-direction: column
  background-color: red //rgba(0, 0, 0, 0.5)
  backdrop-filter: blur(10px)

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
.top
  z-index: 2
  left: 15%
  position: relative
  display: flex
  justify-content: center
  font-family: "Vaporfuturism", "Helvetica", sans-serif
  letter-spacing: -3px
  transform: rotate(0deg) skew(-3deg) translateX(-50%) scaleX(1.4)
  background: linear-gradient(to bottom, #18191a 32%, #157be6 40%, #ffffff 52%, #18191a 56%, #157be6 85%, #ffffff, rgba(222,0,255,1) 0%, rgba(94,214,249,1) 100%)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  -webkit-text-stroke-width: 0.1px
  -webkit-text-stroke-color: #FFF
  font-size: 2em
</style>

