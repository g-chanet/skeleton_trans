<template>
	<div class="column-wrapper">
			<div class="horizontal-line-top"></div>
			<div class="vertical-line-top"></div>
			<div class="text-wrapper">
				<h1 class="wr-text">WR 1</h1>
			</div>
			<div class="vertical-line-bottom"></div>
			<div class="horizontal-line-bottom"></div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useFindMyUserQuery } from '@/graphql/graphql-operations'

const loggedInUser = useFindMyUserQuery().result.value?.findMyUser
console.log(loggedInUser?.avatarUrl)
console.log(loggedInUser)
</script>

<style scoped lang="sass">
.wr-text
	font-size: 6.5em
	font-family: "WR"
	color: white
	align-self: center

.column-wrapper
	height: 100%
	display: flex
	flex-direction: column
	justify-content: space-between
	align-self: flex-end

.horizontal-line-top
	height: 70%
	width: 10%
	background: white

.vertical-line-top
	height: 100%
	width: 4%
	background: white

.horizontal-line-bottom
	height: 70%
	width: 10%
	background: white
	align-self: flex-end

.vertical-line-bottom
	height: 100%
	width: 4%
	background: white
	align-self: flex-end

.text-wrapper
	flex-grow: 0.5 
	display: flex
	align-items: center
	justify-content: center
	padding-left : 2em
	padding-right : 2em
	margin-top : -6.5em
	margin-bottom : -6.5em

</style>