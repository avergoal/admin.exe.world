<script setup>
import VTextArea from '@/components/ui/form-elements/VTextArea.vue'
import VDateInput from '@/components/ui/form-elements/VDateInput.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
// import VIconFile from '@/components/ui/form-elements/VIconFile.vue'
import ClearAllIcon from '@/components/icons/ClearAllIcon.vue'
import {computed, onMounted, ref, watch} from "vue";
import {useNotificationsStore} from "@/stores/notifications";
import VInput from "@/components/ui/form-elements/VInput.vue";
import {useGamesStore} from "@/stores/games";
import notIcon from "@/assets/images/notification.jpg"
import VTable from "@/components/ui/table/VTable.vue";
import timestampToDate from "@/mixins/timestampToDate";


onMounted(() => {
    notifications.actionGetNotification()
})


const notifications = useNotificationsStore()
const gamesStore = useGamesStore()
const form = ref({
    text: {
        en: ''
    },
    date: '',
    time: '',
    gid: '',
})
const preview = ref('')


const checkExist = computed(() => {
    return form.value.text?.en?.length || preview.value
})
const getNotifications = computed(() => notifications.getNotifications)


const saveNotification = async () => {
    try {
        await notifications.saveNotification(form.value)
        form.value = {
            text: {
                en: ''
            },
            date: '',
            time: '',
            gid: '',
        }
        preview.value = ''

    } catch (e) {
        console.log(e)
    }
}

const edit = async (not) => {
    const notification = await notifications.actionGetNotificationById(not.nid)
    if (notification) {
        const dateString = timestampToDate(notification.time)
        const [datePart, timePart] = dateString.split(" / ");
        const [day, month, year] = datePart.split(".");
        const [time, meridiem] = timePart.split(" ");

        let [hours, minutes] = time.split(":");
        if (meridiem === "pm") {
            hours = (parseInt(hours, 10)).toString().padStart(2, '0');
        }
        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}`;

        form.value.id = notification.id
        form.value.text = {
            en: notification?.content?.filter(item => item?.locale === 'en')?.[0]?.text
        }
        form.value.date = formattedDate
        form.value.time = formattedTime
        form.value.gid = notification?.game?.gid ?? ''

    }
}

const deleteNotification = (notification)=>{
    let params = {
        session:notification.session,
        id:notification.nid
    }
    notifications.actionDeleteNotificationById(params)
}


watch(form.value, async () => {
    try {
        if (form.value.gid) {
            console.log('form.value.gid', form.value.gid)
            let data = await gamesStore.actionGetGame(form.value.gid)
            if (data) {
                preview.value = data.files?.find(item => item.type == 1)?.filename ?? ''
            }
        }
    } catch (e) {
        console.log(e)
        preview.value = ''
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
                    <VDateInput dateFormat="Y-m-d" v-model="form.date" placeholder="Выберите дату" title="Дата"/>
                    <VDateInput v-model="form.time" placeholder="00:00" title="Время публикации" dateType="time"/>
                </div>
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
                                <img :src="preview?preview:notIcon" alt="preview">
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
        <h1>История уведомлений</h1>
        <div class="notification-history">
            <VTable>
                <template v-slot:thead>
                    <tr>
                        <td>
                            <h4>Название</h4>
                        </td>
                        <td>
                            <h4>Дата добавления</h4>
                        </td>
                        <td>
                            <h4>Дата рассылки</h4>
                        </td>
                        <td></td>
                    </tr>
                </template>
                <template v-slot:tbody>
                    <tr v-for="notification in getNotifications">
                        <td class="b-1-regular">
                            {{ notification.text }}
                        </td>
                        <td class="b-1-regular">
                            {{ timestampToDate(notification.timestamp) }}
                        </td>
                        <td class="b-1-regular">
                            {{ timestampToDate(notification.timestamp) }}
                        </td>
                        <td class="b-1-regular">
                            <div class="actions">
                                <button class="b-2-regular" @click="deleteNotification(notification)">delete</button>
                                |
                                <button class="b-2-regular" @click="edit(notification)">edit</button>
                            </div>
                        </td>
                    </tr>
                </template>
            </VTable>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/notifications';
</style>
