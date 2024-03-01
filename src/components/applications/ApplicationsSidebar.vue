<script setup>
import VCheckbox from '@/components/ui/form-elements/VCheckbox.vue'
import VSelect from '@/components/ui/form-elements/VSelect.vue'

const data = [
    { id: 0, status: 'Not published' },
    { id: 1, status: 'Published' },
    { id: 2, status: 'Technical works' }
]
</script>

<template>
    <div class="applications-sidebar">
        <VSelect :title="'Категории'" :data="data" :show-select="'status'" />
        <VSelect :title="'Статус приложения'" :data="data" :show-select="'status'" />
        <VSelect :title="'Промо опции'" :data="data" :show-select="'status'" />
        <VCheckbox>Только подтвержденные приложения</VCheckbox>
    </div>
</template>

<style scoped lang="scss">
@import 'scss/applications-sidebar';
</style>
