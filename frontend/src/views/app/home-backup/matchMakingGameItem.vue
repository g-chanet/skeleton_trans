<template>
	<div class="matchmaking-item-layout">
		<div class="picture-view">
			<img style="border-radius: var(--el-border-radius-base); object-fit: cover; width:272px" src="../../../assets/card.png"/>
		</div>
		<div class="text-view">
			<div style="display: flex; flex-direction: row; justify-content: space-between; height: 50%;">
				<div class="player-and-ration-layout">
					<p class="player-text">PLAYER</p>
					<p class="username-text">{{ publicInfos?.username }}</p>
				</div>
				<div class="player-and-ration-layout">
					<p class="player-text">RATIO</p>
					<p class="ratio-text" >{{ publicInfos?.ratio }}</p>
				</div>
			</div>
			<div>
				<div class="message-layout">
					<h1 class="player-text">MESSAGE SPECIAL</h1>
					<div style="display:flex; flex-direction: row;">
						<img style="margin-top: -20px;" src="../../../assets/icon-message.svg">
						<h1 class="message-text">{{ message }}</h1>
					</div>
				</div>
			</div>
		</div>
		</div>
</template>
	  
<script setup lang="ts">

const props = defineProps({
  publicInfos: Object,
  message: String,
})
console.log(props.publicInfos)

</script>

<style scoped lang="sass">

.matchmaking-item-layout
	display: flex
	height: 100%
	width: 100%
	flex-direction: column

.player-text
	font-family: "Roboto"
	font-weight: 300
	letter-spacing: 0.35em
	font-size: 9px
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale

.player-and-ration-layout
	display: flex
	justify-content: stretch
	flex-direction: column
	margin: 30px
	margin-top: 35px

.message-layout
	display: flex
	justify-content: stretch
	flex-direction: column
	margin: 30px
	margin-top: 10px
.message-text
	font-family: "Roboto"
	font-weight: 400
	font-size: 10px
	margin-left: 5px
	margin-top: -5px

.username-text
	font-family: "Roboto"
	font-weight: 300
	color: #f0c777
	font-size: 24px
	margin-top: -7px
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale

.ratio-text
	font-family: "Roboto"
	font-weight: 300
	font-style: italic
	color: #f0c777
	font-size: 35px
	margin-top: -7px
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
.text-view
	height: 50%
	background-image: url("../../../assets/card.svg")
	background-repeat: no-repeat
	background-size: cover
	border-radius: var(--el-border-radius-base)
	margin-top: -70px
	width: 100%
	display: flex
	flex-direction: column
	justify-content: space-evenly

.picture-view
	height: 60%
	width: 100%
	display: flex

</style>
	  