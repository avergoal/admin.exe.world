import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({

    }),
    getters: {

    },
    actions: {
        async saveNotification(params) {
            return await this.$axios.post('/admin.notifications.save', params)
        }
    }
})
