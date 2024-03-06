<script setup>
import VSelect from '@/components/ui/form-elements/VSelect.vue'
import VTextArea from '@/components/ui/form-elements/VTextArea.vue'
import VCheckbox from '@/components/ui/form-elements/VCheckbox.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import {computed, onMounted, ref, watch} from "vue";
import {useGamesStore} from "@/stores/games";


const formApprove = ref({})
const formOptions = ref({})
const games = useGamesStore()


const getGame = computed(() => games.getGame)
const getApproveStatuses = computed(() => games.getApproveStatuses)


const submitApprove = () => {
    games.changeGameApprove(formApprove.value)
}

const submitOptions = () => {
    games.submitOptions(formOptions.value)
}


watch(getGame, () => {
    formApprove.value = {
        gid: getGame.value?.info?.gid,
        approve: getGame.value?.info?.approved,
        comment: getGame.value?.info?.comment,
        type: getGame.value?.info?.type,
        session: getGame.value?.session,
    }
    formOptions.value = {
        gid: getGame.value?.info?.gid,
        new: !!Number(getGame.value?.options?.new),
        recommended: !!Number(getGame.value?.options?.recommended),
        carousel: !!Number(getGame.value?.options?.carousel),
        carousel_text: getGame.value?.options?.carousel_text,
        session: getGame.value?.session,
    }
}, {immediate: true})
</script>

<template>
    <div class="application-sidebar">
        <div class="settings publish">
            <h4>Настройки публикации</h4>
            <div class="content">
                <vInput :placeholder="`https://exe.world/game/${getGame?.info?.gid}`" :title="'Ссылка'"
                        :disabled="true"/>
                <VSelect
                    :title="'Статус'"
                    :data="getApproveStatuses"
                    v-model="formApprove.approve"
                    id-type="id"
                    show-select="title"
                />
                <v-text-area :title="'Комментарий'" v-model="formApprove.comment"/>
                <main-button @click="submitApprove">опубликовать</main-button>
            </div>
        </div>
        <div class="settings show">
            <h4>Настройки отображения</h4>
            <div class="content">
                <VCheckbox v-model="formOptions.new">Новинка</VCheckbox>
                <VCheckbox v-model="formOptions.recommended">Рекоммендуемое</VCheckbox>
                <VCheckbox v-model="formOptions.carousel">Отобразить в карусели</VCheckbox>
                <v-text-area :title="'Текст для карусели'" v-model="formOptions.carousel_text"/>
                <main-button @click="submitOptions">опубликовать</main-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/application-sidebar';
</style>
