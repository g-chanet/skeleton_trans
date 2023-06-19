<template>
  <div class="full-app" v-loading.fullscreen.lock="onConnectQuery">
    <router-view v-if="!onConnectQuery" />
  </div>
</template>

<script setup lang="ts">
import { useFindMyUserQuery } from '@/graphql/graphql-operations'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const onConnectQuery = ref(true)
const { onResult, onError } = useFindMyUserQuery()

onError(() => {
  router.replace(`/login`)
  onConnectQuery.value = false
})

onResult(() => {
  setTimeout(() => {
    router.replace(`/app/home`)
    onConnectQuery.value = false
  }, 500)
})
</script>

<style scoped lang="sass">
.full-app
  position: fixed
  top: 0
  left: 0
  height: 100%
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  background: grey

</style>
