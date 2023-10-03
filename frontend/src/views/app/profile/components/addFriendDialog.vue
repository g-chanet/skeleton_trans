<template>
	<el-dialog v-model="DialogVisible" width="25%">
		<div class="container">
			<el-input class="input" v-model="searched"/>
			<el-scrollbar>
					<div>
					<p v-for="user in filtered" :key="user.id">
						<searchFriendCard :avatar-url="user.avatarUrl || ''" :username="user.username" :user-id="user.id" :relation-status="gestUserRelation(user.id)?.type"/>
					</p>
				</div>
			</el-scrollbar>

		</div>
	  
	</el-dialog>
  </template>
  
<script setup lang="ts">
import { ref, inject, watch, computed, type Ref } from 'vue'
import {  useFindPublicUsersListQuery , type UserRelation, type UserPublic, type User } from '@/graphql/graphql-operations'
import searchFriendCard from './searchFriendCard.vue'

const { onResult, refetch } = useFindPublicUsersListQuery()
const DialogVisible = ref(false)
const userRelations = inject<Ref<UserRelation[]>>('userRelations')
const users = ref<UserPublic[]>([])
const searched = ref('')
const loggedInUser = inject<Ref<User>>('loggedInUser')

onResult((res) => {
	console.log("resluts !")
	console.log(res)
	if (res.data.findPublicUsersList) {
		const usrs = res.data.findPublicUsersList
		if (usrs) {
			users.value = usrs
		}
		console.log(users.value)
	}
})

watch(DialogVisible, () => {
    if (DialogVisible.value) {
        refetch()
    }
})

const gestUserRelation = (userId: string) => {
	if (userRelations) {
		return userRelations.value.find(rel => rel.userTargetId === userId)
	}
}

const filtered = computed(() => {
  return users.value.filter(user => {
    if (user.id === loggedInUser?.value.id) {
      return false
    }
    const relation = gestUserRelation(user.id)
    if (relation && (relation.type === 'Friend' || relation.type === 'WaitingAccept')) {
      return false
    }
    if (searched.value && !user.username.toLowerCase().includes(searched.value.toLowerCase())) {
      return false
    }

    return true
  })
})



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

</style>
