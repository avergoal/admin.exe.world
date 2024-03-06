import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        usersQuery: {},
        pagination: {
            pageTotal: 1,
            currentPage: 1,
            offset:[]
        },
        activityTypes:[]

    }),
    getters: {
        getUsers: (state) => state?.users,
        getPagination: (state) => state?.pagination,
        getActivityTypes: (state) => state?.activityTypes,
    },
    actions: {
        async actionGetUsers() {
            this.users = []
            const { data } = await this.$axios.post('admin.users', this.usersQuery)
            this.users.push(data.response)
            this.pagination.offset.push(data.response.offset)
            this.usersQuery.offset = data.response.offset
            await this.actionPaginate()
        },
        async actionPaginate(pageTotal = 7) {
            if (this.usersQuery?.offset && this.pagination.pageTotal < pageTotal) {
                const { data } = await this.$axios.post('admin.users', this.usersQuery)
                this.users.push(data.response)
                this.usersQuery.offset = data.response.offset
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
            this.usersQuery = query
            this.pagination = {
                pageTotal: 1,
                currentPage: 1,
                offset:[]
            }
        },
        async updatePage(){
            this.users = this.users.slice(0,this.pagination.currentPage-1)
            if(this.pagination.currentPage === 1){
                delete this.usersQuery.offset
                this.pagination.pageTotal= 1
                await this.actionGetUsers()
            }else {
                this.pagination.offset = this.pagination.offset.slice(0,this.pagination.currentPage-1)
                this.usersQuery.offset = this.pagination.offset[this.pagination.offset.length-1]
                this.pagination.pageTotal = this.pagination.currentPage
                await this.actionPaginate(this.pagination.currentPage + 6)
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
        },
        setActivityTypes(activityTypes){
            this.activityTypes = activityTypes.reduce((result, item) => {
                const key = item.type;

                // If the key does not exist in the result object, create an array for it
                if (!result[key]) {
                    result[key] = [];
                }

                // Push the current item to the array corresponding to its type
                result[key].push(item);

                return result;
            }, {});
        }
    }
})
