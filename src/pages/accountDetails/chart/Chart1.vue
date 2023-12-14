<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


export default {
    name: 'BarChart',
    components: { Line },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Today',
                        backgroundColor: '#f87',
                        data: [40, 39, 10, 40, 39, 80, 40]
                    },
                    {
                        label: 'This Week',
                        backgroundColor: '#f82',
                        data: [400, 12, 90, 120, 60, 80, 40]
                    },
                    {
                        label: 'This Month',
                        backgroundColor: '#f29',
                        data: [20, 120, 160, 180, 90, 20, 220]
                    }
                ]
            },
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
