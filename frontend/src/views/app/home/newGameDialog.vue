<template>
  <div>
    <el-dialog v-model="matchMakingDialogVisible" class="dialog" width="37%">
      <!-- Titre -->
      <div class="title">
        New Offline Game
      </div>
      
      <div class="photo-container">
        <img src="../../../assets/gif-pong-nobg.gif" />
      </div>
      
      <div class="button-container">
        <el-button type="primary" @click="changeDialogVisibility(), onLocalMultiClicked()">Jouer à deux</el-button>
        <el-button type="primary" @click="changeDialogVisibility(), onLocalChallengeClicked()">Jouer constre Brendon le robot</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useCreateGameMutation } from '@/graphql/graphql-operations'
  import { useRouter } from 'vue-router'
  const specialMessage = ref('')

  const { mutate, onDone, onError  } = useCreateGameMutation( { message: specialMessage.value.length ? specialMessage.value : undefined} )
  const matchMakingDialogVisible = ref(false)
  const router = useRouter()

  const changeDialogVisibility = () => {
    matchMakingDialogVisible.value  ? matchMakingDialogVisible.value = false : matchMakingDialogVisible.value = true
  }

  const createGame = () => {
    mutate()
  }

  const onLocalChallengeClicked = () => {
    router.replace(`/app/game/training/`)
  }

  const onLocalMultiClicked = () => {
    router.replace(`/app/game/local/`)
  }

  defineExpose({ changeDialogVisibility })
</script>

<style scoped lang="sass">
.dialog
  .title
    display: flex
    justify-content: center
    align-items: center
    font-family: 'OutRun'
    color: var(--el-color-primary)
    font-size: 40px
    margin-top: -50px
  
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
</style>
