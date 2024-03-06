<script setup>
import VTextArea from '@/components/ui/form-elements/VTextArea.vue'
import VDateInput from '@/components/ui/form-elements/VDateInput.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import VIconFile from '@/components/ui/form-elements/VIconFile.vue'
import ClearAllIcon from '@/components/icons/ClearAllIcon.vue'
import {computed, ref} from "vue";
import {useNotificationsStore} from "@/stores/notifications";


const notifications = useNotificationsStore()
const form = ref({
    notification:'',
    date:'',
    time:''
})
const preview = ref({
    preview:''
})


const checkExist = computed(()=>{
    return form.value.notification.length || preview.value.preview.length
})


// const saveNotification =()=>{
//     let formData = new FormData
//     Object.keys(form.value).forEach((key) => {
//         formData.append(key, params[key]);
//     });
//     formData.append
//     notifications.saveNotification()
// }
</script>

<template>
    <div class="notifications-content">
        <h1>Уведомления</h1>
        <div class="form-data">
            <form action="" class="form">
                <VTextArea title="Текст уведомления" placeholder="Введите текст" limit="100" v-model="form.notification"/>
                <div class="date">
                    <v-date-input v-model="form.date" placeholder="Выберите дату" title="Дата" />
                    <v-date-input v-model="form.time" placeholder="00:00" title="Время публикации" dateType="time" />
                </div>
                <VIconFile @image-change="preview = $event"/>
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
                        <div class="notification-item" v-if="checkExist">
                            <div class="icon">
                                <img :src="preview" alt="preview">
                            </div>
                            <div class="info">
                                <div class="b-2-regular">{{form.notification}}</div>
                            </div>
                        </div>
                        <div class="notification-item" v-for="n in (checkExist?4:5)">
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
