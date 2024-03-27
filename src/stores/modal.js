import {defineStore} from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        modal: {
            open: false,
            target: '',
        }
    }),
    getters: {
        getModal: (state) => state?.modal
    },
    actions: {
        setModal(data) {
            this.modal = data
        }
    }
})
