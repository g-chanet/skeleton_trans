<template>
  <el-dialog v-model="dialog" title="Join channel" width="42%" style="border-radius: var(--el-border-radius-base)"
    :before-close="handleClose" close-on-press-escape>
    <div class="dialog-body">
      <div class="channels">
        <h1 class="dialog-header">Public channels:</h1>
        <el-scrollbar class="list-channel" max-height="300px">
          <ItemChannel v-for="channel in publicChannels" :key="channel.id" :channel="channel"
            @click="onSelectChannel(channel, '')" />
        </el-scrollbar>
      </div>
      <el-divider direction="vertical" style="height: auto;"></el-divider>
      <div class="channels">
        <h1 class="dialog-header">Protected channels:</h1>
        <el-scrollbar class="list-channel" max-height="300px">
          <ItemChannel v-for="channel in protectedChannels" :key="channel.id" :channel="channel"
            @click="openPasswordInput(channel)" />
        </el-scrollbar>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useCreateMemberForChannelMutation, useFindAllPublicChannelsQuery, useFindAllProtectedChannelsQuery, type Channel, useFindAllChannelsForUserQuery, useFindMyUserQuery, useOnNewChannelMemberForUserIdSubscription, useOnCreateChannelSubscription, useOnDeleteChannelMemberForUserIdSubscription } from '@/graphql/graphql-operations'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { cacheDelete, cacheUpsert } from '@/utils/cacheUtils'
import { EChannelType } from '@/graphql/graphql-operations'
import ItemChannel from "./channelListItemComponent.vue"

const props = defineProps([`modelValue`])
const emit = defineEmits([`update:modelValue`])

const dialog = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit(`update:modelValue`, value)
  }
})

const router = useRouter()
const { result: myUser } = useFindMyUserQuery()
const query = useFindAllChannelsForUserQuery({})

useOnNewChannelMemberForUserIdSubscription({ args: { userId: myUser.value!.findMyUser.id } }).onResult(({ data }) => cacheUpsert(query, data?.onNewChannelMemberForUserId))
useOnDeleteChannelMemberForUserIdSubscription({ args: { userId: myUser.value!.findMyUser.id } }).onResult(({ data }) => cacheDelete(data?.onDeleteChannelMemberForUserId))

const excludeChannels = computed(() => {
  const array: string[] = []
  query.result.value?.findAllChannelsForUser.forEach((element) => {
    array.push(element.id)
  })
  return array
})

const publicQuery = useFindAllPublicChannelsQuery()
const protectedQuery = useFindAllProtectedChannelsQuery()
const { mutate: mutateChannelMember, onError: createMemberError } = useCreateMemberForChannelMutation({})

useOnCreateChannelSubscription({}).onResult(({ data }) => {
  if (data?.onCreateChannel.channelType === EChannelType.Public)
    cacheUpsert(publicQuery, data.onCreateChannel)
  else
    cacheUpsert(protectedQuery, data?.onCreateChannel)
})

const publicChannels = computed(() => {
  return publicQuery.result.value?.findAllPublicChannels.filter(checkChannelId)
})
const protectedChannels = computed(() => {
  return protectedQuery.result.value?.findAllProtectedChannels.filter(checkChannelId)
})

function checkChannelId(channel: Channel) {
  return !excludeChannels.value.includes(channel.id)
}

const onSelectChannel = (channel: Channel, password: string) => {
  mutateChannelMember({
    args: {
      channelId: channel.id,
      channelPassword: password,
    }
  }).then((args) => {
    router.replace({ query: { channelId: args?.data?.createMemberForChannel.channelId } })
  })
}

createMemberError((e) => {
  ElMessage({
    showClose: true,
    message: e.message,
    type: `error`
  })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const openPasswordInput = (channel: Channel) => {
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

const handleClose = (() => {
  dialog.value = false
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