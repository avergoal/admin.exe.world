import { defineStore } from 'pinia'

export const useMediaStore = defineStore('media', {
    state: () => ({
        mediaTypes: Array
    }),
    getters: {
        getMediaTypes: (state) => state.mediaTypes
    },
    actions: {
        setState(type, value) {
            this[type] = value
        },
        async uploadMedia(formData) {
            return await this.$axios.post('dev.media.upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        async deleteMedia(params) {
            const { data } = await this.$axios.post('dev.media.delete', params)
            return data.response.result.success
        }
    }
})
