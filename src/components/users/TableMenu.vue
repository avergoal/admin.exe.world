<script setup>
import TableProcessIcon from '@/components/icons/table/TableProcessIcon.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'
import TableMenuDoneIcon from '@/components/icons/table/TableMenuDoneIcon.vue'
import StopIcon from '@/components/icons/StopIcon.vue'
import TableCloseVioletIcon from '@/components/icons/table/TableCloseVioletIcon.vue'
import TableDeleteIcon from '@/components/icons/table/TableDeleteIcon.vue'
import MoreIcon from '@/components/icons/MoreIcon.vue'
import {ref} from 'vue'
import {useUsersStore} from '@/stores/users'
import {useGamesStore} from "@/stores/games";

const props = defineProps({
    type: {
        default: 'users'
    },
    user: {
        default: {}
    },
    game: {
        default: {}
    }
})

const open = ref(false)
const users = useUsersStore()
const games = useGamesStore()

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
    users.updatePage()
}

const blockUser = () => {
    users.actionBlockUser({
        uid: props.user?.user?.uid,
        session: props.user?.session
    })
    users.updatePage()
}

const changeStatus = () => {
    games.changeGameStatus({
        gid: props.game?.game.gid,
        status: props.game?.game?.active != 0 ? '0' : '1',
        session: props.game?.session,
    })
}

const changeApprove = () => {
    games.changeGameApprove({
        gid: props.game?.game.gid,
        approve: props.game?.game?.approved !=1 ? 1 : 3,
        session: props.game?.session,
    })
}

const deleteGame = () => {
    games.deleteGame({
        gid: props.game?.game.gid,
        session: props.game?.session,
    })
}
</script>

<template>
    <td class="action">
        <button @click.stop="openMenu" :class="{ active: open }">
            <more-icon/>
        </button>
        <div class="table-menu" v-if="open">
            <template v-if="type === 'users'">
                <div class="menu-item b-1-compact b-1-medium" @click="resendEmail">
                    <table-process-icon/>
                    Отправить email повторно
                </div>
                <div class="menu-item b-1-compact b-1-medium" @click="confirmEmail">
                    <email-icon/>
                    Подтвердить email
                </div>
                <div class="menu-item b-1-compact b-1-medium" @click="blockUser">
                    <stop-icon v-if="user.user.enabled"/>
                    <table-menu-done-icon v-else/>
                    {{ user.user.enabled ? 'Забанить' : 'Активировать' }}

                </div>
            </template>
            <template v-if="type === 'application'">
                <div class="menu-item b-1-compact b-1-medium" @click="changeApprove ">
                    <table-close-violet-icon v-if="game?.game?.approved!=1"/>
                    <table-menu-done-icon v-else/>
                    {{ game?.game?.approved !=1?'Отозвать подтверждение':'Подтверлить' }}
                </div>
                <div class="menu-item b-1-compact b-1-medium" @click="changeStatus">
                    <stop-icon v-if="game?.game?.active  !=0 "/>
                    <table-menu-done-icon v-else/>
                    {{ game?.game?.active != 0 ? 'Перевести в неактивные' : 'Перевести в активные' }}
                </div>
                <div class="menu-item b-1-compact b-1-medium" @click="deleteGame">
                    <table-delete-icon/>
                    Удалить
                </div>
            </template>
        </div>
    </td>
</template>

<style scoped lang="scss">
@import 'scss/table-menu';
</style>
