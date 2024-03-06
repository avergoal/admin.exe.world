import { defineStore } from 'pinia'

export const useGamesStore = defineStore('games', {
    state: () => ({
        games: [],
        approveStatuses: [],
        categories: [],
        gamesQuery:{},
        pagination: {
            pageTotal: 1,
            currentPage: 1,
            offset:[]
        },
        game: {}
    }),
    getters: {
        getGames: (state) => state?.games,
        getGame: (state) => state?.game,
        getCategories: (state) => state?.categories,
        getPagination: (state) => state?.pagination,
        getApproveStatuses: (state) => state?.approveStatuses
    },
    actions: {
        async actionGetGames() {
            const {data} = await this.$axios.post('/admin.games', this.usersQuery)
            this.games.push(data.response)
            this.pagination.offset.push(data.response.offset)
            this.gamesQuery.offset = data.response.offset
            await this.actionPaginate()
        },
        async actionPaginate(pageTotal = 7) {
            if (this.gamesQuery?.offset && this.pagination.pageTotal < pageTotal) {
                const { data } = await this.$axios.post('/admin.games', this.gamesQuery)
                this.games.push(data.response)
                this.gamesQuery.offset = data.response.offset
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
        async actionGetGame(gid) {
            const {data} = await this.$axios.post('/admin.games.details', {gid})
            this.game = data.response.game
        },
        async changeGameStatus(params){
            await this.$axios.post('/admin.games.status',params)
            await this.actionGetGames()
        },
        async changeGameApprove(params){
            await this.$axios.post('/admin.games.approve',params)
            await this.actionGetGames()
        },
        async submitOptions(params){
            await this.$axios.post('/admin.games.options',params)
            await this.actionGetGames()
        },
        async submitInfo(params){
            await this.$axios.post('/admin.games.save',params)
            await this.actionGetGames()
        },
        async deleteGame(params){
            await this.$axios.post('/admin.games.delete',params)
            await this.actionGetGames()
        },
        setQuery(query) {
            this.gamesQuery = query
            this.pagination = {
                pageTotal: 1,
                currentPage: 1,
                offset:[]
            }
        },
        setApproveStatuses(approveStatuses){
            this.approveStatuses = approveStatuses
        },
        setCategories(categories){
            this.categories = categories
        }
    }
})
