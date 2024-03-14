<script setup>
import {computed, onMounted, ref} from "vue";
import {useStatisticsStore} from "@/stores/statistics";
import Chart from 'chart.js/auto';
import StatisticsFilter from "@/components/admin/statistics/StatisticsFilter.vue";


onMounted(async () => {
    await statisticsStore.actionGetCharts()
    createChart()
})


const statisticsStore = useStatisticsStore()
const chartJs = {}
const getCharts = computed(() => statisticsStore.getCharts)

const createChart = ()=>{
    getCharts.value?.forEach((item)=>{
        console.log(item?.sections[0]?.chart_id)
        chartJs[item?.sections?.[0]?.chart_id] = new Chart(document.getElementById(item?.sections?.[0]?.chart_id), {
            type: item?.chart_data?.type,
            data: item?.chart_data?.data,
            options: item?.chart_data?.options
        });
    })
}
const updateChart = async (e)=>{
    const data = await statisticsStore.actionGetChart({
        chart_id:e.chart_id,
        period:e.period,
    })
    chartJs[e.chart_id].data = data.data
    chartJs[e.chart_id].update()
}
</script>

<template>
    <div class="statistics-content">
        <div class="chart-block" v-for="item in getCharts">
            <h3>{{item.title}}</h3>
            <StatisticsFilter class="filter" :data="item.sections" show="title" @update:period-value="updateChart"/>
            <canvas :id="item?.sections[0]?.chart_id" height="353"></canvas>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "scss/statistics";
</style>
