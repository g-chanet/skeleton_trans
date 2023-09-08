<template>
	<div>
	  <el-dialog v-model="newGameDIalogVisible" class="dialog" width="37%">
		<div class="container">
		<div class="title">
      		Matchmaking
    	</div>
    <div class="photo-container">
      <img src="../../../assets/matchLoading.gif" class="loading-image" alt="Accueil" />
    </div>
    
    <div class="description">
      <p>Vous êtes dorénavant en attente de partie, votre place dans la file d'attente est {{ place }}</p>
      <p>Vous serez dirigé immédiatement vers la page de jeu une fois qu'un adversaire aura été trouvé !</p>
    </div>

    <div class="button-container">
      <el-button type="danger">Annuler</el-button>
      <el-button type="primary">Mettre en arrière plan</el-button>
	  <el-button type="primary">Jouer contre Brendon le robot</el-button>
    </div>
  </div>
	  </el-dialog>
	</div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  const newGameDIalogVisible = ref(false)
  
  
  
  const changeDialogVisibility = () => {
	console.log(`bite`)
	newGameDIalogVisible.value = true
  }

defineExpose({ changeDialogVisibility })

  </script>
  
  <style scoped lang="sass">

.dialog
	display:flex
	justify-content: center
	align-items: center
.loading-image
	width: 70%
	border-radius: var(--el-border-radius-base)
	border: 2px solid rgba(255, 255, 255, 1)
	color: white

.photo-container
	display: flex
	justify-content: center
	font

.title
	display: flex
	justify-content: center
	align-items: center
	font-family: OutRun
	color: var(--el-color-primary)
	font-size: 40px
	margin-top: -50px
  </style>
