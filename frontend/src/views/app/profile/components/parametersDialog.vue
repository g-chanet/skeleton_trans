<template>
	<div>
	  <el-dialog v-model="paramDialogVisible" class="dialog" title="Paramètres" width="60%">
		<el-tabs  v-model="activeTab" class="demo-tabs">
		<el-tab-pane label="Infos" name="first">
		<div class="avatar-container">
			<el-upload
				class="avatar-uploader"
				action="https://api.cloudinary.com/v1_1/dtb5x2jvv/image/upload?upload_preset=cokkbj6i"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img  :src="imageUrl" class="avatar"/>
				<el-icon  class="avatar-uploader-icon"><Plus /></el-icon>
  			</el-upload>
		</div>
		<div class="info-item">
		  <span>Pseudo</span>
		  <el-button @click="showPseudoInput = !showPseudoInput" v-if="!showPseudoInput" >Modifier</el-button>
		  <el-input v-if="showPseudoInput" v-model="pseudo"></el-input>
		  <el-button @click="showPseudoInput = !showPseudoInput" v-if="showPseudoInput" v-model="pseudo">annuler</el-button>
		  <el-button @click="showPseudoInput = !showPseudoInput" v-if="showPseudoInput" v-model="pseudo">Valider</el-button>
		</div>
		<div class="info-item">
		  <span>Adresse mail</span>
		  <el-button @click="showEmailInput = !showEmailInput" v-if="!showEmailInput">Modifier</el-button>
		  <el-input v-if="showEmailInput" v-model="email"></el-input>
		  <el-button @click="showEmailInput = !showEmailInput" v-if="showEmailInput" v-model="email">annuler</el-button>
		  <el-button @click="showEmailInput = !showEmailInput" v-if="showEmailInput" v-model="email">valider</el-button>
		</div>
		<div class="info-item">
		  <span>Password</span>
		  <el-button @click="showPasswordInput = !showPasswordInput" v-if="!showPasswordInput">Modifier</el-button>
		  <el-input v-if="showPasswordInput" type="password" v-model="password"></el-input>
		  <el-button @click="showPasswordInput = !showPasswordInput" v-if="showPasswordInput" type="password" v-model="password">annuler</el-button>
		  <el-button @click="showPasswordInput = !showPasswordInput" v-if="showPasswordInput" type="password" v-model="password">valider</el-button>
		</div>
		</el-tab-pane>
		<el-tab-pane label="2fa" name="second">
			<img  :src="loggedInUser?.avatarUrl" class="avatar"/>
		</el-tab-pane>
		</el-tabs>
	  </el-dialog>
	</div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  import { useFindMyUserQuery } from '@/graphql/graphql-operations'
  
  const paramDialogVisible = ref(false)
  const showPseudoInput = ref(false)
  const showEmailInput = ref(false)
  const showPasswordInput = ref(false)
  
  const loggedInUser = useFindMyUserQuery().result.value?.findMyUser
  const pseudo = ref(``)
  const email = ref(``)
  const password = ref(``)
  const imageUrl = ref(loggedInUser?.avatarUrl)
  const activeTab = ref(`first`)
  
  const changeDialogVisibility = () => {
	paramDialogVisible.value = true
  }


const handleAvatarSuccess = (response) => {
    if (response && response.secure_url) {
        imageUrl.value = response.secure_url;
    } else {
        ElMessage.error('Erreur lors du téléchargement de l\'image.');
    }
}


const beforeAvatarUpload: UploadProps[`beforeUpload`] = (rawFile) => {
  if (rawFile.type !== `image/jpeg`) {
    ElMessage.error(`Avatar picture must be JPG format!`)
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error(`Avatar picture size can not exceed 2MB!`)
    return false
  }
  return true
}
defineExpose({ changeDialogVisibility })
  </script>
  
  <style scoped lang="sass">
.dialog
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	height: 100%
  
.avatar-container
	margin-bottom: 20px
  
.info-item
	display: flex
	justify-content: space-between
	align-items: center
	width: 100%
	margin-bottom: 10px
  
.span
	flex: 1
  
.el-button
	margin-left: 10px
	margin-right: 10px
  
.el-input
	width: 70%

.avatar-uploader .avatar
	width: 178px
	height: 178px
	display: block
	position: absolute
.avatar-uploader .el-upload
	border: 1px dashed var(--el-border-color)
	border-radius: 6px
	cursor: pointer
	position: relative
	overflow: hidden
	transition: var(--el-transition-duration-fast)
	  
.avatar-uploader .el-upload:hover
	border-color: var(--el-color-primary)
	  
.el-icon.avatar-uploader-icon
	font-size: 28px
	color: #8c939d
	width: 178px
	height: 178px
	text-align: center

  </style>