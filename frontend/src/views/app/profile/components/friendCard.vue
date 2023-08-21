<template>
    <div class="friend-card-item">
		<el-avatar :src="usr?.avatarUrl"/>
		<text>{{ usr?.username }}</text>
		<el-button v-if="relationStatus == `WaitingAccept`" @click="acceptFriendRequest()" style="margin:0">
		<el-icon>
			<Select style="color:green" />
			<!-- <Check/> -->
		</el-icon>
	</el-button>
	<el-button v-if="relationStatus == `WaitingAccept`" @click="refuseFriendRequest()" style="margin:0">
		<el-icon>
			<Close style="color:red" />
		</el-icon>
	</el-button>
	<el-button v-if="relationStatus == `Friend`" @click="removeFriend()" style="margin:0">
		<el-icon>
			<Close style="color:red" />
		</el-icon>
	</el-button>
	</div>
</template>

<script lang="ts">
import { useFindUserQuery, useAcceptFriendRequestMutation, useRefuseFriendRequestMutation, useRemoveFriendMutation, type UserPublic, type UpdateUserRelationInput } from '@/graphql/graphql-operations'
import { computed, ref, watch } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
  name: `friend-card-item`,
  props: {
	userId: String,
	relationType: String,
  },
  setup(props) {

	const { mutate:acceptfriendrequestmutate } = useAcceptFriendRequestMutation()
	const { mutate:refusefriendrequestmutate } = useRefuseFriendRequestMutation()
	const { mutate:removefriendmutate } = useRemoveFriendMutation()

    const usr = ref<UserPublic>(null)
	let relationStatus = ref(props.relationType)

    if (props.userId) {
      const { result } = useFindUserQuery({ args: { id: props.userId } })
    	watch(result, newVal => {
        if (newVal) {
          usr.value = newVal.findUser
        }
      })
    }
	
	const acceptFriendRequest = () => {
		const input: UpdateUserRelationInput = { userTargetid : props.userId }
		acceptfriendrequestmutate({args : input})
		.then((res) => {
			relationStatus.value = res?.data?.acceptFriendRequest.type
		})
		.catch((Error) => {
			ElMessage.error(Error.message)
		})
	}

	const refuseFriendRequest = () => {
		const input: UpdateUserRelationInput = { userTargetid : props.userId }
		refusefriendrequestmutate({args : input})
		.then((res) => {
			relationStatus.value = res?.data?.refuseFriendRequest.type
		})
		.catch((Error) => {
			ElMessage.error(Error.message)
		})
	}

	const removeFriend = () => {
		const input: UpdateUserRelationInput = { userTargetid : props.userId }
		removefriendmutate({args : input})
		.then((res) => {
			relationStatus.value = res?.data?.removeFriend.type
		})
		.catch((Error) => {
			ElMessage.error(Error.message)
			console.log(Error.message)
		})
	}

    return { usr, relationStatus, acceptFriendRequest, refuseFriendRequest, removeFriend} 
  }
}

</script>


<style scoped lang="sass">

.friend-card-item
	width: 250px
	height: 40px
	display: flex
	background: radial-gradient(circle at center, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1))
	justify-content: space-evenly
	align-items: center
	backdrop-filter: blur(5px) 
	border: 1px solid rgba(255, 255, 255, 0.2)
	border-radius: var(--el-border-radius-base)

</style>