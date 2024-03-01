<script setup>
import VDateInput from '@/components/ui/form-elements/VDateInput.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import VSelect from '@/components/ui/form-elements/VSelect.vue'
import VCheckbox from '@/components/ui/form-elements/VCheckbox.vue'
</script>

<template>
    <div class="payment-header">
        <div class="header-content">
            <h1>Управление платежами</h1>
            <v-input search="true" placeholder="Поиск пользователей по ID" />
        </div>
        <div class="filter">
            <div class="input-row">
                <v-date-input placeholder="Выберите дату или период" title="Дата" mode="range" />
                <v-select title="Платёжная система" />
            </div>
            <div class="checkbox-row">
                <VCheckbox>Инициирован</VCheckbox>
                <VCheckbox>Проверен</VCheckbox>
                <VCheckbox>Зачислен</VCheckbox>
                <VCheckbox>Зачислен модератором</VCheckbox>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/paymen-header';
</style>
