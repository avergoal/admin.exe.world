<script setup>
import VCheckbox from '@/components/ui/form-elements/VCheckbox.vue'
import VSelect from '@/components/ui/form-elements/VSelect.vue'
import {computed, ref} from "vue";
import {useGamesStore} from "@/stores/games";
import MainButton from "@/components/ui/buttons/MainButton.vue";


const games = useGamesStore()
const searchForm = ref({
    category:'',
    status:''
})
const status = ref([
    {
        id:0,
        status:'неактив'
    },{
        id:1,
        status:'актив'
    }
])


const getCategories = computed(() => games.getCategories)


const actionGetGames = () => {
    if(!searchForm.value.approved){
        delete searchForm.value.approved
    }
    games.setQuery(JSON.parse(JSON.stringify(searchForm.value)))
    games.actionGetGames()
}

const resetFilter = () => {
    searchForm.value = {
        category:'',
        status:''
    }
    games.setQuery({})
    games.actionGetGames()
}
</script>

<template>
    <div class="applications-sidebar">
        <VSelect :title="'Категории'" v-model="searchForm.category" :data="getCategories" :show-select="'title'" :idType="'cid'" :findValue="searchForm.category"/>
        <VSelect :title="'Статус приложения'" v-model="searchForm.status" :data="status" :show-select="'status'" :id-type="'id'" :findValue="searchForm.status"/>
        <VSelect :title="'Промо опции'" :show-select="'status'"/>
        <VCheckbox v-model="searchForm.approved">Только подтвержденные приложения</VCheckbox>
        <div class="buttons">
            <MainButton :secondary="true" @click="resetFilter">
                Сбросить
            </MainButton>
            <MainButton @click="actionGetGames">
                Применить
            </MainButton>
        </div>
    </div>

</template>

<style scoped lang="scss">
@import 'scss/applications-sidebar';
</style>
