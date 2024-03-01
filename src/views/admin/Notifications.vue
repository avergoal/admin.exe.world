<script setup>
import VTextArea from '@/components/ui/form-elements/VTextArea.vue'
import VDateInput from '@/components/ui/form-elements/VDateInput.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import VIconFile from '@/components/ui/form-elements/VIconFile.vue'
import ClearAllIcon from '@/components/icons/ClearAllIcon.vue'
</script>

<template>
    <div class="notifications-content">
        <h1>Уведомления</h1>
        <div class="form-data">
            <form action="" class="form">
                <VTextArea title="Текст уведомления" placeholder="Введите текст" limit="100" />
                <div class="date">
                    <v-date-input placeholder="Выберите дату" title="Дата" />
                    <v-date-input placeholder="00:00" title="Время публикации" dateType="time" />
                </div>
                <VIconFile />
                <div>
                    <MainButton>отправить</MainButton>
                </div>
            </form>
            <div class="preview">
                <h4>Предварительный просмотр</h4>
                <div class="notification-preview">
                    <div class="preview-header">
                        <h6>Notifications</h6>
                        <ClearAllIcon />
                    </div>
                    <div class="notification-items">
                        <div class="notification-item" v-for="n in 5">
                            <div class="icon"></div>
                            <div class="info">
                                <div class="text"></div>
                                <div class="text"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/notifications';
</style>
