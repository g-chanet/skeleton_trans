<template>
  <div>
    <el-form :model="form" @submit.prevent="onSubmit">
      <el-form-item>
        <el-input v-model="form.emailOrUsername" placeholder="Email or username" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" placeholder="Password" />
      </el-form-item>
      <el-button type="primary" @click="onSubmit">Connection</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import type { SignInLocalInput } from "@/graphql/graphql-operations"
import { useSignInLocalMutation } from "@/graphql/graphql-operations"
import { ElMessage } from "element-plus"
import { refreshSocket } from "@/services/socketIo"

const form = reactive<SignInLocalInput>({
  emailOrUsername: `gasgssa@sasdchotmail.com`,
  password: `Mdp23Mdp`,
})

const { mutate, onDone, onError } = useSignInLocalMutation()

const onSubmit = () => {
  mutate({ args: form })
}

onDone((e) => {
  if (!e.data?.signInLocal.token) return
  localStorage.setItem(`token`, e.data?.signInLocal.token)
  refreshSocket()
  ElMessage({
    showClose: true,
    message: `${e.data?.signInLocal.token}`,
    type: `success`,
  })
})

onError((e) => {
  ElMessage({
    showClose: true,
    message: `${e}`,
    type: `error`,
  })
})

</script>

<style scoped lang="sass">

</style>