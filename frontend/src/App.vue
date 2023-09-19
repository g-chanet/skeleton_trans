<template>
  <div class="full-app" v-loading.fullscreen.lock="onConnectQuery">
    <el-dialog v-model="showAcceptedGameDialog"  class="dialog" @close="onClosedDialog()" width="45%">
      <div class="title">
        Votre Partie est prête à être lancée !
      </div>
      <div style="height: 400px; display: flex; flex-direction: row;">
        <div v-if="acceptedGame && acceptedGame?.gameMembers && acceptedGame?.gameMembers[0]">
        <el-avatar :src="acceptedGame?.gameMembers[0].userGameInfos.avatarUrl" ></el-avatar>
        <p>{{acceptedGame?.gameMembers[0].userGameInfos.username}}</p>
      </div>
        <p class="vs">VS</p>
        <div v-if="acceptedGame && acceptedGame?.gameMembers && acceptedGame?.gameMembers[1]">
        <p>{{acceptedGame?.gameMembers[1].userGameInfos.username}}</p>
        <el-avatar :src="acceptedGame?.gameMembers[1].userGameInfos.avatarUrl" ></el-avatar>
        </div>
      </div>
      <el-button @click="onAcceptedGame">Lancer la partie !</el-button>
      <el-button>Quitter la partie</el-button>
    </el-dialog>
    <!-- <Background /> -->
    <router-view class='app-body' v-if="!onConnectQuery" />
  </div>
</template>

<script setup lang="ts">
import { useFindMyUserQuery,
  useAllGamesUpdatedSubscription,
  useLeaveGameMutation,
  useMatchmakingMembersChangedSubscription,
  useLeaveGameMatchmakingMemberMutation,
  useFindAllGameMatchmakingMemberlQuery,
  type User,
  type Game,
  type GameMatchmakingMember
} from '@/graphql/graphql-operations'
import { ElMessage, ElNotification } from 'element-plus'
import { ref, provide, inject, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Background from './views/BackgroundRetroWave.vue'

const showAcceptedGameDialog = ref(false)
const route = useRoute()
const router = useRouter()
const acceptedGame = ref<Game>()
const onConnectQuery = ref(true)
const gameLaunched = ref(false)
const { onResult, onError, loading } = useFindMyUserQuery()
const { onResult: queryMatchmakersOnRes } = useFindAllGameMatchmakingMemberlQuery()
const { onResult:gamesOnRes } = useAllGamesUpdatedSubscription()
const { mutate:leaveGameMutate } = useLeaveGameMutation()
const { mutate:leaveMatchMakingMutate } = useLeaveGameMatchmakingMemberMutation()
const { result: subscriptionMatchMakers, onResult: onResultsMatchMaker } = useMatchmakingMembersChangedSubscription()

const loggedInUser = ref<User>()
const usersOnmatchmaking = ref<GameMatchmakingMember>(null)
const mustDiplayMatchmakingDialog = ref(false)


const openMatchMakingNotification = () => {
  ElNotification({
      position: 'bottom-right',
      title: `En recherche de partie`,
      message: 'Vous recherchez actuellement une partie, fermez cette notification pour annuler',
      onClose: onClosedSearchGameNotif,
      duration: 0
    })
}

const setMatchmakingDialogBackgroundState = (state:boolean) => {
    if (state === true)
      openMatchMakingNotification()
    else {
      ElNotification.closeAll()
    }
}



queryMatchmakersOnRes((res) => {
  console.log(res.data)
  if (loggedInUser.value && res.data.findAllGameMatchmakingMemberl.find((member) => member.userId == loggedInUser.value.id))
  {
    openMatchMakingNotification()
  }
})

const onClosedSearchGameNotif = () => {
  leaveMatchMakingMutate()
  ElMessage.success('vous ne recherchez plus de partie')
}


onError(() => {
  if (!route.fullPath.startsWith(`/login`))
    router.replace(`/login`)
  onConnectQuery.value = false
})

gamesOnRes((res) => {
  console.log("gameonres: ", res.data)
  acceptedGame.value = res.data?.allGamesUpdated || undefined
  const gameMembers = res.data?.allGamesUpdated?.gameMembers
  console.log("resGemeMembers: ", gameMembers)
  if (gameMembers && gameMembers.length === 1 && gameMembers[0].userId === loggedInUser.value.id && showAcceptedGameDialog.value == true) {
    ElMessage.error("votre adversaire a quitté la partie")
    onClosedDialog()
  }
  if (gameMembers && gameMembers.length === 2 && gameMembers.some(gm => gm.userId === loggedInUser.value.id)) {
    console.log("entered 2 ")
      showAcceptedGameDialog.value = true
  }
})

onResult((res) => {
  if (res.data.findMyUser.id) {
    loggedInUser.value = res.data.findMyUser
    setTimeout(() => {
    if (!route.fullPath.startsWith(`/app`))
      router.replace(`/app/home`)
    onConnectQuery.value = false
  }, 500)
}
else {
  router.replace(`/login`)
  onConnectQuery.value = false
}
})

onResultsMatchMaker((res) => {
  const member = res.data?.matchmakingMembersChanged
  usersOnmatchmaking.value = member
  if (member && member.userId == loggedInUser.value?.id)
  {
    if (!member.isDeleted) {
      mustDiplayMatchmakingDialog.value = true
      // openMatchMakingNotification()
    }
    else {
      mustDiplayMatchmakingDialog.value = false
      ElNotification.closeAll()
    }
  }
})

const onClosedDialog = () => {
  showAcceptedGameDialog.value = false
  if (!gameLaunched.value) {
    leaveGameMutate()
  }
}

const onAcceptedGame = () => {
  gameLaunched.value = true
  showAcceptedGameDialog.value = false
  router.replace(`/app/game/online/${acceptedGame.value?.id}`)
}
provide('matchmakingsSub', usersOnmatchmaking)
provide('mustDiplayMatchmakingDialog', mustDiplayMatchmakingDialog)
provide('setMatchmakingDialogState', setMatchmakingDialogBackgroundState)

</script>

<style scoped lang="sass">

.dialog
  .title
    display: flex
    justify-content: center
    align-items: center
    font-family: 'OutRun'
    color: var(--el-color-primary)
    font-size: 20px
    margin-top: -50px
  
  .vs
    font-family: 'OutRun'
    color: var(--el-color-primary)
    font-size: 20px
    margin-top: -5px
  
  .photo-container img
    width: 100%
    height: auto
  
  .special-message-field
    margin-top: 20px
    .field-title
      font-weight: bold

  .button-container
    margin-top: 20px
    display: flex
    justify-content: center
.full-app
  position: fixed
  top: 0
  left: 0
  height: 100%
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  background: black

.app-body
  position: fixed
  top: 0
  left: 0
  height: 100%
  width:100%

</style>
