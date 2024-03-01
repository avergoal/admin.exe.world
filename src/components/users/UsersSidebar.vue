<script setup>
import VDateInput from '@/components/ui/form-elements/VDateInput.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import VCheckbox from '@/components/ui/form-elements/VCheckbox.vue'
import { ref, watch } from 'vue'
import { useUsersStore } from '@/stores/users'

const users = useUsersStore()
const form = ref({
    date: '',
    uid: '',
    gid: '',
    is_guest: ''
})

watch(
    form,
    (newData) => {
        if (newData) {
            console.log('pix', newData)
            users.setQuery(JSON.parse(JSON.stringify(form.value)))
            users.actionGetUsers()
        }
    },
    { deep: true }
)
</script>

<template>
    <div class="user-sidebar">
        <div class="filter">
            <VDateInput
                v-model="form.date"
                :placeholder="'Выберите дату или период'"
                :title="'Дата'"
                mode="range"
            />
            <div class="id">
                <vInput v-model="form.uid" :placeholder="'1000000000002'" :title="'UID'" />
                <vInput v-model="form.gid" :placeholder="'10'" :title="'GID'" />
            </div>
            <vInput :placeholder="'10'" :title="'Номер сессии'" />
        </div>
        <div class="guest">
            <VCheckbox v-model="form.is_guest">Гостевой аккаунт</VCheckbox>
        </div>
        <div class="actions">
            <h4 class="action-header">Действия</h4>
            <div class="action-block">
                <p class="sub-2">Авторизация</p>
                <VCheckbox>Зарегистрировался</VCheckbox>
                <VCheckbox>Запросил пароль</VCheckbox>
                <VCheckbox>Новый гостевой аккаунт</VCheckbox>
                <VCheckbox>Гость зарегистрировался</VCheckbox>
            </div>
            <div class="action-block">
                <p class="sub-2">Платежи</p>
                <VCheckbox>Заплатил в игре</VCheckbox>
                <VCheckbox>Получил бонус</VCheckbox>
                <VCheckbox>Отменил покупку</VCheckbox>
                <VCheckbox>Установил игру</VCheckbox>
                <VCheckbox>Удалил игру</VCheckbox>
            </div>
            <div class="action-block">
                <p class="sub-2">Игры</p>
                <VCheckbox>Установил игру</VCheckbox>
                <VCheckbox>Удалил игру</VCheckbox>
            </div>
            <div class="action-block">
                <p class="sub-2">Профиль</p>
                <VCheckbox>Изменил фото</VCheckbox>
                <VCheckbox>Изменил информацию в профиле</VCheckbox>
            </div>
            <div class="action-block">
                <p class="sub-2">Активность</p>
                <VCheckbox>Добавил друга</VCheckbox>
                <VCheckbox>Добавил в чёрный список</VCheckbox>
                <VCheckbox>Написал сообщение</VCheckbox>
                <VCheckbox>Удалил друга</VCheckbox>
                <VCheckbox>Попал в чёрный список</VCheckbox>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/user-sidebar';
</style>
