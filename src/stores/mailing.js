import {defineStore} from 'pinia'

export const useMailsStore = defineStore('mails', {
    state: () => ({
        mails: [],
        mailsStatuses: [],
    }),
    getters: {
        getMails: (state) => state?.mails,
        getMailsStatuses: (state) => state?.mailsStatuses,
    },
    actions: {
        async saveMails(params) {
            const {data} =  await this.$axios.post('/admin.mails.save', params)
            await this.actionGetMails()
            return data
        },
        async actionGetMails() {
            const {data} = await this.$axios.post('/admin.mails')
            this.mails = data.response.mails
        },
        async actionGetMailById(id) {
            const {data} = await this.$axios.post('/admin.mails.details',{id})
            return data.response.mail
        },
        setStatuses(statuses){
            this.mailsStatuses = statuses
        }
    }
})
