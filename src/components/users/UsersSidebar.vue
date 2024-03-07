<script setup>
import VDateInput from '@/components/ui/form-elements/VDateInput.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import VCheckbox from '@/components/ui/form-elements/VCheckbox.vue'
import {computed, ref, watch} from 'vue'
import {useUsersStore} from '@/stores/users'
import MainButton from "@/components/ui/buttons/MainButton.vue";


const props = defineProps({
    uid:{
        default:''
    }
})


const users = useUsersStore()
const form = ref({
    dates: '',
    uid: '',
    gid: '',
    session_num: '',
    is_guest: false,
})
const types = ref({})


const getActivityTypes = computed(() => users.getActivityTypes)


const actionGetUsers = () => {
    form.value.types = createStringWithTrueKeys(types.value)
    users.setQuery(JSON.parse(JSON.stringify(form.value)))
    users.actionGetUsers()
}

const resetFilter = () => {
    form.value = {
        dates: '',
        uid: '',
        gid: '',
        session_num: '',
        is_guest: false,
    }
    types.value = {}
    users.setQuery({})
    users.actionGetUsers()
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


watch(props,()=>{
    form.value.uid = props.uid
    actionGetUsers()
},{deep:true})
</script>

<template>
    <div class="user-sidebar">
        <div class="filter">
            <VDateInput
                v-model="form.dates"
                :placeholder="'Выберите дату или период'"
                :title="'Дата'"
                mode="range"
            />
            <div class="id">
                <vInput v-model="form.uid" :placeholder="'1000000000002'" :title="'UID'"/>
                <vInput v-model="form.gid" :placeholder="'10'" :title="'GID'"/>
            </div>
            <vInput v-model="form.session_num" :placeholder="'10'" :title="'Номер сессии'"/>
        </div>
        <div class="guest">
            <VCheckbox v-model="form.is_guest">Гостевой аккаунт</VCheckbox>
        </div>
        <div class="actions">
            <h4 class="action-header">Действия</h4>
            <template v-for="(type,key) in getActivityTypes" :key="key">
                <div class="action-block">
                    <p class="sub-2">{{ key }}</p>
                    <template v-for="t in type" :key="t.id">
                        <VCheckbox v-model="types[t.id]">{{ t.title }}</VCheckbox>
                    </template>
                </div>
            </template>
        </div>
        <div class="buttons">
            <MainButton :secondary="true" @click="resetFilter">
                Сбросить
            </MainButton>
            <MainButton @click="actionGetUsers">
                Применить
            </MainButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/user-sidebar';
</style>
