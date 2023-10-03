<template>
    <div class="friend-card-item" @click="handleSelected()" :class="{ 'extended':isSelected }">
		<div class="info-container">
			<el-avatar style="border-radius: 3px;" :src="usr?.avatarUrl"/>
			<div style="display: flex; flex-direction: column">
				<text style="font-size: 14px;">{{ truncateStr(usr?.username, 11) }}</text>
				<text style="font-size: 9px;">Ratio: 0.80</text>
			</div>
			<el-button v-if="relationStatus == `WaitingAccept`" @click="acceptFriendRequest()" style="margin:0">
			<el-icon>
				<Select style="color:green" />
				<!-- <Check/> -->
			</el-icon>
			</el-button>
			<el-button v-if="relationStatus == `WaitingAccept`" @click="removeFriend()" style="margin:0">
				<el-icon>
					<Close style="color:red" />
				</el-icon>
			</el-button>
			<div v-if="isValidated && relationStatus == 'Friend'" class="activityIndicator" :class="{ 'disconnected':presenceStatus ===  'disconnected'}">
				<p v-if="presenceStatus == 'disconnected'">disconnected</p>
				<p v-if="presenceStatus == 'connected'">online</p>
			</div>
		</div>
		<div v-if="isSelected && relationStatus=='Friend'" class="interaction-container">
			<div class="iteration-card" @click="onChallengeClicked()">challenge</div>
			<div v-if="relationStatus=='Friend'" class="iteration-card" @click="removeFriend()" :class="{error: relationStatus == 'Friend'}">remove</div>
			<div class="iteration-card">message</div>
		</div>
	</div>
</template>

<script lang="ts">
import { 
	useFindUserQuery,
	useAcceptFriendRequestMutation,
	useRefuseFriendRequestMutation,
	useRemoveFriendMutation,
	useFindUserPresencesQuery,
	useUsersPresenceUpdatedSubscription,
	useJoinGameMatchmakingMemberMutation,
	type UpdateUserRelationInput,
} from '@/graphql/graphql-operations'
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'friend-card-item',
  props: {
	userId: String,
	relationType: String,
	isValidated: Boolean,
  },
  setup(props) {

	const userIdArr = computed(() => {
      return props.userId ? [props.userId] : []
    })

	const { mutate: acceptfriendrequestmutate } = useAcceptFriendRequestMutation()
	const { mutate: refusefriendrequestmutate } = useRefuseFriendRequestMutation()
	const { mutate: removefriendmutate } = useRemoveFriendMutation()
	const { mutate: joinMatchmakingMutate } = useJoinGameMatchmakingMemberMutation()
	const { result: userPresenceSubRes } = useUsersPresenceUpdatedSubscription({ args: { userIds: userIdArr.value }})
	const { result: resultForUserPresenceQuery } = useFindUserPresencesQuery({ args: { userIds: userIdArr.value }})
	const isSelected = ref(false)

	let relationStatus = ref(props.relationType)
    const { result } = useFindUserQuery({ args: { id: props.userId || "" } })
	const usr = computed(() => result.value?.findUser)

	const handleSelected = () => {
		console.log("handle selected")
		if (isSelected.value) {
			isSelected.value = false
		} else {
			isSelected.value = true
		}
	}

	const truncateStr = (str:String | undefined, limit:number) => {
		if (!str) {
			return
		}
		if (str.length < limit) {
			return str
		}
		else {
			return str.slice(0, limit) + "..."
		}
	}
	
	const acceptFriendRequest = () => {
		if (props.userId) {
			const input: UpdateUserRelationInput = { userTargetid: props.userId }
			acceptfriendrequestmutate({ args: input })
			.then((res) => {
				relationStatus.value = res?.data?.acceptFriendRequest.type
			})
			.catch((Error) => {
				ElMessage.error(Error.message)
			})
		}
	}

	const refuseFriendRequest = () => {
		if (props.userId) {
			const input: UpdateUserRelationInput = { userTargetid: props.userId }
			refusefriendrequestmutate({ args: input })
			.then((res) => {
				relationStatus.value = res?.data?.refuseFriendRequest.type
			})
			.catch((Error) => {
				ElMessage.error(Error.message)
			})
		}
	}

	const removeFriend = () => {
		if (props.userId) {
			const input: UpdateUserRelationInput = { userTargetid: props.userId }
			removefriendmutate({ args: input })
			.then((res) => {
				console.log(res)
				relationStatus.value = res?.data?.removeFriend.type
			})
			.catch((Error) => {
				ElMessage.error(Error.message)
			})
		}
	}

	const presenceStatus = ref('disconnected')

	watch([userPresenceSubRes, resultForUserPresenceQuery], () => {
		const presenceData = userPresenceSubRes.value?.usersPresenceUpdated || resultForUserPresenceQuery.value?.findUserPresences.at(0)
		if (presenceData) {
			const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
			const isConnected = new Date(presenceData.connectedAt) >= fiveMinutesAgo
			console.log(usr.value?.username, `: `, isConnected, `, `, fiveMinutesAgo, `: `, new Date(presenceData.connectedAt))
			presenceStatus.value = isConnected ? 'connected' : 'disconnected'
		}
	})

	const onChallengeClicked = () => {
		joinMatchmakingMutate({ userTargetId: props.userId })
      .catch((error) => {
          ElMessage.warning(error)
        })
	}
	

	return { 
		usr,
		relationStatus,
		acceptFriendRequest,
		refuseFriendRequest,
		removeFriend,
		handleSelected,
		presenceStatus,
		isSelected,
		truncateStr,
		onChallengeClicked
	}
  }
}
</script>



<style scoped lang="sass">

.friend-card-item
	width: 250px
	height: 40px
	display: flex
	background: rgba(217, 217, 217, 0.04)
	justify-content: space-evenly
	align-items: center
	backdrop-filter: blur(5px) 
	border-radius: var(--el-border-radius-base)
	border: 3px solid rgba(217, 217, 217, 0.04)
	font-family: 'roboto'
	font-size: 12px
	flex-direction: column
	cursor: pointer
	&.extended
		height: 90px
	.info-container
		width: 100%
		height: 40px
		justify-content: center
		align-items: center
		display: flex
		justify-content: space-evenly
		.activityIndicator
			width: 30%
			height: 80%
			background: rgba(0, 255, 10, 0.18)
			color: rgba(0, 255, 10, 1)
			display: flex
			border-radius: 3px
			justify-content: center
			align-items: center
			&.disconnected
				background: rgba(255, 4, 4, 0.18)
				color: rgba(255, 4, 4, 1)
	.interaction-container
		display: flex
		height: 50%
		width: 100%
		.iteration-card
			height: 80%
			display: flex
			justify-content: center
			align-items: center
			width: 30%
			background: rgba(80, 48, 240, 0.18)
			margin: 2%
			border-radius: 6px
			cursor: pointer
			z-index: 1
			&.error
				background: rgba(255, 4, 4, 0.18)
				color: rgba(255, 4, 4, 1)
			&.info
				background: rgba(205, 255, 4, 0.18)
				color: rgba(205, 255, 4, 1)


</style>