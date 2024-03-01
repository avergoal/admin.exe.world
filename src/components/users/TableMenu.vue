<script setup>
import TableProcessIcon from '@/components/icons/table/TableProcessIcon.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'
import TableMenuDoneIcon from '@/components/icons/table/TableMenuDoneIcon.vue'
import StopIcon from '@/components/icons/StopIcon.vue'
import TableCloseVioletIcon from '@/components/icons/table/TableCloseVioletIcon.vue'
import TableDeleteIcon from '@/components/icons/table/TableDeleteIcon.vue'
import MoreIcon from '@/components/icons/MoreIcon.vue'
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'

const props = defineProps({
    type: {
        default: 'users'
    },
    user: {
        default: {}
    }
})

const open = ref(false)
const users = useUsersStore()

const openMenu = () => {
    if (!open.value) {
        open.value = !open.value
        setTimeout(() => {
            window.addEventListener('click', closeMenu)
        })
    } else {
        closeMenu()
    }
}

const closeMenu = () => {
    open.value = false
    window.removeEventListener('click', closeMenu)
}

const resendEmail = () => {
    users.actionResendEmail({
        uid: props.user?.user?.uid,
        session: props.user?.session
    })
}

const confirmEmail = () => {
    users.actionConfirmEmail({
        uid: props.user?.user?.uid,
        session: props.user?.session
    })
}

const blockUser = () => {
    users.actionBlockUser({
        uid: props.user?.user?.uid,
        session: props.user?.session
    })
}
</script>

<template>
    <td class="action">
        <button @click="openMenu" :class="{ active: open }">
            <more-icon />
        </button>
        <div class="table-menu" v-if="open">
            <template v-if="type === 'users'">
                <div class="menu-item b-1-compact b-1-medium" @click="resendEmail">
                    <table-process-icon />
                    Отправить email повторно
                </div>
                <div class="menu-item b-1-compact b-1-medium" @click="confirmEmail">
                    <email-icon />
                    Подтвердить email
                </div>
                <div class="menu-item b-1-compact b-1-medium">
                    <table-menu-done-icon />
                    Одобрить статус
                </div>
                <div class="menu-item b-1-compact b-1-medium" @click="blockUser">
                    <stop-icon />
                    Забанить
                </div>
            </template>
            <template v-if="type === 'application'">
                <div class="menu-item b-1-compact b-1-medium">
                    <table-close-violet-icon />
                    Отозвать подтверждение
                </div>
                <div class="menu-item b-1-compact b-1-medium">
                    <stop-icon :violet="true" />
                    Перевести в неактивные
                </div>
                <div class="menu-item b-1-compact b-1-medium">
                    <table-delete-icon />
                    Удалить
                </div>
            </template>
        </div>
    </td>
</template>

<style scoped lang="scss">
@import 'scss/table-menu';
</style>
