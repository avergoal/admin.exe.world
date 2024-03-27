<script setup>
import VDateInput from '@/components/ui/form-elements/VDateInput.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import VToggle from '@/components/ui/form-elements/VToggle.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import timestampToDate from "@/mixins/timestampToDate";
import VTable from "@/components/ui/table/VTable.vue";
import {computed, onMounted, ref} from "vue";
import {useMailsStore} from "@/stores/mailing";
import VInputFile from "@/components/ui/form-elements/VInputFile.vue";


onMounted(() => {
    mails.actionGetMails()
})


const mails = useMailsStore()
const form = ref({
    date: '',
    gids: '',
    payer: false,
    subject: '',
    start: false,
    archive: ''
})


const getMails = computed(() => mails.getMails)
const getMailsStatuses = computed(() => mails.getMailsStatuses)


const submit = () => {
    const formDataToSend = convertToFormData(form.value);
    const {data} = mails.saveMails(formDataToSend)
    if (data?.response?.result?.success) {
        form.value = {
            date: '',
            gids: '',
            payer: false,
            subject: '',
            start: false,
            archive: ''
        }
    }
}

const edit = async (m) => {
    const data = await mails.actionGetMailById(m.id)
    if (data) {
        form.value.date = data.date[0] ?? ''
        form.value.gids = data.gids.join(',')
        form.value.payer = data.payer
        form.value.subject = data.subject
        form.value.start = data.start
        form.value.archive = ''
    }
}

const convertToFormData = (obj) => {
    const formData = new FormData();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            formData.append(key, obj[key]);
        }
    }
    return formData;
}
</script>

<template>
    <div class="mailing-content">
        <h1>Рассылки</h1>
        <form class="form" @submit.prevent="submit">
            <div class="date">
                <VDateInput dateFormat="Y-m-d" v-model="form.date" placeholder="Выберите дату" reset-icon="true"
                            title="Последнее посещение"/>
                <VInput v-model="form.gids" placeholder="000000" title="GID"/>
            </div>
            <div class="toggle-content">
                <p class="b-1-medium">Запуск</p>
                <VToggle v-model="form.start"/>
            </div>
            <div class="toggle-content">
                <p class="b-1-medium">Плательщик</p>
                <VToggle v-model="form.payer"/>
            </div>
            <VInput placeholder="info@exe.world" title="Тестовый email"/>
            <VInput v-model="form.subject" placeholder="Введите тему" title="Тема письма"/>
            <VInputFile v-model="form.archive"/>
            <div class="div">
                <MainButton>отправить</MainButton>
            </div>
        </form>
        <h1>История рассылок</h1>
        <div class="mailing-history">
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
                        <td>
                            <h4>Аудитория</h4>
                        </td>
                        <td>
                            <h4>Статус</h4>
                        </td>
                        <td></td>
                    </tr>
                </template>
                <template v-slot:tbody>
                    <tr v-for="mail in getMails">
                        <td class="b-1-regular">
                            {{ mail.subject }}
                        </td>
                        <td class="b-1-regular">
                            {{ timestampToDate(mail.date_added) }}
                        </td>
                        <td class="b-1-regular">
                            {{ timestampToDate(mail.date_added) }}
                        </td>
                        <td class="b-1-regular">
                            {{ mail.users }}
                        </td>
                        <td class="b-1-regular">
                            {{ getMailsStatuses[mail.status] }}
                        </td>
                        <td class="b-1-regular">
                            <div class="actions">
                                <a class="b-2-regular" :href="mail.url">view</a>
                                |
                                <button class="b-2-regular" @click="edit(mail)">edit</button>
                            </div>
                        </td>
                    </tr>
                </template>
            </VTable>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/mailing';
</style>
