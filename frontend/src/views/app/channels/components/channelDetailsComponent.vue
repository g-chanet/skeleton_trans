<template>
  <div class="details">
    <div class="infos">
      <el-image
        style="align-self: center; height: 25%; background-size: cover; background-position: center; aspect-ratio: 1/1; border-radius: 100%;"
        fit="cover" :url="channel?.avatarUrl" />
      <div style="align-self: center;">{{ channel?.name }}</div>
      <div style="align-self: center;">
        <el-radio-group v-model="channelType">
          <el-radio label="Public" disabled />
          <el-radio label="Protected" disabled />
          <el-radio label="Private" disabled />
        </el-radio-group>
      </div>
      <div style="align-self: center;">Owner: {{ channelOwner }}</div>
      <div style="align-self: center;">Created: {{ moment(channel?.createdAt).format('L') }}</div>
      <div class="scroll">
        Channel Members:
        <el-scrollbar max-height="300px">
          <div v-for="item in channelMembers" :key="item.user?.id" class="members-scroll">
            <div style="display: flex; flex-direction: column; justify-content: space-evenly;">
              <div>
                {{ item.user?.username }}
              </div>
              <div style="color: white; font-size: small;">
                {{ memberType(item.type) }}
              </div>
            </div>
            <div>
              <el-button><el-icon>
                  <Promotion />
                </el-icon></el-button>
              <el-button><font-awesome-icon icon="gamepad" /></el-button>
              <el-button><el-icon>
                  <Avatar />
                </el-icon></el-button>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="options">
      <el-button
        @click="leaveChannel({ args: { channelId: props.channelId } }).then(() => router.replace({ query: {} }))">Leave
        Channel</el-button>
      <el-button v-if="isOwner" @click="optionsDialog = true">Edit channel</el-button>
      <el-button v-if="isOwner"
        @click="drawer = false, deleteChannel({ args: { id: props.channelId } }).then(() => router.replace({ query: {} }))"
        type="warning" plain>Remove Channel</el-button>
    </div>
  </div>
  <ChannelOptionsDialog v-if="channelId" :channelId="channelId" :key="channelId" v-model="optionsDialog" />
</template>

<script setup lang="ts">
import type { ChannelMember } from '@/graphql/graphql-operations'
import { EChannelMemberType, useDeleteChannelMutation, useFindMyUserQuery } from '@/graphql/graphql-operations'
import { useFindChannelQuery, EChannelType, useFindAllChannelMembersForChannelQuery, useDeleteMyMemberForChannelMutation } from '@/graphql/graphql-operations'
import ChannelOptionsDialog from "./channelOptionsDialogComponent.vue"
import { computed, ref } from 'vue'
import moment from "moment"
import { useRouter } from 'vue-router'

const router = useRouter()
const { result: myUser } = useFindMyUserQuery()

const props = defineProps([`modelValue`, `channelId`])
const emit = defineEmits([`update:modelValue`])

const drawer = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit(`update:modelValue`, value)
  }
})

const optionsDialog = ref(false)

const { result: resultChannel } = useFindChannelQuery({
  args: {
    id: props.channelId
  }
})
const { result: resultMembers } = useFindAllChannelMembersForChannelQuery({
  args: {
    channelId: props.channelId
  }
})

const { mutate: deleteChannel } = useDeleteChannelMutation({})
const { mutate: leaveChannel } = useDeleteMyMemberForChannelMutation({})

const channel = computed(() => { return resultChannel.value?.findChannel })
const channelType = computed(() => {
  if (channel.value?.channelType === EChannelType.Private)
    return `Private`
  if (channel.value?.channelType === EChannelType.Protected)
    return `Protected`
  return `Public`
})

const channelOwner = ref(``)
const myChannelMember = ref<ChannelMember>()

const channelMembers = computed(() => {
  resultMembers.value?.findAllChannelMembersForChannel.forEach((value) => {
    if (value.type === EChannelMemberType.Owner)
      channelOwner.value = value.user!.username
    if (value.user?.id === myUser.value?.findMyUser.id)
      myChannelMember.value = value
  })
  return resultMembers.value?.findAllChannelMembersForChannel
})

const isOwner = computed(() => myChannelMember.value?.type === EChannelMemberType.Owner)
const isAdmin = computed(() => myChannelMember.value?.type === EChannelMemberType.Admin)

const memberType = ((type: EChannelMemberType) => {
  if (type === EChannelMemberType.Owner)
    return `Owner`
  if (type === EChannelMemberType.Admin)
    return `Admin`
  if (type === EChannelMemberType.Invited)
    return `Invited`
  return `Default`
})

const changePasswordDialogChild = ref()

const onShowChannelOptionsDialog = () => {
  changePasswordDialogChild.value.setChangePasswordDialogVisible()
}

</script>

<style scoped lang="sass">

.details
  display: flex
  flex-direction: column
  height: 100%
  padding-left: 5%
  padding-right: 5%

.close
  display: flex
  justify-content: flex-end
  flex: 1

.infos
  display: flex
  flex-direction: column
  flex: 8
  justify-content: space-evenly

.options
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-evenly
  flex: 1

.scroll
  height: 30%
  width: 100%
.members-scroll
    display: flex
    flex-direction: row
    align-items: center
    min-height: 40px
    text-align: center
    border-radius: 4px
    background: rgb(20, 20, 20)
    justify-content: space-between
    margin: 2%
    padding-right: 2% 
    padding-left: 2%

</style>