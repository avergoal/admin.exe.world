<script setup>
import Pagination from '@/components/ui/pagination/Pagination.vue'
import TableDoneIcon from '@/components/icons/table/TableDoneIcon.vue'
import MoreIcon from '@/components/icons/MoreIcon.vue'
import TableMenu from '@/components/users/TableMenu.vue'
import TableArrowIcon from '@/components/icons/table/TableArrowIcon.vue'
import TableCloseIcon from '@/components/icons/table/TableCloseIcon.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import VTable from '@/components/ui/table/VTable.vue'
import ApplicationsSidebar from '@/components/applications/ApplicationsSidebar.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
</script>

<template>
    <div class="applications-content">
        <applications-sidebar />
        <div class="users">
            <div class="header">
                <h1>Пользователи</h1>
                <div class="action-block">
                    <v-input search="true" :placeholder="'Поиск приложений'" />
                    <main-button icon="true">
                        <plus-icon />
                        Добавить приложение
                    </main-button>
                </div>
            </div>
            <VTable>
                <template v-slot:thead>
                    <tr>
                        <td class="b-2-compact b-2-bold sort">ID</td>
                        <td class="b-2-compact b-2-bold sort">
                            Название
                            <table-arrow-icon />
                        </td>
                        <td class="b-2-compact b-2-bold sort">
                            Автор
                            <table-arrow-icon />
                        </td>
                        <td class="b-2-compact b-2-bold sort">Статус</td>
                        <td class="b-2-compact b-2-bold sort">
                            Подтверждение
                            <table-arrow-icon />
                        </td>
                        <td class="b-2-compact b-2-bold sort">Действия</td>
                    </tr>
                </template>
                <template v-slot:tbody>
                    <tr>
                        <td class="b-1-compact">382 912</td>
                        <td>
                            <div class="user">
                                <div class="img">
                                    <img src="@/assets/images/game.png" alt="" />
                                </div>
                                <div class="info">
                                    <p class="b-1-compact b-1-bold">qwe</p>
                                    <p class="b-2-compact b-1-regular">qwe</p>
                                </div>
                            </div>
                        </td>
                        <td class="b-1-compact">Esprit Games</td>
                        <td class="b-1-compact b-1-medium">
                            <p class="status approve">
                                <table-done-icon />
                                Подтверждено
                            </p>
                        </td>
                        <td class="b-1-compact b-1-medium">
                            <p class="status">
                                <table-close-icon />
                                Не одобрен
                            </p>
                        </td>
                        <table-menu :type="'application'" />
                    </tr>
                </template>
            </VTable>
            <Pagination :current-page="1" :total-pages="10" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/applications';
</style>
