<template>
	<div>
		<el-dialog v-model="paramDialogVisible" class="dialog" title="Settings" width="37%">
			<el-tabs v-model="activeTab" class="demo-tabs">
				<el-tab-pane label="Account" name="first">
					<el-form label-width="30%" :label-position="`left`" status-icon>
						<el-form-item label="Profile Picture" class="form-item">
							<div class="avatar-section">
								<el-upload class="avatar-uploader"
									action="https://api.cloudinary.com/v1_1/dtb5x2jvv/image/upload?upload_preset=cokkbj6i"
									:show-file-list="false" :on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">
									<div class="avatar-container">
										<el-avatar :src="form.avatarUrl" class="avatar" />
										<div class="avatar-overlay">
											<span>Upload</span>
										</div>
									</div>
								</el-upload>
							</div>
						</el-form-item>
						<el-form-item label="Pseudo" class="form-item">
							<span v-if="!showPseudoInput">{{ loggedInUser?.username }}</span>
							<el-button @click="showPseudoInput = !showPseudoInput"
								v-if="!showPseudoInput">Change</el-button>
							<el-input v-if="showPseudoInput" v-model="form.username"></el-input>
							<el-button @click="showPseudoInput = !showPseudoInput" v-if="showPseudoInput"
								v-model="form.username">Cancel</el-button>
							<el-button @click="showPseudoInput = !showPseudoInput; updateUser()" v-if="showPseudoInput"
								v-model="form.username">Submit</el-button>
						</el-form-item>
						<el-form-item label="Password" class="form-item">
							<el-alert v-if="loggedInUser?.isOauth" title="OAuth " type="warning" show-icon
								:closable="false" />
							<div v-if="!loggedInUser?.isOauth">
								<span v-if="!showPasswordInput">XXXXXXXX</span>
								<el-button @click="showPasswordInput = !showPasswordInput"
									v-if="!showPasswordInput">Change</el-button>
								<el-input v-if="showPasswordInput" type="password" v-model="password" show-password
									placeholder="new password"></el-input>
								<el-button @click="showPasswordInput = !showPasswordInput" v-if="showPasswordInput"
									type="password" v-model="password">annuler</el-button>
								<el-button @click="showPasswordInput = !showPasswordInput; updateMyPassword()"
									v-if="showPasswordInput" type="password" v-model="password">valider</el-button>
							</div>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="2fa" name="second">
					<el-alert v-if="loggedInUser?.isOauth" title="This account is OAuth, it cannot register to 2FA."
						type="info" show-icon :closable="false" />
					<div v-if="!loggedInUser?.isOauth">
						<el-alert v-if="activateTwoFactorInput"
							title="Scan the QR-code and enter the code given by Google Authenticator:" type="warning"
							:closable="false" />
						<el-form label-width="60%" :label-position="`left`" status-icon>
							<el-form-item label="Activate two-factor authentication" class="form-item">
								<el-switch v-model="activateTwoFactorInput" @click="disabledoubleAuthOrNot()"></el-switch>
							</el-form-item>
							<div v-if="activateTwoFactorInput">
								<el-form-item class="form-item">
									<img :src="twoFaQrCodeBase64" />
								</el-form-item>
								<el-form-item class="form-item">
									<el-input v-model="authSecretCode" placeholder="code"></el-input>
									<el-button @Click="validateGoogleSecret(authSecretCode)">Submit</el-button>
								</el-form-item>
							</div>
						</el-form>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Blocklist" name="third">
					<blockUsersDialog />
				</el-tab-pane>
				<el-tab-pane label="Misc." name="fourth">
					<el-form label-width="30%" :label-position="`left`" status-icon>
						<el-form-item label="Generate fake GameDatas (Demo)" class="form-item">
							<el-button>Generate</el-button>
						</el-form-item>
						<el-form-item label="Delete fake GameDatas" class="form-item">
							<el-button>Delete</el-button>
						</el-form-item>
						<el-form-item label="Free Discord Nitro" class="form-item">
							<el-button @click="openDiscordNitroLink">Free Discord Nitro</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, type UploadProps } from 'element-plus'
import blockUsersDialog from './blockUsersDialog.vue'
import {
	useFindMyUserQuery,
	useFindUserTwoFaSettingsQuery,
	useUpdateMyUserMutation,
	useIsGoogleAuthCodeValidMutation,
	useUpdateMyPasswordMutation,
} from '@/graphql/graphql-operations'

const { mutate: updateusermutate, onDone: updateuserondone, onError: updateuseronerror } = useUpdateMyUserMutation()
const { mutate: validategooglesecretmutate, onDone: validategooglesecretondone, onError: validategooglesecretonerror } = useIsGoogleAuthCodeValidMutation()
const { mutate: updatemypasswordmutate, error: updatemypassworderror } = useUpdateMyPasswordMutation()
const { result: resultForMyUser } = useFindMyUserQuery()
const { result: resultForTwoFaSettings } = useFindUserTwoFaSettingsQuery()

const paramDialogVisible = ref(false)
const showPseudoInput = ref(false)
const showPasswordInput = ref(false)
const refBlockDialog = false

let loggedInUser = computed(() => resultForMyUser.value?.findMyUser)
console.log(loggedInUser.value)
const activateTwoFactorInput = loggedInUser.value?.doubleAuth ? ref(true) : ref(false)
const twoFaQrCodeBase64 = computed(() => resultForTwoFaSettings.value?.findUserTwoFaSettings.googleAuthenticatorQrCode)
const password = ref(``)
const activeTab = ref(`first`)
const form = ref({
	username: loggedInUser?.value?.username,
	doubleAuth: loggedInUser?.value?.doubleAuth,
	avatarUrl: loggedInUser?.value?.avatarUrl
})
const authSecretCode = ref(``)


const changeDialogVisibility = () => {
	paramDialogVisible.value = true
}

const openDiscordNitroLink = () => {
	const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
	window.open(link, '_blank')
}

const handleAvatarSuccess = (response) => {
	if (response && response.secure_url) {
		form.value.avatarUrl = response.secure_url
		updateUser()
	} else {
		ElMessage.error(`Error loading image.`)
	}
}

const updateUser = () => {
	updateusermutate({
		args: {
			username: form.value.username,
			doubleAuth: form.value.doubleAuth,
			avatarUrl: form.value.avatarUrl
		}
	}).then(
		(res) => {
			if (res && res.data?.updateMyUser.id == loggedInUser.value?.id)
				loggedInUser = computed(() => res.data?.updateMyUser)
		}).catch
		(
			(err) => {
				ElMessage.error(err.message)
			}
		)
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

const validateGoogleSecret = (secret: string) => {
	validategooglesecretmutate({
		args: {
			code: secret
		}
	}).then(
		(res) => {
			if (res && res?.data?.isGoogleAuthCodeValid === true) {
				ElMessage.success(`2FA is now active`)
				{ form.value.doubleAuth = true }
				updateUser()
			}
			else {
				ElMessage.error(`Invalid code`)
			}
		}
	)
}

const disabledoubleAuthOrNot = () => {
	if (loggedInUser.value?.doubleAuth) {
		form.value.doubleAuth = false
		updateUser()
		console.log(loggedInUser)
		ElMessage.success(`2FA is now inactive`)
	}
}

const updateMyPassword = async () => {
	if (validatePassword() != true) {
		ElMessage.error(validatePassword().toString())
	}
	else {
		updatemypasswordmutate({ args: { newPassword: password.value } })
			.catch((Error) => {
				ElMessage.error(Error.message)
				return
			})
			.then((res) => {
				if (res) {
					ElMessage.success(`Votre Mot de passe a bien été modifié !`)
				}
			})

	}
}

//validatePassword import
const validatePassword = () => {
	if (password.value.trim().length < 1) {
		return `Votre mot passe fait moins de 8 caractères`
	}
	if (password.value.toLowerCase() === password.value) {
		return `Votre mot passe ne contient pas une majuscule`
	}
	if (password.value.toUpperCase() === password.value) {
		return `Votre mot passe ne contient pas une minuscule`
	}
	if (!/\d/.test(password.value)) {
		return `Votre mot passe ne contient pas un chiffre`
	}
	if (!/\W/.test(password.value)) {
		return `Votre mot passe ne contient pas un caractère spécial`
	}
	return true
}

defineExpose({ changeDialogVisibility })

</script>
  
<style scoped lang="sass">

$primary-color: #324054
$secondary-color: #465a69
$border-color: #e5e9f2
$hover-color: #2f3e50
  
.dialog
	width: 30% 
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	padding: 20px
	background-color: $primary-color
	border-radius: var(--el-border-radius-base)
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
	font-family: 'roboto'
  
	.form-item
		display: flex
		flex-direction: row
		align-items: center
.avatar-section
	position: relative
	flex: 1
  
.avatar-container
	position: relative
	cursor: pointer
  
.avatar-overlay
	position: absolute
	top: 0
	left: 0
	right: 0
	bottom: 0
	display: flex
	align-items: center
	justify-content: center
	background: rgba(0, 0, 0, 0.5)
	border-radius: 100px
	opacity: 0
	transition: opacity 0.2s
  
.avatar-container:hover .avatar-overlay
	opacity: 1
  
.avatar
	width: 128px
	height: 128px
	border-radius: 50%
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
  
.avatar-uploader
	position: relative
  
.info-section
	flex: 2
	display: flex
	flex-direction: column
	align-items: flex-start
	margin-left: 20px
  
.username-container
	position: relative
	cursor: pointer
	font-family: 'roboto'
  
.edit-icon
	position: absolute
	right: -24px
	opacity: 0
	transition: opacity 0.2s
  
.username-container:hover .edit-icon
	opacity: 1
  
.span
	color: $secondary-color
	font-weight: 500
	margin-bottom: 10px
  
.el-button
	margin: 10px
	padding: 8px 12px
	border-radius: 6px
	transition: background-color 0.2s
	&:hover
		background-color: $hover-color
  
.el-input
	width: 50% 
	background-color: $secondary-color
	border: none
	border-radius: 5px
	color: white
  
  </style>
