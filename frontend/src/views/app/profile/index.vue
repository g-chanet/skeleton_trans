<template>
  <el-container>
    <el-container>
      <el-aside width="20%" class="debug-aside" >
				<el-row justify="center"> 
					<el-col span=8>
						<el-avatar shape="square" :size="150" fit="cover" :src="loggedInUser?.avatarUrl" />
					</el-col>
				</el-row>
				<el-row justify="center"><el-col span=8 style="font-size: x-large; font-weight: bold;">{{ loggedInUser?.username }}</el-col></el-row>
				<el-row justify="center">
					<el-divider style="width: 75%;"/>
				</el-row>
        <el-row justify="center">
          <el-col span=8>
            <el-button @click="testRefParams.changeDialogVisibility()">Paramètres</el-button>
			<el-button @click="testRefFriend.changeDialogVisibility()">Ajouter des amis</el-button>
          </el-col>
        </el-row>
		<div v-if="friendRequests?.at(0)">
		<el-row justify="center"><el-col span=8 style="font-size: x-medium; font-weight: bold; margin-top: 20px;">demande d'amis</el-col></el-row>
		<el-scrollbar v-if="friendRequests" style="height : 100%; justify-content: center; align-items: center; display:flex; margin-bottom: 10px;">
			<p v-for="relation in friendRequests" :key="relation.createdAt" style="display:flex; z-index: 1;">
				<friendCard :userId="relation.userTargetId" :relationType="relation.type"/>
			</p>
  		</el-scrollbar>
		</div>
		  <el-row justify="center"><el-col span=8 style="font-size: x-medium; font-weight: bold; margin-top: 20px;">Amis</el-col></el-row>
		<el-scrollbar v-if="friendsList" style="height : 400px; justify-content: center; align-items: center; display:flex">
			<p v-for="relation in friendsList" :key="relation.createdAt" style="display:flex; z-index: 1;">
				<friendCard :userId="relation.userTargetId" :relationType="relation.type"/>
			</p>
  		</el-scrollbar>
	  </el-aside>


      <el-container>
        <el-header class="debug-header">
					<el-row :gutter="16">
						<statisticCard :statNumber="userGeneralStats?.gamesCount" :indicator="`nombres de parties`" :toolTipValue="`nombre total de parties jouées`" />
						<statisticCard :statNumber="userGeneralStats?.allTimeRatio" :indicator="`ratio général`" :toolTipValue="`ratio correpondant à l'ensemble des parties jouées`" />
						<statisticCard :statNumber="userGeneralStats?.MeanPoints" :indicator="`points moyen par partie`" :toolTipValue="`moyenne des points marqués par partie`"/>
					</el-row>
		</el-header>


        <el-main class="debug-main-component">
			<el-container style="height: 100%; width:100%; align-items: center;" direction="vertical">
				<div class="graph-container">
					<gameHistoryGraph style="height: 100%; width: 100%; display: flex;" :graph-data="graphData"/>
				</div>
				<el-scrollbar height="400px;" style="margin-top: 35px;">
    				<div v-for="item in userGameStats" :key="item.id">
						<lastGameItem :id-player1="loggedInUser?.id" :id-player2="item.opponentId" :score1="item.userScore" :score2="item.opponentScore"/>
					</div>
  				</el-scrollbar>
			</el-container>
		</el-main>
      </el-container>
    </el-container>
    <!-- <el-footer class="debug-footer">
		<el-container direction="horizontal" style="justify-content: center; align-items: center;">
			<el-button style="z-index: 1;">Add Friend</el-button>
			<el-scrollbar style="margin-left: 20px;">
				<div class="scrollbar-flex-content">
					<p v-for="item in 50" :key="item" class="scrollbar-demo-item">
						<friendCard/>
					</p>
				</div>
  			</el-scrollbar>
		</el-container>
	</el-footer> -->
  </el-container>
  <parametersDialog ref="testRefParams"/>
  <addFriendDialog ref="testRefFriend"/>
</template>

<script setup lang="ts">

import { computed, onMounted, onUnmounted } from "vue"
import { useFindMyUserQuery,
	useFindDailyGameRatiosQuery,
	useFindGeneralGameStatsForUserQuery,
	useFindAllGameStatsForUserQuery,
	useFindAllRelationsForMyUserQuery,
	EUserRealtionType,
	useOnUserRelationsChangedSubscription ,
	type GameStat,
	type GeneralUserGameStats
} from '@/graphql/graphql-operations'
import gameHistoryGraph from "./components/game-history-graph.vue"
import lastGameItem from "./components/lastGameItem.vue"
import friendCard from "./components/friendCard.vue"
import statisticCard from "./components/statisticCard.vue"
import parametersDialog from "./components/parametersDialog.vue"
import addFriendDialog from "./components/addFriendDialog.vue"

const { result:resultForMyUser } = useFindMyUserQuery()
const { result:resultForGeneralGameStat } = useFindGeneralGameStatsForUserQuery()
const { result:resultForUserGameStatsQuery } = useFindAllGameStatsForUserQuery()
const { result:resultForDailyGameRatioQuery } = useFindDailyGameRatiosQuery()
const { result:resultForMyRelations } = useFindAllRelationsForMyUserQuery()
const { result: userRelationsSubRes, stop: userRelationsSubStop} = useOnUserRelationsChangedSubscription()

const loggedInUser = computed(() => resultForMyUser.value?.findMyUser)
const userGeneralStats = computed(() => resultForGeneralGameStat.value?.findGeneralGameStatsForUser)
const userGameStats = computed(() => resultForUserGameStatsQuery.value?.findAllGameStatsForUser)
const graphData = computed(()=> resultForDailyGameRatioQuery.value?.findDailyGameRatios)
const userRelationsSub = computed(() => userRelationsSubRes.value?.userRelationsChanged)
const userRelations = computed(() => {
  if (userRelationsSubRes.value?.userRelationsChanged) {
	console.log(userRelationsSubRes.value.userRelationsChanged)
    return userRelationsSubRes.value.userRelationsChanged
  }
  return resultForMyRelations.value?.findAllRelationsForMyUser
})

const testRefParams = null
const testRefFriend = null

onUnmounted(() => {
    userRelationsSubStop()
})

console.log(userRelationsSub)
const friendRequests = computed(() => {
	return userRelations.value?.filter(relation => 
		relation.type === EUserRealtionType.WaitingAccept
	)
})

console.log(friendRequests)
const friendsList = computed(() => {
	return userRelations.value?.filter(relation => 
		relation.type === EUserRealtionType.Friend
	)
})

</script>

<style scoped lang="sass">

.el-row
	margin-bottom: 10px
.el-avatar
	margin-top: 35%
.debug-footer
	height: 17%
	justify-content: center
	align-items: center
.debug-header
	height: 17%
.debug-main-component
	justify-content: center
	align-items: center


.graph-container
	height: 70%
	width: 100%
	display:flex
	background: radial-gradient(circle at center, rgba(0, 0, 0, 0.9), rgba(255, 255, 255, 0.1))
	border-radius: var(--el-border-radius-base)
	backdrop-filter: blur(5px) 
	border: 1px solid rgba(255, 255, 255, 0.2)
	z-index: 1

.graph-container:hover
	box-shadow: var(--my-box-shadow)
.scrollbar-flex-content
	display: flex
	align-items: center
	align-self: center	  
</style>