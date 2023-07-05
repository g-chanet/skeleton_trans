<template>
  <div class="chat-view">
    <div class="list-container">
      <div class="list-container-header">
        <h1 class="top">Channels</h1>
        <div style="width: 35%; display: flex; justify-content: space-evenly;">
          <el-button @click="onShowCreateDialog"><el-icon><Plus /></el-icon></el-button>
          <CreateChannelDialog :refetchChannels="refetchChannels" ref="createDialogChild"/>
          <el-button @click="onShowJoinDialog"><el-icon><Search /></el-icon></el-button>
          <JoinChannelDialog :refetchChannels="refetchChannels" ref="joinDialogChild"/>
        </div>
      </div>
      <ChannelList :channels="channels" :onSelectChannel="onSelectChannelInList" :height="`auto`"/>
    </div>
    <ChannelComponent />
  </div>
</template>

<script setup lang="ts">
import ChannelComponent from "./components/channelComponent.vue"
import ChannelList from "./components/channelListComponent.vue"
import CreateChannelDialog from "./components/createChannelDialogComponent.vue"
import JoinChannelDialog from "./components/joinChannelDialogComponent.vue"
import { useFindMyUserQuery, useFindAllChannelMembersForUserQuery, type Channel } from "@/graphql/graphql-operations"
import { computed, ref } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const { result:myUser } = useFindMyUserQuery()
const { result:resultChannels, refetch:refetchChannels } = useFindAllChannelMembersForUserQuery({args: {
  userId: myUser.value?.findMyUser.id!
}})

const channels = computed(() => {
  var output: Channel[] = []
  resultChannels.value?.findAllChannelMembersForUser.forEach((value) => output.push(value.channel!))
  return output
})

const createDialogChild = ref()
const joinDialogChild = ref()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onSelectChannelInList = ({ id }: Channel, _value: string) => {
  router.replace({ query: { channelId: id }})
}

const onShowCreateDialog = () => {
  createDialogChild.value.setCreateDialogVisible()
}

const onShowJoinDialog = () => {
  joinDialogChild.value.setJoinDialogVisible()
}
</script>


<style scoped lang="sass">
.chat-view
  width: 100%
  display: flex
  flex-direction: row
  border-radius:20px

.list-container
  overflow: hidden
  display: flex
  flex-direction: column
  border-radius: var(--el-border-radius-base)
  width: 75%
  &:hover
    box-shadow: var(--box-shadow-yellow)
.list-container-header
  display: flex
  flex-direction: row
  justify-content: space-around
  align-items: center
  background: linear-gradient(#fdb428, #f672ca)

.top
  z-index: 2
  left: 15%
  position: relative
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

