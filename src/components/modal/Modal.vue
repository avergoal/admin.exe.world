<script setup lang="ts">
import { useModalStore } from '@/stores/modal'
import {computed, watch} from "vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import DeleteNotification from "@/components/modal/modals/DeleteNotification.vue";


const modalStore = useModalStore()


const getModal = computed(() => modalStore.getModal)


const closeModal = () => {
    modalStore.setModal({})
}


watch(getModal, (newVal) => {
    let body = document.getElementsByTagName('body')[0]
    if (newVal.open) {
        body.style.overflow = 'hidden'
    } else {
        body.style.overflow = 'auto'
    }
})
</script>

<template>
    <div class="modal-component" v-if="getModal.open" @click.self="modalStore.setModal({})" :class="{open:getModal.open}">
        <div class="modal-content">
            <button class="close-icon" @click="closeModal">
                <CloseIcon/>
            </button>
            <DeleteNotification v-if="getModal.target==='delete-notification'" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "scss/modal";
</style>