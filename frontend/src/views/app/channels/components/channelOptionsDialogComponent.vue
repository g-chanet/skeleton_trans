<template>
    <el-dialog v-model="dialog" title="Channel options" width="52%" style="border-radius: var(--el-border-radius-base)"
        :before-close="handleClose" close-on-press-escape>
        <el-tabs v-model="activeTab" style="margin-top: -20px; margin-bottom: -10px;">
            <el-tab-pane label="Edit channel" name="first">
                <EditChannel />
            </el-tab-pane>
            <el-tab-pane label="Change visibility" name="second">
                <ChangeVisibility />
            </el-tab-pane>
            <el-tab-pane label="Manage members" name="third">
                <ManageMembers />
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EditChannel from './editChannelComponent.vue'
import ChangeVisibility from './changeVisibilityComponent.vue'
import ManageMembers from './manageMembersComponent.vue'

const props = defineProps<{
    modelValue: boolean
    channelId: string
}>()

const emits = defineEmits<{
    (e: `update:modelValue`, value: boolean): void,
}>()

const dialog = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emits(`update:modelValue`, value)
    }
})

const activeTab = ref(`first`)

const handleClose = () => {
    dialog.value = false
}

</script>

<style scoped lang="sass">

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