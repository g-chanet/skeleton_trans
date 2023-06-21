<template>
  <div class="full">
     <div class="wrapper">
      <div class="inner-wrapper">
       </div> 
       <div class="nrw">
        <span class="new">
          <span class="letter">4</span>
          <span class="letter">2</span>
        </span>
        <span class="retro">
          <span class="letter">T</span>
          <span class="letter">R</span>
          <span class="letter">A</span>
          <span class="letter">N</span>
          <span class="letter">S</span>
          <span class="letter">C</span>
          <span class="letter">E</span>
          <span class="letter">N</span>
          <span class="letter">D</span>
          <span class="letter">A</span>
          <span class="letter">N</span>
          <span class="letter">C</span>
          <span class="letter">E</span>
        </span>
        <span class="wave">
          <span class="letter">P</span>
          <span class="letter">O</span>
          <span class="letter">N</span>
          <span class="letter">G</span>
        </span>
      </div>
    </div>
    <div class="form-container">
      <span class="login">
      <span class="letter">L</span>
      <span class="letter">O</span>
      <span class="letter">G</span>
      <span class="letter">I</span>
      <span class="letter">N</span>
      </span>
      <el-form
        :model="form"
        label-position="top"
        @submit.prevent="onSubmitForm"
        :style="{ width: '100%' }"
      >
        <el-form-item>
          <el-input v-model="form.emailOrUsername" placeholder="Email" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="Password"
          />
        </el-form-item>
        <el-button class="bt-submit" native-type="submit">Connexion</el-button>
      </el-form>
      <el-divider>
      </el-divider>
      <div class="o-auth">
        <el-button @click="onConnectWithGoogle" class="bt" circle
          ><font-awesome-icon :icon="['fab', 'google']"
        /></el-button>
        <el-button @click="onConnectWithDiscord" class="bt" circle
          ><font-awesome-icon :icon="['fab', 'discord']"
        /></el-button>
        <el-button @click="onConnectWithGithub" class="bt" circle><font-awesome-icon :icon="['fab', 'github']" /></el-button>
        <el-button @click="onConnectWithSchool42" class="bt" circle>42</el-button>
      </div>
      <el-divider>
      </el-divider>
      <router-link to="/signup" class="create-account">Create Account</router-link>
      <router-view></router-view> 
     </div> 
   </div> 
</template>

<script setup lang="ts">
import {  ref, onMounted } from 'vue'
import { useSignInLocalMutation } from '@/graphql/graphql-operations'
import { ElMessage } from 'element-plus'

const { mutate, onDone, onError } = useSignInLocalMutation()

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const error = urlParams.get(`error`)
  
  if (error) {
    ElMessage({
      showClose: true,
      message: error,
      type: `error`
    })
  }
})

const form = ref({
  emailOrUsername: ``,
  password: ``
})

onDone((e) => {
  ElMessage({
    showClose: true,
    message: `Congrats, this is a success message.`,
    type: `success`
  })
})

onError((e) => {
  ElMessage({
    showClose: true,
    message: `Oops, this is a error message.`,
    type: `error`
  })
})

const onSubmitForm = () => {
  mutate({ args: form.value })
}

const onConnectWithGoogle = () => {
  window.location.href = `/auth/google`
}

const onConnectWithDiscord = () => {
  window.location.href = `/auth/discord`
}

const onConnectWithGithub = () => {
  window.location.href = `/auth/github`
}

const onConnectWithSchool42 = () => {
  window.location.href = `/auth/42`
}

</script>

<style scoped lang="sass">

@import url("https://jackphilippi.com.au/cdn/fonts/outrun_future.otf")

@font-face
  font-family: OutRun
  src: url("https://jackphilippi.com.au/cdn/fonts/outrun_future.otf") format("opentype")

html, body
  height: 100%
  overflow: hidden
 
body
  text-align: center
  font-family: "Open Sans", sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  background: #111
  background: linear-gradient(#0c141f 40%, #cf33d9 41%, #0c141f 60%)

.login
  height: 100%
  position: absolute
  font-size: 2em

.login > .letter
  -webkit-text-stroke: 2px #F4C6F4
  margin-top: -8px
  display: inline-block
  padding: 0 1px
  animation: glow 2.5s linear infinite

.wrapper
  display: flex
  justify-content: center
  align-items: center
  height: 100%
  z-index: -1
 
.inner-wrapper
  width: 100%
  height: 100%
  position: absolute
  margin: 0 auto
  perspective: 180px
  perspective-origin: 50% 40%
 
.landscape
  position: absolute
  width: 200%
  left: -50%
  height: 130%
  bottom: -30%
  background-image: -webkit-linear-gradient(top, #CF33D9 2px, transparent 2px), -webkit-linear-gradient(left, #CF33D9 2px, transparent 2px)
  background-size: 50px 50px, 80px 80px
  background-position: -1px -1px, -1px -1px
  transform: rotateX(85deg)
  animation: moveUp 1s infinite linear
 
.nrw
  z-index: 50
  margin-bottom: 600px
 
.new
  font-size: 5.2em
  text-transform: uppercase
  font-family: "Open Sans"
  color: transparent
  position: relative
  display: block
  letter-spacing: -15px
  transform: rotate(-10deg) skew(-20deg)
  margin-left: 280px
  margin-bottom: -20px

.new > .letter
  -webkit-text-stroke: 2px #F4C6F4
  margin-top: -8px
  display: inline-block
  padding: 0 1px
  animation: glow 2.5s linear infinite

@keyframes moveUp
  0%
    background-position: -1px -1px, -1px -1px
  100%
    background-position: -50px -50px, -1px -1px

@keyframes glow
  0%
    filter: drop-shadow(0 0 6px #CF33D9) drop-shadow(0 0 6px #CF33D9)
  50%
    filter: drop-shadow(0 0 1px #CF33D9) drop-shadow(0 0 1px #CF33D9)
  100%
    filter: drop-shadow(0 0 6px #CF33D9) drop-shadow(0 0 6px #CF33D9)

.retro
  font-size: 5.5em
  font-weight: 800
  display: block
  text-transform: uppercase
  letter-spacing: -12px
  transform: rotate(-10deg) skew(-15deg)
  margin-bottom: -70px

.retro > .letter
  display: inline-block
  padding: 0 10px
  margin: 0 -10px
  background: url('data:image/svg+xmlbase64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIzMiUiIHN0b3AtY29sb3I9IiMxODE5MWEiLz48c3RvcCBvZmZzZXQ9IjQwJSIgc3RvcC1jb2xvcj0iIzE1N2JlNiIvPjxzdG9wIG9mZnNldD0iNTIlIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+PHN0b3Agb2Zmc2V0PSI1NiUiIHN0b3AtY29sb3I9IiMxODE5MWEiLz48c3RvcCBvZmZzZXQ9Ijg1JSIgc3RvcC1jb2xvcj0iIzE1N2JlNiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==')
  background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(32%, #18191a), color-stop(40%, #157be6), color-stop(52%, #ffffff), color-stop(56%, #18191a), color-stop(85%, #157be6), color-stop(100%, #ffffff))
  background: -moz-linear-gradient(top, #18191a 32%, #157be6 40%, #ffffff 52%, #18191a 56%, #157be6 85%, #ffffff)
  background: -webkit-linear-gradient(top, #18191a 32%, #157be6 40%, #ffffff 52%, #18191a 56%, #157be6 85%, #ffffff)
  background: linear-gradient(to bottom, #18191a 32%, #157be6 40%, #ffffff 52%, #18191a 56%, #157be6 85%, #ffffff)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  -webkit-text-stroke-width: 1px
  -webkit-text-stroke-color: #FFF

.wave
  position: relative
  z-index: 100
  font-family: "OutRun", "Helvetica", sans-serif
  font-size: 3.8em
  color: #FA26F7
  text-transform: uppercase
  letter-spacing: -10px
  transform: rotate(-3deg) skew(-3deg)
  -webkit-text-stroke-width: 1px
  -webkit-text-stroke-color: #000
  margin-left: 250px
  margin-bottom: 0

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
  border: (--el-border)
  border-radius: 5%
  display: flex
  flex-direction: column
  padding: 25px
  padding-top: 70px
  gap: 20px
  justify-content: center
  align-items: center
  position: absolute
  overflow: hidden
  background-color: rgba(0, 0, 0, 0.3)
  margin-top: 125px
  backdrop-filter: blur(10px)
.form-container:hover
  box-shadow: 0 0 10px #ee78ff, 0 0 20px #ee78ff

.form-title
  font-family: sans-serif
  font-size: 16px
  color: white

.create-account
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 40px
  border: (--el-border)
  border-radius: (--el-border-radius-base)
  background-color: transparent
  color: white
  text-decoration: none
  font-family: sans-serif
  font-size: 16px
  color: white

.create-account:hover
  box-shadow: 0 0 10px #ee78ff, 0 0 20px #ee78ff
  background-color: rgba(0, 212, 255, 0.1)
  color: #ee78ff

.bt-submit
  width: 100%

.bt-submit:hover
    box-shadow: 0 0 10px #ee78ff, 0 0 20px #ee78ff

.o-auth
  display: flex
  .bt
    height: 40px
    width: 40px

.bt:hover
    box-shadow: 0 0 10px #ee78ff, 0 0 20px #ee78ff
</style>