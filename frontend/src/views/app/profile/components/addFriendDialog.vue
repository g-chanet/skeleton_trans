<template>
	<el-dialog v-model="addFriendDialogVisible" width="30%" style="display:flex; justify-content: center;">
		<el-input
			class="w-50 m-2"
			placeholder="Rechercher un utilisateur"
			:prefix-icon="Search"
			v-model="searchValue"
			style="width:100%"
		></el-input>
		<el-scrollbar style="height : 500px; justify-content: center; align-items: center; display:flex; margin-top: 40px;">
			<div v-for="item in filteredUsers" :key="item.id">
				<searchFriendCard 
					:userId="item.id" 
					:avatarUrl="item.avatarUrl" 
					:username="item.username" 
					:relationStatus="item.relationStatus"
				/>
			</div>
		</el-scrollbar>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import searchFriendCard from "./searchFriendCard.vue"
import { useFindPublicUsersListQuery, 
	useFindAllRelationsForMyUserQuery, 
	useFindMyUserQuery,
	EUserRealtionType } from '@/graphql/graphql-operations'
import { Search } from '@element-plus/icons-vue'

const { result:resultForUsers } = useFindPublicUsersListQuery()
const { result:resultForMyRelations } = useFindAllRelationsForMyUserQuery()
const { result:resultforMyUser } = useFindMyUserQuery()

const usersPublic = computed(() => resultForUsers.value?.findPublicUsersList)
const loggedInUser = computed(() => resultforMyUser.value?.findMyUser)
const userRelations = computed(() => resultForMyRelations.value?.findAllRelationsForMyUser)

const searchValue = ref(``)

const getRelationStatus = (userId: string) => {
	const relation = userRelations.value?.find(rel => rel.userTargetId === userId)
	return relation ? relation.type : null
}

const filteredUsers = computed(() => {
	if (!searchValue.value) return usersPublic.value?.map(user => ({ ...user, relationStatus: getRelationStatus(user.id) }))
		.filter(user => !user.id.includes(loggedInUser.value.id) && 
		![EUserRealtionType.Friend, EUserRealtionType.WaitingAccept].includes(user.relationStatus))

	return usersPublic.value?.filter(user => 
		!user.id.includes(loggedInUser.value.id) && 
		user.username.toLowerCase().includes(searchValue.value.toLowerCase()) &&
		![EUserRealtionType.Friend, EUserRealtionType.WaitingAccept].includes(getRelationStatus(user.id))
	)
	.map(user => ({ ...user, relationStatus: getRelationStatus(user.id) }))
})

const addFriendDialogVisible = ref(false)
const changeDialogVisibility = () => {
	addFriendDialogVisible.value = true
}

defineExpose({ changeDialogVisibility })
</script>

<style scoped lang="scss">

</style>
