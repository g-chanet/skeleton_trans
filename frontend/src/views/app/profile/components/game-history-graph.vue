<template>
  <div style="display: flex; width:100%">
    <el-empty v-if="!loading && !error && !gameRatios.length" style="display: flex; width:100%"
      description="il n'y a rien à voir ici">
      <el-button v-if="loggedInUser && userIdProp === loggedInUser.id" type="primary">Simuler des données</el-button>
    </el-empty>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRef } from 'vue'
import { ElMessage } from 'element-plus'
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
import { useFindPublicDailyGameRatiosQuery, type DailyGameRatios, useFindMyUserQuery } from '@/graphql/graphql-operations'
import { Line } from "vue-chartjs"

const props = defineProps({
  userId: {
    type: String,
    required: true,
  }
})
const userIdProp = toRef(props, 'userId')
const gameRatios = ref<DailyGameRatios[]>([])

const { result, loading, error, refetch } = useFindPublicDailyGameRatiosQuery({ userid: userIdProp.value })
const { result: resultformyuser } = useFindMyUserQuery()
const loggedInUser = computed(() => resultformyuser.value?.findMyUser)

watch(result, newResult => {
  console.log("Result Value:", newResult)
  if (newResult && newResult.findPublicDailyGameRatios && Array.isArray(newResult.findPublicDailyGameRatios)) {
    gameRatios.value = newResult.findPublicDailyGameRatios
  }
}, { immediate: true })

watch(userIdProp, async (newValue) => {
  if (newValue) {
    try {
      await refetch({ userid: newValue })
    } catch (refetchError) {
      console.log("Error :", refetchError)
    }
  }
}, { immediate: true })


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

const chartDataComputed = computed(() => {
  if (gameRatios.value && Array.isArray(gameRatios.value) && gameRatios.value.length > 0) {
    return {
      labels: gameRatios.value.map(item => item.date),
      datasets: [
        {
          label: `Game Ratio`,
          data: gameRatios.value.map(item => item.ratio),
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
  responsive: true,
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


<style scoped lang="scss"></style>