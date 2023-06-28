<template>
  <div class="chat-view">
    <ListContainer :channels="channels" :refetchChannels="refetchChannels"/>
    <ChatContainer class="chat-container"/>
    <DetailsContainer class="details-container"/>
  </div>
</template>

<script setup lang="ts">
import ListContainer from "./containers/list/listContainer.vue"
import ChatContainer from "./containers/chat/chatContainer.vue"
import DetailsContainer from "./containers/details/detailsContainer.vue"
import { useFindMyUserQuery, useFindAllChannelMembersForUserQuery, type Channel } from "@/graphql/graphql-operations"
import { computed } from "vue"

const { result:myUser } = useFindMyUserQuery()
const { result:resultChannels, refetch:refetchChannels } = useFindAllChannelMembersForUserQuery({args: {
  userId: myUser.value?.findMyUser.id!
}})

const channels = computed(() => {
  var output: Channel[] = []
  resultChannels.value?.findAllChannelMembersForUser.forEach((value) => {
    output.push(value.channel)
  })
  return output
})
</script>


<style scoped lang="sass">
.chat-view
  width: 100%
  display: flex
  flex-direction: row
  border-radius:20px

</style>

