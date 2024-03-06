import { defineStore } from 'pinia'

export const useGamesStore = defineStore('games', {
    state: () => ({
        games: [],
        approveStatuses: [],
        categories: [],
        gamesQuery:{},
        game: {}
    }),
    getters: {
        getGames: (state) => state?.games,
        getGame: (state) => state?.game,
        getCategories: (state) => state?.categories,
        getApproveStatuses: (state) => state?.approveStatuses
    },
    actions: {
        async actionGetGames(params={}) {
            const {data} = await this.$axios.post('/admin.games', {...this.gamesQuery,...params})
            this.games = data.response.games
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
        },
        setApproveStatuses(approveStatuses){
            this.approveStatuses = approveStatuses
        },
        setCategories(categories){
            this.categories = categories
        }
    }
})
