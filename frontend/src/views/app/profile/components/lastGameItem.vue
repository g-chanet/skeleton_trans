<template>
    <div class="last-game-item">
        <div class="avatar-container">
            <el-avatar :src="userPublic?.avatarUrl"/>
        </div>
        <div class="username">{{ userPublic ? userPublic.username : 'Loading...' }}</div>
        <div class="score">{{ score1 }}</div>
		<div :class="['status', Number(score1) >= Number(score2) ? 'winned' : 'loosed']">
    		{{ score1 >= score2 ? 'Winned' : 'Loosed' }}
		</div>
        <div class="score">{{ score2 }}</div>
        <div class="opponent-name">{{ opponentPublic ? opponentPublic.username : 'Loading...' }}</div>
        <div class="avatar-container">
            <el-avatar :src="opponentPublic?.avatarUrl"/>
        </div>
    </div>
</template>

<script lang="ts">
import type { UserPublic } from '@/graphql/graphql-operations'
import { useFindUserQuery } from '@/graphql/graphql-operations'
import { ref, computed } from "vue"


export default {
  name: `statistic-card`,
  props: {
	idPlayer1: String,
	score1: String,
	idPlayer2: String,
	score2: String
  },
  setup(props) {
    let userPublic = ref<UserPublic | null>(null)
	let opponentPublic = ref<UserPublic | null>(null)

	if (props.idPlayer1) {
		const { result:resultForMyUserPlayer } = useFindUserQuery({ args: {id: props.idPlayer1} })
		userPublic = computed(() => resultForMyUserPlayer.value?.findUser)
	}
	if (props.idPlayer2) {
		const { result:resultForMyUserOpponent } = useFindUserQuery({ args: {id: props.idPlayer2} })
		opponentPublic = computed(() => resultForMyUserOpponent.value?.findUser)

	}
	return {
	  userPublic,
	  opponentPublic
	}
}
}
</script>

<style scoped lang="sass">

.last-game-item
    width: 1320px
    height: 70px
    display: flex
    margin: 15px 20px
    border-radius: var(--el-border-radius-base)
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1))
    color: #FFFFFF
    justify-content: space-evenly
    align-items: center
    backdrop-filter: blur(5px) 
    border: 1px solid rgba(255, 255, 255, 0.2)

.avatar-container
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))

.username, .opponent-name
    font-size: 1.2em
    font-weight: bold
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.4)

.score
    font-size: 1.5em
    font-weight: bold
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.4)

.status
    font-weight: bold

    &.winned
        color: green
        text-shadow: 0 0 10px rgba(0, 255, 0, 0.7)

    &.loosed
        color: red
        text-shadow: 0 0 10px rgba(255, 0, 0, 0.7)

.last-game-item:hover
    box-shadow: var(--my-box-shadow)

</style>