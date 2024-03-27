<script setup>
import {useModalStore} from "@/stores/modal";
import {computed} from "vue";
import MainButton from "@/components/ui/buttons/MainButton.vue";
import {useNotificationsStore} from "@/stores/notifications";


const modalStore = useModalStore()
const notificationsStore = useNotificationsStore()


const getModal = computed(() => modalStore.getModal)


const deleteNotification = async ()=>{
    let params = {
        session:getModal.value.data.session,
        id:getModal.value.data.nid
    }
    await notificationsStore.actionDeleteNotificationById(params)
    modalStore.setModal({})
}
</script>

<template>
    <div class="delete-notification">
        <div class="modal-content">
            <div class="title">Delete Notification</div>
            <div class="desc"> {{ getModal?.data?.text }}</div>
            <div class="buttons">
                <MainButton @click="modalStore.setModal({})">Cancel</MainButton>
                <MainButton :secondary="true" @click="deleteNotification">Delete</MainButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "scss/delete-notification";
</style>