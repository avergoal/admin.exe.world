import { defineStore } from 'pinia'

export const usePaymentsStore = defineStore('payments', {
    state: () => ({
        payments: [],
        paymentsQuery: {},
        pagination: {
            pageTotal: 1,
            currentPage: 1,
            offset:[]
        },
        paymentsMethods:[],
        paymentsChart:{}

    }),
    getters: {
        getPayments: (state) => state?.payments,
        getPagination: (state) => state?.pagination,
        getPaymentsMethods: (state) => state?.paymentsMethods,
        getPaymentsChart: (state) => state?.paymentsChart,
    },
    actions: {
        async actionGetPayments() {
            this.payments = []
            this.pagination = {
                pageTotal: 1,
                currentPage: 1,
                offset: []
            }
            const { data } = await this.$axios.post('admin.payments', this.paymentsQuery)
            this.payments.push(data.response)
            this.pagination.offset.push(data.response.offset)
            this.paymentsQuery.offset = data.response.offset
            await this.actionPaginate()
        },
        async actionGetPaymentsChart() {
            const { data } = await this.$axios.post('admin.payments.chart', {type:3})
            this.paymentsChart = data.response.chart
        },
        async actionPaginate(pageTotal = 7) {
            if (this.paymentsQuery?.offset && this.pagination.pageTotal < pageTotal) {
                const { data } = await this.$axios.post('admin.payments', this.paymentsQuery)
                this.payments.push(data.response)
                this.paymentsQuery.offset = data.response.offset
                this.pagination.offset.push(data.response.offset)
                this.pagination.pageTotal++
                await this.actionPaginate(pageTotal)
            }
        },
        setPage(page) {
            this.pagination.currentPage = page
            if (this.pagination.currentPage + 5 > this.pagination.pageTotal) {
                this.actionPaginate(this.pagination.currentPage + 6)
            }
        },
        setQuery(query) {
            this.paymentsQuery = query
            this.pagination = {
                pageTotal: 1,
                currentPage: 1,
                offset:[]
            }
        },
        setPayments(methods) {
            this.paymentsMethods = methods
        },
        async updatePage(){
            this.payments = this.payments.slice(0,this.pagination.currentPage-1)
            if(this.pagination.currentPage === 1){
                delete this.paymentsQuery.offset
                this.pagination.pageTotal= 1
                await this.actionGetPayments()
            }else {
                this.pagination.offset = this.pagination.offset.slice(0,this.pagination.currentPage-1)
                this.paymentsQuery.offset = this.pagination.offset[this.pagination.offset.length-1]
                this.pagination.pageTotal = this.pagination.currentPage
                await this.actionPaginate(this.pagination.currentPage + 6)
            }
        },
    }
})
