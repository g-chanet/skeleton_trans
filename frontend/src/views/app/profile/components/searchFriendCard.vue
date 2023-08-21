<template>
    <div class="search-friend-card-item">
        <el-avatar :src="avatarUrl"/>
        <text>{{username}}</text>
        <el-button @click="handleButtonClick()"
                   @mouseenter="handleMouseEnter()" 
                   @mouseleave="handleMouseLeave()">
            <el-icon v-if="relationType != 'PendingAccept'">
                <CirclePlus v-if="relationType == null"/>
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
import { computed, ref } from 'vue'
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

	const { mutate:createfriendrequestmutation, onError:createfriendrequestonerror } = useCreateRequestFriendMutation()
	const { mutate:removefriendmutation, onError:removefriendonerror } = useRemoveFriendMutation()

	const relationType = ref(props.relationStatus)
	const isHovered = ref(false)
    
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
		return {props, createFriendRequest, relationType, handleMouseLeave, handleMouseEnter, handleButtonClick, isHovered}
	}
}

</script>

<style scoped lang="sass">

.search-friend-card-item
	width: 400px
	height: 60px
	margin-top : 20px
	display: flex
	background: rgb(26,35,50)
	color: var(--el-color-primary)
	justify-content: space-evenly
	align-items: center

</style>