import { defineStore } from 'pinia'
import { useAppStore } from '@/stores/app'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLogged: false
    }),
    getters: {
        getIsLogged: (state) => state.isLogged
    },
    actions: {
        async auth(token) {
            const { data } = await this.$axios.post('auth', {
                api_token: token
            })
            if (data.error) {
                localStorage.removeItem('token')
                this.isLogged = false
            } else {
                localStorage.setItem('token', token)
                const app = useAppStore()
                await app.init()
            }
        },
        async signIn(params) {
            const { data } = await this.$axios.post('signin', params)
            if (!data.error) {
                await this.auth(data.response.api_token)
                return true
            }
            return data.error
        },
        async logout() {
            const { data } = await this.$axios.post('signout')
            if (data.response.success) {
                localStorage.removeItem('token')
                window.location.reload()
                return false
            }
            return data.error
        },
        checkLogged() {
            this.isLogged = !!localStorage.token
        }
    }
})
