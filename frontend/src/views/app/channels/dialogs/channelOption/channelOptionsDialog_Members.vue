<template>
    <el-table v-loading="loadingMembers" :data="members" height="250" style="width: 100%">
        <el-table-column prop="name" label="Name" width="200" />
        <el-table-column prop="type" label="Type" width="100" />
        <el-table-column prop="muted" label="Muted" width="180" />
        <el-table-column prop="createdAt" label="Member since" width="180" />
        <el-table-column prop="updatedAt" label="Last update" width="180" />
        <el-table-column label="Actions" fixed="right" width="200">
            <template #default="scope">
                <el-tooltip effect="dark" content="Promote" placement="top">
                    <el-button size="small" circle><font-awesome-icon icon="angles-up" /></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Demote" placement="top">
                    <el-button size="small" circle><font-awesome-icon icon="angles-down" /></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Mute" placement="top">
                    <el-button size="small" circle><font-awesome-icon icon="comment-slash" /></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Kick" placement="top">
                    <el-button size="small" type="warning" circle><el-icon>
                            <CloseBold />
                        </el-icon></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Ban" placement="top">
                    <el-button size="small" type="danger" circle><font-awesome-icon icon="ban" /></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { type EChannelMemberType, useFindAllChannelMembersForChannelQuery } from '@/graphql/graphql-operations'
import moment from 'moment'

interface membersForTable {
    name?: string
    type: EChannelMemberType
    muted: string
    createdAt: string
    updatedAt: string
}

const members: membersForTable[] = []

const { loading: loadingMembers, onResult: onMembersFound, refetch: refetchMembers } = useFindAllChannelMembersForChannelQuery({
    args: {
        channelId: props.channelId
    }
})

onMembersFound(({ data }) => {
    members.splice(0, members.length)
    data.findAllChannelMembersForChannel.forEach((member) => {
        members.push({
            name: member.user?.username,
            type: member.type,
            muted: moment(member.muted).fromNow(),
            createdAt: moment(member.createdAt).fromNow(),
            updatedAt: moment(member.updatedAt).fromNow(),
        })
    })
})

</script>

<style scoped lang="sass">

</style>