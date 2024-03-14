<script setup>
import PaymentHeader from '@/components/admin/payment/PaymentHeader.vue'
import TableArrowIcon from '@/components/icons/table/TableArrowIcon.vue'
import VTable from '@/components/ui/table/VTable.vue'
import Pagination from '@/components/ui/pagination/Pagination.vue'
import {usePaymentsStore} from "@/stores/payments";
import {computed, onMounted} from "vue";
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';


onMounted(async ()=>{
    await payments.actionGetPayments()
    await payments.actionGetPaymentsChart()
    const chart = new Chart(document.getElementById('myChart'), {
        type: 'line',
        data: {
            labels: getPaymentsChart.value.data.map(item => item.ftime),
            datasets: [{
                label: 'Count',
                data: getPaymentsChart.value.data.map(item => item.count),
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                fill: false,
            },
                {
                    label: 'Sum',
                    data: getPaymentsChart.value.data.map(item => item.sum),
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: false,
                },]
        }
    });
})


const payments = usePaymentsStore()
const statuses = {

    '0': 'Инициирован',
    '2': 'Зачислен'
}


const getPayments =computed(()=>payments.getPayments)
const getPagination = computed(() => payments.getPagination)
const getPaymentsChart = computed(() => payments.getPaymentsChart)


const pageChange = (e) => {
    payments.setPage(e)
}

const formatDate = (timeS)=>{
    const timestamp = timeS * 1000;
    const date = new Date(timestamp);

    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date);
    return formattedDate.replace(',',' в');
}
</script>

<template>
    <div class="payments-content">
        <PaymentHeader />
        <Pagination
            :current-page="getPagination?.currentPage"
            :total-pages="getPagination?.pageTotal"
            @page-change="pageChange"
        />
        <VTable>
            <template v-slot:thead>
                <tr>
                    <td class="b-2-compact b-2-bold sort">Пользователь</td>
                    <td class="b-2-compact b-2-bold sort">
                        Номер
                        <table-arrow-icon />
                    </td>
                    <td class="b-2-compact b-2-bold sort">
                        Дата и время
                        <table-arrow-icon />
                    </td>
                    <td class="b-2-compact b-2-bold sort">Статус</td>
                    <td class="b-2-compact b-2-bold sort">
                        Сумма фактическая
                        <table-arrow-icon />
                    </td>
                    <td class="b-2-compact b-2-bold sort">Статус</td>
                </tr>
            </template>
            <template v-slot:tbody>
                <tr v-for="payment in getPayments?.[getPagination?.currentPage-1]?.payments">
                    <td>
                        <a class="user cursor" :href="`https://exe.world/user/${payment?.user?.uid}`" target="_blank">
                            <div class="img">
                                <img :src="payment?.user?.avatar_urls?.x100" alt="x100" />
                            </div>
                            <div class="info">
                                <p class="b-1-compact b-1-bold">
                                    {{ payment?.user?.first_name }} {{ payment?.user?.last_name }}
                                </p>
                                <p class="b-2-compact b-1-regular"></p>
                            </div>
                        </a>
                    </td>
                    <td class="b-1-compact">{{ payment.pid }}</td>
                    <td class="b-1-compact b-1-medium">
                        {{ formatDate(payment.time) }}
                    </td>
                    <td class="b-1-compact b-1-medium">
                        {{payment.value}}
                    </td>
                    <td class="b-1-compact b-1-medium">
                        {{payment.value}}
                    </td>
                    <td class="b-1-compact b-1-medium">
                        {{statuses[payment.status]??payment.status}}
                    </td>
                </tr>
            </template>
        </VTable>
        <Pagination
            :current-page="getPagination?.currentPage"
            :total-pages="getPagination?.pageTotal"
            @page-change="pageChange"
            margin="true"
        />
        <canvas id="myChart"></canvas>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/payments';
</style>
