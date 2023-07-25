<template>
  <div class="chat-view">
    <div class="list-container">
      <div class="list-container-header">
        <h1 class="top">Channels</h1>
        <div style="width: 35%; display: flex; justify-content: space-evenly;">
          <el-button @click="onShowCreateDialog"><el-icon><Plus /></el-icon></el-button>
          <CreateChannelDialog ref="createDialogChild"/>
          <el-button @click="onShowJoinDialog"><el-icon><Search /></el-icon></el-button>
          <JoinChannelDialog ref="joinDialogChild"/>
        </div>
      </div>
      <ChannelList :channels="query.result.value?.findAllChannelsForUser" :onSelectChannel="onSelectChannelInList" :height="`auto`"/>
    </div>
    <ChannelComponent />
  </div>
</template>

<script setup lang="ts">
import { cacheUpsert } from "@/utils/cacheUtils"
import ChannelComponent from "./components/channelComponent.vue"
import ChannelList from "./components/channelListComponent.vue"
import CreateChannelDialog from "./components/createChannelDialogComponent.vue"
import JoinChannelDialog from "./components/joinChannelDialogComponent.vue"
import { type Channel, useFindAllChannelsForUserQuery, useOnNewChannelMemberForUserIdSubscription, useFindMyUserQuery } from "@/graphql/graphql-operations"
import { ref } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const { result:myUser } = useFindMyUserQuery()
const query = useFindAllChannelsForUserQuery({})

useOnNewChannelMemberForUserIdSubscription({ args: {userId: myUser.value!.findMyUser.id} }).onResult(({data}) => cacheUpsert(query, data?.onNewChannelMemberForUserId))

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
  //background-image: linear-gradient( 45deg, hsl(0deg 0% 0%) 0%, hsl(323deg 22% 8%) 13%, hsl(322deg 25% 14%) 19%, hsl(322deg 28% 19%) 23%, hsl(321deg 30% 25%) 27%, hsl(321deg 32% 31%) 31%, hsl(321deg 33% 38%) 34%, hsl(320deg 34% 44%) 38%, hsl(320deg 35% 50%) 41%, hsl(320deg 47% 57%) 44%, hsl(320deg 63% 64%) 47%, hsl(320deg 88% 71%) 50%, hsl(328deg 91% 73%) 53%, hsl(336deg 93% 74%) 56%, hsl(344deg 95% 76%) 59%, hsl(354deg 97% 77%) 62%, hsl(4deg 98% 77%) 66%, hsl(12deg 99% 74%) 69%, hsl(19deg 99% 72%) 73%, hsl(25deg 99% 69%) 77%, hsl(30deg 99% 66%) 81%, hsl(34deg 98% 62%) 87%, hsl(39deg 97% 57%) 100%)
  background: linear-gradient(225deg, var(--el-sun-yellow) 0%, var(--el-sun-pink) 50%, var(--el-trasparent) 81%)

.list-container-header
  display: flex
  flex-direction: row
  justify-content: space-around
  align-items: center

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

