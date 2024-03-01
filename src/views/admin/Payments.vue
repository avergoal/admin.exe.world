<script setup>
import PaymentHeader from '@/components/admin/payment/PaymentHeader.vue'
import TableCloseIcon from '@/components/icons/table/TableCloseIcon.vue'
import MoreIcon from '@/components/icons/MoreIcon.vue'
import TableArrowIcon from '@/components/icons/table/TableArrowIcon.vue'
import TableDoneIcon from '@/components/icons/table/TableDoneIcon.vue'
import TableMenu from '@/components/users/TableMenu.vue'
import VTable from '@/components/ui/table/VTable.vue'
import Pagination from '@/components/ui/pagination/Pagination.vue'
</script>

<template>
    <div class="payments-content">
        <PaymentHeader />
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
</template>

<style scoped lang="scss">
@import 'scss/payments';
</style>
