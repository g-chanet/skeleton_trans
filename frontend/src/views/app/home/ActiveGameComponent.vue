<template>
	<div class="active-game-item" :class="{ 'active': isActive }" @click="toggleActive">
		<div class="vs-container">
			<div class="avatar-container">
				<el-avatar/>
			</div>
			<h1 class="vs-text">Vs</h1>
			<div class="avatar-container">
				<el-avatar />
			</div>
		</div>
		<div class="vs-container" v-if="isActive">
			<h1 class="vs-text">3</h1>
			<h1 class="vs-text">:</h1>
			<h1 class="vs-text">7</h1>
		</div>
	</div>
</template>

<script lang="ts">
	import { ref, computed } from "vue"


	export default {
		name: `statistic-card`,
		props: {
			idPlayer1: String,
			score1: String,
			idPlayer2: String,
			score2: String
		},
		setup() {
			const isActive = ref(false)
			const toggleActive = () => {
				isActive.value = !isActive.value;
			}
			return {
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