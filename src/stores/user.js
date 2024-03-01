import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: Object
    }),
    getters: {
        getUser: (state) => state.user
    },
    actions: {
        setUser(user) {
            this.user = user
        }
    }
})
