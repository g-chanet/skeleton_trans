<template>
<div class="common-layout">
    <el-container>
      <el-container>
        <el-main>
			<div class="matchmakings-layout">
				<h1 class="title-header">GAMES</h1>
				<div class="games-list-and-buttons-container">
					<div class="games-buttons-container">
						<div class="instant-matchmaking-btn" @click="RefNewOfflineGameDialog.changeDialogVisibility()">
							<h1>Create Custom Game</h1>
						</div>
						<div class="create-game-btn" @click="onMatchMackingJoined()">
							<el-icon :size="60" style="color: #f5721b;"><TrophyBase /></el-icon>
							<h1>Matchmaking</h1>
						</div>
					</div>
					<div class="games-list-container">
						<el-scrollbar>
							<div style="display: flex; width: 50%; height:100%">
								<p v-for="item in displayedMatchmakings" :key="item">
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
								<p v-for="item in localGames" :key="item.id">
									<ActiveGameComponent :GameMember1="item.gameMembers?.at(0)" :GameMember2="item?.gameMembers?.at(1)"/>
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
	<newGameDialog ref="RefNewOfflineGameDialog"/>
  </div>

</template>
  
<script setup lang="ts">
import newLastGameItem  from "../profile/components/newLastGameItem.vue"
import matchMakingGameItem from "./matchMakingGameItem.vue"
import ActiveGameComponent from "./ActiveGameComponent.vue"
import { computed, ref, inject, watch, onMounted } from "vue"
import { useFindAllGameStatsSoftLimitQuery,
	useAllGamesStatsUpdatedSubscription,
	useJoinGameMatchmakingMemberMutation,
	type GameStat, type GameMatchmakingMember,
	type Game, type User} from '@/graphql/graphql-operations'
import newGameDialog from "./newGameDialog.vue"
import { ElMessage } from "element-plus"


const RefNewOfflineGameDialog = null
const { result: queryData } = useFindAllGameStatsSoftLimitQuery()
const { result: subscriptionData } = useAllGamesStatsUpdatedSubscription()
const { mutate: mutateJoinMatchmaking, onError: onErrorJoinMatchmaking } = useJoinGameMatchmakingMemberMutation()
let localGameStats:GameStat[] = []
const localMatchmakings = inject<GameMatchmakingMember[]>('localMatchmakings')
const loggedInUser = inject<User>('loggedInUser')
const localGames = inject<Game[]>('localGames')
console.log('localGames = ', localGames)
const displayedMatchmakings = computed(() => localMatchmakings.value.filter(member => member.userId != loggedInUser.value.id).filter(member => member.targetUserId === loggedInUser.value.id || member.targetUserId === null))


const gameStats = computed(() => {
console.log(localGameStats.length)
if (localGameStats.length == 0 && queryData.value?.findAllGameStatsSoftLimit) {
	console.log(`refetch`)
	localGameStats = queryData.value?.findAllGameStatsSoftLimit || []
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

const onMatchMackingJoined = async () => {
		console.log('join matchmaking button have been pushed')
		await mutateJoinMatchmaking()
		.catch((error) => {
		ElMessage.error(error.message)
	})
}

onMounted(() => {
	console.log('monteeee')
})

</script>

  
<style scoped lang="sass">

.input-base
	width: 15vw
	margin-left: 15px
.title-header
	font-size: 2em
	top: 45px
	font-family: "Vaporfuturism", "Helvetica", sans-serif
	color: #FA26F7
	text-transform: uppercase
	letter-spacing: 0px
	margin: 25px

.common-layout
	display: flex
	width: 100%
	height: 100%
	font-family: 'roboto'
	.matchmakings-layout
		display: flex
		flex-direction: column
		align-items: center
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
			align-items: center
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
			align-items: center
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
  