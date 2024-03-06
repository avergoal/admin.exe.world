import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({

    }),
    getters: {

    },
    actions: {
        async saveNotification(params) {
            await this.$axios.post('/admin.notification.save', params)
        }
    }
})
