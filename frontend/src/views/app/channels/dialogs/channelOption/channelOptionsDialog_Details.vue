<template>
    <el-form ref="editChannelFormRef" :model="editChannelForm" :rules="rules" label-width="30%" :label-position="'left'"
        status-icon>
        <el-form-item label="Channel avatar" prop="imageUrl">
            <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <el-avatar :size="150" :src="editChannelForm.imageUrl" />
            </el-upload>
        </el-form-item>
        <el-form-item label="Channel name" prop="channelName">
            <el-input @keyup="search" v-model="editChannelForm.channelName" />
        </el-form-item>
        <el-form-item label="Channel description">
            <el-input :disabled="true" />
        </el-form-item>
        <div style="display: flex; justify-content: space-between;">
            <el-button @click="resetForm(editChannelFormRef)" style="margin-right: 3%;">Reset</el-button>
            <el-button type="primary" @click="submitForm(editChannelFormRef)"> Update </el-button>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import { useCheckChannelNameQuery, EChannelType } from '@/graphql/graphql-operations'
import { ElMessage, type FormInstance, type FormRules, type UploadProps } from 'element-plus'
import { ref, reactive } from 'vue'


interface EditChannelForm {
    imageUrl?: string | null
    channelName: string
}

const editChannelFormRef = ref<FormInstance>()
const editChannelForm = reactive<EditChannelForm>({
    imageUrl: ``,
    channelName: ``,
})

const { result: nameChecked, refetch: checkName } = useCheckChannelNameQuery({
    args: { channelName: editChannelForm.channelName }
})

const validateChannelName = (rule: any, value: any, callback: any) => {
    if (editChannelForm.channelName.trim().length === 0) {
        callback(new Error(`Must contain characters`))
    }
    if (nameChecked.value?.checkChannelName) {
        callback(new Error(`This name is already used by another Channel!`))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    channelName: [
        { validator: validateChannelName, trigger: `blur` }
    ],
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

const handleAvatarSuccess: UploadProps[`onSuccess`] = (
    response,
    uploadFile
) => {
    editChannelForm.imageUrl = URL.createObjectURL(uploadFile.raw!)
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

let timeout: number | undefined

const search = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        checkName({ args: { channelName: editChannelForm.channelName } })
    }, 1000)
}

</script>

<style scoped lang="sass">

</style>