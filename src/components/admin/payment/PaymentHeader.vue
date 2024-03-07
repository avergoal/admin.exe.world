<script setup>
import VDateInput from '@/components/ui/form-elements/VDateInput.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import VSelect from '@/components/ui/form-elements/VSelect.vue'
import VCheckbox from '@/components/ui/form-elements/VCheckbox.vue'
import {computed, ref} from "vue";
import {usePaymentsStore} from "@/stores/payments";
import MainButton from "@/components/ui/buttons/MainButton.vue";


const payments = usePaymentsStore()


const form = ref({
    dates: '',
    uid: '',
    payment_system: 'all',
})
const typeStatuses = [
    {
        id:1,
        status: 'Инициирован'
    },
    {
        id:2,
        status: 'Зачислен'
    },
    {
        id:3,
        status: 'Проверен'
    },
]
const types = ref({})


const getPaymentsMethods = computed(()=>payments.getPaymentsMethods)
const paymentsMethods = computed(()=>{
    let data = JSON.parse(JSON.stringify(getPaymentsMethods.value))
    data.unshift({id:'all',title:'Все'})
    return data
})


const actionGetPayments = () => {
    let formData = JSON.parse(JSON.stringify(form.value))
    if(form.value.payment_system === 'all'){
        formData.payment_system = ''
    }
    formData.filters = createStringWithTrueKeys(types.value)
    payments.setQuery(formData)
    payments.actionGetPayments()
}
const resetFilter = () => {
    form.value = {
        dates: '',
        uid: '',
        payment_system: '',
    }
    types.value = {}
    payments.setQuery({})
    payments.actionGetPayments()
}
const createStringWithTrueKeys = (obj) => {
    const trueKeys = [];

    for (const key in obj) {
        if (obj[key] === true) {
            trueKeys.push(key);
        }
    }

    return trueKeys.join(', ');
}
</script>

<template>
    <div class="payment-header">
        <div class="header-content">
            <h1>Управление платежами</h1>
            <v-input search="true" placeholder="Поиск пользователей по ID" v-model="form.uid"/>
        </div>
        <div class="filter">
            <div class="input-row">
                <VDateInput
                    v-model="form.dates"
                    :placeholder="'Выберите дату или период'"
                    :title="'Дата'"
                    mode="range"
                />
                <VSelect
                                    title="Платёжная система"
                                    :data="paymentsMethods"
                                    v-model="form.payment_system"
                                    id-type="id"
                                    show-select="title"
                                />
            </div>
            <div class="checkbox-row">
                <template v-for="t in typeStatuses" :key="t.id">
                    <VCheckbox v-model="types[t.id]">{{ t.status }}</VCheckbox>
                </template>
            </div>
            <div class="buttons">
                <MainButton :secondary="true" @click="resetFilter">
                    Сбросить
                </MainButton>
                <MainButton @click="actionGetPayments">
                    Применить
                </MainButton>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
@import 'scss/paymen-header';
</style>
