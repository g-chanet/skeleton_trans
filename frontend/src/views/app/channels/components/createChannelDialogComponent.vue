<template>
    <el-dialog
        v-model="createDialogVisible"
        title="Create channel"
        width="25%"
        style="border-radius: var(--el-border-radius-base);"
        :before-close="handleClose"
        close-on-press-escape
      >
        <div class="dialog-body">
          <div class="create-channel">
            <el-alert v-if="invalidName" title="Warning alert" type="warning" description="This channel name is already used!" show-icon :closable="false"/>
            <el-input @keyup="search" type="text" placeholder="Channel name" v-model="channelName"/>
            <el-radio-group v-model="channelType">
              <el-radio label="Public" :change="onTypeChange()"/>
              <el-radio label="Protected" />
              <el-radio label="Private" />
            </el-radio-group>
            <el-input v-if="channelType === 'Protected'" type="password" placeholder="Channel password" v-model="channelPassword"/>
            <div class="dialog-button"><el-button :disabled="isDisabled" @click="onCreateChannel">Create</el-button></div>
          </div>
        </div>
      </el-dialog>
</template>

<script setup lang="ts">
import { useCreateChannelMutation, useCreateMemberForChannelMutation, EChannelType, EChannelMemberType, useCheckChannelNameQuery } from '@/graphql/graphql-operations'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const { mutate:mutateChannel, onError:createChannelError } = useCreateChannelMutation({})
const { mutate:mutateChannelMember } = useCreateMemberForChannelMutation({})

const createDialogVisible = ref(false)
const router = useRouter()
const channelName = ref(``)
const invalidName = ref(false)
const channelPassword = ref(``)
const channelType = ref(`Public`)
const isDisabled = computed( () => {
  if(channelName.value === ``)
    return true
  if (channelType.value === `Protected` && channelPassword.value.toString().length < 8)
    return true
  return false
})

const onTypeChange = () => {
  channelPassword.value = ``
}

const onCreateChannel = () => {
  //Protected
  if (channelType.value === `Protected`)
  {
    mutateChannel({args: { 
      name: channelName.value,
      password: channelPassword.value,
      channelType: EChannelType.Protected
    }}).then((args) => mutateChannelMember({args: {
      channelId: args?.data?.createChannel.id!,
      type: EChannelMemberType.Owner,
    }})).then((args) => {
      router.replace({ query: { channelId: args?.data?.createMemberForChannel.channelId }})
    })
  }
  //Public
  else if (channelType.value === `Public`)
  {
    mutateChannel({args: { 
      name: channelName.value,
      channelType: EChannelType.Public
    }}).then((args) => mutateChannelMember({args: {
      channelId: args?.data?.createChannel.id!,
      type: EChannelMemberType.Owner,
    }})).then((args) => {
      router.replace({ query: { channelId: args?.data?.createMemberForChannel.channelId }})
    })
  }
  //Private
  else {
    mutateChannel({args: { 
      name: channelName.value,
      channelType: EChannelType.Private
    }}).then((args) => mutateChannelMember({args: {
      channelId: args?.data?.createChannel.id!,
      type: EChannelMemberType.Owner,
    }})).then((args) => {
      router.replace({ query: { channelId: args?.data?.createMemberForChannel.channelId }})
    })
  }
  handleClose()
}

const setCreateDialogVisible = () => {
    createDialogVisible.value = true
}

defineExpose({
    setCreateDialogVisible,    
})

createChannelError((e) => {
  ElMessage({
    showClose: true,
    message: e.message,
    type: `error`
  })
})

const handleClose = () => {
  createDialogVisible.value = false
  channelName.value = ``
  channelPassword.value = ``
  channelType.value = `Public`
}

const checkQuery =  useCheckChannelNameQuery({ args: {channelName: channelName.value} }).onResult(({data}) => invalidName.value = data.checkChannelName)
let timeout: number | undefined
const search = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    checkQuery.off()
  }, 1000)
}

</script>

<style scoped lang="sass">

.dialog-body
  display: flex
  flex-direction: row

.create-channel
  display: flex
  flex-direction: column
  width: 100%

.dialog-button
  display: flex
  justify-content: flex-end
  margin-top: 5%

.el-radio-group
  display: flex
  justify-content: space-evenly
  margin-top: 5%

</style>