<template>
    <el-alert v-if="channel?.channelType === EChannelType.Protected" title="Protected channel" type="info"
        description="This channel is protected by a password, you will have to enter it to apply modifications"
        :closable="false" show-icon style="margin-bottom: 3%;" />
    <el-form ref="editChannelFormRef" :model="editChannelForm" :rules="rules" label-width="30%" :label-position="'left'"
        status-icon>
        <el-form-item label="Channel visibility" prop="channelType">
            <el-select v-model="editChannelForm.channelType" @change="onVisibilityChange()" style="margin-right: 3%;">
                <el-option :key="EChannelType.Public" :label="EChannelType.Public.toString()"
                    :value="EChannelType.Public"></el-option>
                <el-option :key="EChannelType.Private" :label="EChannelType.Private.toString()"
                    :value="EChannelType.Private"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Enable password">
            <el-switch v-model="editChannelForm.enablePassword"
                :disabled="editChannelForm.channelType === EChannelType.Private" />
        </el-form-item>
        <el-form-item label="Change Password" prop="password">
            <el-input :disabled="!editChannelForm.enablePassword" show-password type="'password'"
                v-model="editChannelForm.password" />
        </el-form-item>
        <el-form-item label="Repeat password" prop="passwordRepeat">
            <el-input :disabled="!editChannelForm.enablePassword" show-password type="'password'"
                v-model="editChannelForm.passwordRepeat" />
        </el-form-item>
        <div style="display: flex; justify-content: space-between">
            <el-button @click="resetForm(editChannelFormRef)" style="margin-right: 3%;">Reset</el-button>
            <el-button type="primary" @click="submitForm(editChannelFormRef)"> Update </el-button>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import { EChannelType, useFindChannelQuery } from '@/graphql/graphql-operations'
import { type FormInstance, type FormRules, ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'


interface EditChannelForm {
    channelType: EChannelType
    enablePassword: boolean
    password: string
    passwordRepeat: string
}

const editChannelFormRef = ref<FormInstance>()
const editChannelForm = reactive<EditChannelForm>({
    channelType: EChannelType.Public,
    enablePassword: false,
    password: ``,
    passwordRepeat: ``,
})

const onVisibilityChange = (() => {
    if (editChannelForm.channelType === EChannelType.Private)
        editChannelForm.enablePassword = false
    else
        editChannelForm.enablePassword = channel.value?.channelType === EChannelType.Protected
})

const { loading: loadingChannel, onResult: onChannelFound, refetch: refetchChannel } = useFindChannelQuery({
    args: {
        id: props.channelId
    }
})

const validatePassword = (rule: any, value: any, callback: any) => {
    if (editChannelForm.password.trim().length === 0) {
        callback(new Error(`Must contain characters`))
    }
    if (editChannelForm.password.toLowerCase() === editChannelForm.password) {
        callback(new Error(`Must contain uppercase letters`))
    }
    if (editChannelForm.password.toUpperCase() === editChannelForm.password) {
        callback(new Error(`Must contain lowercase letters`))
    }
    if (!/\d/.test(editChannelForm.password)) {
        callback(new Error(`Must contain numbers`))
    }
    if (!/\W/.test(editChannelForm.password)) {
        callback(new Error(`Must contain symbols`))
    } else {
        callback()
    }
}

const validateRepeatPassword = (rule: any, value: any, callback: any) => {
    if (editChannelForm.password !== editChannelForm.passwordRepeat) {
        callback(new Error(`Must match Channel Password`))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    password: [
        { min: 8, message: `Must be at least 8 characters long`, trigger: `blur` },
        { validator: validatePassword, trigger: `blur` }
    ],
    passwordRepeat: [
        { validator: validateRepeatPassword, trigger: `blur` }
    ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //onUpdateChannel()
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
}

</script>

<style scoped lang="sass">

</style>