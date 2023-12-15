<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


export default {
    name: 'BarChart',
    components: { Line },
    props: {
        chartData: Object
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
                aspectRatio: 3,
            }
        }
    }
}
</script>


<template>
    <Line :data="chartData" :options="chartOptions" />
</template>
