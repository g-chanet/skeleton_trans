<template>
    <div class="last-game-item">
		<el-avatar/>
		<text>login 1</text>
		<text>1</text>
		<text>winned</text>
		<text>2</text>
		<text>login 2</text>
		<el-avatar/>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">

.last-game-item
	width: 800px
	height: 70px
	display: flex
	background : black
	margin-top : 15px
	border-radius: var(--el-border-radius-base)
	background: var(--el-color-primary-light-9)
	color: var(--el-color-primary)
	justify-content: space-evenly
	align-items: center

</style>