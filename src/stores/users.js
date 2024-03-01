import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        usersQuery: {},
        pagination: {
            page: 1,
            pageTotal: 1,
            currentPage: 1
        }
    }),
    getters: {
        getUsers: (state) => state?.users,
        getPagination: (state) => state?.pagination
    },
    actions: {
        async actionGetUsers() {
            this.users = []
            const { data } = await this.$axios.post('admin.users', this.usersQuery)
            this.users.push(data.response)
            this.usersQuery.offset = data.response.offset
            await this.actionPaginate()
        },
        async actionPaginate(pageTotal = 10) {
            if (this.usersQuery?.offset && this.pagination.pageTotal < pageTotal) {
                const { data } = await this.$axios.post('admin.users', this.usersQuery)
                this.users.push(data.response)
                this.usersQuery.offset = data.response.offset
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
            this.usersQuery = query
            this.pagination = {
                page: 1,
                pageTotal: 1,
                currentPage: 1
            }
        },
        async actionResendEmail(params) {
            const { data } = await this.$axios.post('admin.users.resend_email', params)
            console.log(data)
        },
        async actionConfirmEmail(params) {
            const { data } = await this.$axios.post('admin.users.confirm_email', params)
            console.log(data)
        },
        async actionBlockUser(params) {
            const { data } = await this.$axios.post('admin.users.block_user', params)
            console.log(data)
        }
    }
})
