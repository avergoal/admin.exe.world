import {defineStore} from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        notifications: []
    }),
    getters: {
        getNotifications: (state) => state?.notifications,
    },
    actions: {
        async saveNotification(params) {
            const data = await this.$axios.post('/admin.notifications.save', params)
            await this.actionGetNotification()
            return data
        },
        async actionGetNotification() {
            const {data} = await this.$axios.post('/admin.notifications')
            this.notifications = data.response.notifications
        },
        async actionGetNotificationById(id) {
            const {data} = await this.$axios.post('/admin.notifications.details', {id})
            console.log(data.response)
            return data.response.notification
        },
        async actionDeleteNotificationById(params) {
            const {data} = await this.$axios.post('/admin.notifications.delete', params)
            await this.actionGetNotification()
        }
    }
})
