<template>
    <div class="active-channel">
        <div class="active-channel-header">
          <h2 class="top">{{ resultChannel?.findChannel.name }}</h2>
        </div>
        <el-scrollbar ref="chatScroll" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
            <div ref="innerRef" class="active-channel-content">
                <ChannelChatMessage v-for="(message, index) in query.result.value?.findAllChannelMessagesForChannel.slice().reverse()" :key="message.id" :message="message" :previousMessage="query.result.value?.findAllChannelMessagesForChannel.slice().reverse()[index + 1]" />
            </div>
        </el-scrollbar>
        <el-input style="margin-top: 2%; margin-bottom: 2%;" @keyup.enter="onCreateMessage" placeholder="Message..." v-model="inputValue">
            <template #append><el-button @click="onCreateMessage"><el-icon><DArrowRight /></el-icon></el-button></template>
        </el-input>
    </div>
</template>

<script setup lang="ts">
import { useFindChannelQuery, useCreateMessageForChannelMutation, useFindAllChannelMessagesForChannelQuery, useOnNewChannelMessageForChannelIdSubscription} from '@/graphql/graphql-operations'
import { onMounted, ref } from 'vue'
import ChannelChatMessage from './channelChatMessageComponent.vue'
import { cacheUpsert } from "@/utils/cacheUtils"
import type { ElScrollbar } from 'element-plus/es/components'

const props = defineProps<{
    channelId: string
}>()

const loading = ref(true)
const innerRef = ref<HTMLDivElement>()
const chatScroll = ref<InstanceType<typeof ElScrollbar>>()


onMounted(() => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        chatScroll.value?.setScrollTop(innerRef.value!.clientHeight)
    }, 500)
})

const inputValue = ref(``)

const query = useFindAllChannelMessagesForChannelQuery({args: {
    channelId: props.channelId
}})

const  { mutate } = useCreateMessageForChannelMutation({})

useOnNewChannelMessageForChannelIdSubscription({ args: {channelId: props.channelId}}).onResult(({data}) => {
    cacheUpsert(query, data?.onNewChannelMessageForChannelId)
    setTimeout(() => {
        chatScroll.value?.setScrollTop(innerRef.value!.clientHeight)
    }, 5)
})

const { result:resultChannel } = useFindChannelQuery({args: { 
    id: props.channelId
  }})

const onCreateMessage = () => {
    if (inputValue.value.trim().length !== 0) {
        mutate({args: {
            channelId: props.channelId,
            message: inputValue.value,
        }}).then(() => inputValue.value = ``)
    }
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
    margin-left: 5%
    margin-right: 5%
.active-channel-header
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center

.el-input
    height: 7.5%
    padding-left: 5%
    padding-right: 5%

.top
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