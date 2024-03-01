<script setup>
import IconFileIcon from '@/components/icons/IconFileIcon.vue'
import { ref } from 'vue'

const preview = ref('')
const file = ref()

const uploadImage = (e) => {
    const image = e.target.files[0]
    if (image) {
        const reader = new FileReader()
        reader.onload = () => {
            preview.value = reader.result
        }
        reader.readAsDataURL(image)
    }
}
</script>

<template>
    <div class="upload-icon" @click="file.click()">
        <div class="img">
            <IconFileIcon v-if="!preview" />
            <img :src="preview" alt="" v-else />
        </div>

        <input @change="uploadImage" type="file" ref="file" />
        <button class="button-1">Добавить иконку (40×40)</button>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/icon-file';
</style>
