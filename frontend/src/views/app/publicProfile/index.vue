<template>
  <el-container>
    <el-container>
      <el-aside width="20%" class="debug-aside" >
				<el-row justify="center"> 
					<el-col span=8>
						<el-avatar shape="square" :size="150" fit="cover" :src="user?.avatarUrl" />
					</el-col>
				</el-row>
				<el-row justify="center"><el-col span=8 style="font-size: x-large; font-weight: bold; font-family: 'roboto';">{{ user?.username }}</el-col></el-row>
				<el-row justify="center">
					<el-divider style="width: 75%;"/>
				</el-row>
        <el-row justify="center">
          <el-col span=8>
            <el-button v-if="userRelation?.type === EUserRealtionType.Friend" @click="removeFriend()">Retirer de la liste d'amis</el-button>
			<el-button v-if="userRelation?.type === EUserRealtionType.PendingAccept" @click="removeFriend()">Demande d'ami envoyée</el-button>
			<el-button v-if="!userRelation?.type && user?.id != loggedInUser?.id" @click="createFriendRequest()">Ajouter en ami</el-button>
          </el-col>
        </el-row>
	  </el-aside>
      <el-container>
        <el-header class="debug-header">
			<statsComponent style="z-index: 12;" :meanPoints="userGeneralStats?.MeanPoints" :globalRation="userGeneralStats?.allTimeRatio" :evolution="2" :played-games="userGeneralStats?.gamesCount"/>
		</el-header>


        <el-main class="debug-main-component">
			<el-container style="height: 100%; width:100%; align-items: center;" direction="vertical">
				<div class="graph-container">
					<gameHistoryGraph style="height: 100%; width: 100%; display: flex;" :userId="user?.id"/>
				</div>
				<el-scrollbar height="400px;" style="margin-top: 35px;">
    				<div v-for="item in userGameStats" :key="item.id">
						<newLastGameItem :id-player1="user?.id" :id-player2="item.opponentId" :score1="item.userScore" :score2="item.opponentScore"/>
					</div>
  				</el-scrollbar>
			</el-container>
		</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">

import { computed, onMounted, onUnmounted, inject, ref, type Ref } from "vue"
import { ElMessage } from "element-plus"
import { useFindUserQuery,
	useFindPublicDailyGameRatiosQuery,
	useFindPublicGeneralGameStatsForUserQuery,
	useFindAllPublicGameStatsForUserQuery,
	useFindAllRelationsForMyUserQuery,
	useOnUserRelationsChangedSubscription,
	useFindMyUserQuery,
	useCreateRequestFriendMutation,
	useRemoveFriendMutation,
	EUserRealtionType,
	type User
} from '@/graphql/graphql-operations'
import newLastGameItem from "../profile/components/newLastGameItem.vue"
import gameHistoryGraph from "../profile/components/game-history-graph.vue"
import statsComponent from "../profile/components/statsComponent.vue"


const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get(`id`)

const { result:resultForUser } = useFindUserQuery({args : { id: id}})
const user = computed(() => resultForUser.value?.findUser)

const { result:resultForGeneralGameStat } = useFindPublicGeneralGameStatsForUserQuery({ userid : id})
const { result:resultForUserGameStatsQuery } = useFindAllPublicGameStatsForUserQuery({ userid : id})
const { result:resultForDailyGameRatioQuery } = useFindPublicDailyGameRatiosQuery({ userid : id})
const { result:resultForMyRelations } = useFindAllRelationsForMyUserQuery()
const { result:resultForMyUser } = useFindMyUserQuery()
const loggedInUser = inject<Ref<User>>('loggedInUser')
const { result: userRelationsSubRes, stop: userRelationsSubStop} = useOnUserRelationsChangedSubscription({userId: loggedInUser.value?.id})
const { mutate:createfriendrequestmutation, onError:createfriendrequestonerror } = useCreateRequestFriendMutation()
const { mutate:removefriendmutation, onError:removefriendonerror } = useRemoveFriendMutation()

onUnmounted(() => {
    userRelationsSubStop()
})

const userGeneralStats = computed(() => resultForGeneralGameStat.value?.findPublicGeneralGameStatsForUser)
const userGameStats = computed(() => resultForUserGameStatsQuery.value?.findAllPublicGameStatsForUser)
const relationType = ref<EUserRealtionType>()
const userRelation = computed(() => {
  let relationsList = []
  if (userRelationsSubRes.value?.userRelationsChanged) {
    relationsList = [...(resultForMyRelations.value?.findAllRelationsForMyUser || [])]
    const changedRelation = userRelationsSubRes.value.userRelationsChanged
    const existingIndex = relationsList.findIndex(rel => rel.createdAt === changedRelation.createdAt)
    
    if (existingIndex !== -1) {
      relationsList[existingIndex] = changedRelation
    } else {
      relationsList.push(changedRelation)
    }
  } else {
    relationsList = resultForMyRelations.value?.findAllRelationsForMyUser || []
  }
  return relationsList.filter(relation => relation.userTargetId === id).at(0)
})

const removeFriend = () => {
		removefriendmutation({ args : { userTargetid: user.value?.id }})
		.then ((res) => {
			if (!res?.errors && res?.data?.removeFriend)
			{
				relationType.value = undefined
			}
		})
		.catch((Error) => {
				ElMessage.error(Error.message)
			})
	}

	const createFriendRequest = () => {
		if (user.value.id)
		{
			createfriendrequestmutation({ args : { userTargetId: user.value?.id } })
			.then((res) => {
				if (!res?.errors && res?.data?.createRequestFriend)
				{
					relationType.value = res.data.createRequestFriend.type
				}
			})
			.catch((Error) => {
				ElMessage.error(Error.message)
			})
		}
	}

console.log(userRelation)
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
	display: flex
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