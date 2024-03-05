import { defineStore } from 'pinia'

export const useGamesStore = defineStore('games', {
    state: () => ({
        games: [],
        approveStatuses: [],
        categories: [],
        gamesQuery:{}
    }),
    getters: {
        getGames: (state) => state?.games,
        getCategories: (state) => state?.categories
    },
    actions: {
        async actionGetGames(params={}) {
            const {data} = await this.$axios.post('/admin.games', {...this.gamesQuery,...params})
            this.games = data.response.games
        },
        async changeGameStatus(params){
            await this.$axios.post('/admin.games.status',params)
            await this.actionGetGames()
        },
        async changeGameApprove(params){
            await this.$axios.post('/admin.games.approve',params)
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
