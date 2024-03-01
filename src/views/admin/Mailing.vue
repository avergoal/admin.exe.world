<script setup>
import VDateInput from '@/components/ui/form-elements/VDateInput.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import VToggle from '@/components/ui/form-elements/VToggle.vue'
import VSelect from '@/components/ui/form-elements/VSelect.vue'
import VTextArea from '@/components/ui/form-elements/VTextArea.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
</script>

<template>
    <div class="mailing-content">
        <h1>Рассылки</h1>
        <div class="form">
            <div class="date">
                <VDateInput placeholder="Выберите дату" title="Последнее посещение" />
                <VInput placeholder="000000" title="GID" />
            </div>
            <div class="toggle-content">
                <p class="b-1-medium">Плательщик</p>
                <VToggle />
            </div>
            <p class="sub-1">Платил в играх:</p>
            <VSelect placeholder="Начните ввод" title="Список идентификаторов" />
            <VInput placeholder="info@exe.world" title="Тестовый email" />
            <VInput placeholder="Введите тему" title="Тема письма" />
            <VTextArea placeholder="Введите текст" title="Шаблон рассылки" />
            <div class="div">
                <MainButton>отправить</MainButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/mailing';
</style>
