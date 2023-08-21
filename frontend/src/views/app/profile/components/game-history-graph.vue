<template>
	<div style="display: flex; width:100%">
		<Line :data="chartDataComputed" :options="options"/>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js'
import 'chartjs-adapter-moment'
import { useFindDailyGameRatiosQuery } from '@/graphql/graphql-operations'
import { Line } from "vue-chartjs"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

const { result:resultForFindDailyGameRatiosQuery } = useFindDailyGameRatiosQuery()

const GameRatios = computed(() => resultForFindDailyGameRatiosQuery.value?.findDailyGameRatios)

const chartDataComputed = computed(() => {
  if (GameRatios.value) {
    return {
      labels: GameRatios.value.map(item => item.date),
      datasets: [
        {
          label: `Game Ratio`,
          data: GameRatios.value.map(item => item.ratio),
          borderColor: `rgba(75,192,192,1)`,
          fill: true,
        },
      ],
    }
  } else {
    return {
      labels: [],
      datasets: [{
        label: ``,
        data: [],
        borderColor: ``,
        fill: false
      }]
    }
  }
})

const options = {
  responsive:true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: `time`,
      time: {
        unit: `day`,
      },
    },
    y: {
      beginAtZero: true,
      suggestedMax: 1,
    },
  },
}
</script>


<style scoped lang="scss">

</style>