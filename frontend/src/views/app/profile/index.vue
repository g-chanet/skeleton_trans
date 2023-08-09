<template>
  <el-container>
    <el-container>
      <el-aside width="20%" class="debug-aside" >
				<el-row justify="center"> 
					<el-col span=8>
						<el-avatar shape="square" :size="150" fit="cover" :src="loggedInUser?.avatarUrl" />
					</el-col>
				</el-row>
				<el-row justify="center"><el-col span=8 style="font-size: x-large; font-weight: bold;">{{ loggedInUser?.username }}</el-col></el-row>
				<el-row justify="center"><el-col span=8>john-doe@gmail.com</el-col></el-row>
				<el-row justify="center">
					<el-divider style="width: 75%;"/>
				</el-row>
        <el-row justify="center" >
          <el-col span=8>
            <el-button @click="testRefParams.changeDialogVisibility()">Paramètres</el-button>
          </el-col>
        </el-row>
	  </el-aside>
      <el-container>
        <el-header class="debug-header">
					<el-row :gutter="16">
						<statisticCard/>
						<statisticCard/>
						<statisticCard/>
					</el-row>
		</el-header>

        <el-main class="debug-main-component">
			<el-container style="height: 100%; align-items: center;" direction="vertical">
				<div class="graph-container">
					<gameHistoryGraph style="height: 100%;"/>
				</div>
				<el-scrollbar height="400px" style="padding-top: 5%;">
    				<div v-for="item in 20" :key="item">
						<lastGameItem/>
					</div>
  				</el-scrollbar>
			</el-container>
		</el-main>
      </el-container>
    </el-container>
    <el-footer class="debug-footer">
		<el-container direction="horizontal" style="justify-content: center; align-items: center;">
			<el-button>Add Friend</el-button>
			<el-scrollbar style="margin-left: 20px;">
				<div class="scrollbar-flex-content">
					<p v-for="item in 50" :key="item" class="scrollbar-demo-item">
						<friendCard/>
					</p>
				</div>
  			</el-scrollbar>
		</el-container>
	</el-footer>
  </el-container>
  <parametersDialog ref="testRefParams"/>
</template>

<script setup lang="ts">

import { ref } from "vue"
import { ElMessageBox } from "element-plus"
import { useFindMyUserQuery } from '@/graphql/graphql-operations'
import gameHistoryGraph from "./components/game-history-graph.vue"
import lastGameItem from "./components/lastGameItem.vue"
import friendCard from "./components/friendCard.vue"
import statisticCard from "./components/statisticCard.vue"
import parametersDialog from "./components/parametersDialog.vue"

const loggedInUser = useFindMyUserQuery().result.value?.findMyUser
const testRefParams = ref()

const showParameters = () => {
	paramDialogVisible.value = true
}


</script>

<style scoped lang="sass">

.el-row
	margin-bottom: 10px
.el-avatar
	margin-top: 35%
.debug-footer
	height: 17%
	justify-content: center
	align-items: center
.debug-header
	height: 17%

.debug-main-component
	justify-content: center
	align-items: center


.graph-container
	height: 45%
	width: 80%
	background: var(--el-color-primary-light-9)
	border-radius: var(--el-border-radius-base)

.scrollbar-flex-content
	display: flex
	align-items: center
	align-self: center	  
</style>