<template>
    <el-dialog
        v-model="joinDialogVisible"
        title="Join Channel"
        width="50%"
        style="border-radius: var(--el-border-radius-base);"
        close-on-press-escape
      >
        <div class="dialog-body">
          <div class="channels">
            <h1 class="dialog-header">Public channels:</h1>
            <ListChannel :channels="publicChannels" :onSelectChannel="onSelectChannel" :height="`300px`"/>
          </div>
          <el-divider direction="vertical" style="height: auto;"></el-divider>
          <div class="channels">
            <h1 class="dialog-header">Protected channels:</h1>
            <ListChannel :channels="protectedChannels" :onSelectChannel="openPasswordInput" :height="`300px`"/>
          </div>
        </div>
      </el-dialog>
</template>

<script setup lang="ts">
import { useCreateMemberForChannelMutation, useFindAllPublicChannelsQuery, useFindAllProtectedChannelsQuery, type Channel } from '@/graphql/graphql-operations'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ListChannel from './channelListComponent.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps<{
  refetchChannels(): void,
}>()

const joinDialogVisible = ref(false)

const router = useRouter()
const { result:publicChannelsQuery } = useFindAllPublicChannelsQuery()
const { result:protectedChannelsQuery } = useFindAllProtectedChannelsQuery()
const { mutate:mutateChannelMember, onError:createMemberError } = useCreateMemberForChannelMutation({})

const publicChannels = computed(() => { return publicChannelsQuery.value?.findAllPublicChannels })
const protectedChannels = computed(() => { return protectedChannelsQuery.value?.findAllProtectedChannels })

const onSelectChannel = (channel: Channel, password: string) => {
  mutateChannelMember({ args: {
    channelId: channel.id,
    channelPassword: password,
  }}).then((args) => {
    router.replace({ query: { channelId: args?.data?.createMemberForChannel.channelId }})
  }).then(() => props.refetchChannels())
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const openPasswordInput = (channel: Channel, _value: string) => {
  ElMessageBox.prompt(`Please input the channel password`, channel.name, {
    confirmButtonText: `Join`,
    cancelButtonText: `Cancel`,
    inputType: `Password`,
    inputValue: ``,
    inputErrorMessage: `Invalid Passwword`,
  })
    .then(({ value }) => {
      onSelectChannel(channel, value)
    })
    .catch(() => {
      ElMessage({
        type: `info`,
        message: `Canceled`,
      })
    })
}

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