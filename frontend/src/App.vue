<template>
  <div class="full-app" v-loading.fullscreen.lock="onConnectQuery">
    <el-dialog v-model="showAcceptedGameDialog" class="dialog" @close="onClosedDialog()" width="45%">
      <div class="title">
        Your Game is ready to start!
      </div>
      <div style="height: 400px; display: flex; flex-direction: row;">
        <div v-if="acceptedGame && acceptedGame?.gameMembers && acceptedGame?.gameMembers[0]">
          <el-avatar :src="acceptedGame?.gameMembers[0].userGameInfos.avatarUrl"></el-avatar>
          <p>{{ acceptedGame?.gameMembers[0].userGameInfos.username }}</p>
        </div>
        <p class="vs">VS</p>
        <div v-if="acceptedGame && acceptedGame?.gameMembers && acceptedGame?.gameMembers[1]">
          <p>{{ acceptedGame?.gameMembers[1].userGameInfos.username }}</p>
          <el-avatar :src="acceptedGame?.gameMembers[1].userGameInfos.avatarUrl"></el-avatar>
        </div>
      </div>
      <el-button @click="onAcceptedGame">Launch Game !</el-button>
      <el-button @click="onDeletGameClicked">Leave Game</el-button>
    </el-dialog>
    <Background />
    <router-view class='app-body' v-if="!onConnectQuery" />
  </div>
</template>

<script setup lang="ts">
import {
  useFindMyUserQuery,
  useFindAllGamesQuery,
  useAllGamesUpdatedSubscription,
  useLeaveGameMutation,
  useMatchmakingMembersChangedSubscription,
  useLeaveGameMatchmakingMemberMutation,
  useFindAllGameMatchmakingMemberlQuery,
  useUserGameUpdatedSubscription,
  type User, type Game,
  type GameMatchmakingMember
} from '@/graphql/graphql-operations'
import { ElMessage, ElNotification, type NotificationHandle } from 'element-plus'
import { ref, provide, inject, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Background from './views/BackgroundRetroWave.vue'

const showAcceptedGameDialog = ref(false)
const route = useRoute()
const router = useRouter()
const loggedInUser = ref<User>()
const acceptedGame = ref<Game>()
const onConnectQuery = ref(true)
const gameLaunched = ref(false)
const { onResult, onError, loading, refetch: refetchLoggedInUser } = useFindMyUserQuery()
const { onResult: queryGamesOnRes, refetch: refetchGames } = useFindAllGamesQuery()
const { onResult: queryMatchmakersOnRes, refetch: refetchMahMakers } = useFindAllGameMatchmakingMemberlQuery()
const { onResult: gamesOnRes } = useAllGamesUpdatedSubscription()
const { mutate: leaveGameMutate } = useLeaveGameMutation()
const { mutate: leaveMatchMakingMutate } = useLeaveGameMatchmakingMemberMutation()
const { onResult: onResultsMatchMaker } = useMatchmakingMembersChangedSubscription()
const { variables: UserGameUpdatedVariables , onResult: onResultUserGame } = useUserGameUpdatedSubscription()

const usersOnmatchmaking = ref<GameMatchmakingMember>(null)
const mustDiplayMatchmakingDialog = ref(false)
const invitationReceivedHaveBeenCanceled = ref(false)
const ownGameIsCancelled = ref(false)
const acceptedGameId = ref<string>('')
const createdGameId = ref<string>('')
const isNotificationOnAutoClose = ref(false)
const isMatchmakingNotificationOpen = ref(false)
const localMatchmakings = ref<GameMatchmakingMember[]>([])
const localGames = ref<Game[]>([])
const OpenMatchmakingNotifInstance = ref<NotificationHandle>()
const HostedGameNotifInstance = ref<NotificationHandle>()
const InvitedToGameNotifInstance = ref<NotificationHandle>()

onMounted(async () => {
  console.log("app.vue is mounted")
  //await refetchLoggedInUser()
  console.log(loggedInUser.value)
})

const onClosedSearchGameNotif = () => {
  console.log('before notif unmount')
  if (!isNotificationOnAutoClose.value) {
    console.log('matchmaking has been left, notfication not on autoclose')
    leaveMatchMakingMutate()
      .catch(() => { })
    ElMessage.info('You left Matchmaking.')
  }
  console.log('after notif unmount')
  isMatchmakingNotificationOpen.value = false
  isNotificationOnAutoClose.value = false
}

const onClosedHostedGameNotif = () => {
  console.log('before notif unmount')
  if (!isNotificationOnAutoClose.value) {
    console.log('private game hosting has been leaved, notfication not on autoclose')
    leaveMatchMakingMutate()
      .catch(() => { })
    ElMessage.info('You cancelled your Game Invitation.')
  }
  console.log('after notif unmount')
  isMatchmakingNotificationOpen.value = false
  isNotificationOnAutoClose.value = false
}

const openMatchMakingNotification = () => {
  if (!isMatchmakingNotificationOpen.value) {
    OpenMatchmakingNotifInstance.value = ElNotification({
      position: 'bottom-right',
      title: `Looking for live games`,
      message: 'You currently are in Matchmaking. Close this panel to cancel the queue.',
      onClose: onClosedSearchGameNotif,
      duration: 0
    })
    isMatchmakingNotificationOpen.value = true
  }
}

const openHostedPrivateGameNotification = () => {
  HostedGameNotifInstance.value = ElNotification({
    position: 'bottom-right',
    title: `Player Invited !`,
    message: 'You invited a player to a game, waiting for his approval... Close this panel to cancel',
    onClose: onClosedHostedGameNotif,
    showClose: true,
    duration: 0
  })
}

const openInvitedPrivateGameNotification = () => {
  InvitedToGameNotifInstance.value = ElNotification({
    position: 'bottom-right',
    title: `You received a game invite !`,
    message: 'Someone wants to challenge you, check your Dashboard !',
    onClick: onAcceptedGameInvitation,
    duration: 30000
  })
}

const onAcceptedGameInvitation = () => {
  router.replace(`/app/home`)
  ElNotification.closeAll()
}

queryGamesOnRes((res) => {
  let ret: Game[] = res.data.findAllGames
  localGames.value = ret
})

gamesOnRes((res) => {
  const game = res.data?.allGamesUpdated

  if (game) {
    console.log('!!! GAME RECEIVED VIA SUBSCRIPTION : ', game)
    const tmp = [...localGames.value]
    if (game.isDeleted) {
      console.log(`received game deleted :`, game)
      localGames.value = tmp.filter(tmpgame => tmpgame.id !== game.id)
    } else {
      const existingIndex = tmp.findIndex(tmpgame => tmpgame.id === game.id)
      if (existingIndex > -1) {
        tmp[existingIndex] = game
        console.log(`updated existing game:`, game)
      } else {
        console.log(`received new :`, game)
        tmp.unshift(game)
      }
      localGames.value = tmp
    }
  }
  if (game?.gameMembers?.length && loggedInUser.value) {
    // if (game.gameMembers.length === 1 && game.gameMembers.at(0).userId === loggedInUser.value.id && showAcceptedGameDialog.value == true) {
    //   ElMessage.error("votre adversaire a quitté la partie")
    //   onClosedDialog()
    // }
    // if (game.gameMembers && game.gameMembers.length === 2 && game.gameMembers.some(gm => gm.userId === loggedInUser.value.id)) {
    //     acceptedGame.value = game
    //     showAcceptedGameDialog.value = true
    // }
  }
})

onResultUserGame((res) => {
  if (res.data?.UserGameUpdated) {
    console.log('received UserGameUpdated: ', res.data.UserGameUpdated)
    const game: Game = res.data?.UserGameUpdated
    if (game) {
      if (!game.isDeleted) {
        acceptedGame.value = game
        showAcceptedGameDialog.value = true
      }
      if (game.isDeleted) {
        ElMessage.error("votre adversaire a quitté la partie")
        onClosedDialog()
    }
    }
}
})

//result for matchmaker query
queryMatchmakersOnRes((res) => {
  console.log('result for matchmakers called')
  let ret: GameMatchmakingMember[] = res.data.findAllGameMatchmakingMemberl
  localMatchmakings.value = ret
  if (loggedInUser.value && res.data.findAllGameMatchmakingMemberl.find((member) => member.userId == loggedInUser.value.id)) {
    openMatchMakingNotification()
  }
})

//result for matchmaker subscription
onResultsMatchMaker((res) => {
  const member = res.data?.matchmakingMembersChanged
  const tmp = [...localMatchmakings.value]

  if (member) {
    if (member.isDeleted) {
      console.log(`received deleted :`, member)
      localMatchmakings.value = tmp.filter(member => member.userId !== member.userId)
    } else {
      const existingIndex = tmp.findIndex(member => member.userId === member.userId)
      if (existingIndex > -1) {
        tmp[existingIndex] = member
        console.log(`updated existing :`, member)
      } else {
        console.log(`received new :`, member)
        tmp.unshift(member)
      }
      localMatchmakings.value = tmp
    }
  }
  if (member && member.userId == loggedInUser.value?.id) {
    if (!member.isDeleted) {
      isNotificationOnAutoClose.value = false
      if (!member.targetUserId) { //public game hosting context
        openMatchMakingNotification()
      }
      if (member.targetUserId) { //hosted private context
        openHostedPrivateGameNotification()
      }
    }
    else {
      mustDiplayMatchmakingDialog.value = false
      //ElNotification.closeAll()
      if (OpenMatchmakingNotifInstance.value) {
        isNotificationOnAutoClose.value = true
        OpenMatchmakingNotifInstance.value?.close()
      }
      if (HostedGameNotifInstance.value) {
        isNotificationOnAutoClose.value = true
        HostedGameNotifInstance.value?.close()
      }
    }
  }
  if (member && member.targetUserId == loggedInUser.value.id) {
    if (!member.isDeleted) {
      openInvitedPrivateGameNotification()
    }
    else if (member.isDeleted && !member.isLaunched && !showAcceptedGameDialog.value) {
      ElMessage.info('Your game invite has been refused. Maybe play versus our Bot if you are desperate.')
      ElNotification.closeAll()
    }
  }
})

onError(() => {
  if (!route.fullPath.startsWith(`/login`))
    router.replace(`/login`)
  onConnectQuery.value = false
})


onResult(async (res) => {
  console.log('result for loggedInUser!')
  if (await res.data.findMyUser.id) {
    console.log('loggedInUser is present')
    loggedInUser.value = res.data.findMyUser
    if (loggedInUser.value) {
      provide('loggedInUser', loggedInUser)
      refetchGames()
      UserGameUpdatedVariables.value = { userId : loggedInUser.value.id}
      if (!localMatchmakings.value.length) {
        refetchMahMakers()
      }
      setTimeout(() => {
        if (!route.fullPath.startsWith(`/app`))
          router.replace(`/app/home`)
        onConnectQuery.value = false
      }, 500)
    }
  }
  else {
    router.replace(`/login`)
    onConnectQuery.value = false
  }
})

const onClosedDialog = () => {
  showAcceptedGameDialog.value = false
  if (!gameLaunched.value) {
    leaveGameMutate()
    .catch(() => {})
  }
}

const onDeletGameClicked = () => {
    leaveGameMutate()
    .catch(() => {})
}

const onAcceptedGame = () => {
  gameLaunched.value = true
  showAcceptedGameDialog.value = false
  router.replace(`/app/game/online/${acceptedGame.value?.id}`)
}
provide('loggedInUser', loggedInUser)
provide('matchmakingsSub', usersOnmatchmaking)
provide('localMatchmakings', localMatchmakings)
provide('localGames', localGames)
provide('mustDiplayMatchmakingDialog', mustDiplayMatchmakingDialog)
provide('refetchUser', refetchLoggedInUser as () => void)

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
