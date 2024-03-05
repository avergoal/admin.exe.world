<script setup>
import UsersSidebar from '@/components/users/UsersSidebar.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import TableArrowIcon from '@/components/icons/table/TableArrowIcon.vue'
import TableDoneIcon from '@/components/icons/table/TableDoneIcon.vue'
import TableCloseIcon from '@/components/icons/table/TableCloseIcon.vue'
import TableMenu from '@/components/users/TableMenu.vue'
import Pagination from '@/components/ui/pagination/Pagination.vue'
import VTable from '@/components/ui/table/VTable.vue'
import { useUsersStore } from '@/stores/users'
import { computed, onMounted } from 'vue'

onMounted(async () => {
    await users.actionGetUsers()
})

const users = useUsersStore()

const getUsers = computed(() => users.getUsers)
const getPagination = computed(() => users.getPagination)

const pageChange = (e) => {
    users.setPage(e)
}
</script>

<template>
    <div class="users-content">
        <users-sidebar />
        <div class="users">
            <div class="header">
                <h1>Пользователи</h1>
<!--                <v-input search="true" :placeholder="'Поиск пользователей'" />-->
            </div>
            <VTable>
                <template v-slot:thead>
                    <tr>
                        <td class="b-2-compact b-2-bold sort">
                            Пользователь
                            <table-arrow-icon />
                        </td>
                        <td class="b-2-compact b-2-bold sort">
                            Email
                            <table-arrow-icon />
                        </td>
                        <td class="b-2-compact b-2-bold sort">
                            Статус
                            <table-arrow-icon />
                        </td>
                        <td class="b-2-compact b-2-bold sort">Активность</td>
                        <td class="b-2-compact b-2-bold sort">
                            Дата и время
                            <table-arrow-icon />
                        </td>
                        <td class="b-2-compact b-2-bold sort">Действия</td>
                    </tr>
                </template>
                <template v-slot:tbody>
                    <tr v-for="user in getUsers?.[getPagination?.currentPage-1]?.activity">
                        <td>
                            <div class="user">
                                <div class="img">
                                    <img :src="user?.user?.avatar_urls?.x100" alt="x100" />
                                </div>
                                <div class="info">
                                    <p class="b-1-compact b-1-bold">
                                        {{ user?.user?.first_name }} {{ user?.user?.last_name }}
                                    </p>
                                    <p class="b-2-compact b-1-regular"></p>
                                </div>
                            </div>
                        </td>
                        <td class="b-1-compact b-1-medium">
                            <p class="status" :class="{ approve: user?.user?.email_checked }">
                                <table-done-icon v-if="user?.user?.email_checked" />
                                <table-close-icon v-else />
                                {{ user?.user?.email_checked ? 'Подтверждено' : 'Не подтверждено' }}
                            </p>
                        </td>
                        <td class="b-1-compact b-1-medium">
                            <p class="status" :class="{ approve: user?.user?.enabled }">
                                <table-done-icon v-if="user?.user?.enabled" />
                                <table-close-icon v-else />
                                {{ user?.user?.enabled ? 'Активен' : 'Забанен' }}
                            </p>
                        </td>
                        <td class="b-1-compact activity">
                            <!--                            Установил игру <span class="b-1-medium">Фазенда</span>-->
                            {{ user?.text }}
                        </td>
                        <td class="b-1-compact">
                            {{ user?.htime }}
                        </td>
                        <table-menu :type="'users'" :user="user" />
                    </tr>
                </template>
            </VTable>
            <Pagination
                :current-page="getPagination?.currentPage"
                :total-pages="getPagination?.pageTotal"
                @page-change="pageChange"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/users';
</style>
