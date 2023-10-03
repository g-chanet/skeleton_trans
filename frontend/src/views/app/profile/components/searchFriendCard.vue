<template>
    <div class="user-item-component">
		<div class="avatar-username-wrapper">
			<el-avatar class="avatar" :src="avatarUrl"/>
        	<text>{{ truncateStr(username, 8) }}</text>
		</div>
        <el-button class="add-btn"
				   @click="handleButtonClick()"
                   @mouseenter="handleMouseEnter()" 
                   @mouseleave="handleMouseLeave()">
            <el-icon v-if="relationType != 'PendingAccept'">
                <CirclePlus/>
            </el-icon>
			<el-icon v-if="relationType === 'PendingAccept' && isHovered">
                <Close/>
            </el-icon>
            <a v-if="relationType === 'PendingAccept' && !isHovered">En attente</a>
            <span v-if="relationType === 'PendingAccept' && isHovered">Annuler</span>
        </el-button>
    </div>
</template>

<script lang="ts">
import { CirclePlus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useCreateRequestFriendMutation, useRemoveFriendMutation ,EUserRealtionType } from '@/graphql/graphql-operations'


export default {
  name: `search-friend-card-item`,
  props: {
	userId: String,
	avatarUrl: String,
	username: String,
	relationStatus: String,
  },
  setup(props) {

	const { mutate:createfriendrequestmutation } = useCreateRequestFriendMutation()
	const { mutate:removefriendmutation } = useRemoveFriendMutation()

	const relationType = ref(props.relationStatus)
	const isHovered = ref(false)
	watch(() => props.relationStatus, (newRel) => {
        relationType.value = newRel
    })
    
    const handleMouseEnter = () => {
      isHovered.value = true
    }

    const handleMouseLeave = () => {
      isHovered.value = false
    }

    const handleButtonClick = () => {
      if (relationType.value === `PendingAccept`) {
        removeFriend()
      } else {
        createFriendRequest()
      }
    }
	
	const removeFriend = () => {
		removefriendmutation({ args : { userTargetid: props.userId }})
		.then ((res) => {
			if (!res?.errors && res?.data?.removeFriend)
			{
				relationType.value = undefined
			}
		})
		.catch((Error) => {
				ElMessage.error(Error.message)
			})
	}

	const createFriendRequest = () => {
		if (props.userId)
		{
			createfriendrequestmutation({ args : { userTargetId: props.userId } })
			.then((res) => {
				if (!res?.errors && res?.data?.createRequestFriend)
				{
					relationType.value = res.data.createRequestFriend.type
				}
			})
			.catch((Error) => {
				ElMessage.error(Error.message)
			})
		}
	}

	const truncateStr = (str:string | undefined, limit: number) => {
		if (str) {
			if (str.length < limit) {
			return str
			}
			else {
				return str.slice(0, limit) + "..."
			}
		} else {
			return '...'
		}
	}

		return {props, createFriendRequest, relationType, handleMouseLeave, handleMouseEnter, handleButtonClick, isHovered, truncateStr}
	}
}

</script>

<style scoped lang="sass">

.user-item-component
		width: 17vw
		height: 100%
		background: #151519
		display: flex
		justify-content: space-between
		align-items: center
		border-radius: 8px
		.avatar-username-wrapper
			display: flex
			justify-content: flex-start
			align-items: center
			.avatar
				margin-right: 10px
				border-radius: 3px
				margin: 10px
		.add-btn
			width: 6vw
			height: 100%
			border-radius: 3px
			background: rgba(217, 217, 217, 0.18)
			margin: 10px

</style>