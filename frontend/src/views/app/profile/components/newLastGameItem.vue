<template>
    <div class="last-game-item">
        <div class="avatar-container" :class="{'winned' : Number(score1) >= Number(score2)}">
            <el-avatar :src="userPublic?.avatarUrl"/>
        </div>
        <div class="username">{{ userPublic ? truncateStr(userPublic.username) : 'Loading...' }}</div>
		<div :class="['status', Number(score1) >= Number(score2) ? 'winned' : 'loosed']">
    		{{ score1 >= score2 ? 'Winned' : 'Loosed' }}
		</div>
        <div class="score">{{ score1 }} - {{ score2 }}</div>
        <div :class="['status', Number(score1) < Number(score2) ? 'winned' : 'loosed']">
    		{{ score1 <= score2 ? 'Winned' : 'Loosed' }}
		</div>
        <div class="opponent-name">{{ opponentPublic ? truncateStr(opponentPublic.username) : 'Loading...' }}</div>
        <div class="avatar-container" :class="{'winned' : Number(score1) <= Number(score2)}">
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

    const truncateStr = (str:String) => {
	if (str.length < 8) {
		return str
	}
	else {
		return str.slice(0, 8) + "..."
	}
} 

	return {
	  userPublic,
	  opponentPublic,
      truncateStr
	}
}
}
</script>

<style scoped lang="sass">

.last-game-item
    width: 65vw
    height: 10vh
    display: flex
    margin: 20px
    border-radius: var(--el-border-radius-base)
    background: #111115
    justify-content: space-evenly
    align-items: center

    .avatar-container
        display: flex
        border-radius: 180px
        padding: 3px
        background: transparent
        border: 3px solid #58595E
        &.winned
            border: 3px solid #00FF0A
    .username, .opponent-name
            font-family: "Roboto"
            font-weight: 300
            color: #00FF0A
            font-size: 24px
            margin-top: -7px
            -webkit-font-smoothing: antialiased
            -moz-osx-font-smoothing: grayscale

    .score
        font-size: 1.5em
        font-weight: bold
        font-family: "Roboto"

    .status
        font-weight: bold
        font-family: "Roboto"
        padding: 10px
        border-radius: var(--el-border-radius-base)

        &.winned
            color: #00FF0A
            background: rgba(0, 255, 10, 0.18)

        &.loosed
            color: #FF0404
            background: rgba(255, 4, 4, 0.18)

    .last-game-item:hover
        box-shadow: var(--my-box-shadow)

</style>