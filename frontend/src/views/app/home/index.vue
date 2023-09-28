<template>
<div class="common-layout">
    <el-container>
      <el-container>
        <el-header style="height: 3vh">
			<el-input class="input-base"
				placeholder="Type something"
				:prefix-icon="Search"
			/>
		</el-header>
        <el-main>
			<div class="matchmakings-layout">
				<h1 class="title-header">GAMES</h1>
				<div class="games-list-and-buttons-container">
					<div class="games-buttons-container">
						<div class="instant-matchmaking-btn" @click="onMatchMackingJoined()">
							<h1>instant matchmaking</h1>
						</div>
						<div class="create-game-btn" @click="RefNewOfflineGameDialog.changeDialogVisibility()">
							<el-icon :size="60" style="color: #4422EF;"><Plus /></el-icon>
							<h1>create a new game</h1>
						</div>
					</div>
					<div class="games-list-container">
						<el-scrollbar>
							<div style="display: flex; width: 50%; height:100%">
								<p v-for="item in localMatchmakings" :key="item">
									<matchMakingGameItem :matchmakingItem="item" />
								</p>
							</div>
						</el-scrollbar>
					</div>
				</div>
			</div>
			<div class="last-games-layout">
				<div class="active-games-container">
					<h1 class="title-header">ACTIVE GAMES</h1>
					<div class="active-games-list-container">
						<el-scrollbar>
							<div>
								<p v-for="item in 50" :key="item">
									<ActiveGameComponent/>
								</p>
							</div>
						</el-scrollbar>
					</div>
				</div>
				<div class="past-games-container">
					<h1 class="title-header">GAME HISTORY</h1>
					<div class="last-games-list-container">
						<el-scrollbar>
							<div>
								<p v-for="item in gameStats" :key="item">
									<newLastGameItem :id-player1="item.userId" :id-player2="item.opponentId" :score1="item.userScore" :score2="item.opponentScore"></newLastGameItem>
								</p>
							</div>
						</el-scrollbar>
					</div>
				</div>
			</div>
			
		</el-main>
      </el-container>
    </el-container>
	<matchmakingDialog/>
	<newGameDialog ref="RefNewOfflineGameDialog"/>
  </div>

</template>
  
<script setup lang="ts">
import newLastGameItem  from "../profile/components/newLastGameItem.vue"
import matchMakingGameItem from "./matchMakingGameItem.vue"
import ActiveGameComponent from "./ActiveGameComponent.vue"
import { computed, ref, inject, watch } from "vue"
import { useFindAllGameStatsSoftLimitQuery,
	useFindAllGamesQuery, 
	useAllGamesStatsUpdatedSubscription,
	useAllGamesUpdatedSubscription,
	useFindMyUserQuery,
	useJoinGameMatchmakingMemberMutation,
	useFindAllGameMatchmakingMemberlQuery,
	useMatchmakingMembersChangedSubscription,
	type GameStat,
	type GameMatchmakingMember,
	type Game, } from '@/graphql/graphql-operations'
import  matchmakingDialog  from "./matchmakingDialog.vue"
import { Calendar, Search } from '@element-plus/icons-vue'
import newGameDialog from "./newGameDialog.vue"
import { ElMessage } from "element-plus"
import { useRouter } from 'vue-router'
import ActiveGameComponentVue from "./ActiveGameComponent.vue"

const RefNewOfflineGameDialog = null
const { result: queryData } = useFindAllGameStatsSoftLimitQuery()
const { result: queryUser } = useFindMyUserQuery()
const { result: subscriptionData } = useAllGamesStatsUpdatedSubscription()
const { result: queryMatchmakers } = useFindAllGameMatchmakingMemberlQuery()
const { mutate: mutateJoinMatchmaking, onError: onErrorJoinMatchmaking } = useJoinGameMatchmakingMemberMutation()
let localGameStats:GameStat[] = []
let localGames:Game[] = []
const localMatchmakings =ref<GameMatchmakingMember[]>([])
const matchmakersSub = inject<GameMatchmakingMember>('matchmakingsSub')
const isDataInitialized = ref(false)

const loggedInUser = computed(() => queryUser.value?.findMyUser)
console.log(localGameStats)
console.log(localGames)
console.log(loggedInUser.value)

const gameStats = computed(() => {
console.log(localGameStats.length)
if (localGameStats.length == 0 && queryData.value?.findAllGameStatsSoftLimit) {
	console.log(`refetch`)
	localGameStats = queryData.value?.findAllGameStatsSoftLimit || []
}

if (localMatchmakings.value.length == 0 && queryMatchmakers.value?.findAllGameMatchmakingMemberl && !isDataInitialized.value) {
	console.log(`refetch Matchmakings`)
	localMatchmakings.value = computed(() => queryMatchmakers.value?.findAllGameMatchmakingMemberl).value?.filter(member => member.userId != loggedInUser.value.id)
	isDataInitialized.value = true
	console.log(`after efetch: `, localMatchmakings.value)
}

let ret = localGameStats


if (subscriptionData.value?.allGamesStatsUpdated) {
	const newGameStat = subscriptionData.value.allGamesStatsUpdated
	if (newGameStat.isDeleted) {
		ret = ret.filter(gameStat => gameStat.id !== newGameStat.id)
		localGameStats = ret
	} else {
		console.log(newGameStat)
		ret = [newGameStat, ...ret]
		localGameStats = ret
	}
}
return ret
})

watch(matchmakersSub, (changedMember:GameMatchmakingMember) => {

    const tmp = [...localMatchmakings.value]
    if (changedMember.isDeleted) {
      console.log(`received deleted :`, changedMember)
      localMatchmakings.value = tmp.filter(member => member.userId !== changedMember.userId)
    } else {
      const existingIndex = tmp.findIndex(member => member.userId === changedMember.userId)
      if (existingIndex > -1) {
        tmp[existingIndex] = changedMember
        console.log(`updated existing :`, changedMember)
      } else {
        console.log(`received new :`, changedMember)
        tmp.unshift(changedMember)
      }
      localMatchmakings.value = tmp.filter(member => member.userId != loggedInUser.value.id)
	  .filter(member => member.targetUserId === loggedInUser.value.id || member.targetUserId === null)
    }
})

const displayedMatchmaking = computed(() => localMatchmakings.value)

// const matchMakers = computed(() => {
// 	if (subscriptionMatchMakers.value?.matchmakingMembersChanged) {
// 		return (subscriptionMatchMakers.value.matchmakingMembersChanged)
// 	}
// 	return (queryMatchmakers.value?.findAllGameMatchmakingMemberl)
// })

const onMatchMackingJoined = () => {
		mutateJoinMatchmaking()
		.catch((error) => {
		ElMessage.error(error.message)
	})
}

</script>

  
<style scoped lang="sass">

.input-base
	width: 15vw
	margin-left: 15px
.title-header
	font-size: 1.2em
	font-weight: bold
	font-family: "Roboto"
	margin : 25px
	color: #979797
.common-layout
	display: flex
	width: 100%
	height: 100%
	font-family: 'roboto'
	.matchmakings-layout
		display: flex
		flex-direction: column
		height: 40%
		background-color: #0E0E10
		border-radius: 20px
		margin: 10px
		.games-list-and-buttons-container
			margin-top: -40px
			display: flex
			align-items: center
			height: 100%
			width: 100%
			.games-buttons-container
				display: flex
				flex-direction: column
				width: 14vw
				height: 100%
				margin: 20px
				justify-content: center
				.instant-matchmaking-btn
					height: 15%
					margin-bottom: 10px
					width: 100%
					display: flex
					background: #111115
					justify-content: center
					align-items: center
					cursor: pointer
					border-radius: var(--el-border-radius-base)
				.create-game-btn
					display: flex
					flex-direction: column
					justify-content: center
					align-items: center
					height: 59%
					width: 14vw
					background: #111115
					border-radius: var(--el-border-radius-base)
					cursor: pointer
			.games-list-container
				display: flex
				width: 89%

	.last-games-layout
		display: flex
		height: 58%
		.active-games-container
			background: #0E0E10
			display: flex
			flex-direction: column
			width: 25%
			height: 95%
			margin: 10px
			border-radius: 10px
			.active-games-list-container
				display: flex
				justify-content: center
				align-items: center
				height: 85%
				width: 100%
		.past-games-container
			background: #0E0E10
			display: flex
			flex-direction: column
			width: 75%
			height: 95%
			margin: 10px
			border-radius: 10px
			.last-games-list-container
				display: flex
				justify-content: center
				align-items: center
				height: 85%
				width: 100%
</style>
  