<template>
	<div class="active-game-item" :class="{ 'active': isActive }" @click="toggleActive">
		<div class="vs-container">
			<div class="avatar-container">
				<el-avatar :src="GameMember1?.userGameInfos?.avatarUrl"/>
			</div>
			<h1 class="vs-text">Vs</h1>
			<div class="avatar-container">
				<el-avatar :src="GameMember2?.userGameInfos?.avatarUrl"/>
			</div>
		</div>
		<div class="vs-container" v-if="isActive">
			<h1 class="vs-text">{{ GameMember1?.score }}</h1>
			<h1 class="vs-text">:</h1>
			<h1 class="vs-text">{{ GameMember2?.score }}</h1>
		</div>
	</div>
</template>

<script lang="ts">
	import { ref, computed } from "vue"
	import { type Game, type GameMember } from "@/graphql/graphql-operations"


	export default {
		name: `statistic-card`,
		props: {
        GameMember1: {
            type: Object as () => GameMember,
            required: true
        },
        GameMember2: {
            type: Object as () => GameMember,
            required: true
        }
    },
		setup(props) {
			const GameMember1 = ref(props.GameMember1)
			const GameMember2 = ref(props.GameMember2)
			console.log(GameMember1.value)
			console.log(GameMember2.value)
			const isActive = ref(false)
			const toggleActive = () => {
				isActive.value = !isActive.value
			}
			return {
				GameMember1,
				GameMember2,
				isActive,
				toggleActive
			}
		}
	}
</script>

<style scoped lang="sass">
.active-game-item
	height: 7vh
	width: 20vw
	background: #111115
	display: flex
	justify-content: center
	align-items: center
	border-radius: var(--el-border-radius-base)
	flex-direction: column
	transition: height 0.3s ease

	.vs-container
		margin: 10px
		display: flex
		justify-content: space-evenly
		align-items: center
		height: 7vh
		width: 20vw
		
	&.active
		height: 13vh
		align-items: flex-start
		border: solid 4px #EDB15A

	.vs-text
		font-family: "Roboto"
		font-weight: 400
		color: #00FF0A
		font-size: 24px
		margin-top: -7px
		-webkit-font-smoothing: antialiased
		-moz-osx-font-smoothing: grayscale
		margin: 0px
</style>