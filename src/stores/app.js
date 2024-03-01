import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'
// import { useGameStore } from '@/stores/game'
import { useMediaStore } from '@/stores/media'

export const useAppStore = defineStore('app', {
    actions: {
        async init() {
            if (localStorage.token) {
                const user = useUserStore()
                // const game = useGameStore()
                const media = useMediaStore()
                const { data } = await this.$axios.post('admin.init')
                user.setUser(data.response.user)
                // game.setState('genre', data.response.categories)
                media.setState('mediaTypes', data.response.media_types)
            }
        }
    }
})
