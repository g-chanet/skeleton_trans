<template>
    <div class="pic-column-wrapper">
      <div class= "line1"></div>
        <div class="pic-grid-wrapper">
         <el-image class="avatar" fit="cover" :src =" loggedInUser?.avatarUrl" />
         <div class= "line2"></div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useFindMyUserQuery } from '@/graphql/graphql-operations'

const loggedInUser = useFindMyUserQuery().result.value?.findMyUser
console.log(loggedInUser?.avatarUrl)
console.log(loggedInUser)
</script>

<style scoped lang="sass">


.line1
  height: 0.5%
  width: 20%
  background: white
  align-self: flex-end

.line2
  height: 17%
  width: 1%
  background: white
.avatar
  height : 80%
  width: 100%
  border-color: white
  aspect-ratio: 1/1
  padding-right : 10px
  padding-top: 10px

.pic-column-wrapper
  display: flex
  flex-direction: column
  height : 100%

.pic-grid-wrapper
  display: flex
  flex-direction: grid
  height: 100%
  width: 100%

</style>