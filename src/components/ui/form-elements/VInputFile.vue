<script setup>
import MainButton from '@/components/ui/buttons/MainButton.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import { ref } from 'vue'
import ModalCloseIcon from '@/components/icons/ModalCloseIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

const file = ref(null)
const name = ref('')
const imageSrc = ref('')
const loading = ref(false)
const imageShow = ref(false)
const progress = ref(0)

function deleteFile() {
    name.value = ''
    progress.value = 0
    file.value = null
}

function uploadImage(e) {
    const image = e.target.files[0]
    if (image) {
        loading.value = true
        name.value = image.name
        setTimeout(() => {
            progress.value = 100
        }, 100)
        setTimeout(() => {
            loading.value = false
        }, 2000)

        const reader = new FileReader()
        reader.onload = () => {
            imageSrc.value = reader.result
        }
        reader.readAsDataURL(image)
    }
}
</script>
<template>
    <div class="file-upload">
        <div class="upload" v-if="name">
            <div class="progress" :style="{ width: progress + '%' }"></div>
            <span class="b-1-medium">{{ name }}</span>
            <eye-icon @click="imageShow = true" v-if="!loading" />
            <delete-icon @click="deleteFile" v-if="!loading" />
            <modal-close-icon @click="deleteFile" v-if="loading" />
        </div>
        <main-button :icon="true" :file="true" @click="file.click()">
            <plus-icon />
            attach file
        </main-button>
        <input @change="uploadImage" type="file" ref="file" />
    </div>
    <div class="image" v-if="imageShow" @click="imageShow = false">
        <img :src="imageSrc" alt="" />
    </div>
</template>

<style scoped lang="scss">
@import './scss/input-file.scss';
</style>
