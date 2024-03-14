import {defineStore} from 'pinia'

export const useStatisticsStore = defineStore('statistics', {
    state: () => ({
        charts: []
    }),
    getters: {
        getCharts: (state) => state?.charts
    },
    actions: {
        async actionGetCharts() {
            const {data} = await this.$axios.post('/admin.statistics')
            this.charts = data.response.charts
        },
        async actionGetChart(params) {
            const {data} = await this.$axios.post('/admin.statistics.chart', params)
            let index = this.charts.findIndex((item)=>item.sections?.[0]?.chart_id === params.chart_id)
            this.charts[index].chart_data = data.response.chart
            return data.response.chart
        }
    }
})
