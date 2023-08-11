<template>
    <div class="friend-card-item">
		<el-avatar/>
		<text>Friend login</text>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">

.friend-card-item
	width: 200px
	height: 70px
	display: flex
	background : black
	margin-left : 15px
	border-radius: var(--el-border-radius-base)
	background: var(--el-color-primary-light-9)
	color: var(--el-color-primary)
	justify-content: space-evenly
	align-items: center

</style>