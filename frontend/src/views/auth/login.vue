<template>
  <div class="full">
    <div class="form-container">
      Login
      <el-form :model="form" label-position="top" @submit.prevent="onSubmitForm" :style="{ width: '100%' }">
        <el-form-item>
          <el-input v-model="form.emailOrUsername" placeholder="Email" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" show-password placeholder="Password" />
        </el-form-item>
        <el-button class="bt-submit" native-type="submit">Connexion</el-button>
      </el-form>
      <el-divider>
        <el-icon>Or</el-icon>
      </el-divider>


      <div class="o-auth">

        <el-button0 @click="onConnectWithGoogle" class="bt" circle><font-awesome-icon
            :icon="['fab', 'google']" /></el-button0>
        <el-button class="bt" circle><font-awesome-icon :icon="['fab', 'discord']" /></el-button>
        <el-button class="bt" circle><font-awesome-icon :icon="['fab', 'github']" /></el-button>
        <el-button class="bt" circle>42</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSignInLocalMutation } from "@/graphql/graphql-operations"
import { ElMessage } from 'element-plus'
import { METHOD_TYPES } from '@babel/types'

const { mutate, onDone, onError } = useSignInLocalMutation()

const form = ref({
  emailOrUsername: ``,
  password: ``
})


onDone((e) => {
  ElMessage({
    showClose: true,
    message: `Congrats, this is a success message.`,
    type: `success`,
  })
})

onError((e) => {

  ElMessage({
    showClose: true,
    message: `Oops, this is a error message.`,
    type: `error`,
  })
})

const onSubmitForm = () => {
  mutate({ args: form.value })
}

const onConnectWithGoogle = () => {
  window.open(`/auth/google`)
}

</script>

<style scoped lang="sass">

.full
  height: 100%
  width: 100%
  position: fixed
  top: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center
  .form-container
    width: 400px
    border: var(--el-border)
    border-radius: var(--el-border-radius-base)
    display: flex
    flex-direction: column
    padding: 20px
    gap: 20px
    justify-content: center
    align-items: center
    .bt-submit
      width: 100%
  .o-auth
    display: flex
    .bt
      height: 40px
      width: 40px
</style>