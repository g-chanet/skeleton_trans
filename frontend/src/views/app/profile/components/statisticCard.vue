<template>
	<el-col :span="8">
		<div class="statistic-card">
							<el-statistic :value="statNumber" :precision="2">
							<template #title>
								<div style="display: inline-flex; align-items: center">
									<el-icon style="margin-left: 4px" :size="52">
									<SwitchFilled v-if="indicator == `nombres de parties`"/>
									<DataAnalysis  v-if="indicator == `ratio général`"/>
									<Aim v-if="indicator == `points moyen par partie`"/>
									</el-icon>
								{{indicator}}
								<el-tooltip
									effect="dark"
									:content= "toolTipValue"
									placement="top"
								>
								</el-tooltip>
								</div>
							</template>
							</el-statistic>
						</div>
		</el-col>
</template>

<script lang="ts">
export default {
  name: `statistic-card`,
  props: {
	statNumber: Number,
	indicator: String,
	toolTipValue: String,
  },
}
</script>

<style scoped lang="sass">

.statistic-card
	height: 100%
	padding: 20px
	border-radius: 4px
	background-color: rgb(26,35,50)
	  
.statistic-footer
	display: flex
	justify-content: space-between
	align-items: center
	flex-wrap: wrap
	font-size: 12px
	color: var(--el-text-color-regular)
		margin-top: 16px

	  
.statistic-footer .footer-item
	display: flex
	justify-content: space-between
	align-items: center
	
	  
.statistic-footer .footer-item span:last-child
	display: inline-flex
	align-items: center
	margin-left: 4px

.green
	color: var(--el-color-success)
.red
	color: var(--el-color-error)


</style>