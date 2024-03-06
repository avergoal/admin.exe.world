<script setup>
import BackPageIcon from '@/components/icons/BackPageIcon.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import MoreVioletIcon from '@/components/icons/MoreVioletIcon.vue'
import ApplicationSidebar from '@/components/applications/ApplicationSidebar.vue'
import VSelect from '@/components/ui/form-elements/VSelect.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import VTextArea from '@/components/ui/form-elements/VTextArea.vue'
import VCoverInput from '@/components/ui/form-elements/VCoverInput.vue'
import {computed, onMounted, ref} from "vue";
import {useGamesStore} from "@/stores/games";
import {useRoute} from "vue-router";


onMounted(async () => {
    if (route.params.id) {
        await games.actionGetGame(route.params.id)
        formInfo.value = {
            gid: getGame.value?.info?.gid,
            type: getGame.value?.info?.type,
            title: getGame.value?.info?.title,
            main_url: getGame.value?.info?.main_url,
            payment_url: getGame.value?.info?.payment_url,
            locales: getGame.value?.locales,
            session: getGame.value?.session,
        }

    }
})


const games = useGamesStore()
const route = useRoute()
const formInfo = ref({})


const getGame = computed(() => games.getGame)
const getCategories = computed(() => games.getCategories)
const data = [
    {id: 0, status: 'Not published'},
    {id: 1, status: 'Published'},
    {id: 2, status: 'Technical works'}
]
const coverTypes = ['icon', 'cover', 'carousel']


const submitInfo = () => {
    games.submitInfo(formInfo.value)
}
</script>

<template>
    <div class="application-content">
        <div class="application">
            <div class="header">
                <router-link class="button-2" :to="{ name: 'Applications' }">
                    <BackPageIcon/>
                    к приложениям
                </router-link>
                <div class="header-block">
                    <h1>Dragon Knight 2</h1>
                    <div class="action-block">
                        <main-button icon="true" @click="submitInfo"> Сохранить изменения</main-button>
                        <button class="dropdown-button">
                            <MoreVioletIcon/>
                        </button>
                    </div>
                </div>
            </div>
            <div class="application-info">
                <div class="info-item info">
                    <div class="title">
                        <h4>Основная информация</h4>
                        <p class="b-1-medium">Название, жанр и ссылки</p>
                    </div>
                    <div class="content-block">
                        <div class="content">
                            <div class="row">
                                <vInput
                                    class="row-item"
                                    :placeholder="'Dragon Knight 2'"
                                    :title="'Название'"
                                    v-model="formInfo.title"
                                />
                                <VSelect
                                    class="row-item"
                                    :title="'Жанр'"
                                    :data="getCategories"
                                    v-model="formInfo.type"
                                    id-type="cid"
                                    show-select="title"
                                />
                            </div>
                            <vInput
                                :placeholder="'https://html5.inlogic.sk/dragonknight/?partner_id=dragonknight2'"
                                :title="'Ссылка'"
                                v-model="formInfo.main_url"
                            />
                            <vInput
                                :placeholder="'https://html5.inlogic.sk/dragonknight/?partner_id=dragonknight2'"
                                :title="'Платёжная ссылка'"
                                v-model="formInfo.payment_url"
                            />
                        </div>
                    </div>
                </div>
                <div class="info-item location">
                    <div class="title">
                        <h4>Локализация</h4>
                        <p class="b-1-medium">Название и описание на разных языках</p>
                    </div>
                    <div class="content-block">
                        <div class="content" v-for="item in formInfo.locales">
                            <p class="sub-1">{{ item.locale === 'en' ? 'English' : 'Русский' }}</p>
                            <vInput
                                class="row-item"
                                :placeholder="'Dragon Knight 2'"
                                :title="'Название'"
                                v-model="item.content.title"
                            />
                            <v-text-area :title="'Описание'" v-model="item.content.description"/>
                        </div>
                    </div>
                </div>
                <div class="info-item images" v-if="route.params.id">
                    <div class="title">
                        <h4>Изображения</h4>
                        <p class="b-1-medium">Обложка и аватары игры</p>
                    </div>
                    <div class="content-block">
                        <div class="content">
                            <v-cover-input
                                @onDeleteSuccess=""
                                :type="type"
                                :key="type"
                                :multiple="type === 'screenshot'"
                                :src="[type]"
                                v-for="type in coverTypes"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <application-sidebar/>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/application';
</style>
