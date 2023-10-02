<template>
	<div class="wrapper" >
		<div class="stat-component">
			<div class="player-stat">
			<p class="header-text"><el-icon><Histogram /></el-icon> Ranking</p>
			<div class="progress-wrapper">
				<p class="single-info-text">{{ wRanking }}</p>
			</div>
		</div>
		</div>
		<div class="stat-component">
			<div class="player-stat">
			<p class="header-text"><el-icon><Switch /></el-icon> Global ratio</p>
			<div class="progress-wrapper">
				<div class="progress-element" :class="{'inactive-progress': globalRation <= 0.25}"></div>
				<div class="progress-element" :class="{'inactive-progress': globalRation <= 0.5 }"></div>
				<div class="progress-element" :class="{'inactive-progress': globalRation <= 0.75 }"></div>
				<div class="progress-element" :class="{'inactive-progress': globalRation <= 1 }"></div>
			</div>
		</div>
		</div>
		<div class="stat-component">
			<div class="player-stat">
			<p class="header-text"><el-icon><SwitchFilled /></el-icon> Mean Points</p>
			<div class="progress-wrapper">
				<div class="progress-element" :class="{'inactive-progress': meanPoints <= 2.75}"></div>
				<div class="progress-element" :class="{'inactive-progress': meanPoints <= 5.5 }"></div>
				<div class="progress-element" :class="{'inactive-progress': meanPoints <= 8.25 }"></div>
				<div class="progress-element" :class="{'inactive-progress': meanPoints <= 11 }"></div>
			</div>
		</div>
		</div>
		<div class="stat-component">
			<div class="player-stat">
			<p class="header-text"><el-icon><Sort /></el-icon> Evolution</p>
			<div class="progress-wrapper">
				<div class="progress-element" :class="{'inactive-progress': evolution <= 0.25}"></div>
				<div class="progress-element" :class="{'inactive-progress': evolution <= 0.5}"></div>
				<div class="progress-element" :class="{'inactive-progress': evolution <= 0.75}"></div>
				<div class="progress-element" :class="{'inactive-progress': evolution <= 1}"></div>
			</div>
		</div>
		</div>
		<div class="stat-component">
			<div class="player-stat">
			<p class="header-text"><el-icon><Finished /></el-icon> Played Games</p>
			<div class="progress-wrapper">
				<p class="single-info-text">{{ playedGames }}</p>
			</div>
		</div>
		</div>
	</div>
</template>

<script lang="ts">


export default {
  name: 'friend-card-item',
  props: {
	wRanking: Number,
	globalRation: Number,
	meanPoints: Number,
	playedGames: Number,
	evolution: Number
  },
  setup(props) {
	let userPublic = {ratio: 2}

	return { 
		userPublic
	}
  }
}
</script>



<style scoped lang="sass">

.wrapper
	display: flex
	justify-content: space-evenly
	.stat-component
		.player-stat
			height: 14vh
			width: 13vw
			background: #151519
			border-radius: 10px
			display: flex
			justify-content: center
			align-items: center
			flex-direction: column
			font-family: "roboto"
			.header-text
				margin-top: 3px
				color: white
				justify-content: center
				dispaly: flex
				align-items: center
			.progress-wrapper
				display: flex
				.progress-element
					height: 35px
					width: 10px
					background: rgba(66, 255, 0, 0.13)
					border: 1px solid rgba(66, 255, 0, 1)
					margin: 5px
					&.inactive-progress
						background: transparent
						border: 1px solid rgba(249, 249, 249, 0.14)
				.single-info-text
					color: #5030F0
					font-size: 12
			&.active
				border: solid 1px #EDB15A


</style>