<template>
  <div class="list-container">
    <div class="list-container-header">
      <h1 class="top">Channels</h1>
      <div style="width: 35%; display: flex; justify-content: space-evenly;">
        <el-button @click="onShowCreateDialog"><el-icon><Plus /></el-icon></el-button>
        <CreateDialog :refetchChannels="props.refetchChannels" ref="createDialogChild"/>
        <el-button @click="onShowJoinDialog"><el-icon><Search /></el-icon></el-button>
        <JoinDialog :refetchChannels="props.refetchChannels" ref="joinDialogChild"/>
      </div>
    </div>
    <ListChannel class="list-channel" :channels="channels" />
  </div>
</template>

<script setup lang="ts">
import type { Channel } from '@/graphql/graphql-operations'
import { ref } from 'vue'
import ListChannel from './components/listChannel.vue'
import CreateDialog from './components/createChannelDialog.vue'
import JoinDialog from './components/joinChannelDialog.vue'

const props = defineProps<{
  channels: Channel[],
  refetchChannels(): void,
}>()

const createDialogChild = ref(null)
const joinDialogChild = ref(null)

const onShowCreateDialog = () => {
  createDialogChild.value.setCreateDialogVisible()
}

const onShowJoinDialog = () => {
  joinDialogChild.value.setJoinDialogVisible()
}
</script>

<style scoped lang="sass">

.list-container
  overflow: hidden
  display: flex
  flex-direction: column
  background: var(--el-color-primary-light-5)
  border-radius: 20px
  width: 75%
.list-container-header
  display: flex
  flex-direction: row
  justify-content: space-around
  align-items: center

.list-channel
  background: var(--el-color-primary)
  border-radius: 20px
  
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