<template>
    <div class="active-channel">
        <div class="active-channel-header">
          <h1 class="top">{{ resultChannel?.findChannel.name }}</h1>
        </div>
        <el-scrollbar>
            <div class="active-channel-content">
                <ChannelChatMessage v-for="message in resultMessages?.findAllChannelMessagesForChannel.slice().reverse()" :key="message.id" :channelMessage="message" />
            </div> 
        </el-scrollbar>
        <el-input placeholder="Message..." v-model="inputValue">
            <template #append><el-button @click="onCreateMessage"><el-icon><DArrowRight /></el-icon></el-button></template>
        </el-input>
    </div>
</template>

<script setup lang="ts">
import { useFindChannelQuery, useCreateMessageForChannelMutation, useFindAllChannelMessagesForChannelQuery} from '@/graphql/graphql-operations'
import { ref } from 'vue'
import ChannelChatMessage from './channelChatMessageComponent.vue'

const props = defineProps<{
    channelId: string
}>()

const inputValue = ref(``)

const { result:resultMessages, refetch } = useFindAllChannelMessagesForChannelQuery({args: {
    channelId: props.channelId
}})
const  { mutate } = useCreateMessageForChannelMutation({})

const { result:resultChannel } = useFindChannelQuery({args: { 
    id: props.channelId
  }})

const onCreateMessage = () => {
    mutate({args: {
        channelId: props.channelId,
        message: inputValue.value,
    }}).then(() => refetch()).then(() => inputValue.value = ``)
}

</script>

<style scoped lang="sass">


.active-channel
    height: 100%
    display: flex
    flex-direction: column

.active-channel-content
    height: 100%
    display: flex
    flex-direction: column-reverse
    padding: 5%
.active-channel-header
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center

.el-input
    height: 7.5%

.top
    padding-bottom: 1%
    z-index: 2
    display: flex
    justify-content: center
    position: relative
    font-family: "Vaporfuturism", "Helvetica", sans-serif
    letter-spacing: -5px
    transform: rotate(0deg) skew(-3deg) translateX(-50%) scaleX(1.4)
    background: linear-gradient(to bottom, #18191a 32%, #157be6 40%, #ffffff 52%, #18191a 56%, #157be6 85%, #ffffff, rgba(222,0,255,1) 0%, rgba(94,214,249,1) 100%)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
    -webkit-text-stroke-width: 0.1px
    -webkit-text-stroke-color: #FFF
    font-size: 2em
</style>