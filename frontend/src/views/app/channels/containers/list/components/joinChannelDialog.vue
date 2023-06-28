<template>
    <el-dialog
        v-model="joinDialogVisible"
        title="Join Channel"
        width="50%"
        style="border-radius: 20px;"
        close-on-press-escape
      >
        <div class="dialog-body">
            <div class="channels">
            <h1 class="dialog-header">Public channels:</h1>
            <el-scrollbar max-height="300px">
              <el-popover placement="top"
                v-for="channel in publicChannels?.findAllPublicChannels" 
                :key="channel.id" title="Join this channel ?" 
                width="fill" 
                trigger="click"
              >
                <div style="display: flex; flex-direction: row; justify-content: flex-end; margin-top: 5%;">
                  <el-button size="small" type="primary" @click="onSelectChannel(channel)">Join</el-button>
                </div>  
                <template #reference>
                      <ItemChannel :channel="channel"/>
                </template>
              </el-popover>
            </el-scrollbar>
          </div>
          <el-divider direction="vertical" style="height: auto;"></el-divider>
          <div class="channels">
            <h1 class="dialog-header">Protected channels:</h1>
            <el-scrollbar max-height="300px">
              <el-popover placement="top"
                v-for="channel in protectedChannels?.findAllProtectedChannels" 
                :key="channel.id" title="Join this channel ?" 
                width="fill" 
                trigger="click"
              >
                <el-input v-model="joinChannelPassword" placeholder="Password"></el-input>
                <div style="display: flex; flex-direction: row; justify-content: flex-end; margin-top: 5%;">
                  <el-button size="small" type="primary" @click="onSelectChannel(channel)">Join</el-button>
                </div>
                <template #reference>
                  <ItemChannel @click="joinChannelPassword = ''" :channel="channel"/>
                </template>
              </el-popover>
            </el-scrollbar>
          </div>
        </div>
      </el-dialog>
</template>

<script setup lang="ts">
import { EChannelMemberType, useJoinChannelMutation, useFindAllPublicChannelsQuery, useFindAllProtectedChannelsQuery, type Channel } from '@/graphql/graphql-operations'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ItemChannel from "./itemChannel.vue"
import { ElMessage } from 'element-plus'

const props = defineProps<{
  refetchChannels(): void,
}>()

const joinDialogVisible = ref(false)
const joinVisible = ref(false)
const joinChannelPassword = ref(``)

const router = useRouter()
const { result:publicChannels } = useFindAllPublicChannelsQuery()
const { result:protectedChannels } = useFindAllProtectedChannelsQuery()
const { mutate:mutateChannelMember, onError:createMemberError } = useJoinChannelMutation({})

const onSelectChannel = (channel: Channel) => {
  mutateChannelMember({ args: {
    channelId: channel.id,
    password: joinChannelPassword.value === `` ? undefined : joinChannelPassword.value,
    type: EChannelMemberType.Default,
  }}).then((args) => {
    router.replace({ query: { channelId: args?.data?.joinChannel.channelId }})
  }).then(() => props.refetchChannels())
  joinVisible.value = false
  joinDialogVisible.value = false
}

const setJoinDialogVisible = () => {
    joinDialogVisible.value = true
}

defineExpose({
    setJoinDialogVisible,    
})

createMemberError((e) => {
  ElMessage({
    showClose: true,
    message: e.message,
    type: `error`
  })
})

</script>

<style scoped lang="sass">

.dialog-header
  display: flex
  align-items: center
  justify-content: center

.dialog-body
  display: flex
  flex-direction: row

.channels
  display: flex
  flex-direction: column
  width: 100%

</style>