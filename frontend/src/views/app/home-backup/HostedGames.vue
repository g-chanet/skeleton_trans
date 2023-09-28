<template>
	<div style="">
		<div style="display:flex">
			<div style="justify-content: center; display:flex; background: black;">
				<el-avatar v-if="usr" style="align-self: center;" shape="square" fit="cover" :src="usr?.avatarUrl" />
			</div>
			<div style="display:flex; flex-direction: column; margin-left: 10px; justify-content: space-between;">
				<text class="username-text">{{ usr ? usr?.username : "Partie publique"}}</text>
					<text class="message-text"> {{ usr ? "Défi envoyé !" : "En attente..."}}</text>
				<text class="ratio-text">{{ createdAt }}</text>
			</div>
			<div>
				<el-button @click="onGameDeleted()" style="margin:0">
					<el-icon>
						<Close style="color:red" />
					</el-icon>
				</el-button>
			</div>
		</div>
	</div>
</template>
	  
<script setup lang="ts">
import { useFindUserQuery, useLeaveGameMutation } from '@/graphql/graphql-operations'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'

const props = defineProps({
  targetUserId: String,
  createdAt: Date,
})
const { result } = useFindUserQuery({ args: { id: props.targetUserId } })
const { mutate } = useLeaveGameMutation()
const usr = computed(() => result.value?.findUser)

const onGameDeleted = (() =>
{
	const res = mutate()
	res.then((res) => {
		if (res)
			ElMessage.success("Votre partie a bien été supprimée")
	})

}
)
</script>
	
	  
<style scoped lang="sass">
	
.main-item-layout
	height: 100%
	width: 100%
	background: grey

.message-text
	font-family: "Roboto"
	font-weight: 400
	font-size: 10px

.username-text
	font-family: "Roboto"
	font-weight: 400
	font-style: bold
	color: #f0c777
	font-size: 14px
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale

.ratio-text
	font-family: "Roboto"
	font-weight: 300
	font-size: 9px
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale

</style>
	  