<template>
	<el-dialog v-model="dialog" title="Create channel" width="42%" style="border-radius: var(--el-border-radius-base)"
		:before-close="handleClose" close-on-press-escape>
		<el-form ref="channelFormRef" :model="channelForm" :rules="rules" label-width="30%" :label-position="'left'"
			status-icon>
			<el-form-item label="Channel name" prop="channelName">
				<el-input @keyup="search" v-model="channelForm.channelName" />
			</el-form-item>
			<el-form-item label="Channel visibility" prop="channelType">
				<el-select v-model="channelForm.channelType" @change="onVisibilityChange()">
					<el-option :key="EChannelType.Public" :label="EChannelType.Public.toString()"
						:value="EChannelType.Public"></el-option>
					<el-option :key="EChannelType.Private" :label="EChannelType.Private.toString()"
						:value="EChannelType.Private"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="Enalbe password" prop="enablePassword">
				<el-switch v-model="channelForm.enablePassword"
					:disabled="channelForm.channelType === EChannelType.Private" />
			</el-form-item>
			<el-form-item v-if="channelForm.enablePassword" label="Channel Password" prop="password">
				<el-input show-password type="'password'" v-model="channelForm.password" />
			</el-form-item>
			<el-form-item v-if="channelForm.enablePassword" label="Repeat password" prop="passwordRepeat">
				<el-input show-password type="'password'" v-model="channelForm.passwordRepeat" />
			</el-form-item>
			<div style="display: flex; justify-content: space-between;">
				<el-button @click="resetForm(channelFormRef)">Reset</el-button>
				<el-button type="primary" @click="submitForm(channelFormRef)"> Create </el-button>
			</div>
		</el-form>
	</el-dialog>
</template>

<script setup lang="ts">
import {
	EChannelMemberType,
	EChannelType,
	useCheckChannelNameQuery,
	useCreateChannelMutation,
	useCreateMemberForChannelMutation
} from '@/graphql/graphql-operations'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps([`modelValue`])
const emit = defineEmits([`update:modelValue`])

const dialog = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit(`update:modelValue`, value)
	}
})

const { mutate: mutateChannel, onError: createChannelError } = useCreateChannelMutation({})
const { mutate: mutateChannelMember } = useCreateMemberForChannelMutation({})

const router = useRouter()

interface ChannelForm {
	channelName: string
	channelType: EChannelType
	enablePassword: boolean
	password: string
	passwordRepeat: string
}

const channelFormRef = ref<FormInstance>()
const channelForm = reactive<ChannelForm>({
	channelName: ``,
	channelType: EChannelType.Public,
	enablePassword: false,
	password: ``,
	passwordRepeat: ``
})

const { result: nameChecked, refetch: checkName } = useCheckChannelNameQuery({
	args: { channelName: channelForm.channelName }
})

const validateChannelName = (rule: any, value: any, callback: any) => {
	if (channelForm.channelName.trim().length === 0) {
		callback(new Error(`Must contain characters`))
	}
	if (nameChecked.value?.checkChannelName) {
		callback(new Error(`This name is already used by another Channel!`))
	} else {
		callback()
	}
}

const validatePassword = (rule: any, value: any, callback: any) => {
	if (channelForm.password.trim().length === 0) {
		callback(new Error(`Must contain characters`))
	}
	if (channelForm.password.toLowerCase() === channelForm.password) {
		callback(new Error(`Must contain uppercase letters`))
	}
	if (channelForm.password.toUpperCase() === channelForm.password) {
		callback(new Error(`Must contain lowercase letters`))
	}
	if (!/\d/.test(channelForm.password)) {
		callback(new Error(`Must contain numbers`))
	}
	if (!/\W/.test(channelForm.password)) {
		callback(new Error(`Must contain symbols`))
	} else {
		callback()
	}
}

const validateRepeatPassword = (rule: any, value: any, callback: any) => {
	if (channelForm.password !== channelForm.passwordRepeat) {
		callback(new Error(`Must match Channel Password`))
	} else {
		callback()
	}
}

const rules = reactive<FormRules>({
	channelName: [
		{ required: true, message: `Please input Channel name`, trigger: `blur` },
		{ validator: validateChannelName, trigger: `blur` }
	],
	password: [
		{ required: true, message: `Please input Channel password`, trigger: `blur` },
		{ min: 8, message: `Must be at least 8 characters long`, trigger: `blur` },
		{ validator: validatePassword, trigger: `blur` }
	],
	passwordRepeat: [
		{ required: true, message: `Please repeat Channel password`, trigger: `blur` },
		{ validator: validateRepeatPassword, trigger: `blur` }
	]
})

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			onCreateChannel()
		} else {
			ElMessage({
				showClose: true,
				message: `Invalid form`,
				type: `error`
			})
		}
	})
}

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}

const onVisibilityChange = (() => {
	channelForm.enablePassword = false
})

let timeout: number | undefined

const search = () => {
	clearTimeout(timeout)
	timeout = setTimeout(() => {
		checkName({ args: { channelName: channelForm.channelName } })
	}, 1000)
}

const onCreateChannel = () => {
	//Protected
	if (channelForm.enablePassword) {
		mutateChannel({
			args: {
				name: channelForm.channelName,
				password: channelForm.password,
				channelType: EChannelType.Protected
			}
		})
			.then((args) =>
				mutateChannelMember({
					args: {
						channelId: args?.data?.createChannel.id!,
						channelPassword: channelForm.password,
						type: EChannelMemberType.Owner
					}
				})
			)
			.then((args) => {
				router.replace({ query: { channelId: args?.data?.createMemberForChannel.channelId } })
			})
	}
	//Public & Private
	else {
		mutateChannel({
			args: {
				name: channelForm.channelName,
				channelType: channelForm.channelType
			}
		})
			.then((args) =>
				mutateChannelMember({
					args: {
						channelId: args?.data?.createChannel.id!,
						type: EChannelMemberType.Owner
					}
				})
			)
			.then((args) => {
				router.replace({ query: { channelId: args?.data?.createMemberForChannel.channelId } })
			})
	}
	dialog.value = false
}

createChannelError((e) => {
	ElMessage({
		showClose: true,
		message: e.message,
		type: `error`
	})
})

const handleClose = () => {
	dialog.value = false
	resetForm(channelFormRef.value)
}
</script>

<style scoped lang="sass"></style>
