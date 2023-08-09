<template>
	<div>
		<Line :data="data" :options="options" />
	</div>

</template>

<script lang="ts">

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import * as chartConfig from "../configs/testChartConfig.js"
import { Line } from "vue-chartjs"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: `game-history-graph`,
  components: {
    Line
  },
  data() {
    return chartConfig
  }
}

</script>

<style scoped lang="scss">

</style>