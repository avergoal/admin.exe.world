import {defineStore} from 'pinia'
import {useUserStore} from '@/stores/user'
// import { useGameStore } from '@/stores/game'
import {useMediaStore} from '@/stores/media'
import {useUsersStore} from "@/stores/users";
import {useGamesStore} from "@/stores/games";
import {usePaymentsStore} from "@/stores/payments";

export const useAppStore = defineStore('app', {
    actions: {
        async init() {
            if (localStorage.token) {
                const user = useUserStore()
                const users = useUsersStore()
                const payments = usePaymentsStore()
                // const game = useGameStore()
                const media = useMediaStore()
                const games = useGamesStore()
                const {data} = await this.$axios.post('admin.init')
                // let activity = data.response.activity_types.
                user.setUser(data.response.user)
                users.setActivityTypes(data.response.activity_types)
                games.setApproveStatuses(data.response.approve_statuses)
                games.setCategories(data.response.categories)
                payments.setPayments(data.response.payment_methods)
                // game.setState('genre', data.response.categories)
                media.setState('mediaTypes', data.response.media_types)
            }
        }
    }
})
