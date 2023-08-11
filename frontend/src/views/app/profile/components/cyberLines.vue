<template>
    <div class="cyberlines-wrapper">
		<div class="horizontal-line h-line-right"/>
		<div class="horizontal-line h-line-left"/>
		<div class="vertical-line v-line-left"/>
		<div class="username-box">
			<usernameBox/>
		</div>
	</div>
</template>

<script setup lang="ts">

import usernameBox from './usernameBox.vue'
</script>

<style scoped lang="scss">

$bg: #17262b29;
.cyberlines-wrapper {
	display: flex;
	flex : 1;
	height: 100%;
	width: 100%;
	
}
.horizontal-line {
	display: flex;
	background-color: white;
	height: 1px;
	position: absolute;
}

.username-box {
	display: flex;
	width : 18%;
	height : 4%;
	top: 73%;
	left: 15%;
	position: absolute;
}

.vertical-line {
	display: flex;
	background-color: white;
	width: 1px;
	position: absolute;
}

.h-line-right {
	left: 50%;
	width: 20%;
	top: 50%;
}

.h-line-left {
	right: 50%;
	width: 26%;
	top: 57%
}

.v-line-left {
	right: 76%;
	height: 16%;
	top: 57%
}
</style>