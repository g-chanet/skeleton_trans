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
          <div style="margin-top: 20px; display:flex; justify-content: center;">
            <el-button class="left-styled-btn" @click="testRefParams.changeDialogVisibility()">Parameters</el-button>
			<el-button class="right-styled-btn" @click="testRefFriend.changeDialogVisibility()">Add Friends</el-button>
		  </div>
        </el-row>
		<div class="friends-container">
			<el-scrollbar style="height : 100%; justify-content: center; align-items: center; display:flex; background: #0E0E10; border-radius: 20px">
				<el-row justify="flex-start"><el-col span=8 style="font-size: x-medium; font-weight: bold; margin-top: 20px; font-family:'roboto'">Friends</el-col></el-row>
				<p v-for="relation in displayedRelations" :key="relation.createdAt" style="display:flex; z-index: 1;">
					<friendCard :userId="relation.userTargetId" :relationType="relation.type" :isValidated="true"/>
				</p>
			</el-scrollbar>
		</div>
	  </el-aside>


      <el-container>
        <el-header class="debug-header">
			<statsComponent style="z-index: 12;" :meanPoints="userGeneralStats?.MeanPoints" :globalRation="userGeneralStats?.allTimeRatio" :evolution="2" :played-games="userGeneralStats?.gamesCount"/>
		</el-header>


        <el-main class="debug-main-component">
			<el-container style="height: 100%; width:100%; align-items: center;" direction="vertical">
				<div class="graph-container">
					<gameHistoryGraph style="height: 100%; width: 100%; display: flex;" :userId="loggedInUser?.id"/>
				</div>
				<el-scrollbar height="2000px;" style="margin-top: 35px;">
    				<div v-for="item in userGameStats" :key="item.id">
						<newLastGameItem :id-player1="loggedInUser?.id" :id-player2="item.opponentId" :score1="item.userScore" :score2="item.opponentScore"/>
					</div>
  				</el-scrollbar>
			</el-container>
		</el-main>
      </el-container>
    </el-container>
  </el-container>
  <parametersDialog ref="testRefParams"/>
  <addFriendDialog ref="testRefFriend"/>
</template>

<script setup lang="ts">

import { computed, onMounted, onUnmounted, inject, ref, provide, type Ref } from "vue"
import {
	useFindGeneralGameStatsForUserQuery,
	useFindAllGameStatsForUserQuery,
	useFindAllRelationsForMyUserQuery,
	EUserRealtionType,
	useOnUserRelationsChangedSubscription,
	type UserRelation,
	type User
} from '@/graphql/graphql-operations'
import gameHistoryGraph from "./components/game-history-graph.vue"
import newLastGameItem from "./components/newLastGameItem.vue"
import friendCard from "./components/friendCard.vue"
import statsComponent from "./components/statsComponent.vue"
import parametersDialog from "./components/parametersDialog.vue"
import addFriendDialog from "./components/addFriendDialog.vue"

const { result:resultForGeneralGameStat } = useFindGeneralGameStatsForUserQuery()
const { result:resultForUserGameStatsQuery } = useFindAllGameStatsForUserQuery()
const { onResult:onResultRelationsQuery, refetch:refetchRelations } = useFindAllRelationsForMyUserQuery()
const loggedInUser = inject<Ref<User>>('loggedInUser')
const { onResult: onResultRelationsSubscription} = useOnUserRelationsChangedSubscription({userId: loggedInUser.value?.id})
const userGeneralStats = computed(() => resultForGeneralGameStat.value?.findGeneralGameStatsForUser)
const userGameStats = computed(() => resultForUserGameStatsQuery.value?.findAllGameStatsForUser)
const localUserRelations = ref<UserRelation[]>([])

onResultRelationsQuery((res) => {
  console.log('entered relation result')
  let ret:UserRelation[] = res.data.findAllRelationsForMyUser
  console.log(ret)
  localUserRelations.value = ret
})

onResultRelationsSubscription((res) => {
  const relation = res.data?.userRelationsChanged

  if (relation) {
    const tmp = [...localUserRelations.value]
    if (relation.type == EUserRealtionType.Terminated) {
		console.log("received deleted relation : ", relation)
        localUserRelations.value = tmp.filter(tmprel => tmprel.userTargetId !== relation.userTargetId)
      } else {
        const existingIndex = tmp.findIndex(tmpgame => tmpgame.userTargetId === relation.userTargetId)
        if (existingIndex > -1) {
          tmp[existingIndex] = relation
          console.log(`updated existing realtion:`, relation)
        } else {
          console.log(`received new :`, relation)
          tmp.unshift(relation)
        }
        localUserRelations.value = tmp
      }
  }
})

const displayedRelations = computed(() => {
	return localUserRelations.value?.filter(relation => 
		relation.type === EUserRealtionType.Friend || relation.type === EUserRealtionType.WaitingAccept
	)
})

const testRefParams = null
const testRefFriend = null

onMounted(() => {
	refetchRelations()
})
onUnmounted(() => {
    // userRelationsSubStop()
})
provide('userRelations', localUserRelations)

</script>

<style scoped lang="sass">

.el-row
	margin-bottom: 10px

.left-styled-btn
	border-radius: 0px
	border-top-left-radius: 12px
	border-bottom-left-radius: 12px
	width: 50%
	height: 40px
	margin-right: 2px
	background: #151519
	border: 0px solid

.right-styled-btn
	border-radius: 0px
	border-top-right-radius: 12px
	border-bottom-right-radius: 12px
	width: 50%
	height: 40px
	margin-left: 2px
	background: #151519
	border: 0px solid

.friends-container
	height: 65%
.el-avatar
	margin-top: 35%
.debug-footer
	height: 17%
	justify-content: center
	align-items: center
.debug-header
	height: 17%
	z-index: 3
.debug-main-component
	justify-content: center
	align-items: center


.graph-container
	height: 70%
	width: 96%
	display: flex
	background: #151519
	border-radius: var(--el-border-radius-base) 
	z-index: 1
.scrollbar-flex-content
	display: flex
	align-items: center
	align-self: center	  
</style>