<template>
    <div class="details panel-blur">
      <el-image class="avatar" :url =loggedInUser?.avatarUrl />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useFindMyUserQuery } from '@/graphql/graphql-operations'

const loggedInUser = useFindMyUserQuery().result.value?.findMyUser
console.log(loggedInUser?.avatarUrl)
</script>

<style scoped lang="sass">

.details
  height: 100%
  width: 100%
  display: flex
  align-items: center
  justify-content: space-evenly
  overflow: hidden
  flex-direction: column
  background: linear-gradient(var(--el-sun-yellow), var(--el-sun-pink))
  backdrop-filter: blur(10px)
  border-radius: var(--el-border-radius-base)

.avatar
  z-index: 3
  background-image: url('../../src/assets/temp.jpg')
  background-repeat: no-repeat
  width: 50%
  height: 30%
  border-radius: 50%

.scroll
  height: 30%
  width: 90%
.members-scroll
    display: flex
    flex-direction: column
    align-items: center
    min-height: 40px
    text-align: center
    border-radius: 4px
    background: var(--el-color-primary-light-9)
    color: var(--el-color-primary)
    justify-content: center

</style>