<template>
	<div class="container">
		<el-input class="input" placeholder="Rechercher un utilisateur" :prefix-icon="Search" v-model="searched"
			style="width:100%"></el-input>
		<el-scrollbar>
			<div>
				<p v-for="item in filtered" :key="item.id">
					<blockUserCard :userId="item.id" :avatarUrl="item.avatarUrl || ''" :username="item.username"
						:relationStatus="gestUserRelation(item.id)?.type" />
				</p>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { ref, inject, watch, computed, type Ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useFindPublicUsersListQuery, type UserRelation, type UserPublic, type User } from '@/graphql/graphql-operations'
import blockUserCard from './blockUserCard.vue'

const { onResult, refetch } = useFindPublicUsersListQuery()
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

onMounted(() => {
	refetch()
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
		if (searched.value && !user.username.toLowerCase().includes(searched.value.toLowerCase())) {
			return false
		}
		return true
	})
})

</script>

<style scoped lang="sass">

.container
	width: 100%
	height: 40vh
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	font-family: "roboto"
	.input
		margin: 20px
		width: 80%

</style>
