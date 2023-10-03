<template>
    <div class="user-item-component">
		<div class="avatar-username-wrapper">
			<el-avatar class="avatar" :src="avatarUrl"/>
			<text>{{truncateStr(username, 8)}}</text>
		</div>
        <el-button class="add-btn"
					@click="handleButtonClick()"
                   @mouseenter="handleMouseEnter()" 
                   @mouseleave="handleMouseLeave()">
            <el-icon v-if="relationType != 'Blocked'">
                <CirclePlus/>
            </el-icon>
			<el-icon v-if="relationType === 'PendingAccept' && isHovered">
                <Close/>
            </el-icon>
            <a v-if="relationType === 'Blocked' && !isHovered">Bloqué !</a>
            <span v-if="relationType === 'Blocked' && isHovered">Annuler</span>
        </el-button>
    </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useBlockRelationMutation , type EUserRealtionType, useUnblockRelationMutation  } from '@/graphql/graphql-operations'


export default {
  name: `search-friend-card-item`,
  props: {
	userId: String,
	avatarUrl: String,
	username: String,
	relationStatus: String,
  },
  setup(props) {

	const { mutate:blockrelationmutation, onError:blockrelationmutationonerror } = useBlockRelationMutation()
	const { mutate:unblockrelationmutation, onError:unblockrelationmutationonerror } = useUnblockRelationMutation()

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
      if (relationType.value === `Blocked`) {
        unblockUser()
      } else {
        blockUser()
      }
    }
	
	const unblockUser = () => {
		unblockrelationmutation({ userTargetId: props.userId })
		.then ((res) => {
			if (!res?.errors && res?.data?.unblockRelation)
			{
				relationType.value = undefined
			}
		})
		.catch((Error) => {
				ElMessage.error(Error.message)
			})
	}

	const blockUser = () => {
		if (props.userId)
		{
			blockrelationmutation({ userTargetId: props.userId })
			.then((res) => {
				if (!res?.errors && res?.data?.blockRelation)
				{
					relationType.value = res.data.blockRelation.type
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

		return {props, relationType, handleMouseLeave, handleMouseEnter, handleButtonClick, isHovered, truncateStr}
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