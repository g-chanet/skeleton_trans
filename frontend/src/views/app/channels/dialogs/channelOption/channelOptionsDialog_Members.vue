<template>
    <el-table v-loading="queryMembers.loading" :data="members" height="250" style="width: 100%">
        <el-table-column prop="name" label="Name" width="200" />
        <el-table-column prop="type" label="Type" width="100" />
        <el-table-column prop="muted" label="Muted" width="180" />
        <el-table-column prop="createdAt" label="Member since" width="180" />
        <el-table-column prop="updatedAt" label="Last update" width="180" />
        <el-table-column label="Actions" fixed="right" width="200" :loading="loadingUpdate || loadingKick">
            <template #default="scope">
                <el-tooltip effect="dark" content="Promote" placement="top"
                    v-if="scope.row.type === EChannelMemberType.Default">
                    <el-button size="small" circle @click="promote(scope.$index, scope.row)"><font-awesome-icon
                            icon="angles-up" /></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Demote" placement="top"
                    v-if="scope.row.type === EChannelMemberType.Admin">
                    <el-button size="small" circle @click="demote(scope.$index, scope.row)"><font-awesome-icon
                            icon="angles-down" /></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Mute" placement="top" v-if="scope.row.type !== EChannelMemberType.Owner">
                    <el-button size="small" circle @click="mute(scope.$index, scope.row)"><font-awesome-icon
                            icon="comment-slash" /></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Kick" placement="top" v-if="scope.row.type !== EChannelMemberType.Owner">
                    <el-button size="small" type="warning" circle @click="kick(scope.$index, scope.row)"><el-icon>
                            <CloseBold />
                        </el-icon></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Ban" placement="top" v-if="scope.row.type !== EChannelMemberType.Owner">
                    <el-button size="small" type="danger" circle @click="ban(scope.$index, scope.row)"><font-awesome-icon
                            icon="ban" /></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { EChannelMemberType, useFindAllChannelMembersForChannelQuery, type Channel, type ChannelMember, useUpdateMemberForChannelMutation, useDeleteMemberForChannelMutation, useOnDeleteChannelMemberForChannelIdSubscription, useOnNewChannelMemberForChannelIdSubscription, useOnUpdateChannelMemberForChannelIdSubscription } from '@/graphql/graphql-operations'
import { cacheUpsert, cacheDelete } from '@/utils/cacheUtils'
import { ElMessage } from 'element-plus'
import moment from 'moment'
import { computed } from 'vue'

const props = defineProps<{
    channel: Channel
}>()


interface MemberForTable {
    id: string
    name: string
    type: EChannelMemberType
    muted: string
    createdAt: string
    updatedAt: string
}

const queryMembers = useFindAllChannelMembersForChannelQuery({
    args: {
        channelId: props.channel.id
    }
})

const { mutate: update, onDone: onUpdateDone, onError: onUpdateError, loading: loadingUpdate } = useUpdateMemberForChannelMutation({})
const { mutate: deleteMember, onDone: onKickDone, onError: onKickError, loading: loadingKick } = useDeleteMemberForChannelMutation({})

const members = computed(() => {
    const data: MemberForTable[] = []
    queryMembers.result.value?.findAllChannelMembersForChannel.forEach((member) => {
        data.push({
            id: member.user!.id,
            name: member.user!.username,
            type: member.type,
            muted: moment(member.muted).fromNow(),
            createdAt: moment(member.createdAt).fromNow(),
            updatedAt: moment(member.updatedAt).fromNow(),
        })
    })
    return data
})

const promote = (index: number, row: MemberForTable) => {
    update({
        args: {
            channelId: props.channel.id,
            userId: row.id,
            type: EChannelMemberType.Admin
        }
    })
}

const demote = (index: number, row: MemberForTable) => {
    update({
        args: {
            channelId: props.channel.id,
            userId: row.id,
            type: EChannelMemberType.Default
        }
    })
}

const mute = (index: number, row: MemberForTable) => {
    update({
        args: {
            channelId: props.channel.id,
            userId: row.id,
            //mute:
        }
    })
}

const kick = (index: number, row: MemberForTable) => {
    deleteMember({
        args: {
            channelId: props.channel.id,
            userId: row.id
        }
    })
}

const ban = (index: number, row: MemberForTable) => {
    update({
        args: {
            channelId: props.channel.id,
            userId: row.id,
            type: EChannelMemberType.Banned
        }
    })
}

onUpdateDone(() => {
    ElMessage({
        showClose: true,
        message: `Update complete`,
        type: `success`
    })
})

onUpdateError((e) => {
    ElMessage({
        showClose: true,
        message: e.message,
        type: `error`
    })
})

onKickDone(() => {
    ElMessage({
        showClose: true,
        message: `Kick complete`,
        type: `success`
    })
})

onKickError((e) => {
    ElMessage({
        showClose: true,
        message: e.message,
        type: `error`
    })
})

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