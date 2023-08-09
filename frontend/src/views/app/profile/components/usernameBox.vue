<template>
    <div class="xp-displayer-wrapper">
		<div class="info-container">
			<div class="menu-title">
				<text>Username</text>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useFindMyUserQuery } from '@/graphql/graphql-operations'

const loggedInUser = useFindMyUserQuery().result.value?.findMyUser
console.log(loggedInUser?.avatarUrl)
console.log(loggedInUser)
</script>

<style scoped lang="scss">

$bg: #17262b29;
.xp-displayer-wrapper {
	display: flex;
	flex-direction : row;
	height: 100%;
	width: 100%;
}

.left-bar-wrapper {
	background-color: #63c9eb22;
	width: 10%;
}

.left-bar-separator {
	background-color: transparent;
	width: 3%;
}
.info-container {
	display: flex;
	flex-direction: column;
	background-color: #02747424;
	width: 87%;
}

.text-input {
	border-radius: 0%;
	border-color: black;
}
.menu-title {
	display: flex;
	width: 100%;
	height: 100%;
	align-content: center;
	align-items: center;
	justify-content: center;
	background: linear-gradient(
    to right,
    #2298983b 0%,
    #2298983b 70%,
    black 70%,
    black 100%
  )
}
</style>