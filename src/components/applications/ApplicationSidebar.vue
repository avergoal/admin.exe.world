<script setup>
import VSelect from '@/components/ui/form-elements/VSelect.vue'
import VTextArea from '@/components/ui/form-elements/VTextArea.vue'
import VCheckbox from '@/components/ui/form-elements/VCheckbox.vue'
import VInput from '@/components/ui/form-elements/VInput.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
</script>

<template>
    <div class="application-sidebar">
        <div class="settings publish">
            <h4>Настройки публикации</h4>
            <div class="content">
                <vInput :placeholder="'https://exe.world/game/15'" :title="'Ссылка'" />
                <VSelect class="row-item" :title="'Жанр'" :data="data" :show-select="'status'" />
                <v-text-area :title="'Комментарий'" />
                <main-button>опубликовать</main-button>
            </div>
        </div>
        <div class="settings show">
            <h4>Настройки отображения</h4>
            <div class="content">
                <VCheckbox>Новинка</VCheckbox>
                <VCheckbox>Рекоммендуемое</VCheckbox>
                <VCheckbox>Отобразить в карусели</VCheckbox>
                <v-text-area :title="'Текст для карусели'" />
                <main-button>опубликовать</main-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/application-sidebar';
</style>
