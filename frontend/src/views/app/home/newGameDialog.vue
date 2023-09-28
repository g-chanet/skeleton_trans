<template>
    <el-dialog v-model="matchMakingDialogVisible" class="dialog" width="55%">
      <div class="dialog">
        <div class="content-container">
          <img style="margin:30px" src="../../../assets/pongbluevisual.png">
          <div class="action-container">
          <div class="player-selectors" :class="{ oneplayer: isOfflineGameClicked }">
            <newPlayerStatsComponent :idPlayer=loggedInUser?.id :name="'me'" />
            <newPlayerStatsComponent v-if="!isOfflineGameClicked" :key="opponentId" @click="refOpponetDialog.changeDialogVisibility()" :name="'opponent'" :idPlayer="opponentId"/>
          </div>
          <div class="message-container">
            <div class="message-wrapper">
              <h1 style="margin-top:0px">Special Message</h1>
              <el-input v-model="specialMessage"></el-input>
            </div>
          </div>
          <div class="offline-selectors">
            <div class="offline-btn" @click="toggleOfflineGame" :class="{ active: isOfflineGameClicked }">
              <p>offline Game</p>
            </div>
            <div class="offline-btn" @click="toggleChallengeMode" :class="{ active: isChallengeModeClicked, disabled: !isOfflineGameClicked }">
              <p>challenge mode</p>
            </div>
          </div>
          <div class="launch-game-btn" @click="handleLaunch()">
            <h1>Create Game</h1>
          </div>
        </div>
      </div>
      </div>
    </el-dialog>
    <addOpponentDIalog ref="refOpponetDialog" />
</template>

<script setup lang="ts">
  import { ref, inject, provide } from 'vue'
  import { useCreateGameMutation, useJoinGameMatchmakingMemberMutation, useLeaveGameMutation, useLeaveGameMatchmakingMemberMutation, type User } from '@/graphql/graphql-operations'
  import { useRouter } from 'vue-router'
  import newPlayerStatsComponent from "../profile/components/newPlayerStatsComponent.vue"
  import addOpponentDIalog from './addOpponentDIalog.vue'
import { ElMessage } from 'element-plus'

  const specialMessage = ref('')
  const opponentId = ref<String>('')
  const loggedInUser = inject<User>('loggedInUser')
  const { mutate, onDone, onError  } = useCreateGameMutation()
  const { mutate:joinMatchmakingMutate  } = useJoinGameMatchmakingMemberMutation()
  const { mutate:leaveGameMutate  } = useLeaveGameMutation()
  const { mutate:leaveMatchmakingMutate  } = useLeaveGameMatchmakingMemberMutation()
  const matchMakingDialogVisible = ref(false)
  const router = useRouter()
  const refOpponetDialog = null
  const isOfflineGameClicked = ref(false)
  const isChallengeModeClicked= ref(false)

const addOpponent = (OpponentId:String) => {
  console.log("adding opponent !")
  console.log('id: ', OpponentId)
  opponentId.value = OpponentId
}
const toggleOfflineGame = () => {
  console.log('toogle')
  isOfflineGameClicked.value = !isOfflineGameClicked.value
  if (!isOfflineGameClicked.value) {
    isChallengeModeClicked.value = false 
  }
  console.log(isOfflineGameClicked.value)
}

const toggleChallengeMode = () => {
  if (isOfflineGameClicked.value) {
    isChallengeModeClicked.value = !isChallengeModeClicked.value
  }
}

  const changeDialogVisibility = () => {
    matchMakingDialogVisible.value  ? matchMakingDialogVisible.value = false : matchMakingDialogVisible.value = true
  }

  const createGame = () => {
    mutate()
  }

  const onLocalChallengeClicked = async () => {
    router.replace(`/app/game/training/`)
  }

  const onLocalMultiClicked = () => {
    router.replace(`/app/game/local/`)
  }

  const handleLaunch = () => {
    if (isChallengeModeClicked.value) {
      onLocalChallengeClicked()
    }
    else if (isOfflineGameClicked.value) {
      onLocalMultiClicked()
    }
    else if (opponentId.value.length == 0){
        // leaveGameMutate()
        // .catch(() => {}) //do nothing, refers to next comment
        joinMatchmakingMutate()
        .catch((error) => {
          ElMessage.warning(error)
        })
    }
    else {
      // leaveMatchmakingMutate()
      // .catch(() => {}) //do nothing, the error is raised to inform that the player was not looking for a game, this is what we want
      joinMatchmakingMutate({ message: specialMessage.value, userTargetId: opponentId.value })
      .catch((error) => {
          ElMessage.warning(error)
        })
    }
    changeDialogVisibility()
  }

  provide('addOpponentNewGameDialog', addOpponent)
  defineExpose({ changeDialogVisibility })
</script>

<style scoped lang="sass">
.dialog
  background-color: #0E0E10
  height: 60vh
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  font-family: "roboto"
  .content-container
    display: flex
    height: 100%
    width: 100%
    justify-content: space-evenly
    .action-container
      display: flex
      height: 100%
      width: 100%
      justify-content: space-evenly
      flex-direction: column
      align-items: center
      .player-selectors
        display: flex
        width: 90%
        height: 35%
        flex-direction: row
        justify-content: space-between
        align-items: center
        &.oneplayer
          justify-content: center
          animation: centerAnimation 1.5s ease forwards
        @keyframes centerAnimation 
          0%
            justify-content: space-around
          100%
            justify-content: center

      .offline-selectors
        display: flex
        width: 90%
        flex-direction: row
        justify-content: space-between
        align-items: center
        .offline-btn
          height: 50px
          width: 45%
          background: #151519
          border-radius: 10px
          margin-top: 0px
          margin-bottom: 10px
          display: flex
          justify-content: center
          align-items: center
          cursor: pointer
          &.active
            background: rgba(80, 48, 240, 0.1)
          &.disabled
            cursor: not-allowed
            opacity: 0.6
        .offline-btn:hover
          background: red
      .message-container
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        height: 20%
        width: 90%
        background: #151519
        border-radius: 10px
        .message-wrapper
          width: 80%
      .launch-game-btn
        height: 50px
        width: 90%
        background: #4422EF
        border-radius: 10px
        display: flex
        justify-content: center
        align-items: center
        margin-bottom: 30px
        cursor: pointer


</style>
