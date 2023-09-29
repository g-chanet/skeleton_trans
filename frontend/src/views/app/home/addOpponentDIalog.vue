<template>
	<el-dialog v-model="DialogVisible" width="25%">
		<div class="container">
			<el-input class="input"/>
			<el-scrollbar>
					<div>
					<p v-for="friends in userRelations" :key="friends.id">
						<div class="test-component">
							<div class="avatar-username-wrapper">
								<el-avatar class="avatar" :src="friends.friendInfos.avatarUrl"/>
								<div style="display: flex; flex-direction: column;">
									<h1 style="margin-bottom: 0;">{{truncateStr(friends.friendInfos.username)}}</h1>
									<p style="margin-top: 0">ratio: {{ friends.friendInfos.ratio }}</p>
								</div>
							</div>
							<el-button class="defy-btn" @click="changeDialogVisibility(false); setOpponentId(friends.userTargetId)">defy</el-button>
						</div>
					</p>
				</div>
			</el-scrollbar>

		</div>
	  
	</el-dialog>
  </template>
  
<script setup lang="ts">
import { ref, inject, watch } from 'vue'
import { useFindAllRelationsForMyUserQuery, type UserRelation } from '@/graphql/graphql-operations'

const { onResult, refetch } = useFindAllRelationsForMyUserQuery()
const DialogVisible = ref(false)
const userRelations = ref<UserRelation[]>([])
const setOpponentId = inject('addOpponentNewGameDialog')

onResult((res) => {
	console.log("resluts !")
	console.log(res)
	if (res.data.findAllRelationsForMyUser) {
		const rels = res.data.findAllRelationsForMyUser
		if (rels) {
			userRelations.value = rels
		}
		console.log(userRelations.value)
	}
})

watch(DialogVisible, () => {
    if (DialogVisible.value) {
		console.log("called !")
        const rels = refetch()
		if (rels) {
			userRelations.value = rels
			console.log("attributed")
			console.log(rels)
		}
    }
})

const truncateStr = (str:String) => {
	if (str.length < 12) {
		return str
	}
	else {
		return str.slice(0, 12) + "..."
	}
}

const changeDialogVisibility = () => {
    DialogVisible.value ? DialogVisible.value = false : DialogVisible.value = true
  }
defineExpose({ changeDialogVisibility })
</script>

<style scoped lang="sass">

.container
	width: 100%
	height: 40vh
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	background: #111115
	font-family: "roboto"
	.input
		margin: 20px
		width: 80%
	.test-component
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
		.defy-btn
			width: 6vw
			height: 100%
			border-radius: 3px
			background: rgba(217, 217, 217, 0.18)
			margin: 10px


</style>
