<script setup>
import VTextArea from '@/components/ui/form-elements/VTextArea.vue'
import VDateInput from '@/components/ui/form-elements/VDateInput.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import VIconFile from '@/components/ui/form-elements/VIconFile.vue'
import ClearAllIcon from '@/components/icons/ClearAllIcon.vue'
import {computed, ref, watch} from "vue";
import {useNotificationsStore} from "@/stores/notifications";
import VInput from "@/components/ui/form-elements/VInput.vue";
import {useGamesStore} from "@/stores/games";


const notifications = useNotificationsStore()
const gamesStore = useGamesStore()
const form = ref({
    text:{
        en:''
    },
    date: '',
    time: '',
    gid: '',
})
const preview = ref('')


const checkExist = computed(()=>{
    return form.value.text.en.length || preview.value
})


const saveNotification = async () => {
    try {
        const data  = await notifications.saveNotification(form.value)
        form.value = {
            text:{
                en:''
            },
            date: '',
            time: '',
            gid: '',
        }
        preview.value = ''

    }catch (e){
        console.log(e)
    }
}

watch(form.value, async () => {
    if (form.value.gid) {
        let data = await gamesStore.actionGetGame(form.value.gid)
        if(data){
            preview.value = data.files?.find(item=>item.type == 1)?.filename??''
        }
    }
}, {deep: true})
</script>

<template>
    <div class="notifications-content">
        <h1>Уведомления</h1>
        <div class="form-data">
            <form action="" class="form" @submit.prevent="saveNotification">
                <VTextArea title="Текст уведомления" placeholder="Введите текст" limit="100"
                           v-model="form.text.en"/>
                <div class="date">
                    <v-date-input dateFormat="Y-m-d" v-model="form.date" placeholder="Выберите дату" title="Дата"/>
                    <v-date-input v-model="form.time" placeholder="00:00" title="Время публикации" dateType="time"/>
                </div>
                <!--                <VIconFile @image-change="preview = $event"/>-->
                <VInput title="GID" placeholder="10" v-model="form.gid"/>
                <div>
                    <MainButton>отправить</MainButton>
                </div>
            </form>
            <div class="preview">
                <h4>Предварительный просмотр</h4>
                <div class="notification-preview">
                    <div class="preview-header">
                        <h6>Notifications</h6>
                        <ClearAllIcon/>
                    </div>
                    <div class="notification-items">
                        <div class="notification-item" v-if="checkExist">
                            <div class="icon">
                                <img v-if="preview" :src="preview" alt="preview">
                            </div>
                            <div class="info">
                                <div class="b-2-regular">{{ form.text.en }}</div>
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
