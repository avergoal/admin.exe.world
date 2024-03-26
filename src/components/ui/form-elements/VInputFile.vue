<script setup>
import MainButton from '@/components/ui/buttons/MainButton.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import { ref } from 'vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

const emit = defineEmits(['update:modelValue'])

const file = ref(null)
const name = ref('')
const loading = ref(false)
const progress = ref(0)

function deleteFile() {
    name.value = ''
    progress.value = 0
    file.value = null
    emit('update:modelValue', '');
}

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result;
            // Emit custom event with file content
            emit('update:modelValue', fileContent);
        };
        reader.readAsText(file);
    }
}
</script>
<template>
    <div class="file-upload">
        <div class="upload" v-if="name">
            <div class="progress" :style="{ width: progress + '%' }"></div>
            <span class="b-1-medium">{{ name }}</span>
            <delete-icon @click="deleteFile" v-if="!loading" />
        </div>
        <main-button :icon="true" :file="true" @click="file.click()">
            <plus-icon />
            attach file
        </main-button>
        <input @change="handleFileChange" type="file" ref="file" />
    </div>
</template>

<style scoped lang="scss">
@import './scss/input-file.scss';
</style>
