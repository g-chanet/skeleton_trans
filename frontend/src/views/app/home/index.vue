<template>
<div class="common-layout">
    <el-container>
      <el-container>
        <el-header>
			<div style="justify-content: space-around; display: flex;">
				<el-button @click="onMatchMackingJoined()" class="btn-5"><span>Join Matchmaking</span></el-button>
				<el-button @click="RefNewOfflineGameDialog.changeDialogVisibility()" class="btn-5"><span>Play Offline</span></el-button>
			</div>
		</el-header>
        <el-main>
			<div class="matchmaking-layout">
				<!-- <h1 class="big-ratio-font-match">Matchmaking</h1> -->
				<el-scrollbar>
   				<div class="scrollbar-flex-content">
					<el-empty v-if="!localMatchmakings.length" image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"/>
     				 <div v-for="item in localMatchmakings" :key="item.userId" class="matchmaking-item">
       					 <matchMakingGameItem :publicInfos="item?.userGameInfos" :message="item?.message"/>
					 </div>
    			</div>
  			</el-scrollbar>
			</div>
			<div style="display:flex; justify-content: center; height: 60%; margin-top: 20px; align-items: center;">
				<h1 class="big-ratio-font-hist">Historique</h1>
				<el-scrollbar>
						<div v-for="item in gameStats" :key="item.id">
							<newLastGameItem :id-player1="item.userId" :score1="item.userScore" :score2="item.opponentScore" :id-player2="item.opponentId"/>
						</div>
				</el-scrollbar>
			</div>
		</el-main>
      </el-container>
	  <el-aside class="aside-layout">
			<div class="card">
				<div style="display: flex; flex-direction: column; justify-content:stretch;">
					<h1 class="big-ratio-font-num">7.7</h1>
					<h1 class="big-ratio-font-printed">Ratio</h1>
				</div>
			</div>
		<div class="current-games-layout">
			<h1>Parties en attente</h1>
			<el-scrollbar>
				<div v-for="item in matchMakers" :key="item" class="current-games-item">
					<MatchmakerWaitingComponent/>
				</div>
			</el-scrollbar>
			<el-scrollbar>
				<div v-for="item in waitingGames" :key="item" class="current-games-item">
					<HostedGames :targetUserId="item.targetUserId" :createdAt="item.createdAt"/>
				</div>
			</el-scrollbar>
			<h1>Invitations</h1>
			<el-scrollbar>
				<div v-for="item in invitedGames" :key="item" class="current-games-item">
					<CurrentsGames :publicInfos="item.gameMembers?.at(0)?.userGameInfos" :createdAt="item.createdAt"/>
				</div>
			</el-scrollbar>
		</div>
	  </el-aside>
    </el-container>
	<matchmakingDialog/>
	<newGameDialog ref="RefNewOfflineGameDialog"/>
  </div>

</template>
  
<script setup lang="ts">
import newLastGameItem  from "../profile/components/newLastGameItem.vue"
import matchMakingGameItem from "./matchMakingGameItem.vue"
import CurrentsGames from "./CurrentsGames.vue"
import HostedGames from "./HostedGames.vue"
import MatchmakerWaitingComponent from "./MatchmakerWaitingComponent.vue"
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
import newGameDialog from "./newGameDialog.vue"
import { ElMessage } from "element-plus"
import { useRouter } from 'vue-router'

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
.common-layout
	display: flex
	width: 100%
	
.aside-layout
	width: 20%
	justify-content: center
	display: flex
	flex-direction: column

.current-games-layout
	display: flex
	height: 60%
	flex-direction: column
.matchmaking-layout
	display: flex
	height: 40%
	margin-top: 30px
	justify-content: center
	align-items: center
.scrollbar-flex-content 
	display: flex
	height: 100%
	width: 100%

.matchmaking-item
	width: 450px
	height: 350px
	margin-left: 50px

.current-games-item
	width: 250px
	height: 50px
	margin-top: 30px
	background: grey

.btn-5
	font-family: OutRun
	width: 25%
	height: 100%
	margin: 10px
	color: var(--el-color-primary)
	font-size: 40px
	border-color: transparent
	background: transparent
	.span
		transition: text-shadow 0.3s ease
	&:hover
		span
			text-stroke: 1px rgba(rgb(255, 66, 255), 0.5)
			text-shadow: 0 0 5px rgba(rgb(255, 66, 255), 0.9), 0 0 10px rgba(rgb(255, 66, 255), 0.8), 0 0 20px rgba(rgb(255, 66, 255), 0.7), 0 0 40px rgba(rgb(255, 66, 255), 0.6), 0 0 80px rgba(rgb(255, 66, 255), 0.5), 0 0 120px rgba(rgb(255, 66, 255), 0.4)

.big-ratio-font-num
	font-family: OutRun
	font-size: 70px
	color: var(--el-color-primary)
	margin: 0px

.big-ratio-font-match
	margin: 0px
	font-family: OutRun
	font-size: 30px
	color: var(--el-color-primary)
	animation: neonFlicker 2.5s infinite 

.big-ratio-font-printed
	margin: 0px
	font-family: OutRun
	font-size: 30px
	color: var(--el-color-primary)
.big-ratio-font-hist
	margin: 0px
	font-family: OutRun
	font-size: 30px
	color: var(--el-color-primary)
	animation: neonFlicker 3s infinite reverse

@keyframes neonFlicker
	20%, 32%, 40%, 45%
		text-stroke: 0px transparent
		text-shadow: none
	0%, 30%, 36%, 42%, 46%, 100%
		text-stroke: 1px rgba(255, 66, 255, 0.5)
		text-shadow: 0 0 5px rgba(255, 66, 255, 0.9), 0 0 10px rgba(255, 66, 255, 0.8), 0 0 20px rgba(255, 66, 255, 0.7), 0 0 40px rgba(255, 66, 255, 0.6), 0 0 80px rgba(255, 66, 255, 0.5), 0 0 120px rgba(255, 66, 255, 0.4)

	
@property --rotate
	syntax: "<angle>"
	initial-value: 132deg
	inherits: false


:root
	--card-height: 650px
	--card-width: calc(var(--card-height) / 1)


body
	min-height: 100vh
	background: #212534
	display: flex
	align-items: center
	flex-direction: column
	padding-top: 2rem
	padding-bottom: 2rem
	box-sizing: border-box


.card
	background: black
	margin-top: 60px
	width: 270px
	height: 270px
	padding: 3px
	position: relative
	border-color: white
	border: 10px
	border-radius: 900px
	justify-content: center
	align-items: center
	text-align: center
	display: flex
	font-size: 1.5em
	color: rgb(88 199 250 / 0%)
	cursor: pointer
	font-family: cursive

	&:hover
		color: rgb(88 199 250 / 100%)
		transition: color 1s 1s ease
		&:before, &:after
			width: 108%
			height: 104%
			opacity: 100
			border-radius: 600px
			background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 63%, #4e00c2)
			top: -1%
			left: -2%
			

	&::before
		content: ""
		width: 104%
		height: 102%
		border-radius: 600px
		background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2)
		position: absolute
		z-index: -1
		top: -1%
		left: -2%
		animation: spin 2.5s linear infinite

	&::after
		position: absolute
		content: ""
		top: calc(var(--card-height) / 6)
		left: 0
		right: 0
		z-index: -1
		height: 80%
		width: 100%
		margin: 0 auto
		transform: scale(0.8)
		filter: blur(calc(var(--card-height) / 6))
		background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2)
		opacity: 1
		transition: opacity .5s
		animation: spin 2.5s linear infinite


@keyframes spin
	0%
		--rotate: 0deg
	100%
		--rotate: 360deg


a
	color: #212534
	text-decoration: none
	font-family: sans-serif
	font-weight: bold
	margin-top: 2rem

</style>
  