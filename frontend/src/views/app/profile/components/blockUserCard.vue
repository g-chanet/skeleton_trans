<template>
    <div class="search-friend-card-item">
        <el-avatar :src="avatarUrl"/>
        <text>{{username}}</text>
        <el-button @click="handleButtonClick()"
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
import { CirclePlus } from '@element-plus/icons-vue'
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
		return {props, relationType, handleMouseLeave, handleMouseEnter, handleButtonClick, isHovered}
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