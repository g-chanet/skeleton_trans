<template>
    <div :class="messageOrigin">
        <div class="content">
            {{ props.channelMessage.message }}
        </div>
        <div class="timestamp">
            {{ moment(props.channelMessage.createdAt).fromNow() }}
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from  "moment"
import { useFindMyUserQuery, type ChannelMessage } from '@/graphql/graphql-operations'

const { result } = useFindMyUserQuery()

const props = defineProps<{
    channelMessage: ChannelMessage
}>()

const messageOrigin = result.value?.findMyUser.id === props.channelMessage.userId ? `myMessages` : `otherMessages`
</script>

<style scoped lang="sass">

.myMessages
    border-top-left-radius: 20px
    border-top-right-radius: 20px
    border-bottom-left-radius: 20px
    background: var(--el-color-primary)
    margin-top: 5% 
    .content
        padding: 3%

    .timestamp
        display: flex
        justify-content: flex-end
        padding: 1%

.otherMessages
    border-top-left-radius: 20px
    border-top-right-radius: 20px
    border-bottom-right-radius: 20px
    background: var(--el-color-primary-light-5)
    margin-top: 5% 
    .content
        padding: 3%
        display: flex
        justify-content: flex-end
    .timestamp
        padding: 1%


</style>