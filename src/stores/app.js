import {defineStore} from 'pinia'
import {useUserStore} from '@/stores/user'
// import { useGameStore } from '@/stores/game'
import {useMediaStore} from '@/stores/media'
import {useUsersStore} from "@/stores/users";
import {useGamesStore} from "@/stores/games";
import {usePaymentsStore} from "@/stores/payments";
import {useMailsStore} from "@/stores/mailing";

export const useAppStore = defineStore('app', {
    actions: {
        async init() {
            if (localStorage.token) {
                const user = useUserStore()
                const users = useUsersStore()
                const payments = usePaymentsStore()
                const media = useMediaStore()
                const games = useGamesStore()
                const mails = useMailsStore()
                const {data} = await this.$axios.post('admin.init')
                user.setUser(data.response.user)
                users.setActivityTypes(data.response.activity_types)
                games.setApproveStatuses(data.response.approve_statuses)
                games.setCategories(data.response.categories)
                games.setLocales(data.response.locales)
                payments.setPayments(data.response.payment_methods)
                // game.setState('genre', data.response.categories)
                media.setState('mediaTypes', data.response.media_types)
                mails.setStatuses(data.response.mail_statuses)
            }
        }
    }
})
