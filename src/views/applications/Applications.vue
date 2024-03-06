<script setup>
import Pagination from '@/components/ui/pagination/Pagination.vue'
import TableDoneIcon from '@/components/icons/table/TableDoneIcon.vue'
import MoreIcon from '@/components/icons/MoreIcon.vue'
import TableMenu from '@/components/users/TableMenu.vue'
import TableArrowIcon from '@/components/icons/table/TableArrowIcon.vue'
import TableCloseIcon from '@/components/icons/table/TableCloseIcon.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import VTable from '@/components/ui/table/VTable.vue'
import ApplicationsSidebar from '@/components/applications/ApplicationsSidebar.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import {computed, onMounted, ref} from "vue";
import {useGamesStore} from "@/stores/games";


onMounted(() => {
    games.actionGetGames()
})


const games = useGamesStore()
const search = ref('')


const getGames = computed(() => games.getGames)
const getPagination = computed(() => games.getPagination)


const searchGame = (e) => {
    if(e.target.value.length>2){
        games.actionGetGames({
            search:e.target.value
        })
    }else {
        games.actionGetGames()
    }
}

const pageChange = (e) => {
    games.setPage(e)
}
</script>

<template>
    <div class="applications-content">
        <applications-sidebar/>
        <div class="users">
            <div class="header">
                <h1>Приложения</h1>
                <div class="action-block">
                    <v-input search="true" @input="searchGame" :placeholder="'Поиск приложений'"/>
                    <main-button icon="true" @click="$router.push({name:'Application'})">
                        <plus-icon/>
                        Добавить приложение
                    </main-button>
                </div>
            </div>
            <VTable>
                <template v-slot:thead>
                    <tr>
                        <td class="b-2-compact b-2-bold sort">ID</td>
                        <td class="b-2-compact b-2-bold sort">
                            Название
                            <table-arrow-icon/>
                        </td>
                        <td class="b-2-compact b-2-bold sort">
                            Автор
                            <table-arrow-icon/>
                        </td>
                        <td class="b-2-compact b-2-bold sort">Статус</td>
                        <td class="b-2-compact b-2-bold sort">
                            Подтверждение
                            <table-arrow-icon/>
                        </td>
                        <td class="b-2-compact b-2-bold sort">Действия</td>
                    </tr>
                </template>
                <template v-slot:tbody>
                    <tr class="cursor" v-for="game in getGames?.[getPagination?.currentPage-1]?.games" @click="$router.push({name:'Application',params:{id:game.game.gid}})">
                        <td class="b-1-compact">{{ game.game?.gid }}</td>
                        <td>
                            <div class="user">
                                <div class="img">
                                    <img :src="game.game?.icon?.default?game.game?.icon?.default:game.game?.icon?.hires"
                                         alt="logo"/>
                                </div>
                                <div class="info">
                                    <p class="b-1-compact b-1-bold">{{ game.game?.title }}</p>
                                    <p class="b-2-compact b-1-regular">{{ game.game?.type?.title }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="b-1-compact">{{ game?.user?.user_name }}</td>
                        <td class="b-1-compact b-1-medium">
                            <p class="status" :class="{ approve: game?.game?.active !=0 }">
                                <table-done-icon v-if="game?.game?.active !=0"/>
                                <table-close-icon v-else/>
                                {{ game?.game?.active != 0 ? 'Активен' : 'Забанен' }}
                            </p>
                        </td>
                        <td class="b-1-compact b-1-medium">
                            <p class="status" :class="{ approve: game?.game?.approved !=1 }">
                                <table-done-icon v-if="game?.game?.approved !=1"/>
                                <table-close-icon v-else/>
                                {{ game?.game?.approved != 1 ? 'Подтверждено' : 'Не подтверждено' }}
                            </p>
                        </td>
                        <table-menu :type="'application'" :game="game"/>
                    </tr>
                </template>
            </VTable>
            <Pagination
                :current-page="getPagination?.currentPage"
                :total-pages="getPagination?.pageTotal"
                @page-change="pageChange"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/applications';
</style>
